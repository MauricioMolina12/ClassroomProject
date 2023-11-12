from flask import Blueprint, jsonify, request,json, redirect, url_for, session
from config.db import db, app, ma
from models.Item import Item, ItemSchema

ruta_Item = Blueprint("Item",__name__)

item_Schema = ItemSchema()
items_Schema = ItemSchema(many=True)

@ruta_Item.route("/Item", methods=["GET"])
def Item():
    resultall = Item.query.all()
    result = items_Schema.dump(resultall)
    return jsonify(result)

@ruta_Item.route("/saveItem", methods = ["POST"])
def saveItem():
    
    name = request.json['name']
    id_TipoAct = request.json['id_TipodeActividad']
    
    ite = db.session.query(Item.Id).filter(Item.nombre == name).all()
    result = items_Schema.dump(ite)

    if len(result)==0:
        new_subject = Item(name, id_TipoAct)
        db.session.add(new_subject)
        db.session.commit()
        return jsonify({'mensaje': 'Datos guardados con exitos'}) 
    else:
        return jsonify({'error': 'Opss... nombre en uso'}), 401

@ruta_Item.route("/updateItem", methods = ["PUT"])
def updateItem():
    Id = request.json['Id']
    nsubject = Item.query.get(Id)
    nsubject.nombre = request.json['name']
    nsubject.id_TipoAct = request.json['id_TipoAct']
    db.session.commit()
    return "Datos Actualizado con exitos"

@ruta_Item.route("/deleteItem/<Id>", methods = ["GET"])
def deleteItem(Id):
    subject = Item.query.get(Id)
    db.session.delete(subject)
    db.session.commit()
    return jsonify(item_Schema.dump(subject))