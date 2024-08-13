import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import walletRoutes from "./routes/walletRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import tokenRoutes from "./routes/tokenRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import {WalletInfra, AuthProvider} from "@brillionfi/wallet-infra-sdk";

dotenv.config();

const app = express();
app.use(express.json());

const baseUrl = process.env.BASE_URL;
const redirectUrl =
  process.env.REDIRECT_URL || "https://o-auth2-mock-server.vercel.app";
const appId = process.env.APP_ID || "312c8442-23a5-4c62-b260-a74b16bb068f";
const PORT = process.env.PORT || 8000;

const sdk = new WalletInfra(appId, baseUrl);
const url = sdk.generateAuthUrl(redirectUrl, AuthProvider.SANDBOX);

const getJwt = async () => {
  try {
    const response = await axios.get(url);
    return response.data.jwt;
  } catch (error) {
    console.error("Error in SDK call:", error);
    return null;
  }
};

const refreshJwt = async () => {
  const jwt = await getJwt();
  if (jwt) {
    sdk.authenticateUser(jwt);
  } else {
    console.error("Failed to refresh JWT for SDK authentication.");
  }
};

(async () => {
  await refreshJwt();
  setInterval(refreshJwt, 50 * 60 * 1000);
})();

app.use((req, res, next) => {
  req.sdk = sdk;
  next();
});

app.use("/wallets", walletRoutes);
app.use("/transactions", transactionRoutes);
app.use("/tokens", tokenRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
