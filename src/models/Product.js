/**
 * Simple product model with these properties
 * @property {string} sku
 * @property {string} name
 * @property {number} price must be >= 0
 */
module.exports = class Product {
  constructor(sku, name, price) {
    // check is sku is empty/undefined/null or not a string
    if (!sku || typeof sku !== "string") {
      throw new Error("Invalid sku");
    }

    // Check if name is empty or not a string
    if (!name || typeof name !== "string") {
      throw new Error("Invalid name");
    }

    // check if price >= 0
    if (isNaN(price)) {
      throw new Error("price is not a number");
    } else if (price < 0) {
      throw new Error("price is negative");
    }

    this.sku = sku;
    this.name = name;
    this.price = price;
  }
};
