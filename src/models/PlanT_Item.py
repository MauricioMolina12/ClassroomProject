from config.db import app, db, ma


class PlanT_Item(db.Model):
    __tablename__= "PlanT_Item"
    
    id = db.Column(db.Integer, primary_key = True)
    id_item = db.Column(db. Integer, db.ForeignKey('Items.id'))
    id_plant = db.Column(db. Integer, db.ForeignKey('Planes_de_Trabajos.id'))
    observaciones = db.Column(db.String(100))
    horas = db.Column(db.Integer)
    verificadores = db.Column(db.Integer)
    
    def __init__(self, id_item, id_plant, observations, hours, checkers=None): #checkers: Verificadores de actividades
        self.id_item =id_item
        self.id_plant = id_plant
        self.observaciones = observations
        self.horas = hours
        self.verificadores = checkers
        
with app.app_context():
    db.create_all()

class PlanT_ItemSchema(ma.Schema):
    class Meta:
        fields = ('id','id_item','id_plant','observaciones','horas','verificadores')