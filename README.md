# dius-shopping

A checkout system with flexible pricing rules for discounts.
Pricing Rules are managed by Promotion service.
Products are managed by Catalogue service.

## Start

```
npm start
```

## Test

```
npm test
```

## Usage Example

```javascript
var co = new Checkout(pricingRules);
co.scan(sku1);
co.scan(sku2);
co.total();
```
