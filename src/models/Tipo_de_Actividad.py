from config.db import app, db, ma


class Tipo_de_Actividad(db.Model):
    __tablename__= "Tipos_de_Actividades"
    
    id = db.Column(db.Integer, primary_key = True)
    nombre = db.Column(db.String(100), unique= True)
    
    def __init__(self, name):
        self.nombre = name
        
with app.app_context():
    db.create_all()
    db.session.commit()

class TipodeActividadSchema(ma.Schema):
    class Meta:
        fields = ('id','nombre')