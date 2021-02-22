const PricingRule = require("../../models/pricingRule");
const Catalogue = require("../catalogue");
const Promotion = require("../promotion");

// test getPricingRules
test("getPricingRules should return an array of PricingRule", () => {
  const pricingRules = Promotion.getPricingRules();
  expect(Array.isArray(pricingRules)).toBe(true);
  expect(pricingRules).toHaveLength(3);
  pricingRules.forEach((rule) => {
    expect(rule instanceof PricingRule).toBe(true);
  });
});

test("The pricingRules data is correct", () => {
  expect(Promotion.getPricingRules()).toMatchSnapshot();
});

// test getPricingRule
test("getPricingRule with proper index should work", () => {
  {
    const pricingRule = Promotion.getPricingRule(0);
    expect(pricingRule instanceof PricingRule).toBe(true);
  }
  {
    const pricingRule = Promotion.getPricingRule(1);
    expect(pricingRule instanceof PricingRule).toBe(true);
  }
  {
    const pricingRule = Promotion.getPricingRule(2);
    expect(pricingRule instanceof PricingRule).toBe(true);
  }
});

test("getPricingRule with negative index should return null", () => {
  const pricingRule = Promotion.getPricingRule(-1);
  expect(pricingRule).toBe(null);
});

test("getPricingRule with out of boud index should return null", () => {
  const pricingRule = Promotion.getPricingRule(
    Promotion.getPricingRules().length
  );
  expect(pricingRule).toBe(null);
});

// test getPricingRuleByName
test("getPricingRuleByName with wrong sku should return null", () => {
  const pricingRule = Promotion.getPricingRuleByName("random string");
  expect(pricingRule).toBe(undefined);
});

test("getPricingRuleByName with correct sku should work", () => {
  const pricingRule = Promotion.getPricingRuleByName("3 for 2 atv");
  expect(pricingRule.name).toBe("3 for 2 atv");
});

// Mock test each Pricing Rule
test("'3 for 2 atv' pricingRule should give 1 free for every 3 atv in cart", () => {
  const pricingRule = Promotion.getPricingRuleByName("3 for 2 atv");
  const itemPrice = Catalogue.getPrice("atv");
  {
    const cart = { atv: { quantity: 2 } };
    expect(pricingRule.condition(cart)).toBeFalsy();
    expect(pricingRule.action(cart)).toBe(0);
    expect(cart.atv.discount).toBe(0);
  }
  {
    const cart = { atv: { quantity: 3 } };
    expect(pricingRule.condition(cart)).toBeTruthy();
    expect(pricingRule.action(cart)).toBeGreaterThan(0);
    expect(cart.atv.discount).toBe(itemPrice);
  }
  {
    const cart = { atv: { quantity: 10 } };
    expect(pricingRule.condition(cart)).toBeTruthy();
    expect(pricingRule.action(cart)).toBeGreaterThan(0);
    expect(cart.atv.discount).toBe(3 * itemPrice);
  }
});

test("'>4 ipd $499.99 each' pricingRule should reduce ipd price to $499.99 each", () => {
  const pricingRule = Promotion.getPricingRuleByName(">4 ipd $499.99 each");
  const itemPrice = Catalogue.getPrice("ipd");
  {
    const cart = { ipd: { quantity: 4 } };
    expect(pricingRule.condition(cart)).toBeFalsy();
    expect(pricingRule.action(cart)).toBe(0);
    expect(cart.ipd.discount).toBe(0);
  }
  {
    const cart = { ipd: { quantity: 5 } };
    expect(pricingRule.condition(cart)).toBeTruthy();
    expect(pricingRule.action(cart)).toBeGreaterThan(0);
    expect(cart.ipd.discount).toBe(5 * (itemPrice - 499.99));
  }
  {
    const cart = { ipd: { quantity: 8 } };
    expect(pricingRule.condition(cart)).toBeTruthy();
    expect(pricingRule.action(cart)).toBeGreaterThan(0);
    expect(cart.ipd.discount).toBe(8 * (itemPrice - 499.99));
  }
});

test("'mbp free vga' should free 1 vga for every mbp", () => {
  const pricingRule = Promotion.getPricingRuleByName("mbp free vga");
  const itemPrice = Catalogue.getPrice("vga");
  {
    const cart = { vga: { quantity: 2 } };
    expect(pricingRule.condition(cart)).toBeFalsy();
    expect(pricingRule.action(cart)).toBe(0);
    expect(cart.vga.discount).toBe(0);
  }
  {
    const cart = { mbp: { quantity: 2 } };
    expect(pricingRule.condition(cart)).toBeFalsy();
    expect(pricingRule.action(cart)).toBe(0);
  }
  {
    const cart = { vga: { quantity: 5 }, mbp: { quantity: 3 } };
    expect(pricingRule.condition(cart)).toBeTruthy();
    expect(pricingRule.action(cart)).toBeGreaterThan(0);
    expect(cart.vga.discount).toBe(3 * itemPrice);
  }
  {
    const cart = { vga: { quantity: 2 }, mbp: { quantity: 9 } };
    expect(pricingRule.condition(cart)).toBeTruthy();
    expect(pricingRule.action(cart)).toBeGreaterThan(0);
    expect(cart.vga.discount).toBe(2 * itemPrice);
  }
});
