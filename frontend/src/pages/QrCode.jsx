import {React, useState, useEffect} from 'react'
import SelfQRcodeWrapper, { SelfAppBuilder, SelfQRcode } from '@selfxyz/qrcode';
import { v4 as uuidv4 } from 'uuid';

const QrCode = () => {

    const [userId, setUserId] = useState(null);

    useEffect(() => {
        // Generate a user ID when the component mounts
        setUserId(uuidv4());
      }, []);
    
      if (!userId) return null;
// Create a SelfApp instance using the builder pattern
const selfApp = new SelfAppBuilder({
  appName: "My App",
  scope: "zk-feed", 
  endpoint: "http://localhost:5173/api/verify",
  logoBase64: "<base64EncodedLogo>", // Optional
  userId,
  // Optional disclosure requirements
  disclosures: {
    // DG1 disclosures
    nationality: true,
    // Custom verification rules
    minimumAge: 18,
    excludedCountries: ["IRN", "PRK"],
    ofac: true,
  },
}).build();

  return (
    <>
     <div className="verification-container">
      <h1>Verify Your Identity</h1>
      <p>Scan this QR code with the Self app to verify your identity</p>
    <SelfQRcode
      selfApp={selfApp}
      onSuccess={() => {
        console.log('Verification successful');
        // Perform actions after successful verification
      }}
      darkMode={false} // Optional: set to true for dark mode
      size={300} // Optional: customize QR code size (default: 300)
    />
     <p className="text-sm text-gray-500">
        User ID: {userId.substring(0, 8)}...
      </p>
    </div>
    </>
  )
}

export default QrCode