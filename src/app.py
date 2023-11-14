from flask import Flask, render_template, request, redirect, url_for, session #para importar la clase
from config.db import app, db

from api.Jornada import ruta_jornada
from api.Rol import ruta_rol
from api.Usuario import ruta_user
from api.Plan_de_Trabajo import ruta_plant
from api.Tipo_de_Actividad import ruta_TipoA
from api.Item import ruta_item
from api.PlanT_Item import ruta_plant_item
from api.Area import ruta_area
from api.Asignatura import ruta_asig
from api.Grupo import ruta_grupos
from api.Asig_Usu import ruta_Asig_Usu

app.register_blueprint(ruta_jornada, url_prefix="/api")
app.register_blueprint(ruta_rol, url_prefix="/api")
app.register_blueprint(ruta_user, url_prefix="/api")
app.register_blueprint(ruta_plant, url_prefix="/api")
app.register_blueprint(ruta_TipoA, url_prefix="/api")
app.register_blueprint(ruta_item, url_prefix="/api")
app.register_blueprint(ruta_plant_item, url_prefix="/api")
app.register_blueprint(ruta_area, url_prefix="/api")
app.register_blueprint(ruta_asig, url_prefix="/api")
app.register_blueprint(ruta_grupos, url_prefix="/api")
app.register_blueprint(ruta_Asig_Usu, url_prefix="/api")

@app.route('/')
def index():
    return render_template('homepage.html')
    
@app.route('/login')
def log_in():
    return render_template('login.html')
    
@app.route('/sign_up')
def register():

    if "roles" in session or "jornadas" in session:
        return render_template('register.html', rols= session['roles'], jornads= session['jornadas'])
    else:
        return redirect(url_for("ruta_rol.roles"))

@app.route('/info_docentes')
def info():
    return render_template('view_docentes.html')

@app.route('/docentes')
def docentes():
    return render_template('docentes.html')

@app.route('/actividades')
def activity():
    return render_template('registrarActividad.html')

@app.route('/asignaturas')
def asignaturas():
    return render_template('asignaturas.html')

@app.route('/choose')
def choose():
    return render_template('choose.html')

@app.route('/asignacion')
def asignacion():
    return render_template('asignarAsignatura.html')

@app.route('/PlanDeTrabajo')
def plan():
    return render_template('plandeTrabajo.html')

if __name__ == '__main__': 
    app.run(debug=True, port=5000)#el debug es para que cuando se haga un cambio no toque dejar de correr y volver a correr el programa para poder ver el cambio
