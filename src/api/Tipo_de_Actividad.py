from flask import Blueprint, jsonify, request,json, redirect, url_for, session
from config.db import db, app, ma
from models.Tipo_de_Actividad import Tipo_de_Actividad, TipodeActividadSchema

ruta_TipoA = Blueprint("ruta_Tipo_de_Actividad",__name__)

tipodea_schema = TipodeActividadSchema()
tipodeas_Schema = TipodeActividadSchema(many=True)

@ruta_TipoA.route("/Tipo_de_Actividades/<int:id>/<tipo>", methods=["GET"])
def tipo_de_actividades(id, tipo):
    resultall = Tipo_de_Actividad.query.all()
    result = tipodeas_Schema.dump(resultall)
    session['actividades'] = result
    return redirect(url_for("ruta_item.items", id= id, tipo= tipo))
@ruta_TipoA.route("/saveTipodeActividad", methods = ["POST"])
def saveTipodeActividad():
    
    name = request.json['name']
    
    activi = db.session.query(Tipo_de_Actividad.id).filter(Tipo_de_Actividad.nombre == name).all()
    result = tipodeas_Schema.dump(activi)

    if len(result)==0:
        new_activi = Tipo_de_Actividad(name)
        db.session.add(new_activi)
        db.session.commit()
        resultall = Tipo_de_Actividad.query.all()
        result = tipodeas_Schema.dump(resultall)
        session['actividades'] = result

        activi = db.session.query(Tipo_de_Actividad.id).filter(Tipo_de_Actividad.nombre == name).all()
        result = tipodeas_Schema.dump(activi)

        act = result[0]['id']

        return jsonify({'mensaje': act}) 
    else:
        return jsonify({'error': 'Opss... nombre en uso'}), 401

@ruta_TipoA.route("/updateTipodeActividad", methods = ["PUT"])
def updateTipodeActividad():
    id = request.json['id']
    nactivi = Tipo_de_Actividad.query.get(id)
    nactivi.nombre = request.json['name']
    db.session.commit()
    return "Datos Actualizado con exitos"

@ruta_TipoA.route("/deleteTipodeActividad/<id>", methods = ["GET"])
def deleteTipodeActividad(id):
    activi = Tipo_de_Actividad.query.get(id)
    db.session.delete(activi)
    db.session.commit()
    return jsonify(tipodea_schema.dump(activi))