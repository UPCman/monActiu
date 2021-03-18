import { Component } from '@angular/core';

import { CONTACT_PHONE, CONTACT_ADDRESS, CONTACT_EMAIL, FULL_CONTACT_PHONE } from '../../constants/global';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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

  // Google maps configuration
  public center = { lat: 24, lng: 12 };
  public zoom: number = 15;

  constructor (private _http: HttpClient, private _formBuilder: FormBuilder) {

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
    //window.document.location.href = 'https://api.whatsapp.com/send?phone=' + CONTACT_PHONE;
    window.open ('https://web.whatsapp.com/send?phone=' + FULL_CONTACT_PHONE, '_blank');
  }

  public sendEmail () {
    console.log ("[ContactComponent][sendEmail]", this.contactForm);
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
}
