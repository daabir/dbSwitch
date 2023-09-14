//imports
const express = require('express');
const cors = require('cors');
const app = express();
const readline = require('readline');
const dotenv = require('dotenv');

//middleware
app.use(cors());
app.use(express.json());
dotenv.config();

//read values from terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var selectedOption = null; //option selected by user

const choices = ['1', '2', '3', '4']; //to validate selection by user

function initDB() {
    rl.question("Select your database(1,2,3 or 4): \n\t1.MSSQL\n\t2.MySQL\n\t3.MongoDB\n\t4.PostgreSQL\n", (answer) => {
        if (!choices.includes(answer)) {
            console.log("Please enter a valid choice.")
            initDB()
        } else {
            selectedOption = answer;
            // console.log("you selected:", selectedOption);
            rl.close();

        }
    })
}
if (selectedOption == null){
    initDB()
}

function setUpDB(inputVal){
    if (inputVal == 1){

    }
}