var Product = require("../product");

test("Product constructor works", () => {
  const product = new Product("sku", "Name", 9.99);
  expect(product.sku).toBe("sku");
  expect(product.name).toBe("Name");
  expect(product.price).toBe(9.99);
});

test("Invalid sku parameter should throw error", () => {
  const t = () => {
    new Product("", "Name", 9.99);
  };

  expect(t).toThrow(Error);
  expect(t).toThrow("Invalid sku");
});

test("Invalid name parameter should throw error", () => {
  const t = () => {
    new Product("sku", null, 9.99);
  };

  expect(t).toThrow(Error);
  expect(t).toThrow("Invalid name");
});

test("Invalid price parameter should throw error", () => {
  const t = () => {
    new Product("sku", "Name", "$9.99");
  };

  expect(t).toThrow(Error);
  expect(t).toThrow("price is not a number");
});

test("Negative price parameter should throw error", () => {
  const t = () => {
    new Product("sku", "Name", -2.3);
  };

  expect(t).toThrow(Error);
  expect(t).toThrow("price is negative");
});
