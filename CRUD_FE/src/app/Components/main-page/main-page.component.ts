import { Component } from '@angular/core';
import * as JsBarcode from 'jsbarcode';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { ServerCallerService } from 'src/app/Services/server-caller.service';
import { Product } from 'src/app/Interfaces/product';
import { ProductsGeneratorService } from 'src/app/Services/products-generator.service';
import { UtilitiesService } from 'src/app/Services/utilities.service';
import { ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class MainPageComponent {
  private serverCaller: ServerCallerService;
  private productsGenerator: ProductsGeneratorService;
  protected utilities: UtilitiesService;
  private currentProductId = '000000';
  constructor(private http: HttpClient) {
    this.serverCaller = new ServerCallerService(this.http);
    this.productsGenerator = new ProductsGeneratorService(this);
    this.utilities = new UtilitiesService(this.serverCaller, this);
    // use this.serverCaller.'requestName'
  }
  currentYear: any = new Date().getFullYear();
  async ngOnInit() {
    this.utilities.filterNumberInput();
    let forms = document.forms;
    for (let i = 0; i < forms.length; i++) {
      forms[i].addEventListener('submit', (e) => e.preventDefault());
    }
    await this.runApplication();
  }

  async runApplication() {
    this.productsGenerator.generateProdcuts(await this.serverCaller.load());
  }

  async createProduct() {
    await this.utilities.addProduct();
    await this.runApplication();
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

  async deleteProduct(product: Product) {
    if (await this.utilities.confirmDeletion()) {
      await this.serverCaller.delete(product);
      await this.runApplication();
    }
  }

  async updateProduct() {
    let tempProduct = this.utilities.readProduct(this.currentProductId);
    if (this.utilities.validateProduct(tempProduct)) {
      let addBtn = document.getElementById('add-btn') as HTMLButtonElement;
      addBtn.style.display = 'inline-block';
      let updateBtn = document.getElementById(
        'update-btn'
      ) as HTMLButtonElement;
      updateBtn.style.display = 'none';
      await this.serverCaller.update(tempProduct);
      await this.runApplication();
      document.forms[0].reset();
      Swal.fire(
        'Updated!',
        'Your Product has been updated successfully.',
        'success'
      );
      window.scrollTo({
        top: 99999999,
        left: 0,
        behavior: 'smooth',
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Whoops...',
        text: 'Something went wrong!',
        timer: 5000,
      });
    }
  }

  async emptyDB() {
    if (await this.utilities.emptyDb()) {
      await this.serverCaller.emptyDB();
      await this.runApplication();
    }
  }

  async editProduct(product: Product) {
    this.currentProductId = product._id;
    this.utilities.supportEditProduct(product);
  }

  async searchProduct() {
    let searchingData = this.utilities.getSearchingData();
    this.productsGenerator.generateProdcuts(
      await this.serverCaller.search(searchingData[0], searchingData[1])
    );
  }
}
