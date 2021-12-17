const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 60000,
  max: process.env.CALL_PER_MINUTE || 20,
  message: {
    error: "Too many requests",
  },
});

module.exports = (app) => {
  const customers = require("../contoller/customersController");

  app.post("/customer", customers.create);
  app.get("/customer", customers.findAll);
  app.get("/customer/:id", customers.findOne);
  app.patch("/customer/:id", customers.update);
  app.delete("/customer/:id", customers.delete);
  app.delete("/customer", customers.deleteAll);
};
