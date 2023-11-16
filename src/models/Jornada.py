from config.db import app, db, ma

class Jornada(db.Model):
    __tablename__ = "Jornadas"

    id = db.Column(db.Integer, primary_key = True)
    nombre = db.Column(db.String(100), unique= True)

    def __init__(self, name):
        self.nombre = name

with app.app_context():
    db.create_all()

class JornadaSchema(ma.Schema):
    class Meta:
        fields = ('id', 'nombre')