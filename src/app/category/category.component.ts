import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { CategoryService } from 'src/core/_service/category.service';
import { Category } from 'src/core/interface/category';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
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
  idToRemove= '';
  

  constructor(
    private catService : CategoryService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.catService.getAllCategories().subscribe(res => {
      this.dataSource = res;
    })
  }

  delete() {
    this.catService.deleteCategory(this.idToRemove).subscribe(
      res => {
        this.catService.getAllCategories().subscribe(res => {
          this.dataSource = res;
          this.closeResult = `Dismissed ${this.getDismissReason('Usunięcie kategorii')}`;
        })
      },
      error => {
      console.log("bład");
      }
    )
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
