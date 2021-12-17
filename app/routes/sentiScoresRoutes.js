const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 60000,
  max: process.env.CALL_PER_MINUTE || 2,
  message: {
    error: "Too many requests",
  },
});

module.exports = (app) => {
  const sentiscore = require("../contoller/sentiScoresController");

  app.post("/sentiscore", limiter, sentiscore.create);

  // Retrieve all Notes
  app.get("/sentiscore", sentiscore.findAll);

  // Retrieve a single Note with noteId
  app.get("/sentiscore/:id", sentiscore.findOne);

  // Update a Note with noteId
  app.patch("/sentiscore/:id", sentiscore.update);

  // Delete a Note with noteId
  app.delete("/sentiscore/:id", sentiscore.delete);
};
