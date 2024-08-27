import React, { useEffect, useState } from 'react';
import web3 from './web3';
import contract from './Voting';
import './App.css';  // Import the CSS file

function App() {
  const [candidates, setCandidates] = useState([]);
  const [newCandidate, setNewCandidate] = useState('');
  const [account, setAccount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const loadCandidates = async () => {
      setLoading(true);
      try {
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);

        const candidates = await contract.methods.getCandidates().call();
        setCandidates(candidates);
      } catch (error) {
        console.error('Error loading candidates:', error);
        setErrorMessage('Error loading candidates.');
      }
      setLoading(false);
    };

    loadCandidates();
  }, []);

  const addCandidate = async () => {
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);
    try {
      await contract.methods.addCandidate(newCandidate).send({ from: account });

      const updatedCandidates = await contract.methods.getCandidates().call();
      setCandidates(updatedCandidates);
      setNewCandidate('');
      setSuccessMessage('Candidate added successfully!');
    } catch (error) {
      console.error('Error adding candidate:', error);
      setErrorMessage('Error adding candidate. You may not be privileged.');
    }
    setLoading(false);
  };

  const vote = async (id) => {
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);
    try {
      await contract.methods.vote(id).send({ from: account });

      const updatedCandidates = await contract.methods.getCandidates().call();
      setCandidates(updatedCandidates);
      setSuccessMessage('Vote cast successfully!');
    } catch (error) {
      console.error('Error voting:', error);
      setErrorMessage('Error casting vote. You may have already voted or are not privileged.');
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h1 className="title">Voting DApp</h1>

      {/* Display success and error messages */}
      {successMessage && <div className="successMessage">{successMessage}</div>}
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}

      {/* Form to add a new candidate */}
      <div className="form">
        <h2>Add a New Candidate</h2>
        <input
          type="text"
          value={newCandidate}
          onChange={(e) => setNewCandidate(e.target.value)}
          placeholder="Enter candidate name"
          className="input"
        />
        <button onClick={addCandidate} className="button" disabled={loading}>
          {loading ? 'Adding...' : 'Add Candidate'}
        </button>
      </div>

      {/* List of candidates */}
      <div className="candidatesList">
        <h2>Current Candidates</h2>
        {loading ? (
          <p>Loading candidates...</p>
        ) : candidates.length > 0 ? (
          <ul className="list">
            {candidates.map((candidate, index) => (
              <li key={index} className="listItem">
                {`ID: ${candidate.id} | Name: ${candidate.name} | Votes: ${candidate.voteCount}`}
                <button
                  onClick={() => vote(candidate.id)}
                  className="voteButton"
                  disabled={loading}
                >
                  {loading ? 'Voting...' : 'Vote'}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No candidates available.</p>
        )}
      </div>
    </div>
  );
}

export default App;
