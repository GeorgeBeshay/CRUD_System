# CRUD System

![Preview](./design/desktop-preview.jpg)

## Table of contents

-   [Overview](#overview)
    -   [The challenge](#the-challenge)
    -   [Links](#links)
-   [Our process](#my-process)
    -   [Built with](#built-with)
    -   [What we learned](#what-i-learned)
    -   [Useful resources](#useful-resources)
-   [Authors](#authors)

## Overview

### The challenge

Users should be able to:

-   View the optimal layout for the app depending on their device's screen size.
-   See hover states for all interactive elements on the page.
-   Generate a new piece of advice by clicking the dice icon.

### Links

-   Live Site URL: [Github Pages](https://lorem.github.io/lorem/)

## My process

### Built with

-   Semantic HTML5 Markup
-   CSS Custom Properties
-   AngularJS
-   Java Spring Boot
-   MongoDB

### What I learned

```js
function showQuote() {
    fetch("https://api.adviceslip.com/advice")
        .then((response) => response.json())
        .then((data) => data.slip)
        .then((data) => {
            adviceId.innerHTML = `ADVICE #${data.id}`;
            adviceText.innerHTML = data.advice;
        })
        .catch((error) => {
            alert(`Error: ${error}`);
        });
}
```

### Useful resources

-   [Youtube: Elzero Web School - Fetch API](https://www.youtube.com/watch?v=oO0a7tQcGps)
-   [MDN: Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

## Authors

-   George Samy - [@GeorgeSamy](https://github.com/GeorgeBeshay)
-   Philopater Hany - [@PhilopaterHany](https://github.com/PhilopaterHany)
