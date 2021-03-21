import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalCategoryComponent } from '../modal-category/modal-category.component';
import { CategoryService } from '../services/category.service';

export interface categoryElement {
  id: number;
  name: string;
}

const ELEMENT_DATA: categoryElement[] = [
  {id: 1, name: 'Category 1' },
  {id: 1, name: 'Category 1' },
  {id: 1, name: 'Category 1' },
  {id: 1, name: 'Category 1' },
  {id: 1, name: 'Category 1' }
];

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(public dialog: MatDialog, private categoryService: CategoryService) { }

  displayedColumns: string[] = ['ID', 'Name', 'Actions'];
  dataSource = [];

  ngOnInit(): void {
    this.listCategorys();
  }

  listCategorys(): void{
    this.categoryService.listAll().subscribe((data: any[])=>{
			this.dataSource = data;
		})
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalCategoryComponent, {
      width: '250px'
    });
  }

  delete(id): void{
    this.categoryService.delete(id).subscribe(
      res => {
        this.listCategorys();
      }
    );
  }
}