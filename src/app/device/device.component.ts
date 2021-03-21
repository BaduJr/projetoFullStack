import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalDeviceComponent } from '../modal-device/modal-device.component';
import { DeviceService } from '../services/device.service';

export interface deviceElement {
  id: number;
  category: string;
  color: string;
  partNumber: number;
}

const ELEMENT_DATA: deviceElement[] = [
  {id: 1, category: 'Device 1', color: 'white', partNumber: 100},
  {id: 1, category: 'Device 1', color: 'white', partNumber: 100},
  {id: 1, category: 'Device 1', color: 'white', partNumber: 100},
  {id: 1, category: 'Device 1', color: 'white', partNumber: 100},
  {id: 1, category: 'Device 1', color: 'white', partNumber: 100}
];

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

  constructor(public dialog: MatDialog, private deviceService: DeviceService) { }

  displayedColumns: string[] = ['ID', 'Category', 'Color', 'partNumber', 'Actions'];
  dataSource = [];

  ngOnInit(): void {
    this.listDevices();
  }

  listDevices(): void{
    this.deviceService.listAll().subscribe((data: any[])=>{
			this.dataSource = data;
		})
  }

  delete(id): void{
    this.deviceService.delete(id).subscribe(
      res => {
        this.listDevices();
      }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalDeviceComponent, {
      width: '250px'
    });
  }
}