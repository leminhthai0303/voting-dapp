// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
 
contract Voting {
    struct Voter {
        uint id;
        bool isVoted;
        bool isPrivileged;
    }
 
    struct Candidate {
        string name;
        uint id;
        uint voteCount;
    }
 
    address[] public privilegedVoters;
    mapping(address => Voter) public voters;
    Candidate[] public candidates;
 
    constructor(address[] memory _privilegedVoters) {
        for (uint i = 0; i < _privilegedVoters.length; i++) {
            voters[_privilegedVoters[i]] = Voter(i, false, true);
            privilegedVoters.push(_privilegedVoters[i]);
        }
    }
 
    function addCandidate(string memory _name) public {
        candidates.push(Candidate(_name, candidates.length, 0));
    }
 
    function vote(uint _candidateId) public {
        require(voters[msg.sender].isPrivileged, "You do not have the right to vote");
        require(!voters[msg.sender].isVoted, "You have already voted");
 
        voters[msg.sender].isVoted = true;
        candidates[_candidateId].voteCount++;
    }
 
    function getCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }
 
    function getVoteCount(uint _candidateId) public view returns (uint) {
        return candidates[_candidateId].voteCount;
    }
}
