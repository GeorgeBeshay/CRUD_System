import { Component } from '@angular/core';
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
  public currentProductId = '000000';
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

  async deleteProduct(product: Product) {
    if (await this.utilities.confirmDeletion()) {
      await this.serverCaller.delete(product);
      await this.runApplication();
    }
  }

  async updateProduct() {
    let tempProduct = this.utilities.readProduct(this.currentProductId);
    let nameField = document.getElementById('product-name') as HTMLInputElement;
    let amountField = document.getElementById(
      'product-amount'
    ) as HTMLInputElement;
    let priceField = document.getElementById(
      'product-price'
    ) as HTMLInputElement;
    let categoryField = document.getElementById(
      'product-category'
    ) as HTMLInputElement;
    let sellerField = document.getElementById(
      'product-seller'
    ) as HTMLInputElement;
    let discountField = document.getElementById(
      'product-discount'
    ) as HTMLInputElement;
    let nameLabel = document.getElementById('nameLabel') as HTMLLabelElement;
    let amountLabel = document.getElementById(
      'amountLabel'
    ) as HTMLLabelElement;
    let priceLabel = document.getElementById('priceLabel') as HTMLLabelElement;
    let categoryLabel = document.getElementById(
      'categLabel'
    ) as HTMLLabelElement;
    let sellerLabel = document.getElementById(
      'sellerLabel'
    ) as HTMLLabelElement;
    let discountLabel = document.getElementById(
      'discountLabel'
    ) as HTMLLabelElement;

    nameLabel.classList.remove('update');
    nameField.classList.remove('update');
    nameField.blur();
    amountLabel.classList.remove('update');
    amountField.classList.remove('update');
    amountField.blur();
    priceLabel.classList.remove('update');
    priceField.classList.remove('update');
    priceField.blur();
    categoryLabel.classList.remove('update');
    categoryField.classList.remove('update');
    categoryField.blur();
    sellerLabel.classList.remove('update');
    sellerField.classList.remove('update');
    sellerField.blur();
    discountLabel.classList.remove('update');
    discountField.classList.remove('update');
    discountField.blur();

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

      Swal.fire({
        title: 'Updated!',
        text: 'Your Product has been updated successfully.',
        icon: 'success',
        didClose: () => window.scrollTo(0, 999999),
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Whoops...',
        text: 'Something went wrong!',
        timer: 5000,
      });
    }
    this.currentProductId = '000000';

    let cancelBtn = document.getElementById('cancel-btn') as HTMLButtonElement;
    cancelBtn.style.display = 'none';
    let updateBtn = document.getElementById('update-btn') as HTMLButtonElement;
    updateBtn.style.display = 'none';
    let addBtn = document.getElementById('add-btn') as HTMLButtonElement;
    addBtn.style.display = 'inline-flex';
  }

  async deleteDisplayed() {
    if (await this.utilities.deleteDisplayed()) {
      let temp = document.getElementById('productsHolder') as HTMLTableElement;
      let children = temp.children;
      console.log(children);
      for (let i = 0; i < children.length; i++) {
        let tempRow = <HTMLTableRowElement>children[i];
        console.log(tempRow.id);
        await this.serverCaller.deleteById(tempRow.id);
      }
      temp.innerHTML = ``;
      // await this.serverCaller.emptyDB();
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
