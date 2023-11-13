from config.db import app, db, ma

class Area(db.Model):
    __tablename__ = "Areas"

    codigo = db.Column(db.Integer, primary_key = True)
    nombre = db.Column(db.String(100), unique= True)

    def __init__(self, name):
        self.nombre = name

with app.app_context():
    db.create_all()
    db.session.commit()

class AreaSchema(ma.Schema):
    class Meta:
        fields = ('codigo', 'nombre')