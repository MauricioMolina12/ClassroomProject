from config.db import app, db, ma


class Item(db.Model):
    __tablename__= "Items"
    
    id = db.Column(db.Integer, primary_key = True)
    nombre = db.Column(db.Text, unique= True)
    TipodeAct = db.Column(db.Integer, db.ForeignKey('Tipos_de_Actividades.id'))
    one_select = db.Column(db.Boolean)
    
    def __init__(self, name, TypeAct, one_select=False):
        self.nombre = name
        self.TipodeAct = TypeAct
        self.one_select = one_select
        
def agregar_producto(name, act):
    usuario_existente = Item.query.filter_by(nombre= name).first()
    if usuario_existente is None:
        nuevo_user = Item(name= name, TypeAct= act)
        db.session.add(nuevo_user)        
        
with app.app_context():
    db.create_all()
    agregar_producto("Formación de recurso humano en investigación", 1)
    agregar_producto("Producción de nuevo conocimiento", 1)
    agregar_producto("Desarrollo tecnológico e innovación", 1)
    agregar_producto("Apropiación social del conocimiento", 1)
    agregar_producto("Elaboración de informes y avances de proyectos", 1)
    db.session.commit()


class ItemSchema(ma.Schema):
    class Meta:
        fields = ('id','nombre','TipodeAct', 'one_select')