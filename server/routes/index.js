const router = require("express").Router();
const apiRoutes = require("./api");
const pagesRoutes = require("./pages");

router.use("/api", apiRoutes);
router.use("/", pagesRoutes);

router.use((req, res) => res.send("Wrong Route!"));

module.exports = router;
