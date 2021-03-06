import { Component, OnInit } from '@angular/core';
import { Alert } from './../../models/alert';
import { ALERT_TYPES } from './../../config/alert-types';

declare var $: any;

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  public _ref: any;
  public _id: number;
  public alertData: Alert;
  private self: any;
  public alertTypes: any;

  constructor() {
    this.alertTypes = ALERT_TYPES;
  }

  ngOnInit() {
    this.self = $(".personal-alert").last();
    this.self.attr("id", this._id);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.showHideAlert();
    }, 250);

    setTimeout(() => {
      this.addIconAnimation();
    }, 500);

    setTimeout(() => {
      this.showHideAlert(false);
    }, 4500);
  }

  removeObject() {
    this._ref.destroy();
  }

  showHideAlert(show: boolean = true) {
    if (show) {
      this.self.parent().addClass("active");
      this.self.addClass("on");
    }
    else {
      this.self.removeClass("on");
      this.self.parent().removeClass("active");

      setTimeout(() => {
        this.removeObject();
      }, 500);
    }
  }

  addIconAnimation() {
    this.self.find(".alert-icon fa").addClass("animate");
  }

}