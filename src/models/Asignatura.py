from config.db import app, db, ma
from datetime import date

class Asignatura(db.Model):
    __tablename__ = "Asignatura"

    codigo = db.Column(db.Integer, primary_key = True)
    nombre = db.Column(db.String(100), unique= True)
    horas = db.Column(db.Integer)
    creditos = db.Column(db.Integer)
    area = db.Column(db.String(100))

    def __init__(self, name, hours, credits, area):
        self.nombre = name
        self.horas = hours
        self.creditos = credits
        self.area = area

with app.app_context():
    db.create_all()
    db.session.commit()

class AsignaturaSchema(ma.Schema):
    class Meta:
        fields = ('codigo', 'nombre', 'horas', 'creditos', 'area')