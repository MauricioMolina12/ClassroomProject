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
    
    nombre = request.json['nombre']
    
    group = db.session.query(Grupos.id).filter(Grupos.nombre == nombre).all()
    result = grupos_Schema.dump(group)

    if len(result)==0:
        new_group = Grupos(nombre)
        db.session.add(new_group)
        db.session.commit()
        return jsonify({'mensaje': 'Registro exitoso'}) 
    else:
        return jsonify({'error': 'Opss... nombre en uso'}), 401

@ruta_grupos.route("/updateGrupo", methods = ["PUT"])
def updateGrupo():
    id = request.json['id']
    ngroup = Grupos.query.get(id)
    ngroup.nombre = request.json['nombre']
    db.session.commit()
    return "Datos Actualizado con exitos"

@ruta_grupos.route("/deleteGrupo/<id>", methods = ["DELETE"])
def deleteTipodeActividad(id):
    group = Grupos.query.get(id)
    db.session.delete(group)
    db.session.commit()
    return jsonify(grupo_Schema.dump(group))