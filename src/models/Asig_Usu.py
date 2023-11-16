from config.db import app, db, ma

class Asig_Usu(db.Model):
    __tablename__ = "Asig_Usu"

    id = db.Column(db.Integer, primary_key = True)
    codigousu = db.Column(db.Integer, db.ForeignKey('Usuarios.id'))
    codigoasig = db.Column(db.Integer, db.ForeignKey('Asignaturas.codigo'))
    grupo = db.Column(db.Integer, db.ForeignKey('Grupos.id'))
    semestre = db.Column(db.String(100))

    def __init__(self, codigousu, codigoasig, grupo, semestre):
        self.codigousu = codigousu
        self.codigoasig = codigoasig
        self.grupo = grupo
        self.semestre = semestre

with app.app_context():
    db.create_all()

class Asig_UsuSchema(ma.Schema):
    class Meta:
        fields = ('id', 'codigousu', 'codigoasig', 'grupo', 'semestre')

