from flask import Flask, request, jsonify
from flask_mail import Mail, Message
from datetime import date
import os

app = Flask(__name__)

mail_settings = {
    "MAIL_SERVER": 'smtp.gmail.com',
    "MAIL_PORT": 465,
    "MAIL_USE_TLS": False,
    "MAIL_USE_SSL": True,
    "MAIL_USERNAME": os.environ['EMAIL_USER'],
    "MAIL_PASSWORD": os.environ['EMAIL_PASSWORD']
}

app.config.update(mail_settings)
mail = Mail(app)


@app.route('/contact/', methods=['POST'])
def contact():
    with app.app_context():
        if request.method == 'POST':
            request_data = request.get_json()
            name = request_data.get('name')
            phone = request_data.get('phone')
            email = request_data.get('email')
            message = request_data.get('message')
            today = date.today()
            datestr = today.strftime("%d/%m/%Y")
            msg = Message('[MonActiu] ' + name + ' - ' + datestr,
                          sender=app.config.get("MAIL_USERNAME"),
                          recipients=["hamelegarnett@gmail.com"])
            msg.html = "<p><b>MON ACTIU - CORREO DE CONTACTO:</b></p><br>" \
                       "<p><b>Nombre: </b>" + name + "</p>" \
                       "<p><b>Telefono: </b>" + phone + "</p>" \
                       "<p><b>Correo electrónico: </b>" + email + "</p>" \
                       "<p><b>Mensaje: </b>" + message + "</p><br>" \
                       "<p><b>*Correo generado automáticamente, no contestar a este correo. Para cualquier duda, escribir directamente a monactiufisioterapia@hotmail.com</b></p>"
            mail.send(msg)
            return jsonify(isError=False,
                           message="Success",
                           statusCode=200), 200
