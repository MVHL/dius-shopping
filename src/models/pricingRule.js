/**
 * A pricing rule applies discounts to items already added to the shopping cart, based on a set of conditions.
 * @class PricingRule
 */
module.exports = class PricingRule {
  /**
   * Creates an instance of PricingRule.
   * @param {string} name
   * @param {string} description
   * @param {function} condition
   * @param {array of functions} action
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
