import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  activeElement: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.setUpActiveMenu();
  }

  setActive(active: string) {
    this.activeElement = active; 
  }

  setUpActiveMenu() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if(event.url === '/listy') {
          this.activeElement = 'list'
        } else if (event.url === '/kategorie') {
          this.activeElement = 'category'
        } else if (event.url === '/produkty') {
          this.activeElement = 'products'
        }
      }
    })
  }

}
