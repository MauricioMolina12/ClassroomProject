from flask import Blueprint, jsonify, request,json
from config.db import db, app, ma
from models.PlanT_Item import PlanT_Item, PlanT_ItemSchema
from models.Plan_de_Trabajo import Plan_de_Trabajo
from models.Item import Item


ruta_plant_item = Blueprint("ruta_plant_item", __name__)

plant_item_schema = PlanT_ItemSchema()
plant_items_schema = PlanT_ItemSchema(many=True)

@ruta_plant_item.route("/Plant_Item", methods=["GET"])
def Plant_Item():
    resultall = PlanT_Item.query.all
    result = plant_items_schema.dump(resultall)
    return jsonify(result)

@ruta_plant_item.route("/savePlant_Item", methods=["POST"])
def savePlant_Item():
    
    id = request.json['id']
    id_plant = request.json['id_plant']
    id_item = request.json['id_item']
    hours = request.json['hours']
    observations = request.json['credits']
    
        
    cod_plat = plant_items_schema(db.session.query(Plan_de_Trabajo.id).filter(Plan_de_Trabajo.id == id_plant).all())
    cod_item = plant_items_schema(db.session.query(Item.id).filter(Item.id == id_item).all())
    existe = [len(cod_plat), len(cod_item)]
    
    if sum(existe) > 2 :
        new_p_i = PlanT_Item(id, id_plant, id_item, hours, observations)
        db.session.add(new_p_i)
        db.session.commit()
        return jsonify({'mensaje': 'Registro exitoso'})
    else:
        return jsonify({'mensaje': 'codigo de variables dependiente no encontrado'})
    
@ruta_plant_item.route("/updatePlant_Item", methods=["POST"])
def updatePlant_Item():
    id = request.json['id'] 
    nplant_item = PlanT_Item.query.get(id) #Select * from Cliente where id = id
    nplant_item.id_plant = request.json['id_plant']
    nplant_item.id_item = request.json['id_item']
    nplant_item.hours = request.json['hours']
    nplant_item.observations = request.json['observations']
    db.session.commit()
    return "Datos Actualizado con exitos"

@ruta_plant_item.route("/deletePlant_Item/<id>", methods=["GET"])
def deletePlant_Item(id):
    pl_it = PlanT_Item.query.get(id)
    db.session.delete(pl_it)
    db.session.commit()
    return jsonify(plant_item_schema.dump(pl_it))