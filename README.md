# Let's Build a JavaScript Libary

## About the course

This repository represents my answer to the final assignment of Anthony Alicea's ['JavaScript: Understanding the Weird Parts' course on Udemy](https://www.udemy.com/understand-javascript/). I took the course in 2017.

It is a great course that really helps you to understand JavaScript as a programming language. Anthony explains in a clear and accessible way what some of the scarier topics like 'closures', 'prototypes' and 'this' really mean.

He explains a lot of those concepts by looking and dissecting the code of the jQuery library which I found to be very educative and interesting. I strongly recommend any intermediary (JavaScript) programmer to dissect a popular library line by line to increase your understanding of the language.

The course is recommended for intermediary level JavaScript developers and programmers coming from other languages.

## Final assignment

At the end of the course you get to build your own "mini" library of which you can inspect my solution here: [https://rjsibon.github.io/javascript-the-weird-parts/](https://rjsibon.github.io/javascript-the-weird-parts/).

I used the "library" to create a login screen where the user has to enter his desired language, full name and, quite weirdly, his age. The age is used to decide whether to use formal or informal language. The threshold is set at the age of thirty.

All text in the "app" gets translated when the user chooses a different language.

The app stores session data in a cookie so the user does not have to login at a later visit.

### Browser support

In order to practice with ECMAScript 2015 (ES6) and the latest CSS3 specifications this demo app only works in web browsers that support those technologies.

The browser particularly needs to support:

- ES6 `let`, `const` and arrow functions
- ES6 modules (`import` and `export`)
- CSS Grid
