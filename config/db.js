const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectToDB = async () => {
	try {
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false
		});

		console.log("MongoDB is connected...");
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
};

module.exports = connectToDB;
