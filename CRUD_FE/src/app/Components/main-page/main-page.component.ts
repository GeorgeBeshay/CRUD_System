import { Component } from '@angular/core';
import * as JsBarcode from 'jsbarcode';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { ServerCallerService } from 'src/app/Services/server-caller.service';
import { Product } from 'src/app/Interfaces/product';
import { ProductsGeneratorService } from 'src/app/Services/products-generator.service';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent {
  private serverCaller: ServerCallerService;
  private productsGenerator: ProductsGeneratorService;
  constructor(private http: HttpClient) {
    this.serverCaller = new ServerCallerService(this.http);
    this.productsGenerator = new ProductsGeneratorService();
    // use this.serverCaller.'requestName'
  }
  currentYear: any = new Date().getFullYear();
  ngOnInit() {
    this.runApplication();
    // let data: string = '512384';
    // JsBarcode('#barcode', data, {
    //   format: 'msi',
    //   height: 35,
    //   width: 1.5,
    //   text: '- ' + data + ' -',
    //   background: 'transparent',
    //   lineColor: '#fff',
    //   font: 'monospace',
    //   fontOptions: 'bold',
    //   fontSize: 16,
    //   margin: 2,
    //   textMargin: 2,
    // });
  }

  async runApplication() {
    this.productsGenerator.generateProdcuts(await this.serverCaller.load());
  }

  placeHolderFocus(id: any) {
    document.getElementById(id)?.classList.add('active');
    document.getElementById(id)?.nextElementSibling?.classList.add('active');
  }

  placeHolderBlur(id: any) {
    let input = document.getElementById(id)
      ?.nextElementSibling as HTMLInputElement;
    if (input.value === '') {
      document.getElementById(id)?.classList.remove('active');
      input.classList.remove('active');
    }
  }

  addProduct() {
    document.forms[0].reset();
    Swal.fire('Added!', 'Your Product has been added successfully.', 'success');
  }

  searchProduct() {
    console.log('search product clicked');
  }

  emptyDb() {
    Swal.fire({
      title: 'Are you sure you want to delete all products?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'All Products have been deleted successfully.',
          'success'
        );
      }
    });
  }

  editProduct() {
    console.log('edit product clicked');
  }

  deleteProduct() {
    Swal.fire({
      title: 'Are you sure you want to delete this product?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your Product has been deleted successfully.',
          'success'
        );
      }
    });
  }
}
