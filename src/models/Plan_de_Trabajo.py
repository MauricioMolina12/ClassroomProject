from config.db import app, db, ma


class Plan_de_Trabajo(db.Model):
    __tablename__= "Planes_de_Trabajos"
    
    id = db.Column(db.Integer, primary_key = True)
    semestre = db.Column(db.String(100))
    horas_totales = db.Column(db.Integer)
    año = db.Column(db.Integer)
    docente = db.Column(db.Integer, db.ForeignKey('Usuarios.id'))
    
    def __init__(self, semester, total_hours, year, teacher):
        self.semestre = semester
        self.horas_totales = total_hours
        self.año = year
        self.docente = teacher
        
        
with app.app_context():
    db.create_all()
    db.session.commit()

class PlanTrabajoSchema(ma.Schema):
    class Meta:
        fields = ('id','semestre', 'horas_totales','año', 'docente')