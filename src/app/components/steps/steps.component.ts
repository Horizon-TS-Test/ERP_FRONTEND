import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent implements OnInit {
  @Input() stepsNumber: number;
  @Input() currentStep: number;
  @Input() title: string;

  constructor() { }

  ngOnInit() {
  }

  /**
   * METODO PARA CREAR UN ARRAY TEMPORAL PARA PODER ITERAR SOBRE EL:
   * REF: https://lishman.io/using-ngfor-to-repeat-n-times-in-angular
   */
  public arrayOne(n: number): any[] {
    return Array(n);
  }

}
