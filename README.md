# HelixAI
A decentralized data sharing and querying platform for users to commercialize their healthcare data and institutions to get comprehensive data insights.
Features:
- Users can turn on the data sharing function to earn token rewards (while the app collects data in the background, it never accesses user identity thus privacy is ensured)
- After collecting the data, use AI federated learning to get data insights from the dataset, the specific information is never exposed, thus when other users wants to get data insights, they directly query the model instead of accessing the original datasets.


## Environmental Setup
- install all dependencies
```bash
cd ..
npm install
```
for frontend:
```bash
cd frontend
npm install
```
*** note that to install new dependencies/libraries to avoid conflicts please use yarn add.

- replace the environmental variables with the correct values
  
- install hardhat
(Here we use yarn package manager)
```bash
yarn add hardhat
npx hardhat
```
- compile smart contracts
```bash
npx hardhat compile
```
- smart contracts abi files
makesure you have the correct .json files for smart contracts in 


## Run the app
- run frontend
```

