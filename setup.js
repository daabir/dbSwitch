//imports
const readline = require('readline');
const fs = require('fs');
const { exec } = require('child_process');

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
        const writeData = `
            const sql = require('mssql');
            const sqlConfig = {
                user: process.env.USER,
                password: process.env.PASSWORD,
                database: process.env.DB,
                server: process.env.SERVER,
                pool: {
                    max: 10,
                    min: 0,
                    idleTimeoutMillis: 30000
                },
                options: {
                    encrypt: true, // for azure
                    trustServerCertificate: false // change to true for local dev / self-signed certs
                }
            };
            const connect = async() => {
                try{
                    await sql.connect(sqlConfig);
                    console.log('Connected to MSSQL DB');
                }catch(err){
                    console.error(err);
                }
            }
            app.listen(4000,()=>{
                console.log("Connected to api")
                connect()
            })`
        fs.appendFileSync('index.js', writeData,{flag: 'a'});
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
        const writeData = `
            const mysql = require('mysql');
            const connection = mysql.createConnection({
                host: process.env.HOST,
                user: process.env.USER,
                password: process.env.PASSWORD,
                database: process.env.DB 
            });

            connection.connect((err) => { //you can create an async function for this as well.
                if (err) {
                    console.error('Error connecting to MySQL database: ' + err.stack);
                    return;
                }
                console.log('Connected to MySQL database as id ' + connection.threadId);
            });
            app.listen(4000,()=>{
                console.log("Connected to api")
            })`
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
        const writeData = `
            const mongoose = require('mongoose');
            const connect = async() => { //call this function to connect.
                try{
                    await mongoose.connect(process.env.MONGO_URI);
                    console.log('Connected to MongoDB');
                }catch(err){
                    console.error(err);
                }
            }
            app.listen(4000,()=>{
                console.log("Connected to api")
                connect()
            })`
        fs.appendFileSync('index.js', writeData, {flag: 'a'});
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
        const writeData = `
            const { Client } = require('pg');

            const client = new Client({
                user: process.env.USER,
                host: process.env.HOST,
                database: process.env.DB,
                password: process.env.PASSWORD,
                port: 5432, // Default PostgreSQL port
            });
            
            client.connect()
            .then(() => console.log('Connected to PostgreSQL database'))
            .catch(err => console.error('Error connecting to PostgreSQL database', err));
            
            app.listen(4000,()=>{
                console.log("Connected to api")
            })`
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

function setUpEnv(inputVal){
    if(inputVal == "1"){
        console.log("Time to set up the env file. Please enter the details when asked.\n")
        rl.question("Please enter the username:\n", (answer) => {

        });
        rl.question("Please enter the password:\n", (answer) => {

        });
    }
}