var Checkout = require("../checkout");
const CartItem = require("../cartItem");
const Promotion = require("../../services/promotion");
const Catalogue = require("../../services/catalogue");

// Test constructor
test("Checkout default constructor works", () => {
  const checkout = new Checkout();
  expect(checkout.pricingRules).toEqual([]);
  expect(checkout.cart).toEqual({});
});

test("Checkout constructor works for 1 pricing Rule", () => {
  const checkout = new Checkout([Promotion.getPricingRule(0)]);
  expect(Array.isArray(checkout.pricingRules)).toBe(true);
  expect(checkout.pricingRules.length).toBe(1);
  expect(checkout.cart).toEqual({});
});

test("Checkout constructor works for multiple pricing Rules", () => {
  const checkout = new Checkout(Promotion.getPricingRules());
  expect(Array.isArray(checkout.pricingRules)).toBe(true);
  expect(checkout.pricingRules.length).toBe(Promotion.getPricingRules().length);
  expect(checkout.cart).toEqual({});
});

test("Checkout constructor with non-array parameter should throw an error", () => {
  const t = () => {
    new Checkout({});
  };
  expect(t).toThrow(Error);
  expect(t).toThrow("pricingRules is not an array");
});

test("Checkout constructor with invalid PricingRule should throw an error", () => {
  const t = () => {
    new Checkout([1, 2, 3]);
  };
  expect(t).toThrow(Error);
  expect(t).toThrow("Invalid pricingRule object");
});

// Test scan(sku)
test("Scan sku should increase cartItem quantity", () => {
  const checkout = new Checkout();
  checkout.scan("atv");
  expect(checkout.cart["atv"] instanceof CartItem).toBe(true);
  expect(checkout.cart["atv"].quantity).toBe(1);
  checkout.scan("atv");
  expect(checkout.cart["atv"].quantity).toBe(2);
  checkout.scan("atv");
  expect(checkout.cart["atv"].quantity).toBe(3);
});

test("Scan wrong sku should throw an error", () => {
  const checkout = new Checkout();
  const t = () => {
    checkout.scan("wrong sku");
  };
  expect(t).toThrow(Error);
  expect(t).toThrow("Invalid sku");
});

// Test applyPricingRules()
test("PricingRule 0 should do 3 for 2 deal on Apple TVs", () => {
  const checkout = new Checkout([Promotion.getPricingRule(0)]);

  const itemPrice = Catalogue.getPrice("atv");

  checkout.scan("atv");
  expect(checkout.cart["atv"].discount).toBe(0);
  checkout.scan("atv");
  expect(checkout.cart["atv"].discount).toBe(0);
  checkout.scan("atv");
  expect(checkout.cart["atv"].discount).toBe(itemPrice);
  checkout.scan("atv");
  expect(checkout.cart["atv"].discount).toBe(itemPrice);
  checkout.scan("atv");
  expect(checkout.cart["atv"].discount).toBe(itemPrice);
  checkout.scan("atv");
  expect(checkout.cart["atv"].discount).toBe(2 * itemPrice);
});

test("PricingRule 1 should do $499.99 each for more than 4 Super iPads", () => {
  const checkout = new Checkout([Promotion.getPricingRule(1)]);

  const sku = "ipd";
  const itemPrice = Catalogue.getPrice(sku);

  checkout.scan(sku);
  expect(checkout.cart[sku].discount).toBe(0);
  checkout.scan(sku);
  expect(checkout.cart[sku].discount).toBe(0);
  checkout.scan(sku);
  expect(checkout.cart[sku].discount).toBe(0);
  checkout.scan(sku);
  expect(checkout.cart[sku].discount).toBe(0);
  checkout.scan(sku);
  expect(checkout.cart[sku].discount).toEqual(5 * (itemPrice - 499.99));
  checkout.scan(sku);
  expect(checkout.cart[sku].discount).toEqual(6 * (itemPrice - 499.99));
});

test("PricingRule 2 should free VGA adapter free of charge with every MacBook Pro", () => {
  const checkout = new Checkout([Promotion.getPricingRule(2)]);

  const vgaPrice = Catalogue.getPrice("vga");

  checkout.scan("mbp");
  expect(checkout.cart["vga"]).toBe(undefined);
  checkout.scan("vga");
  expect(checkout.cart["mbp"].discount).toBe(0);
  expect(checkout.cart["vga"].discount).toBe(vgaPrice);
  checkout.scan("vga");
  expect(checkout.cart["vga"].discount).toBe(vgaPrice);
  checkout.scan("mbp");
  expect(checkout.cart["vga"].discount).toBe(2 * vgaPrice);
});

