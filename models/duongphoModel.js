const mongoose = require("mongoose");

const duongphoSchema = new mongoose.Schema({
  ten: {
    type: String,
    require: true,
    unique: true,
  },
  phuongxa: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PhuongXa",
    },
  ],
});

module.exports = mongoose.model("DuongPho", duongphoSchema);
