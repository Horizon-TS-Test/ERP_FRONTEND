import { Component, OnInit, Input } from '@angular/core';
import { Title } from 'src/app/interfaces/title.interface';

@Component({
  selector: 'horizon-title',
  templateUrl: './horizon-title.component.html',
  styleUrls: ['./horizon-title.component.scss']
})
export class HorizonTitleComponent implements OnInit {
  @Input() title: Title;

  constructor() { }

  ngOnInit() {
  }

}
