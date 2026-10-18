import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from "@angular/router"
import { map } from 'rxjs/operators';
import { NgxSpinnerService } from "ngx-spinner";
import { NgxSpinnerModule } from 'ngx-spinner';

import { ListsService } from 'src/core/_service/lists.service';
import { List } from '../../core/interface/list';

@Component({
    selector: 'app-lists',
    templateUrl: './lists.component.html',
    styleUrls: ['./lists.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, NgxSpinnerModule],
})
export class ListsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'delete'];
  lists: List[] | any;
  sortDirection = true;
  deleteModal = false;
  closeResult = '';
  listIdToRemove= '';
  listNameToDelete: string;

  constructor(
    private listsService: ListsService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.listsService.getAllLists()
    .pipe(
      map(lists => this.sortList(lists, this.sortDirection)
      )
    )
    .subscribe(
      (res) => {
         this.lists = res;
         this.spinner.hide();
         this.cdr.markForCheck();
      }
    )
  }

  goToListView(_id: string) {
    this.router.navigate(['/lista-edycja', _id])
  }

  sortList(lists, sortDirection) {
    lists.sort((a,b) => {
      if (sortDirection === true) {
        return a.name < b.name ? -1 : 1
      } else {
        return a.name < b.name ? 1 : -1
      }
    });
    this.sortDirection = !this.sortDirection;
    return lists;
  }

  deleteList() {
    this.listsService.deleteList(this.listIdToRemove).subscribe(
      res => {
        this.listsService.getAllLists().subscribe(res => {
          this.lists = res;
          this.deleteModal = !this.deleteModal;
          this.cdr.markForCheck();
        })
      },
      error => {
      console.log("bład");
      }
    )
  }

  openDeleteModal(_id: string) {
    this.listIdToRemove = _id;
    this.listNameToDelete = this.lists.find(list => list._id === _id).name;
    console.log(this.listNameToDelete);
    this.deleteModal = !this.deleteModal;
  }
}
