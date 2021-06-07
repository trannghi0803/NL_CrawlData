const router = require("express").Router();
const quanhuyenCtrl = require("../controllers/quanhuyenCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router
  .route("/quanhuyen")
  .get(quanhuyenCtrl.getQuanHuyen)
  .post(auth, authAdmin, quanhuyenCtrl.createQuanHuyen);
router
  .route("/quanhuyen/:id")
  .delete(auth, authAdmin, quanhuyenCtrl.deleteQuanHuyen)
  .put(auth, authAdmin, quanhuyenCtrl.updateQuanHuyen);

module.exports = router;
