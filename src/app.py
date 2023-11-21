from flask import Flask, render_template, request, redirect, url_for, session 
from config.db import app, db

from api.Area import ruta_area
from api.Asignatura import ruta_asig
from api.Grupo import ruta_grupos
from api.Rol import ruta_rol
from api.Jornada import ruta_jornada
from api.Usuario import ruta_user
from api.Asig_Usu import ruta_Asig_Usu
from api.Tipo_de_Actividad import ruta_TipoA
from api.Item import ruta_item
from api.Plan_de_Trabajo import ruta_plant
from api.PlanT_Item import ruta_plant_item

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

@app.route("/")
def index():
    if "user" in session:
        return render_template('homepage.html')
    else:
        return redirect(url_for("log_in"))    
    
@app.route('/login')
def log_in():
    return render_template('login.html')
    
@app.route('/sign_up')
def register():
    if "user" in session:
        if "roles" in session and "jornadas" in session:
            return render_template('register.html', rols= session['roles'], jornads= session['jornadas'])
        else:
            return redirect(url_for("ruta_rol.roles"))
    else:
        return redirect(url_for("log_in"))

@app.route('/info_docentes/<int:id>')
def info(id):
    if "user" in session:
        if "roles" in session and "jornadas" in session:
            return render_template('view_docentes.html', id_doc= id, docentes= session['usuarios'], rols= session['roles'], jornads= session['jornadas'])
    else:
        return redirect(url_for("log_in"))  
    
@app.route('/docentes')
def docentes():
    
    if "user" in session:
        if "usuarios" in session:
            return render_template('docentes.html', docentes= session['usuarios'])
        else:
            return redirect(url_for("ruta_user.users"))
    else:
        return redirect(url_for("log_in"))   
    
@app.route('/actividades')
def activity(): 
    if "user" in session:
        return render_template('registrarActividad.html')
    else:
        return redirect(url_for("log_in"))
    
@app.route('/asignaturas')
def asignaturas():
    if "user" in session:
        if "areas" in session:
            return render_template('asignaturas.html', areas = session['areas'])
        else:
            return redirect(url_for("ruta_area.areas"))
    else:
        return redirect(url_for("log_in"))
    
@app.route('/choose')
def choose():
    if "user" in session:
        return render_template('choose.html')
    else:
        return redirect(url_for("log_in"))
    
@app.route('/asignacion/<int:id>')
def asignacion(id):
    if "user" in session:
        if "asignaturas" in session and "grupos" in session:
            return render_template('asignarAsignatura.html', subjects = session['asignaturas'], groups = session['grupos'], id_doc= id, docentes= session['usuarios'])
        else:
            return redirect(url_for("ruta_asig.asignaturas", id= id))
    else:
        return redirect(url_for("log_in"))

@app.route('/PlanDeTrabajo/<int:id>')
def plan(id):
    if "user" in session:
        if "actividades" in session and "items" in session:
            return render_template('plandeTrabajo.html', actividades= session['actividades'], items= session['items'], id_doc= id, docentes= session['usuarios'], exist_opc= True)
        else:
            return redirect(url_for("ruta_Tipo_de_Actividad.tipo_de_actividades", id= id))
    else:
        return redirect(url_for("log_in"))


@app.route("/historial")
def history():
    if "user" in session:
        return render_template('historial.html')
    else:
        return redirect(url_for("log_in"))
    
@app.route("/revision/<int:id>")
def revisar(id):
    if "user" in session:
        return render_template('revisar.html', rol= session["rol"], id_doc= id)
    else:
        return redirect(url_for("log_in"))
    
@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("log_in")) 

@app.errorhandler(404)
def not_found_error(error):
    return render_template('404.html'),404  

if __name__ == '__main__': 
    app.run(debug=True, port=5000)
