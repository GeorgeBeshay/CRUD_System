import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
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
      }).then((result) => {
        if (result.isConfirmed) {
          window.scrollTo({
            top: 999999999,
            left: 0,
            behavior: 'smooth',
          });
        }
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
      product.discountPercent == 0 ||
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
    // -------------------- Separator --------------------
    nameField.value = product.name;
    amountField.value = String(product.amount);
    priceField.value = String(product.price);
    categoryField.value = product.category;
    sellerField.value = product.seller;
    discountField.value = String(product.discountPercent);
    // -------------------- Separator --------------------
    nameField.focus();
    amountField.focus();
    priceField.focus();
    categoryField.focus();
    sellerField.focus();
    discountField.focus();
    // -------------------- Separator --------------------
    let addBtn = document.getElementById('add-btn') as HTMLButtonElement;
    addBtn.style.display = 'none';
    let updateBtn = document.getElementById('update-btn') as HTMLButtonElement;
    updateBtn.style.display = 'inline-block';
    // -------------------- Separator --------------------
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
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
      nums[i].addEventListener('input', () => {
        nums[i].value = nums[i].value.replace(/[e+-]/gi, '');
      });
      nums[i].addEventListener('keydown', (e) => {
        if (invalidChars.includes(e.key)) {
          e.preventDefault();
        }
      });
    }
  }

  async emptyDb() {
    let confirmed = false;
    await Swal.fire({
      title: 'Are you sure you want to delete all products?',
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
          text: 'All Products have been deleted successfully.',
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
}
