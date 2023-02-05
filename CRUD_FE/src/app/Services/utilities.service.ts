import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { Product } from '../Interfaces/product';
import { ServerCallerService } from './server-caller.service';

@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {
  constructor(private serverCaller: ServerCallerService) {}

  addProduct() {
    // -------------------- Separator --------------------
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
    product._id = this.generateBarcode();
    product.name = nameField.value;
    product.amount = Number(amountField.value);
    product.price = Number(priceField.value);
    product.category = categoryField.value;
    product.seller = sellerField.value;
    product.discountPercent = Number(discountField.value);
    // -------------------- Separator --------------------
    this.serverCaller.create(product);
    // -------------------- Separator --------------------
    document.forms[0].reset();
    Swal.fire('Added!', 'Your Product has been added successfully.', 'success');
    // -------------------- Separator --------------------
    return product;
  }

  refreshProducts(){
    this.serverCaller.load();
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
        this.serverCaller.emptyDB();
      }
    });
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
