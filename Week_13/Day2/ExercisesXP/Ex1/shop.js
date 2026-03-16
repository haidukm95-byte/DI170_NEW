const extract = require("./product.js");
const search = (name) => {
  let found = false;
  for (let i = 0; i < extract.length; i++) {
    if (extract[i].name.includes(name)) {
      console.log(extract[i]);
      found = true;
    }
  }
  if (!found) {
    console.log("An item is out of stock!");
  }
};

search("Lenovo T430");
search("Samsung Galaxy A35");
search("MacBook Pro");
search("MSI Titan 18 HX Dragon");
search("Xiaomi Redmi A10");
