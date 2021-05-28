# solar-dashboard
BHCI x Solbridge Solar Dashboard

After cloning the repo to your local machine:

### Installation
Inside `client` folder, delete node_modules and package-lock.json if exist, then open terminal and run
```bash
cd <project_directory>/client

npm install
```

or alternatively double click on 
`update_npm.sh` file


Likewise, inside `api` folder follow the same process and run
```bash
cd <project_directory>/client

npm install
```

or alternatively double click on 
`update_npm.sh` file


### 1. Start the Server
Start backend server inside `api` directory run in terminal
```bash
npm start
```

or alternatively double click on
`start_server.sh`


### 2. Start the Client
Start React app inside `client` run in terminal
```bash
npm start
```

or alternatively double click on
`start_client.sh`

This should start up a browser with `localhost:8000`. If nothing shows up, manually type in `localhost:8000` on a internet browser.


### Development
#### Linter
Inside `client` run
```bash
npx eslint . --fix
```
