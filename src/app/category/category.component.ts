import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { CategoryService } from 'src/core/_service/category.service';
import { Category } from 'src/core/interface/category';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  displayedColumns: string[] = ['name', 'edit', 'delete'];
  dataSource: Category[] | any;
  faEdit = faEdit;
  faTrash = faTrash
  closeResult = '';
  

  constructor(
    private catService : CategoryService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.catService.getAllCategories().subscribe(res => {
      this.dataSource = res;
    })
  }

  delete(_id: string) {
    // this.catService.deleteCategory(_id).subscribe(
    //   res => {
    //     this.catService.getAllCategories().subscribe(res => {
    //       this.dataSource = res;
    //     })
    //   },
    //   error => {
    //   console.log("bład");
    //   }
    // )
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
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
