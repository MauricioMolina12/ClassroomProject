from config.db import app, db, ma


class Tipo_de_Actividad(db.Model):
    __tablename__= "Tipos_de_Actividades"
    
    id = db.Column(db.Integer, primary_key = True)
    nombre = db.Column(db.String(100), unique= True)
    
    def __init__(self, name):
        self.nombre = name
        
def agregar_producto(name):
    usuario_existente = Tipo_de_Actividad.query.filter_by(nombre= name).first()
    if usuario_existente is None:
        nuevo_user = Tipo_de_Actividad(name= name)
        db.session.add(nuevo_user)
        db.session.commit()

with app.app_context():
    db.create_all()
    agregar_producto("Actividades de Investigación")
    

class TipodeActividadSchema(ma.Schema):
    class Meta:
        fields = ('id','nombre')