import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const mockGroup = {
  id: 1,
  name: 'Project Feedback',
  description: 'Provide anonymous feedback for our latest project.',
  proposals: [
    { id: 1, title: 'Improve UI/UX', description: 'We should focus on improving the user interface and experience.' },
    { id: 2, title: 'Add New Feature', description: 'Let\'s add a new feature to attract more users.' },
  ],
};

function ViewGroup() {
  const { id } = useParams();
  const [newProposal, setNewProposal] = useState({ title: '', description: '' });
  const [showNewProposalForm, setShowNewProposalForm] = useState(false);

  const handleCreateProposal = (e) => {
    e.preventDefault();
    // Simulate proposal creation
    toast.success('Proposal created successfully!');
    setNewProposal({ title: '', description: '' });
    setShowNewProposalForm(false);
  };

  const handleVote = (proposalId, vote) => {
    // Simulate voting
    toast.success(`Voted ${vote} on proposal ${proposalId}`);
  };

  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl text-center mb-8">
        {mockGroup.name}
      </h1>
      <p className="text-xl text-gray-600 text-center mb-8">{mockGroup.description}</p>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Proposals</h2>
        {mockGroup.proposals.map((proposal) => (
          <div key={proposal.id} className="bg-white shadow-md rounded-lg p-6 mb-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{proposal.title}</h3>
            <p className="text-gray-600 mb-4">{proposal.description}</p>
            <div className="flex space-x-4">
              <button
                onClick={() => handleVote(proposal.id, 'yes')}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              >
                Vote Yes
              </button>
              <button
                onClick={() => handleVote(proposal.id, 'no')}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                Vote No
              </button>
            </div>
          </div>
        ))}
      </div>

      {!showNewProposalForm && (
        <button
          onClick={() => setShowNewProposalForm(true)}
          className="mb-8 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create New Proposal
        </button>
      )}

      {showNewProposalForm && (
        <form onSubmit={handleCreateProposal} className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Create New Proposal</h2>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={newProposal.title}
              onChange={(e) => setNewProposal({ ...newProposal, title: e.target.value })}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={newProposal.description}
              onChange={(e) => setNewProposal({ ...newProposal, description: e.target.value })}
              required
              rows="4"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            ></textarea>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setShowNewProposalForm(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Proposal
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default ViewGroup;

