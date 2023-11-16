from config.db import app, db, ma

class Rol(db.Model):
    __tablename__ = "Roles"

    id = db.Column(db.Integer, primary_key = True)
    nombre = db.Column(db.String(100), unique= True)

    def __init__(self, name):
        self.nombre = name

def agregar_rol(nombre):
    rol_existente = Rol.query.filter_by(nombre= nombre).first()
    if rol_existente is None:
        nuevo_rol = Rol(name= nombre)
        db.session.add(nuevo_rol)
        db.session.commit()

with app.app_context():
    db.create_all()
    agregar_rol('Administrador')    

class RolSchema(ma.Schema):
    class Meta:
        fields = ('id', 'nombre')