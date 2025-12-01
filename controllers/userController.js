const User = require("../models/User");
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;
const expiration = "2h";

function getAllUsers(req, res) {
	res.send("Sending all users...");
}
function getUserById(req, res) {
	res.send(`Data for user: ${req.params.id}`);
}
async function registerUser(req, res) {
	try {
		const dbUser = await User.findOne({ email: req.body.email });

		if (dbUser) {
			return res.status(400).json({ message: "User already exist." });
		}
		// create new user
		const user = await User.create(req.body);
		console.log(user);
		res.send(
			`Register user: ${req.body.username}, ${req.body.password}, ${req.body.email}`
		);
	} catch (error) {
		console.error(error);
	}
}

function loginUser(req, res) {
	res.send(`Login user: ${req.body.username}`);
}

module.exports = {
	getAllUsers,
	getUserById,
	registerUser,
	loginUser,
};
