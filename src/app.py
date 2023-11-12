from flask import Flask, render_template, request, redirect, url_for #para importar la clase
from config.db import app, db

<<<<<<< HEAD
from API.Asignatura import ruta_asig
=======
from api.Area import ruta_area
from api.Asignatura import ruta_asig
>>>>>>> 73a6ff0bc2e1634a26b59da3eb5d4b62dd95e8d3


app.register_blueprint(ruta_asig, url_prefix="/api")
app.register_blueprint(ruta_area, url_prefix="/api")

@app.route('/')
def index():
    return render_template('homepage.html')
    
@app.route('/login')
def log_in():
    return render_template('login.html')
    
@app.route('/sign_up')
def register():
    return render_template('register.html')

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

if __name__ == '__main__': 
    app.run(debug=True, port=5000)#el debug es para que cuando se haga un cambio no toque dejar de correr y volver a correr el programa para poder ver el cambio
