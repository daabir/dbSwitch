//imports
const express = require('express');
const cors = require('cors');
const app = express();
const readline = require('readline');
const dotenv = require('dotenv');
const fs = require('fs');
const { exec } = require('child_process');

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
            setUpDB(selectedOption);
            rl.close();
        }
    })
}
if (selectedOption == null){
    initDB()
}

function setUpDB(inputVal){
    if (inputVal == '1'){
        // fs.appendFileSync('index.js',"const sql = require('mssql')",{flag: 'a'});
        exec('npm install mssql', (error, stdout, stderr)=>{
            if(error){
                console.log(`Error: ${error.message}`)
                return;
            }
            if(stderr){
                console.log(`Error: ${stderr}`)
            }
            console.log(`Output:${stdout}`);
        })
    } 
    if (inputVal == '2'){
        const writeData = 
            `const mysql = require('mysql');
            const connection = mysql.createConnection({
                host: process.env.HOST,
                user: process.env.USER,
                password: process.env.PASSWORD,
                database: process.env.DB 
            });

            connection.connect((err) => {
                if (err) {
                    console.error('Error connecting to MySQL database: ' + err.stack);
                    return;
                }
                console.log('Connected to MySQL database as id ' + connection.threadId);
            });`
        fs.appendFileSync('index.js', writeData, {flag: 'a'});
        exec('npm install mysql', (error, stdout, stderr)=>{
            if(error){
                console.log(`Error: ${error.message}`)
                return;
            }
            if(stderr){
                console.log(`Error: ${stderr}`)
            }
            console.log(`Output:${stdout}`);
        })
    }
    if (inputVal == '3'){
        exec('npm install mongoose', (error, stdout, stderr)=>{
            if(error){
                console.log(`Error: ${error.message}`)
                return;
            }
            if(stderr){
                console.log(`Error: ${stderr}`)
            }
            console.log(`Output:${stdout}`);
        })
    }
    if (inputVal == '4'){
        exec('npm install pg', (error, stdout, stderr)=>{
            if(error){
                console.log(`Error: ${error.message}`)
                return;
            }
            if(stderr){
                console.log(`Error: ${stderr}`)
            }
            console.log(`Output:${stdout}`);
        })
    }
};