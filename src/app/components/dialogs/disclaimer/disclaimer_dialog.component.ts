import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'disclaimer-dialog',
  templateUrl: './disclaimer_dialog.tpl.html',
  styleUrls: ['./disclaimer_dialog.component.scss']
})
export class DisclaimerDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {name: string}, public dialogRef: MatDialogRef<DisclaimerDialog>) { }

  public closeDialog() {
    this.dialogRef.close();
  }
}
