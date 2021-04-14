import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'email-send-dialog',
  templateUrl: './email_send_dialog.tpl.html',
  styleUrls: ['./email_send_dialog.component.scss']
})
export class EmailSendDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {name: string}, public dialogRef: MatDialogRef<EmailSendDialog>) { }

  public closeDialog() {
    this.dialogRef.close();
  }
}
