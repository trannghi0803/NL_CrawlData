const router = require("express").Router();
const duongphoCtrl = require("../controllers/duongphoCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router
  .route("/duongpho")
  .get(duongphoCtrl.getDuongPho)
  .post(auth, authAdmin, duongphoCtrl.createDuongPho);
router
  .route("/duongpho/:id")
  .delete(auth, authAdmin, duongphoCtrl.deleteDuongPho)
  .put(auth, authAdmin, duongphoCtrl.updateDuongPho);

module.exports = router;
