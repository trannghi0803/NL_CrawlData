const router = require("express").Router();
const hinhthucCtrl = require("../controllers/hinhthucCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router
  .route("/hinhthuc")
  .get(hinhthucCtrl.getHinhThuc)
  .post(auth, authAdmin, hinhthucCtrl.createHinhThuc);
router
  .route("/hinhthuc/:id")
  .delete(auth, authAdmin, hinhthucCtrl.deleteHinhThuc)
  .put(auth, authAdmin, hinhthucCtrl.updateHinhThuc);
module.exports = router;
