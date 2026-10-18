import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ListsService } from 'src/core/_service/lists.service';
import { Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-add-list',
    templateUrl: './add-list.component.html',
    styleUrls: ['./add-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
})
export class AddListComponent implements OnInit {
  error = false;
  message = '';
  alert = false;

  addList = new UntypedFormGroup({
    name: new UntypedFormControl(this.getDefaultName(), [Validators.required]),
  });

  constructor(
    private listsService: ListsService,
    private router: Router,
    private datePipe: DatePipe,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  private getDefaultName(): string {
    return this.datePipe.transform(new Date(), 'dd.MM.yyyy HH:mm:ss') ?? '';
  }

  onSubmit() {
    this.listsService.saveList(this.addList.value).subscribe(
      (res) => {
        this.error = false;
        this.message = 'Zapisane!';
        this.alert = true;
        this.cdr.markForCheck();
        setTimeout(() => {
          this.alert = false;
          this.cdr.markForCheck();
        }, 3000);
        this.router.navigate(['/listy']);
      },
      (error) => {
        this.error = true;
        if (error.error === 'list_exist')
          this.message = 'Lista z taką nazwą już istnieje';

        this.alert = true;
        this.cdr.markForCheck();
        setTimeout(() => {
          this.alert = false;
          this.cdr.markForCheck();
        }, 3000);
      }
    );
  }
}
