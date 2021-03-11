const express = require('express')
const cors = require('cors');
const donations = require('./donations.json')
const fs = require('fs');

const app = express();
const port = 4000;

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

app.get("/donation/amount", (req, res) => {
    res.json(donations.total_amount)
})

app.get("/donation/donors", (req, res) => {
    res.json(donations.donors)
})

app.post("/donation", (req, res) => {
    const amount = +req.body.amount;
    if (amount && !isNaN(amount) && amount > 0) {
        let donors = donations.donors;
        donations[donors] = {
            "date": JSON.stringify(new Date()),
            "amount": amount
        };
        donations.total_amount = donations.total_amount + amount
        donations["donors"] = donors + 1
        fs.writeFile('./donations.json', JSON.stringify(donations), function writeJSON(err) {
            if (err) return console.log(err);
        });
        res.send('thank you for fund us!')
    } else {
        res.send('Amount must exist and be positive')
    }
})

app.listen(port)