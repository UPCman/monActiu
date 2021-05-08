import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'video-dialog',
  templateUrl: './video_dialog.tpl.html',
  styleUrls: ['./video_dialog.component.scss']
})
export class VideoDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {name: string}, public dialogRef: MatDialogRef<VideoDialog>) { }

  public closeDialog() {
    this.dialogRef.close();
  }
}
