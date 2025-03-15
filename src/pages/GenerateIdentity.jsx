import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Identity } from "@semaphore-protocol/identity";

function GenerateIdentity() {
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();

  const handleGenerateIdentity = () => {
    setIsGenerating(true);

    // Simulate identity generation
      const identity = new Identity(); // Generate a Semaphore identity
      const identityCommitment = identity.commitment.toString(); // Extract the identity commitment

      // Store identity commitment in local storage
      localStorage.setItem("zk-identity", JSON.stringify(identityCommitment));

      setIsGenerating(false);

      // Display identity in toast
      toast.success(
        `Identity generated successfully! Commitment: ${identityCommitment}`
      );

      // Navigate to the next page
      navigate("/create-group");
  };

  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Generate Your ZK Identity
        </h1>
        <p className="mt-4 text-lg text-gray-500">
          Create a secure, anonymous identity to participate in ZK Feed.
        </p>
        <button
          onClick={handleGenerateIdentity}
          disabled={isGenerating}
          className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {isGenerating ? "Generating..." : "Generate Identity"}
        </button>
      </div>
    </div>
  );
}

export default GenerateIdentity;
