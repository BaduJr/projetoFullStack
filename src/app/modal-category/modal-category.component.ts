import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from '../services/category.service';

export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-modal-category',
  templateUrl: './modal-category.component.html',
  styleUrls: ['./modal-category.component.css']
})
export class ModalCategoryComponent implements OnInit {
  categoryForm = new FormGroup ({
    name: new FormControl()
  });

  constructor(public dialogRef: MatDialogRef<ModalCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder)
  { }

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      name: ['', 
        [
          Validators.required,
          Validators.maxLength(128)
        ]
      ]
    });
  }

  cancelOnClick(): void {
    this.dialogRef.close();
  }

  saveOnClick(): void {
    console.log(this.categoryForm.value);
    this.categoryService.save(this.categoryForm.value).subscribe(
      res => {
        console.log(res);
        this.cancelOnClick();
        location.reload()
      }
    );
  }
}