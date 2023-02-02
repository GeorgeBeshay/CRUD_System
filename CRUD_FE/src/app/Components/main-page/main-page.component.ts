import { Component } from '@angular/core';
import * as JsBarcode from 'jsbarcode';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent {
  px2mmFactor: number | undefined;
  ngOnInit() {
    this.px2mmFactor = this.calcPx2MmFactor();
    let data: string = '123456';
    JsBarcode('#barcode', data, {
      format: 'msi',
      height: 10 * this.px2mmFactor,
      width: 0.5 * this.px2mmFactor,
      text: '- ' + data + ' -',
      background: 'transparent',
      font: 'monospace',
      fontOptions: 'bold',
      fontSize: 16,
      lineColor: 'black',
      margin: this.px2mmFactor,
      textMargin: this.px2mmFactor,
    });
  }
  private calcPx2MmFactor() {
    let e = document.createElement('div');
    e.style.position = 'absolute';
    e.style.width = '75mm';
    document.body.appendChild(e);
    let rect = e.getBoundingClientRect();
    document.body.removeChild(e);
    return rect.width / 100;
  }
}
