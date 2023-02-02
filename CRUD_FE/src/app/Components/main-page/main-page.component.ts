import { Component } from '@angular/core';
import * as JsBarcode from 'jsbarcode';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent {
  ngOnInit() {
    let data: string = '123456';
    JsBarcode('#barcode', data, {
      format: 'msi',
      height: 35,
      width: 1.5,
      text: '- ' + data + ' -',
      background: 'transparent',
      font: 'monospace',
      fontOptions: 'bold',
      fontSize: 16,
      lineColor: 'black',
      margin: 2,
      textMargin: 2,
    });
  }
  addProduct() {
    document.forms[0].reset();
    Swal.fire('Added!', 'Your Product has been added successfully.', 'success');
  }
  editProduct() {
    console.log('clicked');
  }
  deleteProduct() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your Product has been deleted successfully.',
          'success'
        );
        console.log(this);
      }
    });
  }
}
