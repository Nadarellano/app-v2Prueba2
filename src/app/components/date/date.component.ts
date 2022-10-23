import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
})
export class DateComponent implements OnInit {
  @Input() titulo:string;

  fechaHoy = new Date().toLocaleDateString();

  constructor() { }

  ngOnInit() {}

}
