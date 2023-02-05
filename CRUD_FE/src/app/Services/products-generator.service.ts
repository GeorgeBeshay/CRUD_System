import { Injectable } from '@angular/core';
import { Product } from '../Interfaces/product';
import * as JsBarcode from 'jsbarcode';
import Swal from 'sweetalert2';
import { ServerCallerService } from './server-caller.service';
import { MainPageComponent } from '../Components/main-page/main-page.component';

@Injectable({
  providedIn: 'root',
})
export class ProductsGeneratorService {
  constructor(private mainPage: MainPageComponent) {}

  generateProdcuts(products: Product[]) {
    let tempProductsCount = document.getElementById(
      'products-count'
    ) as HTMLSpanElement;
    tempProductsCount.innerHTML = `${products.length}`;
    let productsHolder = document.getElementById('productsHolder');
    if (!productsHolder) return;
    productsHolder.innerHTML = ``;
    for (let i = 0; i < products.length; i++) {
      let tempProduct = products[i];
      // ---------------------- Separator ----------------------
      let tempRow = document.createElement('tr');
      tempRow.id = `${tempProduct._id}`;
      // ---------------------- Separator ----------------------
      let tempCounter = document.createElement('td');
      tempCounter.appendChild(document.createTextNode(String(i + 1)));
      tempRow.appendChild(tempCounter);
      // ---------------------- Separator ----------------------
      let tempTitle = document.createElement('td');
      tempTitle.appendChild(document.createTextNode(tempProduct.name));
      tempRow.appendChild(tempTitle);
      // ---------------------- Separator ----------------------
      let oldPrice = document.createElement('del');
      oldPrice.appendChild(
        document.createTextNode(String(tempProduct.price.toLocaleString()))
      );
      let tempPrice = document.createElement('td');
      tempPrice.appendChild(oldPrice);
      let newPrice = document.createElement('strong');
      newPrice.appendChild(
        document.createTextNode(
          String(
            Number(tempProduct.price) -
              Number(
                (
                  (tempProduct.discountPercent * tempProduct.price) /
                  100
                ).toFixed(2)
              )
          )
        )
      );
      tempPrice.appendChild(newPrice);
      let tempSup = document.createElement('sup');
      tempSup.appendChild(document.createTextNode('$'));
      tempPrice.appendChild(tempSup);
      tempRow.appendChild(tempPrice);
      // ---------------------- Separator ----------------------
      let tempDiscount = document.createElement('td');
      tempDiscount.appendChild(
        document.createTextNode(String(tempProduct.discountPercent))
      );
      let tempSup2 = document.createElement('sup');
      tempSup2.appendChild(document.createTextNode('%'));
      tempDiscount.appendChild(tempSup2);
      tempRow.appendChild(tempDiscount);
      // ---------------------- Separator ----------------------
      let tempAmount = document.createElement('td');
      tempAmount.appendChild(
        document.createTextNode(String(tempProduct.amount.toLocaleString()))
      );
      tempRow.appendChild(tempAmount);
      // ---------------------- Separator ----------------------
      let tempCategory = document.createElement('td');
      tempCategory.appendChild(document.createTextNode(tempProduct.category));
      tempRow.appendChild(tempCategory);
      // ---------------------- Separator ----------------------
      let tempSeller = document.createElement('td');
      tempSeller.appendChild(document.createTextNode(tempProduct.seller));
      tempRow.appendChild(tempSeller);
      // ---------------------- Separator ----------------------
      let tempBarCode = document.createElement('td');
      let tempSVG = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg'
      );
      tempSVG.id = `svg-${tempProduct._id}`;
      tempBarCode.appendChild(tempSVG);
      tempRow.appendChild(tempBarCode);

      // ---------------------- Separator ----------------------
      let tempAction = document.createElement('td');

      let tempEditButton = document.createElement('button');
      tempEditButton.classList.add('edit-btn');
      tempEditButton.addEventListener('click', () =>
        this.mainPage.editProduct(tempProduct)
      );
      tempEditButton.appendChild(document.createTextNode('Edit'));
      tempAction.appendChild(tempEditButton);

      let tempDeleteButton = document.createElement('button');
      tempDeleteButton.classList.add('delete-btn');
      tempDeleteButton.addEventListener('click', () =>
        this.mainPage.deleteProduct(tempProduct)
      );
      tempDeleteButton.appendChild(document.createTextNode('Delete'));
      tempAction.appendChild(tempDeleteButton);
      tempRow.appendChild(tempAction);
      // ---------------------- Separator ----------------------
      productsHolder.appendChild(tempRow);
      this.generateBarCode(tempProduct._id);
    }
  }

  generateBarCode(id: string) {
    console.log(document.getElementById(`svg-${id}`));
    JsBarcode(`#svg-${id}`, id, {
      format: 'msi',
      height: 35,
      width: 1.5,
      text: '- ' + id + ' -',
      background: 'transparent',
      lineColor: '#fff',
      font: 'monospace',
      fontOptions: 'bold',
      fontSize: 16,
      margin: 2,
      textMargin: 2,
    });
  }
}
