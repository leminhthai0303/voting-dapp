@echo off

truffle migrate --reset && truffle compile && truffle deploy && cd client && copy ..\build\contracts\Voting.json .\src\ && npm start
