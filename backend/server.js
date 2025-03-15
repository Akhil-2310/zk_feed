import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { getUserIdentifier, SelfBackendVerifier, countryCodes } from "@selfxyz/core";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

// API route for proof verification
app.post("/api/verify", async (req, res) => {
  try {
    const { proof, publicSignals } = req.body;

    if (!proof || !publicSignals) {
      return res.status(400).json({ message: "Proof and publicSignals are required" });
    }

    // Extract user ID from the proof
    const userId = await getUserIdentifier(publicSignals);
    console.log("Extracted userId:", userId);

    // Initialize the verifier
    const selfBackendVerifier = new SelfBackendVerifier(
      "https://forno.celo.org",
      "zk-feed"
    );

    // Configure verification options
    selfBackendVerifier.setMinimumAge(18);
    selfBackendVerifier.excludeCountries(countryCodes.IRN, countryCodes.PRK);
    selfBackendVerifier.enableNameAndDobOfacCheck();

    // Verify the proof
    const result = await selfBackendVerifier.verify(proof, publicSignals);

    if (result.isValid) {
      return res.status(200).json({
        status: "success",
        result: true,
        credentialSubject: result.credentialSubject,
      });
    } else {
      return res.status(400).json({
        status: "error",
        result: false,
        message: "Verification failed",
        details: result.isValidDetails,
      });
    }
  } catch (error) {
    console.error("Error verifying proof:", error);
    return res.status(500).json({
      status: "error",
      result: false,
      message: error.message || "Unknown error",
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
