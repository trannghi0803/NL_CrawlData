require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

//Router
app.use("/user", require("./routes/userRouter"));
app.use("/api", require("./routes/loaitindangRouter"));
app.use("/api", require("./routes/hinhthucRouter"));
app.use("/api", require("./routes/tinhthanhRouter"));
app.use("/api", require("./routes/quanhuyenRouter"));
app.use("/api", require("./routes/phuongxaRouter"));
app.use("/api", require("./routes/duongphoRouter"));
app.use("/api", require("./routes/upload"));
app.use("/api", require("./routes/baidangRouter"));

//Connect to mongodb
const URI = process.env.MONGODB_URL;
mongoose.connect(
  URI,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB");
  }
);

app.get("/", (req, res) => {
  res.json({
    msg: "Welcome to my website",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
