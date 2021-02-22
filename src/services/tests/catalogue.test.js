const Catalogue = require("../catalogue");

// test isValidSku
test("ipd is a valid sku", () => {
  expect(Catalogue.isValidSku("ipd")).toBe(true);
});

test("mbp is a valid sku", () => {
  expect(Catalogue.isValidSku("mbp")).toBe(true);
});

test("atv is a valid sku", () => {
  expect(Catalogue.isValidSku("atv")).toBe(true);
});

test("vga is a valid sku", () => {
  expect(Catalogue.isValidSku("vga")).toBe(true);
});

test("null is an invalid sku", () => {
  expect(Catalogue.isValidSku(null)).toBe(false);
});

test("empty string is an invalid sku", () => {
  expect(Catalogue.isValidSku("")).toBe(false);
});

test("iphone is an invalid sku", () => {
  expect(Catalogue.isValidSku("iphone")).toBe(false);
});

// Test getPrice
test("ipd price is a positive number", () => {
  expect(Catalogue.getPrice("ipd")).toBeGreaterThanOrEqual(0);
});

test("mbp price is a positive number", () => {
  expect(Catalogue.getPrice("mbp")).toBeGreaterThanOrEqual(0);
});

test("atv price is a positive number", () => {
  expect(Catalogue.getPrice("atv")).toBeGreaterThanOrEqual(0);
});

test("vga price is a positive number", () => {
  expect(Catalogue.getPrice("vga")).toBeGreaterThanOrEqual(0);
});

test("null price is null", () => {
  expect(Catalogue.getPrice(null)).toBe(null);
});

test("empty string price is null", () => {
  expect(Catalogue.getPrice("")).toBe(null);
});

test("iphone price is null", () => {
  expect(Catalogue.getPrice("iphone")).toBe(null);
});
