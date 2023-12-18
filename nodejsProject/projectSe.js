const express = require('express');
const bodyParser = require('body-parser');
const xlsx = require('node-xlsx');
const fs = require('fs');
const path = require('path');

const app = express();

// Serve static files from the current directory
app.use(express.static(__dirname));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'project.html'));
});

app.post('/submit_form', (req, res) => {
    const data = [
        ['Name', 'Email', 'Message'],
        [req.body.name, req.body.email, req.body.message]
    ];
    
    const buffer = xlsx.build([{ name: "mySheetName", data: data }]);
    fs.writeFileSync('Enquiries.xlsx', buffer);

    res.send('Form submitted successfully!');
});

app.listen(3000, () => console.log('Server started on port 3000'));


