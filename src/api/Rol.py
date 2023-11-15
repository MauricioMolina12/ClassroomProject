from flask import Blueprint, jsonify, request,json, redirect, url_for, session
from config.db import db, app, ma
from models.Rol import Rol, RolSchema

ruta_rol = Blueprint("ruta_rol",__name__)

rol_schema = RolSchema()
roles_schema = RolSchema(many=True)

@ruta_rol.route("/roles", methods=["GET"])
def roles():
    resultall = Rol.query.all()
    result = roles_schema.dump(resultall)    
    session['roles'] = result
    return redirect(url_for("ruta_jornada.jornadas"))

@ruta_rol.route("/saverol", methods=["POST"])
def saverol():
    name = request.json['name'].title()
    rol = db.session.query(Rol.id).filter(Rol.nombre == name).all()
    result = roles_schema.dump(rol)

    if len(result)==0:
        new_rol = Rol(name)
        db.session.add(new_rol)
        db.session.commit()
        resultall = Rol.query.all()
        result = roles_schema.dump(resultall)    
        session['roles'] = result
        return jsonify({'mensaje': 'Registro exitoso'}) 
    else:
        return jsonify({'error': 'Opss... nombre en uso'}), 401 
        
@ruta_rol.route("/updaterol", methods=["PUT"])
def updaterol():
    id = request.json['id']
    nrol = Rol.query.get(id) #Select * from Cliente where id = id
    nrol.nombre = request.json['name'].title()
    db.session.commit()
    return "Datos Actualizado con exitos"

@ruta_rol.route("/deleterol/<id>", methods=["GET"])
def deleterol(id):
    rol = Rol.query.get(id)
    db.session.delete(rol)
    db.session.commit()
    return jsonify(rol_schema.dump(rol))