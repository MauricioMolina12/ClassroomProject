from flask import Blueprint, jsonify, request,json, redirect, url_for, session
from config.db import db, app, ma
from models.Area import Area, AreaSchema

ruta_area = Blueprint("ruta_area",__name__)

area_schema = AreaSchema()
areas_schema = AreaSchema(many=True)

@ruta_area.route("/areas", methods=["GET"])
def areas():
    resultall =  Area.query.all()
    result = areas_schema.dump(resultall)
    return jsonify(result)

@ruta_area.route("/savearea", methods=["POST"])
def savearea():
    name = request.json['name'].title()
    are = db.session.query(Area.codigo).filter(Area.nombre == name).all()
    result = areas_schema.dump(are)

    if len(result)==0:
        new_area = Area(name)
        db.session.add(new_area)
        db.session.commit()
        return jsonify({'mensaje': 'Registro exitoso'}) 
    else:
        return jsonify({'error': 'Opss... nombre en uso'}), 401 
        
@ruta_area.route("/updatearea", methods=["PUT"])
def updatearea():
    id = request.json['code']
    narea = Area.query.get(id) #Select * from Cliente where id = id
    narea.nombre = request.json['name'].title()
    db.session.commit()
    return "Datos Actualizado con exitos"

@ruta_area.route("/deletearea/<id>", methods=["GET"])
def deletearea(id):
    are = Area.query.get(id)
    db.session.delete(are)
    db.session.commit()
    return jsonify(area_schema.dump(are))