import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'under-construction-dialog',
  template: '<p style="font-size:300%;">{{ "under_construction_dialog.message" | translate}}</p>',
})
export class UnderConstructionDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {name: string}) { }
}
