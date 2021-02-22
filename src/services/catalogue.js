var Product = require("../models/product");

const products = {
  ipd: new Product("ipd", "Super iPad", 549.99),
  mbp: new Product("mbp", "MacBook Pro", 1399.99),
  atv: new Product("atv", "Apple TV", 109.5),
  vga: new Product("vga", "VGA adapter", 30.0),
};

/**
 * A service for querying product details.
 * It is currenty used a constant products list which could be replace reading from file or database or an API service
 */
const Catalogue = {
  /**
   * Return false if the sku doesn't exist in the product list
   * @param {string} sku
   */
  isValidSku: function (sku) {
    if (!sku) return false;
    return products[sku] != null;
  },

  /**
   * Return the price of the proudct with sku, null if it doesn't exist
   * @param {string} sku
   */
  getPrice: function (sku) {
    if (!this.isValidSku(sku)) return null;
    return products[sku].price;
  },
};

module.exports = Catalogue;
