from flask import Blueprint, jsonify, request
from config.db import db
from models.Grupo import Grupos, GrupoSchema

ruta_grupos = Blueprint("ruta_grupos",__name__)

grupo_Schema = GrupoSchema()
grupos_Schema = GrupoSchema(many=True)

@ruta_grupos.route("/grupos", methods=["GET"])
def grupos():
    resultall = Grupos.query.all()
    result = grupos_Schema.dump(resultall)
    return jsonify(result)

@ruta_grupos.route("/saveGrupo", methods = ["POST"])
def saveGrupo():
    
    name = request.json['name']
    
    group = db.session.query(Grupos.Id).filter(Grupos.nombre == name).all()
    result = grupos_Schema.dump(group)

    if len(result)==0:
        new_group = Grupos(name)
        db.session.add(new_group)
        db.session.commit()
        return jsonify({'mensaje': 'Registro exitoso'}) 
    else:
        return jsonify({'error': 'Opss... nombre en uso'}), 401

@ruta_grupos.route("/updateGrupo", methods = ["PUT"])
def updateGrupo():
    Id = request.json['Id']
    ngroup = Grupos.query.get(Id)
    ngroup.nombre = request.json['name']
    db.session.commit()
    return "Datos Actualizado con exitos"

@ruta_grupos.route("/deleteGrupo/<Id>", methods = ["DELETE"])
def deleteTipodeActividad(Id):
    group = Grupos.query.get(Id)
    db.session.delete(group)
    db.session.commit()
    return jsonify(grupo_Schema.dump(group))