import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { ProductService } from 'src/core/_service/product.service';
import { Product } from '../../core/interface/product'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  displayedColumns: string[] = ['name', 'edit', 'delete'];
  dataSource: Product[] | any;
  faEdit = faEdit;
  faTrash = faTrash
  closeResult = '';
  idToRemove= '';

  constructor(
    private productService: ProductService,
    private modalService: NgbModal
  ) { }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(
      (res: any) => {
         this.dataSource = new MatTableDataSource(res);
      }
    )
  }


  delete() {
    this.productService.deleteProduct(this.idToRemove).subscribe(
      res => {
        this.productService.getAllProducts().subscribe(res => {
          this.dataSource = res;
          this.closeResult = `Dismissed ${this.getDismissReason('Usunięcie produktu')}`;
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
