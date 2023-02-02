import { Component } from '@angular/core';
import * as JsBarcode from 'jsbarcode';

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
}
