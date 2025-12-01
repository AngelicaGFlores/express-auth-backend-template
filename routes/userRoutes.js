const express = require("express");
const { getAllUsers, getUserById, loginUser, registerUser } = require("../controllers/userController");

// Router
const userRouter = express.Router();

/**
 * GET /api/user/
 */
userRouter.get("/", getAllUsers);

/**
 * GET /api/user/:id
 */
userRouter.get("/:id", getUserById);

//register
userRouter.post('/register',registerUser)

//login 
userRouter.post('/login',loginUser)


module.exports = userRouter;
