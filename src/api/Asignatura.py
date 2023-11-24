from flask import Blueprint, jsonify, request,json, redirect, url_for, session
from sqlalchemy import or_
from config.db import db, app, ma
from models.Asignatura import Asignatura, AsignaturaSchema
from api.Area import Area, areas_schema


ruta_asig = Blueprint("ruta_asig",__name__)

asig_schema = AsignaturaSchema()
asigs_schema = AsignaturaSchema(many=True)
from api.Asig_Usu import Asig_Usu, Asig_Usus_schema
@ruta_asig.route("/asignaturas/<int:id>", methods=["GET"])
def asignaturas(id):
    resultall =  Asignatura.query.all()
    result = asigs_schema.dump(resultall)
    session['asignaturas'] = result
    if id==0:
        return redirect(url_for("editar"))
    else:
        return redirect(url_for("ruta_grupos.grupos", id= id))
    
    
    

@ruta_asig.route("/saveasignatura", methods=["POST"])
def saveasignatura():
    id = request.json['code']
    name = request.json['name'].title()
    hours = request.json['hours']
    credits = request.json['credits']
    area = request.json['area']

    subject = db.session.query(Asignatura.codigo).filter(or_(Asignatura.nombre == name, Asignatura.codigo == id)).all()
    result = asigs_schema.dump(subject)

    if len(result) == 0:

        result = db.session.query(Area.codigo, Area.nombre).filter(Area.nombre == area.title()).all()
        area = areas_schema.dump(result)

        if len(area) > 0:
            ex_area = area[0]
            id_area = ex_area['codigo']
            new_subject = Asignatura(id, name, hours, credits, id_area)
            db.session.add(new_subject)
            db.session.commit()
            resultall =  Asignatura.query.all()
            result = asigs_schema.dump(resultall)
            session['asignaturas'] = result
            return jsonify({'mensaje': 'Registro exitoso'})
        else:
            return jsonify({'error': 'Opss... nombre de area no encontrado'}), 401 
         
    else:
        return jsonify({'error': 'Opss... nombre o codigo en uso'}), 401 
        

@ruta_asig.route("/updateasignatura", methods=["PUT"])
def updateasignaturas():
    id = request.json['code'] 
    nsubject = Asignatura.query.get(id) #Select * from Cliente where id = id
    nsubject.nombre = request.json['name'].title()
    nsubject.horas = request.json['hours']
    nsubject.creditos = request.json['credits']
    nsubject.id_area = request.json['area']
    db.session.commit()
    return "Datos Actualizado con exitos"

@ruta_asig.route("/deleteasignatura/<id>", methods=["GET"])
def deleteasignaturas(id):
    result = Asig_Usus_schema.dump(db.session.query(Asig_Usu.id).filter(Asig_Usu.codigoasig == id).all())
    for id_asigusu in result:
        asigusu = Asig_Usu.query.get(id_asigusu['id'])
        db.session.delete(asigusu)
    subject = Asignatura.query.get(id)
    db.session.delete(subject)

    db.session.commit()
    return jsonify(asig_schema.dump(subject))


@ruta_asig.route("/asignatura/<id>", methods=["GET"])
def asig(id):
    result = Asignatura.query.get(id)
    subject = asig_schema.dump(result)
    result = db.session.query(Area.nombre).filter(Area.codigo == subject['id_area']).all()
    area = areas_schema.dump(result)    
    areas = areas_schema.dump(db.session.query(Area.nombre, Area.codigo).all())
    subject['area'] = area[0]['nombre']
    subject['areas'] = areas
    return jsonify(subject)


    
    
    
