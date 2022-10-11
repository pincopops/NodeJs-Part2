// Implement a toString method on the Shout class that decorates the toString method for a Text class instance.

// It should use the toUpperCase() method to convert the Text instance string to uppercase.

class Text {
  constructor(text) {
    this.string = text;
  }

  toString() {
    return this.string;
  }
}

import clc from "cli-color";

function Shout(text) {
  let originalToString = text.toString;

  text.toString = function() {
      return clc.blue(originalToString.apply(text).toUpperCase());
  }

  return text;
}

console.log(new Text("Hello, I'm talking").toString());

console.log(new Shout(new Text("Hello, I'm shouting!")).toString());