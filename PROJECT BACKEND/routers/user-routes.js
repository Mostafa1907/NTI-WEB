const express = require("express");
const userControllers = require("../controllers/user-controllers");
const authenticateMiddleware = require("../middlewares/authenticate-middleware");
const authorizeMiddleware = require("../middlewares/authorize-middleware");
 
const router = express.Router();
 
router
  .route("/products")
  .get(
    authenticateMiddleware,
    authorizeMiddleware("customer"),
    userControllers.getUserProducts,
  )
  .post(
    authenticateMiddleware,
    authorizeMiddleware("customer"),
    userControllers.addProductToUser,
  );
 
module.exports = router;