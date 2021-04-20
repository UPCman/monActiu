import { Component } from '@angular/core';

import { CONTACT_PHONE, CONTACT_ADDRESS, CONTACT_EMAIL, FULL_CONTACT_PHONE } from '../../constants/global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EmailSendDialog } from '../dialogs/email_send_dialog/email_send_dialog.component';
import { EmailErrorDialog } from '../dialogs/email_error/email_error_dialog.component';

@Component({
  selector: 'contact',
  templateUrl: './contact.tpl.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  // To use constants on template
  public CONTACT_PHONE: string = CONTACT_PHONE;
  public CONTACT_EMAIL: string = CONTACT_EMAIL;
  public CONTACT_ADDRESS: string = CONTACT_ADDRESS;

  // contactForm: contact form
  public contactForm: FormGroup;

  // isSentInProcess: To disable send button when sent is in process
  public isSentInProcess: boolean = false;

  // Google maps configuration
  public center = { lat: 24, lng: 12 };
  public zoom: number = 15;

  constructor (private _http: HttpClient, private _formBuilder: FormBuilder, private _dialog: MatDialog) {

    this.contactForm = this._formBuilder.group ({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.compose ([
        Validators.required,
        this.whiteSpacesOnly,
        this.isEmailValid
      ])],
      message: ['', Validators.required],
    });
  }

  public openWhatsapp () {
    if (this.isMobile()) {
      window.document.location.href = 'https://api.whatsapp.com/send?phone=' + FULL_CONTACT_PHONE;
    } else {
      window.open ('https://web.whatsapp.com/send?phone=' + FULL_CONTACT_PHONE, '_blank');
    }
  }

  public sendEmail () {
    this.isSentInProcess = true;
    console.log ("[ContactComponent][sendEmail]", this.contactForm);
    let url: string = "https://monactiufisioterapia.com/api/contact/";
    let headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    let body: string = JSON.stringify ({
      name: this.contactForm.value.name,
      phone: this.contactForm.value.phone,
      email: this.contactForm.value.email,
      message: this.contactForm.value.message
    });
    console.log ("[ContactComponent][sendEmail] BODY", body);
    this._http.post (url, body, { headers: headers }).subscribe (
      response => {
        this.isSentInProcess = false;
        console.log ("[ContactComponent][sendEmail] Server response:", response);
        this.openEmailSentDialog();
        this.contactForm.reset();
      },
      error => {
        this.isSentInProcess = false;
        console.error ("[ContactComponent][sendEmail] Failed to send email:", error);
        this.openErrorDialog();
      }
    );
  }

  public openEmailSentDialog () {
    this._dialog.open (EmailSendDialog, {
      panelClass: 'theme-dialog',
    });
  }

  public openErrorDialog () {
    this._dialog.open (EmailErrorDialog, {
      panelClass: 'theme-dialog',
    });
  }

  // Ensure there are no spaces in input data
  private whiteSpacesOnly (control: FormControl) : { [s: string]: boolean } {
    if (/^\s+$/.test (control.value)) {
      return { whiteSpacesOnly: true };
    }
  }

  // Ensure email format is valid
  private isEmailValid (control: FormControl) : { [s: string]: boolean } {
    if (!/^(([\s]*[^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}[\s]*))$/.test (control.value)) {
      return { invalidEmail: true };
    }
  }

  private isMobile() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test (navigator.userAgent)) {
      return true;
    }
    else {
      return false;
    }
  }
}
