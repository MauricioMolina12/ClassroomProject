from config.db import app, db, ma
from datetime import date

class Tipo_de_Actividad(db.Model):
    __tablename__= "Tipo_de_Actividad"
    
    Id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(100), unique= True)
    
    def __init__(self, name):
        self.name = name
        
with app.app_context():
    db.create_all()
    db.session.commit()

class TipodeActividadSchema(ma.Schema):
    class Meta:
        fields = ('Id','name')