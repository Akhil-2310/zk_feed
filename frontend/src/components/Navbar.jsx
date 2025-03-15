import { Link } from "react-router-dom";

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
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded mr-4">
              Connect Wallet
            </button>
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
