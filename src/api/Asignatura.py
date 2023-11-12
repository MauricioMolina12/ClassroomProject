from flask import Blueprint, jsonify, request,json, redirect, url_for, session
from config.db import db, app, ma
from models.Asignatura import Asignatura, AsignaturaSchema

ruta_asig = Blueprint("ruta_asig",__name__)

asig_schema = AsignaturaSchema()
asigs_schema = AsignaturaSchema(many=True)

@ruta_asig.route("/asignaturas", methods=["GET"])
def asignaturas():
    resultall =  Asignatura.query.all()
    result = asigs_schema.dump(resultall)
    return jsonify(result)

@ruta_asig.route("/saveasignatura", methods=["POST"])
def saveasignatura():
    name = request.json['name'].title()
    hours = request.json['hours']
    credits = request.json['credits']
    area = request.json['area'].title()

    subject = db.session.query(Asignatura.codigo).filter(Asignatura.nombre == name).all()
    result = asigs_schema.dump(subject)

    if len(result)==0:
        new_subject = Asignatura(name, hours, credits, area)
        db.session.add(new_subject)
        db.session.commit()
        return jsonify({'mensaje': 'Registro exitoso'}) 
    else:
        return jsonify({'error': 'Opss... nombre en uso'}), 401 
        

@ruta_asig.route("/updateasignatura", methods=["PUT"])
def updateasignaturas():
    id = request.json['code'] 
    nsubject = Asignatura.query.get(id) #Select * from Cliente where id = id
    nsubject.nombre = request.json['name'].title()
    nsubject.horas = request.json['hours']
    nsubject.creditos = request.json['credits']
    nsubject.area = request.json['area'].title()
    db.session.commit()
    return "Datos Actualizado con exitos"

@ruta_asig.route("/deleteasignatura/<id>", methods=["GET"])
def deleteasignaturas(id):
    subject = Asignatura.query.get(id)
    db.session.delete(subject)
    db.session.commit()
    return jsonify(asig_schema.dump(subject))