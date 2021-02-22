var Catalogue = require("../services/catalogue");
var CardItem = require("../models/cartItem");
const PricingRule = require("./pricingRule");

/**
 * Generated for every shopping session
 */
module.exports = class Checkout {
  /**
   * Constructor
   * @param {all pricing rules} pricingRules
   */
  constructor(pricingRules = []) {
    if (!Array.isArray(pricingRules)) {
      throw new Error("pricingRules is not an array");
    } else {
      pricingRules.forEach((rule) => {
        if (!(rule instanceof PricingRule)) {
          throw new Error("Invalid pricingRule object");
        }
      });
    }

    this.pricingRules = pricingRules;
    this.cart = {};
  }

  /**
   * Add a new product item to Cart
   * @param {Product item sku} sku
   */
  scan(sku) {
    if (!Catalogue.isValidSku(sku)) {
      throw new Error("Invalid sku");
    }
    if (this.cart[sku]) this.cart[sku].quantity++;
    else this.cart[sku] = new CardItem(sku);

    // Update pricing using defined pricing rules. Do it here so that we can see the discount immediately
    this.applyPricingRules();
  }

  /**
   * Apply promotion if any pricing rule is met
   *
   */
  applyPricingRules() {
    this.pricingRules.forEach((rule) => {
      if (rule.condition(this.cart)) {
        rule.action(this.cart);
      }
    });
  }

  /**
   * Calculate the total price of items in cart, after applying pricing rules
   * @returns total price of items in cart
   */
  total() {
    let totalPrice = 0;
    for (const [sku, cartItem] of Object.entries(this.cart)) {
      console.log(`${sku}: ${cartItem.quantity}`, cartItem);
      totalPrice +=
        Catalogue.getPrice(sku) * cartItem.quantity - cartItem.discount;
    }
    return totalPrice;
  }
};
