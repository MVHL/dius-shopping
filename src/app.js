var Checkout = require("./models/checkout");
var Promotion = require("./services/promotion");

console.log("Welcome to Dius shop");
console.log("Please start scanning your item");

var co = new Checkout(Promotion.getPricingRules());
co.scan("atv");
co.scan("atv");
co.scan("atv");
co.scan("vga");

co.scan("atv");
co.scan("ipd");
co.scan("ipd");
co.scan("atv");
co.scan("ipd");
co.scan("ipd");
co.scan("ipd");

// co.scan("mbp");
// co.scan("vga");
// co.scan("ipd");

let total = co.total();
console.log(total);
