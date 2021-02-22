/**
 * Simple cart Item model with these properties
 * @property sku
 * @property quantity
 * @property discount
 */
module.exports = class CartItem {
  constructor(sku) {
    // check is sku is empty/undefined/null or not a string
    if (!sku || typeof sku !== "string") {
      throw new Error("Invalid sku");
    }

    this.sku = sku;
    this.quantity = 1;
    this.discount = 0;
  }
};
