# CRUD System

![Preview](./design/desktop-preview.jpg)

## Table of contents

-   [Overview](#overview)
    -   [The challenge](#the-challenge)
    -   [Links](#links)
-   [Our process](#our-process)
    -   [Built with](#built-with)
    -   [What we learned](#what-we-learned)
    -   [Useful resources](#useful-resources)
    -   [How To Use](#how-to-use)
-   [Authors](#authors)

## Overview

### The challenge

Users should be able to:

-   Load all products from database.
-   Add new products.
-   Delete products.
-   Update products' data.
-   Search by proudct's name/category/seller.
-   View a unique barcode and ID for each product.
-   View the optimal layout for the app depending on their device's screen size.
-   See hover states for all interactive elements on the page.

### Links

-   Live Site URL: [Github Pages](https://georgebeshay.github.io/CRUD_System/)
-   Video URL: [Demo Video]()

## Our process

### Built with

-   Semantic HTML5 Markup
-   CSS Custom Properties
-   AngularJS
-   TypeScript
-   Java Spring Boot
-   MongoDB
-   Postman API
-   Sweetalert2
-   JsBarcode	

### What We learned

```js
function generateID() {
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const idLength = 6;
    let barcode = "";
    for (let i = 0; i < idLength; i++) {
        barcode += numbers[Math.floor(Math.random() * numbers.length)];
    }
    return barcode;
}
function generateBarCode(id) {
    JsBarcode(`#svg-${id}`, id, {
        format: "msi",
        height: 35,
        width: 1.5,
        text: "- " + id + " -",
        background: "transparent",
        lineColor: "#fff",
        font: "monospace",
        fontOptions: "bold",
        fontSize: 16,
        margin: 2,
        textMargin: 2,
    });
}
```
```java
public ArrayList<Product> meetCriteria(List<Product> products, String str) {
		ArrayList<Product> good = new ArrayList<Product>();
		for(Product product : products) {
			if(product.getName().contains(str)) 
				good.add(product);
		}
		return good;
}
```

### Useful resources

-   [AngularJS Docs](https://angular.io/docs)
-   [JsBarcode](https://lindell.me/JsBarcode/)
-   [Sweetalert2](https://sweetalert2.github.io/)
-   [Java Spring Boot Documentation](https://spring.io/projects/spring-boot)
-   [MongoDB Documentation](https://www.mongodb.com/docs/)
-   [Material Icons](https://developers.google.com/fonts/docs/material_icons)
-   [JsBarcode Problem](https://stackoverflow.com/questions/73009513/jabarcode-not-show-in-div-generate-by-js)

### How To Use
- Download the repository zip folder
- Install the front end required dependencies using the terminal command `npm install`
- Run the back end server on your device.
- Open your browser and go to `localhost:4200/`


## Authors

-   Github Account: [George Samy](https://github.com/GeorgeBeshay)
-   Github Account: [Philopater Hany](https://github.com/PhilopaterHany)
