const User = require("../models/User");
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;
const expiration = "2h"; // Token will be valid for 2 hours

function getAllUsers(req, res) {
	console.log(req.headers);

	res.send("Sending all users...");
}

function getUserById(req, res) {
	res.send(`Data for user: ${req.params.id}`);
}

async function registerUser(req, res) {
	//try catch block to check if a user exists
	try {
		//check if user exists,by checking  the email, then it will show you the rest of the data
		const dbUser = await User.findOne({ email: req.body.email });

		if (dbUser) {
			return res.status(400).json({ message: "User already exist." });
		}
		//or else,
		//create new user
		const user = await User.create(req.body);

		//show me the user
		console.log(user);
		//send this data
		res.status(201).json({ user });
	} catch (error) {
		console.error(error);
	}
}

async function loginUser(req, res) {
	try {
		const { email, password } = req.body;

		//check if user doesnt exist
		const dbUser = await User.findOne({ email: email });

		if (!dbUser) {
			return res.status(400).json({ message: "Incorrect email or password." });
		}

		const passwordMatched = await dbUser.isCorrectPassword(password);

		if (!passwordMatched) {
			return res.status(400).json({ message: "Incorrect email or password." });
		}

		//create payload
		const payload = {
			_id: dbUser._id,
			username: dbUser.username,
			email: dbUser.email,
		};

		// create token
		//passing an object, which has data in it
		const token = jwt.sign({ data: payload }, secret, {
			expiresIn: expiration,
		});

		//we sending the data and token here
		res.json({ token, user: dbUser });
	} catch (error) {
		console.error(error);
	}
}

module.exports = {
	getAllUsers,
	getUserById,
	registerUser,
	loginUser,
};
