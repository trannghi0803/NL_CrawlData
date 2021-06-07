const router = require("express").Router();
const loaitindangCtrl = require("../controllers/loaitindangCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router
  .route("/loaitindang")
  .get(loaitindangCtrl.getLoaiTinDang)
  .post(auth, authAdmin, loaitindangCtrl.createLoaiTinDang);
router
  .route("/loaitindang/:id")
  .delete(auth, authAdmin, loaitindangCtrl.deleteLoaiTinDang)
  .put(auth, authAdmin, loaitindangCtrl.updateLoaiTinDang);

module.exports = router;
