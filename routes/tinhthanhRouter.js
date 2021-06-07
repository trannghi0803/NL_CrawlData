const router = require("express").Router();
const tinhthanhCtrl = require("../controllers/tinhthanhCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router
  .route("/tinhthanh")
  .get(tinhthanhCtrl.getTinhThanh)
  .post(auth, authAdmin, tinhthanhCtrl.createTinhThanh);
router
  .route("/tinhthanh/:id")
  .delete(auth, authAdmin, tinhthanhCtrl.deleteTinhThanh)
  .put(auth, authAdmin, tinhthanhCtrl.updateTinhThanh);
module.exports = router;
