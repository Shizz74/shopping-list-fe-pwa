import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  activeElement: string = 'list';


  constructor(private elRef: ElementRef) { }

  ngOnInit(): void {
  }

  setActive(active: string) {
    this.activeElement = active; 
  }


}
