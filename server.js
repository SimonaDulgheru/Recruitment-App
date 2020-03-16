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
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/userProfile", require("./routes/api/userProfile"));
app.use("/api/userPosts", require("./routes/api/userPosts"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
