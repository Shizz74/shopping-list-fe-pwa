import { Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table-header',
  templateUrl: './table-header.component.html',
  imports: [FormsModule],
})
export class TableHeaderComponent {
  searchTerm = model('');
  showSearch = input(true);
}
