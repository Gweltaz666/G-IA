const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/register', (req, res) => {
    const { ip, email, password } = req.body;

    const userData = {
        ip,
        email,
        password
    };

    fs.readFile('users.json', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Server error');
        }

        let users = [];
        if (data.length) {
            users = JSON.parse(data);
        }

        users.push(userData);

        fs.writeFile('users.json', JSON.stringify(users, null, 2), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Server error');
            }

            res.status(200).send('User registered successfully');
        });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});