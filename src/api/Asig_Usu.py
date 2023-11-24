from flask import Blueprint, jsonify, request, json, session, redirect, url_for
from config.db import db, app, ma
from models.Asig_Usu import Asig_Usu, Asig_UsuSchema
from api.Usuario import Usuario, users_schema
from api.Asignatura import Asignatura, asigs_schema
from api.Grupo import Grupos, grupos_Schema

ruta_Asig_Usu = Blueprint("ruta_Asig_Usu", __name__)

Asig_Usu_schema = Asig_UsuSchema()
Asig_Usus_schema = Asig_UsuSchema(many=True)

@ruta_Asig_Usu.route("/Asig_usu/<int:id>/<tipo>", methods=["GET"])
def Asig_usu(id, tipo):
    resultall = Asig_Usu.query.all()
    result= Asig_Usus_schema.dump(resultall)
    session['asig_usu'] = result
    resultall =  Asignatura.query.all()
    result = asigs_schema.dump(resultall)
    session['asignaturas'] = result
    if tipo == "plant":
        return redirect(url_for("plan", id= id))
    else:
        return redirect(url_for("info", id= id))

@ruta_Asig_Usu.route("/saveAsig_usu", methods=["POST"])
def saveAsig_usu():
    print("llego")
    result= request.get_json()

    usu = users_schema.dump(db.session.query(Usuario.id).filter(Usuario.nombre == result["usu"], Usuario.rol == 2).all()) 
    if len(usu) > 0:
        codigousu = usu[0]['id']

        asig = asigs_schema.dump(db.session.query(Asignatura.codigo).filter(Asignatura.codigo == result["asig"]).all()) 
        codigoasig = asig[0]['codigo']

        grupo = grupos_Schema.dump(db.session.query(Grupos.id).filter(Grupos.nombre == result["grupo"]).all()) 
        idgrupo =  grupo[0]['id']

        semestre = result["semes"]
        ano = result["ano"]
        periodo = result["periodo"]
        
        asignacion_existente = db.session.query(Asig_Usu).filter(
            Asig_Usu.codigousu == codigousu,
            Asig_Usu.codigoasig == codigoasig,
            Asig_Usu.grupo == idgrupo,
            Asig_Usu.semestre == semestre,
            Asig_Usu.ano == ano,
            Asig_Usu.periodo == periodo
        ).first()
        
        if  asignacion_existente is not None:
            return jsonify({'error': 'Esta asignación ya existe para el docente con el mismo grupo, año y periodo'})
        else:
            db.session.add(Asig_Usu(codigousu= codigousu, codigoasig= codigoasig, grupo= idgrupo, semestre= semestre, ano= ano, periodo= periodo))
            db.session.commit()
            resultall = Asig_Usu.query.all()
            result= Asig_Usus_schema.dump(resultall)
            session['asig_usu'] = result
            return jsonify({'mensaje': 'Registro exitoso'}) 
    else:
        return jsonify({'error': 'Opss... Docente no existente'})



@ruta_Asig_Usu.route("/updateAsig_usu", methods=["PUT"])
def updateAsig_usu():
    data = request.get_json()
    result = Asig_Usu.query.get(data["id"])

    result.codigousu = data["codigousu"]
    result.codigoasig = data["codigoasig"]
    result.grupo = data["grupo"]
    result.semestre = data["semestre"]
    result.ano = data["ano"]
    result.periodo = data["periodo"]

    db.session.commit()
    return jsonify(Asig_Usu_schema.dump(result))

@ruta_Asig_Usu.route("/deleteAsig_usu/<id>", methods=["GET"])
def deleteAsig_usu(id):
    result = Asig_Usu.query.get(id)
    
    if result is not None:
        db.session.delete(result)
        db.session.commit()
        resultall = Asig_Usu.query.all()
        result= Asig_Usus_schema.dump(resultall)
        session['asig_usu'] = result
        #Asig_Usu_schema.dump(result)
        return jsonify(Asig_Usu_schema.dump(result))
    else:
        return jsonify({'error': 'El objeto no fue encontrado'})
    
@ruta_Asig_Usu.route("/asig_perio/<int:ano>/<int:period>/<int:id_usu>", methods=["GET"])
def asig_perio(ano, period, id_usu):
    suma = 0
    asigns = []
    result = Asig_Usus_schema.dump(db.session.query(Asig_Usu.codigoasig).filter(Asig_Usu.ano == ano, Asig_Usu.periodo == period, Asig_Usu.codigousu == id_usu).all())
    for asig in result:
        resul = asigs_schema.dump(db.session.query(Asignatura.horas, Asignatura.nombre).filter(Asignatura.codigo == asig['codigoasig']).all())
        
        if len(resul) > 0:
            asigns.append(resul[0])
            suma += resul[0]['horas']
    print(asigns)
    return jsonify([suma, asigns])