from flask import Blueprint, jsonify, request,json, redirect, url_for, session
from config.db import db, app, ma
from models.Tipo_de_Actividad import Tipo_de_Actividad, TipodeActividadSchema

ruta_TipoA = Blueprint("ruta_Tipo_de_Actividad",__name__)

TipodeA_Schema = TipodeActividadSchema()
TipodeAs_Schema = TipodeActividadSchema(many=True)

@ruta_TipoA.route("/Tipo_de_Actividad", methods=["GET"])
def tipo_de_actividad():
    resultall = Tipo_de_Actividad.query.all()
    result = TipodeAs_Schema.dump(resultall)
    return jsonify(result)

@ruta_TipoA.route("/saveTipodeActividad", methods = ["POST"])
def saveTipodeActividad():
    
    name = request.json['name']
    
    subject = db.session.query(Tipo_de_Actividad.Id).filter(Tipo_de_Actividad.nombre == name).all()
    result = TipodeAs_Schema.dump(subject)

    if len(result)==0:
        new_subject = Tipo_de_Actividad(name)
        db.session.add(new_subject)
        db.session.commit()
        return jsonify({'mensaje': 'Registro exitoso'}) 
    else:
        return jsonify({'error': 'Opss... nombre en uso'}), 401

@ruta_TipoA.route("/updateTipodeActividad", methods = ["PUT"])
def updateTipodeActividad():
    Id = request.json['Id']
    nsubject = Tipo_de_Actividad.query.get(Id)
    nsubject.nombre = request.json['name']
    db.session.commit()
    return "Datos Actualizado con exitos"

@ruta_TipoA.route("/deleteTipodeActividad/<Id>", methods = ["GET"])
def deleteTipodeActividad(Id):
    subject = Tipo_de_Actividad.query.get(Id)
    db.session.delete(subject)
    db.session.commit()
    return jsonify(TipodeA_Schema.dump(subject))