const express = require("express");
const userControllers = require("../controllers/user-controllers");
const authenticateMiddleware = require("../middlewares/authenticate-middleware");
const authorizeMiddleware = require("../middlewares/authorize-middleware");
 
const router = express.Router();
 
router
  .route("/courses")
  .get(
    authenticateMiddleware,
    authorizeMiddleware("student"),
    userControllers.getUserCourses,
  )
  .post(
    authenticateMiddleware,
    authorizeMiddleware("student"),
    userControllers.addCourseToUser,
  );
 
module.exports = router;