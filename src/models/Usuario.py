from config.db import app, db, ma

class Usuario(db.Model):
    __tablename__ = "Usuarios"

    id = db.Column(db.Integer, primary_key = True, autoincrement=False)
    nombre = usuario = db.Column(db.String(100))
    usuario = db.Column(db.String(100), unique= True)
    contrasena = db.Column(db.String(100))
    rol = db.Column(db.Integer, db.ForeignKey('Roles.id'))
    nivel_formacion = db.Column(db.String(100))
    jornada = db.Column(db.Integer, db.ForeignKey('Jornadas.id'))

    def __init__(self, id,  name, user, password, rol, form=None, jor=None):
        self.id = id
        self.nombre = name
        self.usuario = user
        self.contrasena = password
        self.rol = rol
        self.nivel_formacion = form
        self.jornada = jor

def agregar_producto(id_, name, user, password, rol):
    usuario_existente = Usuario.query.filter_by(id= id_).first()
    if usuario_existente is None:
        nuevo_user = Usuario(id= id_, name= name, user= user, password= password, rol= rol)
        db.session.add(nuevo_user)
        db.session.commit()

with app.app_context():
    db.create_all()
    agregar_producto(0, 'admin', 'admin', '123456', 1)
    

class UsuarioSchema(ma.Schema):
    class Meta:
        fields = ('id', 'nombre', 'usuario', 'contrasena', 'rol', 'nivel_formacion','jornada')