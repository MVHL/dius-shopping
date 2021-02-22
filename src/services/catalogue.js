var Product = require("../models/product");

const products = {
  ipd: new Product("ipd", "Super iPad", 549.99),
  mbp: new Product("mbp", "MacBook Pro", 1399.99),
  atv: new Product("atv", "Apple TV", 109.5),
  vga: new Product("vga", "VGA adapter", 30.0),
};

const Catalogue = {
  isValidSku: function (sku) {
    if (!sku) return false;
    return products[sku] != null;
  },

  getPrice: function (sku) {
    if (!this.isValidSku(sku)) return null;
    return products[sku].price;
  },
};

module.exports = Catalogue;
