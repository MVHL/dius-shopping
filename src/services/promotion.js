var Catalogue = require("../services/catalogue");
var PricingRule = require("../models/pricingRule");

const pricingRules = [
  new PricingRule({
    name: "3 for 2 atv",
    description: "If you buy 3 Apple TVs, you will pay the price of 2 only",
    condition: (cart) => !!cart && cart.atv && cart.atv.quantity >= 3,
    action: (cart) => {
      const bundles = Math.floor(cart.atv.quantity / 3);
      cart.atv.discount = bundles * Catalogue.getPrice("atv");
      return cart.atv.discount;
    },
  }),
  new PricingRule({
    name: ">4 ipd $499.99 each",
    description:
      "The brand new Super iPad will have a bulk discounted applied, where the price will drop to $499.99 each, if someone buys more than 4",
    condition: (cart) => !!cart && cart.ipd && cart.ipd.quantity > 4,
    action: (cart) => {
      const bundles = cart.ipd.quantity > 4 ? cart.ipd.quantity : 0;
      cart.ipd.discount = bundles * (Catalogue.getPrice("ipd") - 499.99);
      return cart.ipd.discount;
    },
  }),
  new PricingRule({
    name: "mbp free vga",
    description:
      "We will bundle in a free VGA adapter free of charge with every MacBook Pro sold.",
    condition: (cart) =>
      !!cart &&
      cart.mbp &&
      cart.mbp.quantity >= 1 &&
      cart.vga &&
      cart.vga.quantity,
    action: (cart) => {
      const bundles = Math.min(
        cart.mbp ? cart.mbp.quantity : 0,
        cart.vga ? cart.vga.quantity : 0
      );
      if (cart.vga) {
        cart.vga.discount = bundles * Catalogue.getPrice("vga");
        return cart.vga.discount;
      }
      return 0;
    },
  }),
];

/**
 * A service to manage pricing Rules
 */
const Promotion = {
  // get 1 pricing rule by index
  getPricingRule: function (index) {
    if (!(index >= 0 && index < pricingRules.length)) return null;
    return pricingRules[index];
  },

  // Get 1 pricing rule by name
  getPricingRuleByName: function (name) {
    return pricingRules.find((rule) => rule.name === name);
  },

  // Return all pricing rules
  getPricingRules: function () {
    return pricingRules;
  },
};

module.exports = Promotion;
