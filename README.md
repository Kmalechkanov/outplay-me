# OutPlayMe!
### - Single page application
### - Multiplayer
  - requires 2 players
### - Build with React
### - Technologies
  - websocket (socket.io)
  - restapi (express.js)

## Setup & Run
### Setup react server
  - cd client
  - npm install
  - notepad package.json (change manually 'db' script path)
  - notepad src/Constants.js (change manually 'UserAPIUrl' and 'ServerUrl')
  - cd ..
### Setup express server
  - cd server
  - npm install
  - notepad config/default.json (change manually)
  - cd ..
### Setup auth server
  - cd ..
  - mkdir rest-auth
  - git clone https://github.com/Kmalechkanov/rest-auth.git
  - npm install
  - notepad config/default.json (change manually)
## Run
  - To run all applications simply locate to client directory and run
  - npm run all

## Project for softuni.bg React course