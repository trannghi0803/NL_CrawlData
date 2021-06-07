const router = require("express").Router();
const phuongxaCtrl = require("../controllers/phuongxaCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router
  .route("/phuongxa")
  .get(phuongxaCtrl.getPhuongXa)
  .post(auth, authAdmin, phuongxaCtrl.createPhuongXa);
router
  .route("/phuongxa/:id")
  .delete(auth, authAdmin, phuongxaCtrl.deletePhuongXa)
  .put(auth, authAdmin, phuongxaCtrl.updatePhuongXa);

module.exports = router;
