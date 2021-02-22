# dius-shopping

A checkout system with flexible pricing rules for discounts.

Pricing Rules are managed by Promotion service.

Products are managed by Catalogue service.

## Start

```
npm start
```

## Test (Jest)

```
npm test
```

## Usage Example

```javascript
var Checkout = require("./models/checkout");
var Promotion = require("./services/promotion");

var co = new Checkout(Promotion.getPricingRules());
co.scan(sku1);
co.scan(sku2);
co.total();
```
