import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from "@angular/router"
import { map } from 'rxjs/operators';

import { ListsService } from 'src/core/_service/lists.service';
import { List } from '../../core/interface/list';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
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
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listsService.getAllLists()
    .pipe(
      map(lists => this.sortList(lists, this.sortDirection)
      )
    )
    .subscribe(
      (res) => {
         this.lists = res;
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
