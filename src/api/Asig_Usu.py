from flask import Blueprint, jsonify, request,json
from config.db import db, app, ma
from models.Asig_Usu import Asig_Usu, Asig_UsuSchema
from models.Usuario import Usuario
from models.Asignatura import Asignatura
from models.Grupo import Grupos

ruta_Asig_Usu = Blueprint("ruta_Asig_Usu", __name__)

Asig_Usu_schema = Asig_UsuSchema()
Asig_Usus_schema = Asig_UsuSchema(many=True)

@ruta_Asig_Usu.route("/Asig_usu", methods=["GET"])
def Asig_usu():
    resultall = Asig_Usu.query.all()
    result= Asig_Usus_schema.dump(resultall)
    return jsonify(result)

@ruta_Asig_Usu.route("/saveAsig_usu", methods=["POST"])
def saveAsig_usu():
    result= request.get_json()

    codigousu = Asig_Usus_schema.dump(db.session.query(Usuario.id).filter(Usuario.id == result["codigousu"]).all()) 
    codigoasig = Asig_Usus_schema.dump(db.session.query(Asignatura.codigo).filter(Asignatura.codigo == result["codigoasig"]).all()) 
    grupo = Asig_Usus_schema.dump(db.session.query(Grupos.id).filter(Grupos.id == result["grupo"]).all()) 

    existe = [len(codigousu),len(codigoasig),len(grupo)]

    if sum(existe) == 3:
        db.session.add(Asig_Usu(**result))
        db.session.commit()
        return jsonify({'mensaje': 'Registro exitoso'}) 
    else:
        return jsonify({'error': 'Opss... atributo/s no existente'})



@ruta_Asig_Usu.route("/updateAsig_usu", methods=["PUT"])
def updateAsig_usu():
    data = request.get_json()
    result = Asig_Usu.query.get(data["id"])

    result.codigousu = data["codigousu"]
    result.codigoasig = data["codigoasig"]
    result.grupo = data["grupo"]
    result.semestre = data["semestre"]

    db.session.commit()
    return jsonify(Asig_Usu_schema.dump(result))

@ruta_Asig_Usu.route("/deleteAsig_usu/<id>", methods=["DELETE"])
def deleteAsig_usu(id):
    result = Asig_Usu.query.get(id)
    db.session.delete(result)
    db.session.commit()
    return jsonify(Asig_Usu_schema.dump(result))