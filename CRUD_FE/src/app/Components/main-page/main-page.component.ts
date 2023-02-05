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
  constructor(private http: HttpClient) {
    this.serverCaller = new ServerCallerService(this.http);
    this.productsGenerator = new ProductsGeneratorService(this.serverCaller);
    this.utilities = new UtilitiesService(this.serverCaller);
    // use this.serverCaller.'requestName'
  }
  currentYear: any = new Date().getFullYear();
  ngOnInit() {
    this.utilities.filterNumberInput();
    let forms = document.forms;
    for (let i = 0; i < forms.length; i++) {
      forms[i].addEventListener('submit', (e) => e.preventDefault());
    }
    this.runApplication();
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

  async searchProduct() {
    let searchingData = this.utilities.getSearchingData();
    this.productsGenerator.generateProdcuts(
      await this.serverCaller.search(searchingData[0], searchingData[1])
    );
  }
}
