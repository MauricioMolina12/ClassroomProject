from config.db import app, db, ma

class Asignatura(db.Model):
    __tablename__ = "Asignaturas"

    codigo = db.Column(db.Integer, primary_key = True, autoincrement=False)
    nombre = db.Column(db.String(100), unique= True)
    horas = db.Column(db.Integer)
    creditos = db.Column(db.Integer)
    id_area = db.Column(db.Integer, db.ForeignKey('Areas.codigo'))

    def __init__(self, id, name, hours, credits, id_area):
        self.codigo = id
        self.nombre = name
        self.horas = hours
        self.creditos = credits
        self.id_area = id_area

with app.app_context():
    db.create_all()

class AsignaturaSchema(ma.Schema):
    class Meta:
        fields = ('codigo', 'nombre', 'horas', 'creditos', 'id_area')