from flask import Blueprint, jsonify, request,json, redirect, url_for, session
from config.db import db, app, ma
from models.Plan_de_Trabajo import Plan_de_Trabajo, PlanTrabajoSchema
from api.Usuario import Usuario, users_schema
from api.Rol import Rol, roles_schema

ruta_plant = Blueprint("ruta_plant",__name__)

plant_schema = PlanTrabajoSchema()
plants_schema = PlanTrabajoSchema(many=True)

@ruta_plant.route("/Plan_de_Trabajo", methods=["GET"])
def Plan_de_Trabajos():
    resultall =  Plan_de_Trabajo.query.all()
    result = plants_schema.dump(resultall)
    return jsonify(result)

@ruta_plant.route("/savePlanTrabajo", methods=["POST"])
def savePlanTrabajo():
    total_hours = request.json['total_hours']
    year = request.json['year']
    semester = request.json['semester']
    teacher = request.json['teacher']

    rol = db.session.query(Rol.id).filter(Rol.nombre == "Administrador").all()
    rol_result = roles_schema.dump(rol)
    plantr = rol_result[0]
    id_rol = plantr['id']

    user = db.session.query(Usuario.id).filter(Usuario.nombre == teacher, Usuario.rol != id_rol).all()
    result = users_schema.dump(user)

    if len(result) > 0:
        plantr = result[0]
        id_teacher = plantr['id']
        new_plant = Plan_de_Trabajo(semester, total_hours, year, id_teacher)
        db.session.add(new_plant)
        db.session.commit()
        return jsonify({'mensaje': 'Registro exitoso'}) 
    else:
        return jsonify({'error': 'Opss... Docente no encontrado'}), 401 
        

@ruta_plant.route("/updatePlanTrabajo", methods=["PUT"])
def updatePlanTrabajo():
    id = request.json['id'] 
    nsubject = Plan_de_Trabajo.query.get(id)
    nsubject.horas_totales = request.json['total_hours']
    nsubject.año = request.json['year']
    nsubject.semestre = request.json['semester']
    nsubject.docente = request.json['teacher']
    db.session.commit()
    return "Datos Actualizado con exitos"

@ruta_plant.route("/deletePlanTrabajo/<id>", methods=["GET"])
def deletePlanTrabajo(id):
    subject = Plan_de_Trabajo.query.get(id)
    db.session.delete(subject)
    db.session.commit()
    return jsonify(plant_schema.dump(subject))