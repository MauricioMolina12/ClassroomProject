from flask import Blueprint, jsonify, request,json, redirect, url_for, session
from config.db import db, app, ma
from models.Item import Item, ItemSchema
from models.Tipo_de_Actividad import Tipo_de_Actividad
from api.Tipo_de_Actividad import tipodeas_Schema

ruta_item = Blueprint("ruta_item",__name__)

item_schema = ItemSchema()
items_schema = ItemSchema(many=True)

@ruta_item.route("/Item/<int:id>", methods=["GET"])
def items(id):
    resultall = Item.query.all()
    result = items_schema.dump(resultall)
    session['items'] = result
    return redirect(url_for("plan", id= id))

@ruta_item.route("/saveItem", methods = ["POST"])
def saveItem():
    
    name = request.json['name']
    id_TipoAct = request.json['id_TipodeActividad']
    

    
    ite = db.session.query(Item.id).filter(Item.nombre == name).all()
    result = items_schema.dump(ite)

    if len(result)==0:
        
        result = db.session.query(Tipo_de_Actividad.id).filter(Tipo_de_Actividad.id == id_TipoAct).all()
        tipoa = tipodeas_Schema.dump(result)
        
        if len(tipoa) > 0:
            if "one_select" in request.json:
                opcio = request.json["one_select"]
                new_item = Item(name, id_TipoAct, opcio)
            else:
                new_item = Item(name, id_TipoAct)
            db.session.add(new_item)
            db.session.commit()
            resultall = Item.query.all()
            result = items_schema.dump(resultall)
            session['items'] = result
            return jsonify({'mensaje': 'Datos guardados con exitos'})
        else:
            return  jsonify({'mensaje': 'Opss... codigo de Tipo de actividad no encontrado'})
    else:
        return jsonify({'error': 'Opss... nombre en uso'}), 401

@ruta_item.route("/updateItem", methods = ["PUT"])
def updateItem():
    id = request.json['id']
    nsubject = Item.query.get(id)
    nsubject.nombre = request.json['name']
    nsubject.id_TipoAct = request.json['id_TipoAct']
    db.session.commit()
    return "Datos Actualizado con exitos"

@ruta_item.route("/deleteItem/<id>", methods = ["GET"])
def deleteItem(id):
    subject = Item.query.get(id)
    db.session.delete(subject)
    db.session.commit()
    return jsonify(item_schema.dump(subject))