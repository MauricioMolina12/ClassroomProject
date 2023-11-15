from flask import Blueprint, jsonify, request,json, redirect, url_for, session
from config.db import db, app, ma
from models.Jornada import Jornada, JornadaSchema

ruta_jornada = Blueprint("ruta_jornada",__name__)

jornada_schema = JornadaSchema()
jornadas_schema = JornadaSchema(many=True)

@ruta_jornada.route("/jornadas", methods=["GET"])
def jornadas():
    resultall =  Jornada.query.all()
    result = jornadas_schema.dump(resultall)
    session['jornadas'] = result
    return redirect(url_for("register"))

@ruta_jornada.route("/savejornada", methods=["POST"])
def savejornada():
    name = request.json['name'].title()
    jorn = db.session.query(Jornada.id).filter(Jornada.nombre == name).all()
    result = jornadas_schema.dump(jorn)

    if len(result)==0:
        new_jorn = Jornada(name)
        db.session.add(new_jorn)
        db.session.commit()
        resultall =  Jornada.query.all()
        result = jornadas_schema.dump(resultall)
        session['jornadas'] = result
        return jsonify({'mensaje': 'Registro exitoso'}) 
    else:
        return jsonify({'error': 'Opss... nombre en uso'}), 401 
        
@ruta_jornada.route("/updatejornada", methods=["PUT"])
def updatejornada():
    id = request.json['id']
    njorn = Jornada.query.get(id) #Select * from Cliente where id = id
    njorn.nombre = request.json['name'].title()
    db.session.commit()
    return "Datos Actualizado con exitos"

@ruta_jornada.route("/deletejornada/<id>", methods=["GET"])
def deletejornada(id):
    jorn = Jornada.query.get(id)
    db.session.delete(jorn)
    db.session.commit()
    return jsonify(jornada_schema.dump(jorn))