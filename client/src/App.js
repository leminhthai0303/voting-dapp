import React, { useEffect, useState } from 'react';
import web3 from './web3';
import contract from './Voting';

function App() {
  const [candidates, setCandidates] = useState([]);
  const [newCandidate, setNewCandidate] = useState('');
  const [account, setAccount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadCandidates = async () => {
      try {
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);

        const candidates = await contract.methods.getCandidates().call();
        setCandidates(candidates);
      } catch (error) {
        console.error('Error loading candidates:', error);
        setErrorMessage('Error loading candidates.');
      }
    };

    loadCandidates();
  }, []);

  const addCandidate = async () => {
    setErrorMessage('');
    try {
      await contract.methods.addCandidate(newCandidate).send({ from: account });
      const candidates = await contract.methods.getCandidates().call();
      setCandidates(candidates);
      setNewCandidate('');
    } catch (error) {
      console.error('Error adding candidate:', error);
      setErrorMessage('Error adding candidate. Make sure you are privileged to add candidates.');
    }
  };

  const vote = async (id) => {
    setErrorMessage('');
    try {
      await contract.methods.vote(id).send({ from: account });
      const candidates = await contract.methods.getCandidates().call();
      setCandidates(candidates);
    } catch (error) {
      console.error('Error voting:', error);
      setErrorMessage('Error casting vote. You may have already voted or are not privileged.');
    }
  };

  return (
    <div>
      <h1>Voting DApp</h1>

      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

      <h2>Add a Candidate</h2>
      <input 
        value={newCandidate} 
        onChange={e => setNewCandidate(e.target.value)} 
        placeholder="Candidate name" 
      />
      <button onClick={addCandidate}>Add Candidate</button>

      <h2>Current Candidates</h2>
      <ul>
        {candidates.map((candidate, index) => (
          <li key={index}>
            {candidate.name} - {candidate.voteCount} votes
            <button onClick={() => vote(candidate.id)}>Vote</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
