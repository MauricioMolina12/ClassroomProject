from flask import Blueprint, jsonify, request,json, redirect, url_for, session
from config.db import db, app, ma
from models.Usuario import Usuario, UsuarioSchema
from api.Jornada import Jornada, jornadas_schema

ruta_user = Blueprint("ruta_user",__name__)

user_schema = UsuarioSchema()
users_schema = UsuarioSchema(many=True)

@ruta_user.route("/users", methods=["GET"])
def users():
    resultall =  Usuario.query.all()
    result = users_schema.dump(resultall)
    return jsonify(result)

@ruta_user.route("/saveuser", methods=["POST"])
def saveuser():

    name = request.json['name']
    user = request.json['user']
    password = request.json['password']
    rol = request.json['rol']
    form = request.json['form']
    other_form = request.json['other_form']
    jor = request.json['jor']

    use = db.session.query(Usuario.id).filter(Usuario.nombre == name).all()
    result = users_schema.dump(use)

    if len(result)== 0:

        result = db.session.query(Jornada.id, Jornada.nombre).filter(Jornada.nombre == jor.title()).all()
        jorn = jornadas_schema.dump(result)

        if len(jorn) > 0:
            ex_area = jorn[0]
            jor = ex_area['id']
            new_subject = Usuario(name, user, password, rol, form, other_form, jor)
            db.session.add(new_subject)
            db.session.commit()
            return jsonify({'mensaje': 'Registro exitoso'})
        else:
            return jsonify({'error': 'Opss... nombre de jornada no encontrado'}), 401 
         
    else:
        return jsonify({'error': 'Opss... nombre en uso'}), 401 
        

@ruta_user.route("/updateuser", methods=["PUT"])
def updateuser():
    id = request.json['id'] 
    nsubject = Usuario.query.get(id) #Select * from Cliente where id = id
    nsubject.nombre = request.json['name']
    nsubject.usuario = request.json['user']
    nsubject.contrasena = request.json['password']
    nsubject.rol = request.json['rol']
    nsubject.formacion_masAlta = request.json['form']
    nsubject.otras_formaciones = request.json['other_form']
    nsubject.jornada = request.json['jor']
    db.session.commit()
    return "Datos Actualizado con exitos"

@ruta_user.route("/deleteuser/<id>", methods=["GET"])
def deleteuser(id):
    subject = Usuario.query.get(id)
    db.session.delete(subject)
    db.session.commit()
    return jsonify(user_schema.dump(subject))