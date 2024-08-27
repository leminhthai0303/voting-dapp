# Voting System DApp Setup Guide

## Overview

This guide will walk you through the steps to set up and run the Voting System Decentralized Application (DApp) on your local machine. Follow these steps to clone the project, compile and deploy the smart contracts, and start the client application.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (includes npm)
- [Truffle Suite](https://www.trufflesuite.com/truffle)
- [Ganache](https://www.trufflesuite.com/ganache) (for local Ethereum blockchain)

## Steps to Set Up the Voting System DApp

### 1. Clone the Project Repository

Start by cloning the repository containing the Voting System DApp:

```bash
git clone git@github.com:leminhthai0303/voting-dapp.git

```

### 2. Compile and Migrate Smart Contracts

Navigate to the project directory:

```bash
cd voting-dapp

```

Deploy the smart contracts to the local blockchain:

```bash
truffle migrate --reset

```

The `--reset` flag ensures that all migrations are re-run from scratch, which is useful for setting up a fresh development environment.

Compile the smart contracts:

```bash
truffle compile

```

### 3. Deploy the Contracts

If you need to deploy the contracts specifically (if not automatically done by the migrate command), use:

```bash
truffle deploy

```

This step might not be necessary if you have already run `truffle migrate`.

### 4. Set Up the Client Application

Navigate to the client directory:

```bash
cd client

```

Copy the compiled smart contract ABI and address file to the client’s `src` directory:

```bash
cp ../build/contracts/Voting.json ./src/

```

This file is necessary for the client-side application to interact with the smart contracts.

### 5. Start the Client Application

Run the following command to start the client application:

```bash
npm start

```

This will start the React development server and open the DApp in your default web browser.

## Troubleshooting

If you encounter issues during the setup process, consider the following troubleshooting tips:

- **Ensure Truffle and Node.js are properly installed:** Verify that you have the latest versions of Truffle and Node.js installed.
- **Check for errors in the console:** Look at the terminal or command prompt output for error messages that can guide you in resolving issues.
- **Ensure Ganache is running:** Make sure Ganache is up and running, or that your local blockchain environment is properly configured.

## Conclusion

You have successfully set up and started the Voting System DApp. You can now interact with the voting system through the client interface, add candidates, and cast votes. If you need further customization or additional features, you can modify the smart contracts and client application accordingly.

For more details on Truffle or React, refer to their respective documentation:

- [Truffle Documentation](https://www.trufflesuite.com/docs/truffle/overview)
- [React Documentation](https://reactjs.org/docs/getting-started.html)