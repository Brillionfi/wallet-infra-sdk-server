import express from "express";

const router = express.Router();

// Create Wallet
router.post("/", async (req, res, next) => {
  try {
    const result = await req.sdk.Wallet.createWallet(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// Get Wallets
router.get("/", async (req, res, next) => {
  try {
    const result = await req.sdk.Wallet.getWallets();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// Get Wallet Nonce
router.get("/:address/chains/:chainId/nonce", async (req, res, next) => {
  try {
    const result = await req.sdk.Wallet.getNonce(
      req.params.address,
      req.params.chainId
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// Set Gas Config
router.post("/:address/chains/:chainId/gas-station", async (req, res, next) => {
  try {
    const result = await req.sdk.Wallet.setGasConfig(
      req.params.address,
      req.params.chainId,
      req.body
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// Get Gas Config
router.get("/:address/chains/:chainId/gas-station", async (req, res, next) => {
  try {
    const result = await req.sdk.Wallet.getGasConfig(
      req.params.address,
      req.params.chainId
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// Get Wallet Portfolio
router.get("/portfolio/:address/:chainId", async (req, res, next) => {
  try {
    const result = await req.sdk.Wallet.getPortfolio(
      req.params.address,
      req.params.chainId
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// Get Transaction History
router.get("/:address/chains/:chainId/transactions", async (req, res, next) => {
  try {
    const result = await req.sdk.Wallet.getTransactionHistory(
      req.params.address,
      req.params.chainId
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// Sign Transaction
router.post("/:address/sign", async (req, res, next) => {
  try {
    const result = await req.sdk.Wallet.signTransaction(
      req.params.address,
      req.body.data,
      req.body.origin
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// wallet recovery  init
router.post("/recovery", async (req, res, next) => {
  try {
    const result = await req.sdk.Wallet.initRecovery();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// wallet recover execute
router.post("/recovery/execute", async (req, res, next) => {
  try {
    const result = await req.sdk.Wallet.execRecovery(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default router;
