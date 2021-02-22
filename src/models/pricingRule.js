/**
 * A pricing rule applies discounts to items already added to the shopping cart, based on a set of conditions.
 * @class PricingRule
 */
module.exports = class PricingRule {
  /**
   * Creates an instance of PricingRule.
   * @param {string} name
   * @param {string} description
   * @param {boolean} condition a funciton that return true if condition for this pricing rule is met, false otherwise
   * @param {number} action a funciton with logic to discount amount to cart item. Return discount amount
   * @memberof PricingRule
   */
  constructor({
    name = "",
    description = "",
    condition = () => false,
    action = () => 0,
  } = {}) {
    this.name = name;
    this.description = description;
    this.condition = condition;
    this.action = action;
  }
};
