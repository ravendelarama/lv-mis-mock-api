import express from "express";

const router = express.Router();

router.get("/sams-redirect", (req, res) => {
  res.send("/sams-redirect");
});

export default router;
