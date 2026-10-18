import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
})
export class MenuComponent implements OnInit {

  activeElement: string;
  addItemUrl: string;

  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

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
          this.addItemUrl = '/nowa-lista';
        } else if (event.url === '/kategorie') {
          this.activeElement = 'category'
          this.addItemUrl = '/nowa-kategoria';
        } else if (event.url === '/produkty') {
          this.activeElement = 'products'
          this.addItemUrl = '/nowy-produkt';
        } else {
          this.addItemUrl = '';
        }
        this.cdr.markForCheck();
      }
    })
  }

}
