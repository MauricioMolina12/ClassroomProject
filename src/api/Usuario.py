from flask import Blueprint, jsonify, request,json, redirect, url_for, session
from sqlalchemy import or_
from config.db import db, app, ma
from models.Usuario import Usuario, UsuarioSchema
from api.Jornada import Jornada, jornadas_schema
from api.Rol import Rol, roles_schema

ruta_user = Blueprint("ruta_user",__name__)

user_schema = UsuarioSchema()
users_schema = UsuarioSchema(many=True)

@ruta_user.route("/users", methods=["GET"])
def users():
    resultall =  Usuario.query.all()
    result = users_schema.dump(resultall)
    session['usuarios'] = result
    return redirect(url_for("docentes"))

@ruta_user.route("/saveuser", methods=["POST"])
def saveuser():
    id = request.json['id']
    name = request.json['name'].title()
    user = request.json['user'].lower()
    password = request.json['password']
    
    use = db.session.query(Usuario.id).filter(or_(Usuario.usuario == user, Usuario.id == id)).all() #para un or - se importa de sqlalchemy
    result = users_schema.dump(use)
    print(result)

    
    if len(result)== 0:

        rol = request.json['rol'].title()

        ro = db.session.query(Rol.id).filter(Rol.nombre == rol).all()
        rol_result = roles_schema.dump(ro)        

        if len(rol_result) > 0:
            id_rol = rol_result[0]['id']

            if rol == "Administrador":
                new_subject = Usuario(id, name, user, password, id_rol)
                db.session.add(new_subject)
                db.session.commit()
                resultall =  Usuario.query.all()
                result = users_schema.dump(resultall)
                session['usuarios'] = result
                return jsonify({'mensaje': 'Registro exitoso'})
            else:
                form = request.json['level_form']
                jor = request.json['jor']

                result = db.session.query(Jornada.id).filter(Jornada.nombre == jor.title()).all()
                jorn = jornadas_schema.dump(result)

                if len(jorn) > 0:
                    jor = jorn[0]['id']
                    new_subject = Usuario(id, name, user, password, id_rol, form, jor)
                    db.session.add(new_subject)
                    db.session.commit()
                    resultall =  Usuario.query.all()
                    result = users_schema.dump(resultall)
                    session['usuarios'] = result
                    return jsonify({'mensaje': 'Registro exitoso'})
                else:
                    return jsonify({'error': 'Opss... nombre de jornada no encontrado'}), 401 
        else:
            return jsonify({'error': 'Opss... rol no disponible'}), 401             
    else:
        return jsonify({'error': 'Opss... nombre o id en uso'}), 401 
            
@ruta_user.route("/updateuser", methods=["PUT"])
def updateuser():
    id = request.json['id'] 
    nsubject = Usuario.query.get(id) #Select * from Cliente where id = id
    nsubject.nombre = request.json['name']
    nsubject.usuario = request.json['user']
    nsubject.contrasena = request.json['password']
    nsubject.rol = request.json['rol']
    nsubject.nivel_formacion = request.json['level_form']

    result = db.session.query(Jornada.id, Jornada.nombre).filter(Jornada.nombre == request.json['jor'].title()).all()
    jorn = jornadas_schema.dump(result)

    if len(jorn) > 0:
        ex_area = jorn[0]
        nsubject.jornada = ex_area['id']
        db.session.commit()
        return "Datos Actualizado con exitos"

@ruta_user.route("/deleteuser/<id>", methods=["GET"])
def deleteuser(id):
    subject = Usuario.query.get(id)
    db.session.delete(subject)
    db.session.commit()
    return jsonify(user_schema.dump(subject))

@ruta_user.route("/signin", methods=["POST"])
def signin():
    user = request.json['user']
    password = request.json['password']
    user_ = db.session.query(Usuario.jornada, Usuario.id, Usuario.nombre, Usuario.nivel_formacion, Usuario.rol).filter(Usuario.usuario == user, Usuario.contrasena == password).all()
    result = users_schema.dump(user_)

    if len(result)>0:
        usuario = result[0]

        jornada = db.session.query(Jornada.nombre).filter(Jornada.id == usuario['jornada']).all()
        jorn = jornadas_schema.dump(jornada) 

        ro = db.session.query(Rol.nombre ).filter(Rol.id == usuario['rol']).all()
        rol_result = roles_schema.dump(ro) 

        session['id_user'] = usuario['id']
        session['user'] = user
        session['nombre'] = usuario['nombre']
        session['password'] = password   
        session['rol'] = rol_result[0]['nombre']
        if session['rol'] != 'Administrador':
            session['formacion'] = usuario['nivel_formacion']
            session['jornada'] = jorn[0]['nombre']
            
        return jsonify({'mensaje': 'Bienvenido'})
    else:
        return jsonify({'error': 'Opss...'}), 401