from config.db import app, db, ma


class Grupos(db.Model):
    __tablename__= "Grupos"
    
    id = db.Column(db.Integer, primary_key = True)
    nombre = db.Column(db.String(100), unique= True)
    
    def __init__(self, nombre):
        self.nombre = nombre
        
with app.app_context():
    db.create_all()
    db.session.commit()

class GrupoSchema(ma.Schema):
    class Meta:
        fields = ('id','nombre')