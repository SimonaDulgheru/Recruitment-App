const express = require("express");
const connectToDB = require("./config/db");

const app = express();

//Connect DB
connectToDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API Running"));

// Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/authUser", require("./routes/api/authUser"));
app.use("/api/userProfile", require("./routes/api/userProfile"));
// app.use("/api/userPosts", require("./routes/api/userPosts")); //Not used yet in the Front End

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
