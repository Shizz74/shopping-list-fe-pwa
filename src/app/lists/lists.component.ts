import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {Router} from "@angular/router"

import { ListsService } from 'src/core/_service/lists.service';
import { List } from '../../core/interface/list'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'delete'];
  lists: List[] | any;
  faEdit = faEdit;
  faTrash = faTrash
  closeResult = '';
  idToRemove= '';

  constructor(
    private listsService: ListsService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listsService.getAllLists().subscribe(
      (res) => {
         this.lists = res;
         console.log(this.lists);
      }
    )
  }

  goToListView(_id: string) {
    this.router.navigate(['/lista-edycja', _id])
  }

  delete() {
    // this.listsService.deleteList(this.idToRemove).subscribe(
    //   res => {
    //     this.listsService.getAllLists().subscribe(res => {
    //       this.dataSource = res;
    //       this.closeResult = `Dismissed ${this.getDismissReason('Usunięcie produktu')}`;
    //     })
    //   },
    //   error => {
    //   console.log("bład");
    //   }
    // )
  }

  open(content: any, _id: string) {
    this.idToRemove = _id;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true}).result.then((result) => {
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
