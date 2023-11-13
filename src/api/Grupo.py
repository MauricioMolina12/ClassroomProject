from flask import Blueprint, jsonify, request
from config.db import db
from models.Grupo import Grupo, GrupoSchema

ruta_Grupo = Blueprint("ruta_Grupo",__name__)

Grupo_Schema = GrupoSchema()
Grupos_Schema = GrupoSchema(many=True)

@ruta_Grupo.route("/Grupos", methods=["GET"])
def grupos():
    resultall = Grupo.query.all()
    result = Grupos_Schema.dump(resultall)
    return jsonify(result)

@ruta_Grupo.route("/saveGrupo", methods = ["POST"])
def saveGrupo():
    
    name = request.json['name']
    
    group = db.session.query(Grupo.Id).filter(Grupo.nombre == name).all()
    result = Grupos_Schema.dump(group)

    if len(result)==0:
        new_group = Grupo(name)
        db.session.add(new_group)
        db.session.commit()
        return jsonify({'mensaje': 'Registro exitoso'}) 
    else:
        return jsonify({'error': 'Opss... nombre en uso'}), 401

@ruta_Grupo.route("/updateGrupo", methods = ["PUT"])
def updateGrupo():
    Id = request.json['Id']
    ngroup = Grupo.query.get(Id)
    ngroup.nombre = request.json['name']
    db.session.commit()
    return "Datos Actualizado con exitos"

@ruta_Grupo.route("/deleteTipodeActividad/<Id>", methods = ["DELETE"])
def deleteTipodeActividad(Id):
    group = Grupo.query.get(Id)
    db.session.delete(group)
    db.session.commit()
    return jsonify(Grupo_Schema.dump(group))