import express from "express";

const router = express.Router();

router.get("/gms-redirect", async (req, res) => {
  res.send("/gms-redirect");
});

export default router;
