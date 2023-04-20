const router = require("express").Router();
const apiRoutes = require("./api");

router.use("/api", apiRoutes);

router.use((req, res) => {
  console.log(req.query);
  res.redirect("https://socialpet.herokuapp.com");
});

module.exports = router;
