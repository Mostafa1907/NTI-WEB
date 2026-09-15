const express = require("express");
const orderControllers = require("../controllers/order-controllers");
const authenticateMiddleware = require("../middlewares/authenticate-middleware");
const authorizeMiddleware = require("../middlewares/authorize-middleware");

const router = express.Router();

router
  .route("/")
  .post(authenticateMiddleware, authorizeMiddleware("customer"), orderControllers.createOrder)
  .get(authenticateMiddleware, authorizeMiddleware("customer"), orderControllers.getMyOrders);

router.get(
  "/all",
  authenticateMiddleware,
  authorizeMiddleware("admin"),
  orderControllers.getAllOrders
);

module.exports = router;