from flask import Blueprint, jsonify, request,json, redirect, url_for, session
from config.db import db, app, ma
from models.Plan_de_Trabajo import Plan_de_Trabajo, PlanTrabajoSchema
from api.Usuario import Usuario, users_schema
from api.Rol import Rol, roles_schema

ruta_plant = Blueprint("ruta_plant",__name__)

plant_schema = PlanTrabajoSchema()
plants_schema = PlanTrabajoSchema(many=True)

@ruta_plant.route("/Plan_de_Trabajo/<int:id>", methods=["GET"])
def Plan_de_Trabajos(id):
    resultall =  Plan_de_Trabajo.query.all()
    result = plants_schema.dump(resultall)
    session['plan_trabajo'] = result
    if id == 0:
        return redirect(url_for("index"))
    else:
        return redirect(url_for("revisar", id_plant= id))

@ruta_plant.route("/savePlanTrabajo", methods=["POST"])
def savePlanTrabajo():
    total_hours = request.json['total_hours']
    year = request.json['year']
    semester = request.json['semester']
    teacher = request.json['teacher']

    rol = db.session.query(Rol.id).filter(Rol.nombre == "Administrador").all()
    rol_result = roles_schema.dump(rol)
    id_rol = rol_result[0]['id']

    user = db.session.query(Usuario.id).filter(Usuario.nombre == teacher, Usuario.rol != id_rol).all()
    result = users_schema.dump(user)

    if len(result) > 0:
        plantr = result[0]
        id_teacher = plantr['id']
        new_plant = Plan_de_Trabajo(semester, total_hours, year, id_teacher)
        db.session.add(new_plant)
        db.session.commit()

        activi = db.session.query(Plan_de_Trabajo.id).filter(Plan_de_Trabajo.año == year, Plan_de_Trabajo.docente == id_teacher, Plan_de_Trabajo.semestre == semester).all()
        result = plants_schema.dump(activi)

        act = result[0]['id']

        Plan_de_Trabajos(act)
        
        return jsonify({'mensaje': act}) 
    else:
        return jsonify({'error': 'Opss... error'}), 401 
        

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