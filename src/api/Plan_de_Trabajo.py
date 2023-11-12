from flask import Blueprint, jsonify, request,json, redirect, url_for, session
from config.db import db, app, ma
from models.Plan_de_Trabajo import Plan_de_Trabajo, PlanTrabajoSchema

ruta_PlanT = Blueprint("ruta_PlanT",__name__)

PlanT_schema = PlanTrabajoSchema()
PlanTs_schema = PlanTrabajoSchema(many=True)

@ruta_PlanT.route("/Plan_de_Trabajo", methods=["GET"])
def Plan_de_Trabajoas():
    resultall =  Plan_de_Trabajo.query.all()
    result = PlanTs_schema.dump(resultall)
    return jsonify(result)

@ruta_PlanT.route("/savePlanTrabajo", methods=["POST"])
def savePlanTrabajo():
    Total_hours = request.json['Total_hours']
    year = request.json['year']
    semester = request.json['semester']
    teacher = request.json['teacher']

    subject = db.session.query(Plan_de_Trabajo.Id).all()
    result = PlanTs_schema.dump(subject)

    if len(result)==0:
        new_subject = Plan_de_Trabajo(semester, Total_hours, year, teacher)
        db.session.add(new_subject)
        db.session.commit()
        return jsonify({'mensaje': 'Registro exitoso'}) 
    else:
        return jsonify({'error': 'Opss... nombre en uso'}), 401 
        

@ruta_PlanT.route("/updatePlanTrabajo", methods=["PUT"])
def updatePlanTrabajo():
    Id = request.json['Id'] 
    nsubject = Plan_de_Trabajo.query.get(Id)
    nsubject.horas_totales = request.json['Total_hours']
    nsubject.año = request.json['year']
    nsubject.semestre = request.json['semester']
    nsubject.docente = request.json['teacher']
    db.session.commit()
    return "Datos Actualizado con exitos"

@ruta_PlanT.route("/deletePlanTrabajo/<id>", methods=["GET"])
def deletePlanTrabajo(Id):
    subject = Plan_de_Trabajo.query.get(Id)
    db.session.delete(subject)
    db.session.commit()
    return jsonify(PlanT_schema.dump(subject))