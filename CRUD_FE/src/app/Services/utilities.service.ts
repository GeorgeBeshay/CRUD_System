import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { MainPageComponent } from '../Components/main-page/main-page.component';
import { Product } from '../Interfaces/product';
import { ServerCallerService } from './server-caller.service';

@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {
  constructor(
    private serverCaller: ServerCallerService,
    private mainPage: MainPageComponent
  ) {}

  readProduct(productId: string) {
    let product: Product = {
      _id: '',
      name: '',
      amount: 0,
      seller: '',
      category: '',
      discountPercent: 0,
      price: 0,
    };
    // -------------------- Separator --------------------
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
    // -------------------- Separator --------------------
    productId?.length == 0
      ? (product._id = this.generateBarcode())
      : (product._id = productId);
    product.name = nameField.value;
    product.amount = Number(amountField.value);
    product.price = Number(priceField.value);
    product.category = categoryField.value;
    product.seller = sellerField.value;
    product.discountPercent = Number(discountField.value);
    // -------------------- Separator --------------------
    return product;
  }

  async addProduct() {
    let tempProduct = this.readProduct('');
    if (this.validateProduct(tempProduct)) {
      await this.serverCaller.create(this.readProduct(''));
      document.forms[0].reset();
      // -------------------- Separator --------------------
      Swal.fire({
        title: 'Added!',
        text: 'Your Product has been added successfully.',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
        timer: 5000,
        didClose: () => window.scrollTo(0, 99999999),
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

  validateProduct(product: Product) {
    if (
      product._id.length == 0 ||
      product.amount == 0 ||
      product.category.length == 0 ||
      product.discountPercent < 0 ||
      product.name.length == 0 ||
      product.price == 0 ||
      product.seller.length == 0
    )
      return false;
    return true;
  }

  supportEditProduct(product: Product) {
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
    // -------------------- Separator --------------------
    nameField.value = product.name;
    amountField.value = String(product.amount);
    priceField.value = String(product.price);
    categoryField.value = product.category;
    sellerField.value = product.seller;
    discountField.value = String(product.discountPercent);
    // -------------------- Separator --------------------
    nameLabel.classList.add('update');
    nameField.classList.add('update');
    nameField.focus();
    amountLabel.classList.add('update');
    amountField.classList.add('update');
    amountField.focus();
    priceLabel.classList.add('update');
    priceField.classList.add('update');
    priceField.focus();
    categoryLabel.classList.add('update');
    categoryField.classList.add('update');
    categoryField.focus();
    sellerLabel.classList.add('update');
    sellerField.classList.add('update');
    sellerField.focus();
    discountLabel.classList.add('update');
    discountField.classList.add('update');
    discountField.focus();
    // -------------------- Separator --------------------
    let addBtn = document.getElementById('add-btn') as HTMLButtonElement;
    addBtn.style.display = 'none';
    let updateBtn = document.getElementById('update-btn') as HTMLButtonElement;
    updateBtn.style.display = 'inline-flex';
    let cancelBtn = document.getElementById('cancel-btn') as HTMLButtonElement;
    cancelBtn.style.display = 'inline-flex';
    // -------------------- Separator --------------------
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  cancelEditing() {
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

    nameField.value = '';
    amountField.value = '';
    priceField.value = '';
    categoryField.value = '';
    discountField.value = '';
    sellerField.value = '';
    this.mainPage.currentProductId = '000000';

    nameLabel.classList.remove('update');
    nameField.classList.remove('update');
    nameLabel.classList.remove('active');
    nameField.classList.remove('active');
    nameField.blur();
    amountLabel.classList.remove('update');
    amountField.classList.remove('update');
    amountLabel.classList.remove('active');
    amountField.classList.remove('active');
    amountField.blur();
    priceLabel.classList.remove('update');
    priceField.classList.remove('update');
    priceLabel.classList.remove('active');
    priceField.classList.remove('active');
    priceField.blur();
    categoryLabel.classList.remove('update');
    categoryField.classList.remove('update');
    categoryLabel.classList.remove('active');
    categoryField.classList.remove('active');
    categoryField.blur();
    sellerLabel.classList.remove('update');
    sellerField.classList.remove('update');
    sellerLabel.classList.remove('active');
    sellerField.classList.remove('active');
    sellerField.blur();
    discountLabel.classList.remove('update');
    discountField.classList.remove('update');
    discountLabel.classList.remove('active');
    discountField.classList.remove('active');
    discountField.blur();

    let cancelBtn = document.getElementById('cancel-btn') as HTMLButtonElement;
    cancelBtn.style.display = 'none';
    let updateBtn = document.getElementById('update-btn') as HTMLButtonElement;
    updateBtn.style.display = 'none';
    let addBtn = document.getElementById('add-btn') as HTMLButtonElement;
    addBtn.style.display = 'inline-flex';
  }

  async confirmDeletion() {
    let confirmed = false;
    await Swal.fire({
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
        confirmed = true;
      }
    });
    return confirmed;
  }

  getSearchingData() {
    let searchingField = document.getElementById(
      'search-product'
    ) as HTMLInputElement;
    let searchAbout: string = searchingField.value;
    let searchBy: number = 2;
    let searchByName = document.getElementById('by-name') as HTMLInputElement;
    let searchBySeller = document.getElementById(
      'by-seller'
    ) as HTMLInputElement;
    let searchByCategory = document.getElementById(
      'by-category'
    ) as HTMLInputElement;
    if (searchByName.checked) searchBy = 1;
    else if (searchBySeller.checked) searchBy = 3;
    return [searchBy, searchAbout];
  }

  filterNumberInput() {
    // Removing [- + e] from input[type="number"]
    const invalidChars = ['-', '+', 'e'];
    const nums: HTMLInputElement[] = Array.from(
      document.querySelectorAll('input[type=number]')
    );
    for (let i = 0; i < nums.length; i++) {
      nums[i].addEventListener('keydown', (e) => {
        if (invalidChars.includes(e.key)) {
          e.preventDefault();
        }
      });
    }
  }

  async deleteDisplayed() {
    let confirmed = false;
    await Swal.fire({
      title: 'Are you sure you want to delete all the displayed products?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Deleted!',
          text: 'Displayed Products have been deleted successfully.',
          icon: 'success',
          timer: 5000,
        });
        confirmed = true;
      }
    });
    return confirmed;
  }

  generateBarcode() {
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const idLength = 6;
    let barcode = '';
    for (let i = 0; i < idLength; i++) {
      barcode += numbers[Math.floor(Math.random() * numbers.length)];
    }
    return barcode;
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
}
