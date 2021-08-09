# solar-dashboard
BHCI x Solbridge Solar Dashboard

After cloning the repo to your local machine:

### Installation
#### 1. Install node modules
First step is to install the latest node modules. You can refer to [download link](https://nodejs.org/en/download/)

#### 2. Install Database
1. Install and Run MongoDB Server
To create an account and view the dashboard we must setup the database. For more information on installation
https://zellwk.com/blog/install-mongodb/


2. Install HomeBrew
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

3. Install MongoDB
```bash
brew tap mongodb/brew
brew install mongodb-community@4.0
```

4. Setup Permissions for Database
```bash
sudo mkdir -p /System/Volumes/Data/data/db
sudo chown -R `id -un` /System/Volumes/Data/data/db
```

5. Run MongoDB
```bash
brew services run mongodb-community
```


If everything goes right, you can type 

```bash
brew services list
```

and you will see a server running


### Automatic Starting
#### 1. Enabling clicking script file instead of using terminal
Open terminal app. Navigate to the project root directory in the terminal. And paste the following code:
```bash
chmod a+x start_server.sh
chmod a+x start_client.sh
```

This changes the admin setting for the `start_server.sh` and `start_client.sh` files so that you can simply double click the scripts to start the project.

Now you can close the terminal, and navigate to the project directory and double click on `start_server.sh`, and then `start_client.sh` to start the project.

##### 1.1 If double clicking does not work
If double clicking does not work, in the terminal in the project directory, run
```bash
bash start_server.sh
```

and then open another terminal and run
```bash
bash start_client.sh
```


### Manual Starting
#### 1. Start the server app
Inside `/api` folder, delete node_modules and package-lock.json if exist (you only need to run this first time), then open terminal and run
```bash
npm install
node index.js
```


#### 2. Start the client app
Likewise, inside `/client` folder follow the same process and run
```bash
npm install
npm start
```

This should start up a browser with `localhost:3000`. If nothing shows up, manually type in `localhost:8000` on a internet browser.


### Development
#### Linter
Inside `client` run
```bash
npx eslint . --fix
```
