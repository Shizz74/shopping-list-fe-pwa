import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ListsService } from 'src/core/_service/lists.service';
import {Router} from "@angular/router"

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.scss']
})
export class AddListComponent implements OnInit {

  error = false;
  message = '';
  alert = false;

  addList = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  constructor(
    private listsService: ListsService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.listsService.saveList(this.addList.value)
    .subscribe(
      res => {
        this.error = false;
        this.message = "Zapisane!"
        this.alert = true;
        setTimeout(() => {
          this.alert = false;
        },3000)
        this.router.navigate(['/listy'])
      },
      error => {
        this.error = true;
        if (error.error === 'list_exist') this.message = 'Lista z taką nazwą już istnieje'
      

        this.alert = true;
        setTimeout(() => {
          this.alert = false;
        },
          3000)
      }
    )
  }

}
