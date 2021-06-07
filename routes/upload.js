const router = require("express").Router();
const cloudinary = require("cloudinary");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const fs = require("fs");

//uploadimage with cloud
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

//uploadimage
router.post("/upload", auth, authAdmin, (req, res) => {
  try {
    // console.log(req.files);
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ msg: "Không có files để upload" });
    }

    const file = req.files.file;
    if (file.size > 1024 * 1024) {
      removeTmp(file.tempFilePath);
      return res.status(400).json({ msg: "file quá lớn" });
    }
    if (
      file.mimetype !== "image/jpeg" &&
      file.mimetype !== "image/png" &&
      file.mimetype !== "image/jpg"
    ) {
      removeTmp(file.tempFilePath);
      return res.status(400).json({ msg: "file không đúng định dạng" });
    }

    //uplaod file lên clodinary

    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      { folder: "nienluan" },
      async (err, result) => {
        if (err) throw err;
        removeTmp(file.tempFilePath);

        res.json({ public_id: result.public_id, url: result.secure_url });
      }
    );

    // req.files.map((file) => {
    //   console.log(file);
    //   new Promise((resolve, reject) => {
    //     cloudinary.UploadMultiple(file).then((result) => {
    //       resolve(result);
    //     });
    //   });
    // });

    //res.json("testuplpad");
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

router.post("/delete-img", auth, authAdmin, (req, res) => {
  try {
    const { public_id } = req.body;
    if (!public_id) return res.status(400).json({ msg: "No image selected" });
    cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
      if (err) throw err;
      res.json({ msg: "Deleted image" });
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
module.exports = router;
