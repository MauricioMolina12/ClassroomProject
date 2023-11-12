from config.db import app, db, ma

class Usuario(db.Model):
    __tablename__ = "Usuario"

    id = db.Column(db.Integer, primary_key = True)
    nombre = usuario = db.Column(db.String(100))
    usuario = db.Column(db.String(100), unique= True)
    contrasena = db.Column(db.String(100))
    rol = db.Column(db.String(100))
    formacion_masAlta = db.Column(db.String(100))
    otras_formaciones = db.Column(db.String(500))
    jornada = db.Column(db.Integer, db.ForeignKey('Jornada.id'))

    def __init__(self, name, user, password, rol, form, other_form, jor):
        self.nombre = name
        self.usuario = user
        self.contrasena = password
        self.rol = rol
        self.formacion_masAlta = form
        self.otras_formaciones = other_form
        self.jornada = jor

with app.app_context():
    db.create_all()
    db.session.commit()

class UsuarioSchema(ma.Schema):
    class Meta:
        fields = ('id', 'nombre', 'usuario', 'contrasena', 'rol', 'formacion_masAlta', 'otras_formaciones', 'jornada')