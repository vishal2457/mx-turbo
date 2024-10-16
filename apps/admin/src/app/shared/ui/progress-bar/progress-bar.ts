import { Component, ViewChild } from '@angular/core';
import { NgProgressbar } from 'ngx-progressbar';
import { config } from './types';

@Component({
  selector: 'mx-progressbar',
  template: `
    <ng-progress
      ngProgressRouter
      [spinner]="progressConfig.spinner"
      [spinnerPosition]="progressConfig.spinnerPosition"
      [direction]="progressConfig.direction"
      [speed]="progressConfig.speed"
    />
  `,
  standalone: true,
  imports: [NgProgressbar],
})
export class MxProgressbarComponent {
  progressConfig: any = {
    color: 'blue',
    spinner: true,
    spinnerPosition: 'right',
    direction: 'ltr+',
    speed: 300,
    thick: true,
  };



  configureProgress(config: config) {
    this.progressConfig = config;
  }
}
