from config.db import app, db, ma


class Item(db.Model):
    __tablename__= "Items"
    
    Id = db.Column(db.Integer, primary_key = True)
    nombre = db.Column(db.String(100), unique= True)
    TipodeAct = db.Column(db.Integer, db.ForeignKey('Tipos_de_Actividades.Id'))
    
    def __init__(self, name, TypeAct):
        self.nombre = name
        self.TipodeAct = TypeAct
        
with app.app_context():
    db.create_all()
    db.session.commit()

class ItemSchema(ma.Schema):
    class Meta:
        fields = ('Id','nombre','TipodeAct')