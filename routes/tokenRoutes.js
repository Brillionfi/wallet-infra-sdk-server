import express from "express";

const router = express.Router();

// Get Tokens
router.get("/:chainId", async (req, res, next) => {
  try {
    const result = await req.sdk.Token.getTokens(req.params.chainId);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default router;
