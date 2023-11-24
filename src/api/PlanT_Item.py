from flask import Blueprint, jsonify, request,json, redirect, url_for, session
from config.db import db, app, ma
from models.PlanT_Item import PlanT_Item, PlanT_ItemSchema
from api.Plan_de_Trabajo import Plan_de_Trabajo, plants_schema
from api.Item import Item, items_schema


ruta_plant_item = Blueprint("ruta_plant_item", __name__)

plant_item_schema = PlanT_ItemSchema()
plant_items_schema = PlanT_ItemSchema(many=True)

@ruta_plant_item.route("/Plant_Item/<int:id>", methods=["GET"])
def Plant_Item(id):
    resultall = PlanT_Item.query.all()
    result = plant_items_schema.dump(resultall)
    session['plant_item'] = result
    return redirect(url_for("revisar", id_plant= id))

@ruta_plant_item.route("/savePlant_Item", methods=["POST"])
def savePlant_Item():
    
    id_plant = request.json['id_plant']
    id_item = request.json['id_item']
    hours = request.json['hours']
    observations = request.json['observacion']
        
    cod_plat = plants_schema.dump(db.session.query(Plan_de_Trabajo.id).filter(Plan_de_Trabajo.id == id_plant).all())
    cod_item = items_schema.dump(db.session.query(Item.id).filter(Item.id == id_item).all())    
    existe = [len(cod_plat), len(cod_item)]
    
    if sum(existe) > 1 :
        new_p_i = PlanT_Item( id_item, id_plant, observations, hours)
        db.session.add(new_p_i)
        db.session.commit()
        resultall = PlanT_Item.query.all()
        result = plant_items_schema.dump(resultall)
        session['plant_item'] = result

        return jsonify({'mensaje': 'Registro exitoso'})
    else:
        return jsonify({'error': 'codigo de variables dependiente no encontrado'}), 401
    
@ruta_plant_item.route("/updatePlant_Item", methods=["POST"])
def updatePlant_Item():
    id = request.json['id'] 
    nplant_item = PlanT_Item.query.get(id) #Select * from Cliente where id = id
    nplant_item.id_plant = request.json['id_plant']
    nplant_item.id_item = request.json['id_item']
    nplant_item.hours = request.json['hours']
    nplant_item.observations = request.json['observations']
    nplant_item.verificadores = request.json['check']
    db.session.commit()
    return "Datos Actualizado con exitos"

@ruta_plant_item.route("/deletePlant_Item/<id>", methods=["GET"])
def deletePlant_Item(id):
    pl_it = PlanT_Item.query.get(id)
    db.session.delete(pl_it)
    db.session.commit()
    return jsonify(plant_item_schema.dump(pl_it))