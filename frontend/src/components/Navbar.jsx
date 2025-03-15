import { Link } from "react-router-dom";
import { createAppKit } from '@reown/appkit/react'
import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { celoAlfajores } from '@reown/appkit/networks'

// 1. Get projectId
const projectId = 'YOUR_PROJECT_ID'

// 2. Set the networks
const networks = [celoAlfajores]

// 3. Create a metadata object - optional
const metadata = {
  name: 'My Website',
  description: 'My Website description',
  url: 'https://mywebsite.com', // origin must match your domain & subdomain
  icons: ['https://avatars.mywebsite.com/']
}

// 4. Create a AppKit instance
createAppKit({
  adapters: [new EthersAdapter()],
  networks,
  metadata,
  projectId,
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  }
})

function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-indigo-600">
              ZK Feed
            </Link>
          </div>
          <div className="flex items-center">
          <appkit-button />
            <Link
              to="/generate-identity"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded"
            >
              Launch App
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