test("All tests above with all pricing Rules shoudl work", () => {
  const checkout = new Checkout(Promotion.getPricingRules());

  //Rule 0
  {
    const itemPrice = Catalogue.getPrice("atv");

    checkout.scan("atv");
    expect(checkout.cart["atv"].discount).toBe(0);
    checkout.scan("atv");
    expect(checkout.cart["atv"].discount).toBe(0);
    checkout.scan("atv");
    expect(checkout.cart["atv"].discount).toBe(itemPrice);
    checkout.scan("atv");
    expect(checkout.cart["atv"].discount).toBe(itemPrice);
    checkout.scan("atv");
    expect(checkout.cart["atv"].discount).toBe(itemPrice);
    checkout.scan("atv");
    expect(checkout.cart["atv"].discount).toBe(2 * itemPrice);
  }

  // Rule 1
  {
    const sku = "ipd";
    const itemPrice = Catalogue.getPrice(sku);

    const checkout = new Checkout([Promotion.getPricingRule(1)]);
    checkout.scan(sku);
    expect(checkout.cart[sku].discount).toBe(0);
    checkout.scan(sku);
    expect(checkout.cart[sku].discount).toBe(0);
    checkout.scan(sku);
    expect(checkout.cart[sku].discount).toBe(0);
    checkout.scan(sku);
    expect(checkout.cart[sku].discount).toBe(0);
    checkout.scan(sku);
    expect(checkout.cart[sku].discount).toEqual(5 * (itemPrice - 499.99));
    checkout.scan(sku);
    expect(checkout.cart[sku].discount).toEqual(6 * (itemPrice - 499.99));
  }

  // Rule 2
  {
    const vgaPrice = Catalogue.getPrice("vga");

    checkout.scan("mbp");
    expect(checkout.cart["vga"]).toBe(undefined);
    checkout.scan("vga");
    expect(checkout.cart["mbp"].discount).toBe(0);
    expect(checkout.cart["vga"].discount).toBe(vgaPrice);
    checkout.scan("vga");
    expect(checkout.cart["vga"].discount).toBe(vgaPrice);
    checkout.scan("mbp");
    expect(checkout.cart["vga"].discount).toBe(2 * vgaPrice);
  }
});

// Test total()
test("SKUs Scanned: atv, atv, atv, vga Total expected: $249.00", () => {
  const checkout = new Checkout(Promotion.getPricingRules());

  checkout.scan("atv");
  checkout.scan("atv");
  checkout.scan("atv");
  checkout.scan("vga");
  expect(checkout.total()).toBe(249);
});

test("SKUs Scanned: atv, atv, atv, vga Total expected: $249.00", () => {
  const checkout = new Checkout(Promotion.getPricingRules());

  checkout.scan("atv");
  checkout.scan("atv");
  checkout.scan("atv");
  checkout.scan("vga");
  expect(checkout.total()).toBe(249);
});

test("SKUs Scanned: atv, ipd, ipd, atv, ipd, ipd, ipd Total expected: $2718.95", () => {
  const checkout = new Checkout(Promotion.getPricingRules());

  checkout.scan("atv");
  checkout.scan("ipd");
  checkout.scan("ipd");
  checkout.scan("atv");
  checkout.scan("ipd");
  checkout.scan("ipd");
  checkout.scan("ipd");
  expect(checkout.total()).toBe(2718.95);
});

test("SKUs Scanned: mbp, vga, ipd Total expected: $1949.98", () => {
  const checkout = new Checkout(Promotion.getPricingRules());

  checkout.scan("mbp");
  checkout.scan("vga");
  checkout.scan("ipd");
  expect(checkout.total()).toBe(1949.98);
});

test("SKUs Scanned: atv, atv, atv, vga, atv, ipd, ipd, atv, ipd, ipd, ipd, mbp, vga, ipd Total expected: $4867.93", () => {
  const checkout = new Checkout(Promotion.getPricingRules());

  checkout.scan("atv");
  checkout.scan("atv");
  checkout.scan("atv");
  checkout.scan("vga");
  checkout.scan("atv");
  checkout.scan("ipd");
  checkout.scan("ipd");
  checkout.scan("atv");
  checkout.scan("ipd");
  checkout.scan("ipd");
  checkout.scan("ipd");
  checkout.scan("mbp");
  checkout.scan("vga");
  checkout.scan("ipd");
  expect(checkout.total()).toBe(4867.93);
});
