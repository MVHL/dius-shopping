var CartItem = require("../cartItem");

test("CartItem constructor works", () => {
  const cartItem = new CartItem("sku");
  expect(cartItem.sku).toBe("sku");
  expect(cartItem.quantity).toBe(1);
  expect(cartItem.discount).toBe(0);
});

test("Invalid sku parameter should throw error", () => {
  const t = () => {
    new CartItem();
  };
  expect(t).toThrow(Error);
  expect(t).toThrow("Invalid sku");
});
