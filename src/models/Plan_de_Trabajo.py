from config.db import app, db, ma


class Plan_de_Trabajo(db.Model):
    __tablename__= "Plan_de_Trabajo"
    
    Id = db.Column(db.Integer, primary_key = True)
    semestre = db.Column(db.String(100))
    horas_totales = db.Column(db.Integer)
    año = db.Column(db.Integer)
    
    def __init__(self, semester, Total_hours, year):
        self.semestre = semester
        self.horas_totales = Total_hours
        self.año = year
        
        
with app.app_context():
    db.create_all()
    db.session.commit()

class PlanTrabajoSchema(ma.Schema):
    class Meta:
        fields = ('Id','semestre', 'horas_totales','año')