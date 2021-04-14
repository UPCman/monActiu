import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CONTACT_EMAIL } from '../../../constants/global';

@Component({
  selector: 'email-error-dialog',
  templateUrl: './email_error_dialog.tpl.html',
  styleUrls: ['./email_error_dialog.component.scss']
})
export class EmailErrorDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {name: string}, public dialogRef: MatDialogRef<EmailErrorDialog>) { }

  public email: string = CONTACT_EMAIL;

  public closeDialog() {
    this.dialogRef.close();
  }
}
