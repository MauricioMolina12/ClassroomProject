from flask import Flask, render_template, request, redirect, url_for, session, make_response
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
        if "plan_trabajo" in session:
            exist_plan = 0
            for plant in session['plan_trabajo'] :
                if session['id_user'] == plant["docente"] :
                    exist_plan = plant["id"]                       
            return render_template('homepage.html', id_doc= session['id_user'], rol= session['rol'], exis_pt= exist_plan)
        else:
            return redirect(url_for("ruta_plant.Plan_de_Trabajos", id= 0))        
    else:
        return redirect(url_for("log_in"))    
    
@app.route('/login')
def log_in():
    return render_template('login.html')
    
@app.route('/sign_up')
def register():
    if "user" in session:
        if "roles" in session and "jornadas" in session:
            return render_template('register.html', rols= session['roles'], jornads= session['jornadas'], rol= session['rol'])
        else:
            return redirect(url_for("ruta_rol.roles"))
    else:
        return redirect(url_for("log_in"))

@app.route('/info_docentes/<int:id>')
def info(id):
    if "user" in session:
        if session['rol'] == "Administrador" or session['id_user'] == id:
            if 'asig_usu' in session and 'asignaturas' in session:
                asignaturas_docente = []
                for asig_doc in session['asig_usu']:
                    if id == asig_doc['codigousu']:
                        for asig in session['asignaturas']:
                            if asig_doc['codigoasig'] == asig['codigo']:
                                asignaturas_docente.append({
                                    'cod_asigusu':asig_doc['id'],
                                    'name': asig['nombre'],
                                    'codigo': asig['codigo'],
                                    'grupo': asig_doc['grupo'],
                                    'semestre': asig_doc['semestre'],
                                    'horas': asig['horas'],
                                    'ano': asig_doc['ano'],
                                    'periodo': asig_doc['periodo']
                                })
                return render_template('view_docentes.html', id_doc= id, docentes= session['usuarios'], rols= session['roles'], jornads= session['jornadas'], rol= session['rol'], asignaturas_docente=asignaturas_docente)
            else:
                return redirect(url_for("ruta_Asig_Usu.Asig_usu", id= id, tipo= "info"))
        return redirect(url_for("index"))
    else:
        return redirect(url_for("log_in"))  
    
@app.route('/docentes')
def docentes():
    
    if "user" in session:
        if session['rol'] == "Administrador":
            if "usuarios" in session:
                return render_template('docentes.html', docentes= session['usuarios'], rol= session['rol'], id_doc= session['id_user'])
            else:
                return redirect(url_for("ruta_user.users"))
        else:
            return redirect(url_for("index"))
    else:
        return redirect(url_for("log_in"))   
    
@app.route('/actividades')
def activity(): 
    if "user" in session:
        return render_template('registrarActividad.html', rol= session['rol'], id_doc= session['id_user'])
    else:
        return redirect(url_for("log_in"))
    
@app.route('/asignaturas')
def asignaturas():
    if "user" in session:
        if "areas" in session:
            return render_template('asignaturas.html', areas = session['areas'], rol= session['rol'], id_doc= session['id_user'])
        else:
            return redirect(url_for("ruta_area.areas"))
    else:
        return redirect(url_for("log_in"))
    
@app.route('/choose')
def choose():
    if "user" in session:
        return render_template('choose.html', rol= session['rol'], id_doc= session['id_user'])
    else:
        return redirect(url_for("log_in"))
    
@app.route('/asignacion/<int:id>')
def asignacion(id):
    if "user" in session:
        if "asignaturas" in session and "grupos" in session:
            return render_template('asignarAsignatura.html', subjects = session['asignaturas'], groups = session['grupos'], id_doc= id, docentes= session['usuarios'], rol= session['rol'])
        else:
            return redirect(url_for("ruta_asig.asignaturas", id= id))
    else:
        return redirect(url_for("log_in"))

@app.route('/PlanDeTrabajo/<int:id>')
def plan(id):
    if "user" in session:
        if "actividades" in session and "items" in session:
            if 'asig_usu' in session and 'asignaturas' in session: 
                horas = 0
                for asig_doc in session['asig_usu']:
                    if id == asig_doc['codigousu']:
                        for asig in session['asignaturas'] :
                            if asig_doc['codigoasig'] == asig['codigo']:
                                horas += asig['horas']
                print(horas)
                return render_template('plandeTrabajo.html', actividades= session['actividades'], items= session['items'], id_doc= id, docentes= session['usuarios'], rol= session['rol'], hor= horas, jornads= session['jornadas'])
            else:
                return redirect(url_for("ruta_Asig_Usu.Asig_usu", id= id, tipo= "plant"))
        else:
            return redirect(url_for("ruta_Tipo_de_Actividad.tipo_de_actividades", id= id, tipo= "asig_planes"))
    else:
        return redirect(url_for("log_in"))

@app.route("/historial/<int:id>")
def history(id):
    if "user" in session:
        return render_template('historial.html', id_doc= id, plantr= session['plan_trabajo'], docentes= session['usuarios'], rol= session['rol'])
    else:
        return redirect(url_for("log_in"))

@app.route("/revision/<int:id_plant>")
def revisar(id_plant):
    if "user" in session:
        if "items" in session and "plant_item" in session and "actividades" in session: 
            planes_docente = {}
            for plan in session['plan_trabajo']:#ver ssi se puede eliminar
                if plan['id'] == id_plant:#ver ssi se puede eliminar
                    for ite in session['items']:
                        for plan_it in session['plant_item']:
                            if plan_it['id_item'] == ite['id'] and plan_it['id_plant'] == id_plant:
                                for act in session['actividades']:
                                    if ite['TipodeAct'] == act['id']:

                                        dictionary = {'id_ite' : ite['id'], 
                                                    'nombre_ite' : ite['nombre'],
                                                    'horas' : plan_it['horas'],
                                                    'check' : plan_it['verificadores'],
                                                    'one_select': ite['one_select']}
                                        
                                        if act['nombre'] in planes_docente:
                                            planes_docente[act['nombre']].append(dictionary)
                                        else:
                                            planes_docente[act['nombre']] = [dictionary]
                    break
            return render_template('revisar.html', rol= session["rol"], id_plant= id_plant, plantr= session['plan_trabajo'], docentes= session['usuarios'], actividades= session['actividades'], plan_dic = planes_docente, id_doc= session['id_user'])
        else:
            return redirect(url_for("ruta_Tipo_de_Actividad.tipo_de_actividades", id= id_plant, tipo="revisar"))    
    else:
        return redirect(url_for("log_in"))

@app.route("/logout")
def logout():
    session.clear()

    response = make_response(render_template('login.html'))
    response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, max-age=0'

    return response

@app.errorhandler(404)
def not_found_error(error):
    return render_template('404.html'),404  

if __name__ == '__main__': 
    app.run(debug=True, port=5000)
