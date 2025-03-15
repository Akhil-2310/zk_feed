import { getUserIdentifier, SelfBackendVerifier, countryCodes } from '@selfxyz/core';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { proof, publicSignals } = req.body;

      if (!proof || !publicSignals) {
        return res.status(400).json({ message: 'Proof and publicSignals are required' });
      }

      // Extract user ID from the proof
      const userId = await getUserIdentifier(publicSignals);
      console.log("Extracted userId:", userId);

      // Initialize and configure the verifier
      const selfBackendVerifier = new SelfBackendVerifier(
        'https://forno.celo.org',
        'zk-feed'
      );
      
      // Configure verification options
      selfBackendVerifier.setMinimumAge(18);
      selfBackendVerifier.excludeCountries(
        countryCodes.IRN,   // Iran
        countryCodes.PRK    // North Korea
      );
      selfBackendVerifier.enableNameAndDobOfacCheck();

      // Verify the proof
      const result = await selfBackendVerifier.verify(proof, publicSignals);
      
      if (result.isValid) {
        // Return successful verification response
        return res.status(200).json({
          status: 'success',
          result: true,
          credentialSubject: result.credentialSubject
        });
      } else {
        // Return failed verification response
        return res.status(400).json({
          status: 'error',
          result: false,
          message: 'Verification failed',
          details: result.isValidDetails
        });
      }
    } catch (error) {
      console.error('Error verifying proof:', error);
      return res.status(500).json({
        status: 'error',
        result: false,
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}

