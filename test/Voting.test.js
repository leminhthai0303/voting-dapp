const Voting = artifacts.require("Voting");

contract("Voting", (accounts) => {
    let votingInstance;
    const privilegedVoters = [accounts[0], accounts[1]];
    const nonPrivilegedVoter = accounts[2];

    beforeEach(async () => {
        votingInstance = await Voting.new(privilegedVoters);
    });

    it("should initialize with correct privileged voters", async () => {
        const voter0 = await votingInstance.voters(privilegedVoters[0]);
        const voter1 = await votingInstance.voters(privilegedVoters[1]);

        assert.equal(voter0.isPrivileged, true, "Account 0 should be privileged");
        assert.equal(voter1.isPrivileged, true, "Account 1 should be privileged");
    });

    it("should add a candidate", async () => {
        await votingInstance.addCandidate("Alice");
        const candidates = await votingInstance.getCandidates();

        assert.equal(candidates.length, 1, "There should be one candidate");
        assert.equal(candidates[0].name, "Alice", "The candidate's name should be Alice");
    });

    it("should allow a privileged voter to vote", async () => {
        await votingInstance.addCandidate("Alice");
        await votingInstance.vote(0, { from: privilegedVoters[0] });

        const voter = await votingInstance.voters(privilegedVoters[0]);
        const voteCount = await votingInstance.getVoteCount(0);

        assert.equal(voter.isVoted, true, "Voter should be marked as voted");
        assert.equal(voteCount, 1, "Vote count for candidate should be 1");
    });

    it("should not allow a non-privileged voter to vote", async () => {
        await votingInstance.addCandidate("Alice");

        try {
            await votingInstance.vote(0, { from: nonPrivilegedVoter });
            assert.fail("Non-privileged voter should not be able to vote");
        } catch (error) {
            assert.include(error.message, "You do not have the right to vote", "Expected error was not received");
        }

        const voteCount = await votingInstance.getVoteCount(0);
        assert.equal(voteCount, 0, "Vote count should remain 0");
    });

    it("should not allow a voter to vote more than once", async () => {
        await votingInstance.addCandidate("Alice");
        await votingInstance.vote(0, { from: privilegedVoters[0] });

        try {
            await votingInstance.vote(0, { from: privilegedVoters[0] });
            assert.fail("Voter should not be able to vote more than once");
        } catch (error) {
            assert.include(error.message, "You have already voted", "Expected error was not received");
        }

        const voteCount = await votingInstance.getVoteCount(0);
        assert.equal(voteCount, 1, "Vote count should remain 1");
    });
});
