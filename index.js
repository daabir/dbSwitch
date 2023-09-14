//imports
const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');

//middleware
app.use(cors());
app.use(express.json());
dotenv.config();

