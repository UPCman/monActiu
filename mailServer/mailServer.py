from flask import Flask, request
from flask_mail import Mail, Message
from datetime import date
import os

app = Flask(__name__)

print("EMAIL_USER: {}, EMAIL_PASSWORD: {}".format(os.environ['EMAIL_USER'], os.environ['EMAIL_PASSWORD']))
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

nom = "Jordi"
phone = "6215478154"
email = "test@fake.es"
message = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
today = date.today()
date = today.strftime("%d/%m/%Y")

if __name__ == '__main__':
    with app.app_context():
        msg = Message('[MonActiu] ' + nom + ' - ' + date,
                      sender=app.config.get("MAIL_USERNAME"),
                      recipients=["hamelegarnett@gmail.com"])
        msg.html = "<p><b>MON ACTIU - CORREO DE CONTACTO:</b></p><br>" \
                   "<p><b>Nombre: </b>" + nom + "</p>" \
                   "<p><b>Telefono: </b>" + phone + "</p>" \
                   "<p><b>Correo electrónico: </b>" + email + "</p>" \
                   "<p><b>Mensaje: </b>" + message + "</p><br>" \
                   "<p><b>*Correo generado automáticamente, no contestar a este correo. Para cualquier duda, escribir directamente a monactiufisioterapia@hotmail.com</b></p>"
        mail.send(msg)
