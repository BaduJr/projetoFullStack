import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DeviceService } from '../services/device.service';
import { CategoryService } from '../services/category.service';

interface Category{
  id: number;
  name: string;
}

@Component({
  selector: 'app-modal-device',
  templateUrl: './modal-device.component.html',
  styleUrls: ['./modal-device.component.css']
})
export class ModalDeviceComponent implements OnInit {
  category: string;
  dataSource: Category[];
  deviceForm = new FormGroup ({
    idCategory: new FormControl(),
    color: new FormControl(),
    partNumber: new FormControl()
  });

  constructor(public dialogRef: MatDialogRef<ModalDeviceComponent>,
    private deviceService: DeviceService,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder)
  { }

  ngOnInit(): void {
    this.listCategorys();
    
    this.deviceForm = this.formBuilder.group({
      idCategory: ['', Validators.required],
      color: ['', 
        [
          Validators.required,
          Validators.maxLength(16),
          Validators.pattern('^[a-zA-Z ]*$')
        ]
      ],
      partNumber: ['', 
        [
          Validators.required,
          Validators.pattern('^[0-9]*$')
        ]
      ]
    });
  }

  cancelOnClick(): void {
    this.dialogRef.close();
  }

  listCategorys(): void{
    this.categoryService.listAll().subscribe((data: any[])=>{
			this.dataSource = data;
		})
  }

  saveOnClick(): void {
    console.log(this.deviceForm.value);
    this.deviceService.save(this.deviceForm.value).subscribe(
      res => {
        console.log(res);
        this.cancelOnClick();
        location.reload()
      }
    );
  }
}