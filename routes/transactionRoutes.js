import express from "express";

const router = express.Router();

// Create Transaction
router.post("/", async (req, res, next) => {
  try {
    const result = await req.sdk.Transaction.createTransaction(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// get Transaction
router.get("/:id", async (req, res, next) => {
  try {
    const result = await req.sdk.Transaction.getTransactionById(req.params.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// cancel transaction
router.put("/:id/cancel", async (req, res, next) => {
  try {
    const result = await req.sdk.Transaction.cancelTransaction(req.params.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// approveSignTransaction
router.post("/:id/approve", async (req, res, next) => {
  try {
    const result = await req.sdk.Transaction.approveSignTransaction(
      req.params.id,
      req.body.organizationId,
      req.body.fingerPrint,
      req.body.origin
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// rejectSignTransaction
router.post("/:id/reject", async (req, res, next) => {
  try {
    const result = await req.sdk.Transaction.rejectSignTransaction(
      req.params.id,
      req.body.organizationId,
      req.body.fingerPrint,
      req.body.origin
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default router;
