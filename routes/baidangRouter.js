const router = require("express").Router();
const baidangCtrl = require("../controllers/baidangCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router
  .route("/baidang")
  .get(baidangCtrl.getBaiDang)
  .post(auth, authAdmin, baidangCtrl.createBaiDang);
router
  .route("/baidang/:id")
  .delete(auth, authAdmin, baidangCtrl.deleteBaiDang)
  .put(auth, authAdmin, baidangCtrl.updateBaiDang);

module.exports = router;
