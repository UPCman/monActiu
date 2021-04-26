import { Component } from '@angular/core';

export enum Treatments {
  manualTherapy,
  dryNeedling,
  lymphaticDrainage,
  electroTherapy,
  poseReeducation,
  fisioSport,
  exerciseTherapy,
  percussionTherapy,
  termoTherapy
}

@Component({
  selector: 'treatments',
  templateUrl: './treatments.tpl.html',
  styleUrls: ['./treatments.component.scss']
})
export class TreatmentsComponent {

  // To use enum on template
  public Treatmens = Treatments;

  // selectedTreatment: Active treatment
  public selectedTreatment: Treatments = Treatments.manualTherapy;
}
