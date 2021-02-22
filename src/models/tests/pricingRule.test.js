var PricingRule = require("../pricingRule");

test("PricingRule default constructor works", () => {
  const pricingRule = new PricingRule();
  expect(pricingRule.name).toBe("");
  expect(pricingRule.description).toBe("");
  expect(pricingRule.condition()).toBe(false);
  expect(pricingRule.action()).toBe(0);
});

test("PricingRule constructor works", () => {
  const pricingRule = new PricingRule({
    name: "name",
    description: "description",
    condition: (cart) => true,
    action: (cart) => {
      return 50;
    },
  });
  expect(pricingRule.name).toBe("name");
  expect(pricingRule.description).toBe("description");
  expect(pricingRule.condition()).toBe(true);
  expect(pricingRule.action()).toBe(50);
});

test("PricingRule constructor with wrong parameters would use default values", () => {
  const pricingRule = new PricingRule([1, 2, 3]);
  expect(pricingRule.name).toBe("");
  expect(pricingRule.description).toBe("");
  expect(pricingRule.condition()).toBe(false);
  expect(pricingRule.action()).toBe(0);
});
