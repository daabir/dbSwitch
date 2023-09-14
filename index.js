const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const choices = ['1', '2', '3', '4'];
var selectedOption = null;
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