import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
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

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.updateActiveMenu(this.router.url);

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateActiveMenu(event.urlAfterRedirects);
      }
    });
  }

  setActive(active: string) {
    this.activeElement = active;
  }

  private updateActiveMenu(url: string): void {
    const path = url.split(/[?#]/, 1)[0];

    if (path === '/listy') {
      this.activeElement = 'list';
      this.addItemUrl = '/nowa-lista';
    } else if (path === '/kategorie') {
      this.activeElement = 'category';
      this.addItemUrl = '/nowa-kategoria';
    } else if (path === '/produkty') {
      this.activeElement = 'products';
      this.addItemUrl = '/nowy-produkt';
    } else {
      this.addItemUrl = '';
    }

    this.cdr.markForCheck();
  }
}
