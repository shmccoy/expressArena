var fs = require('fs');
var path = require('path');
const express = require('express');
const morgan = require('morgan');

const app = express();
// app.use(morgan('common'));
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }))

app.get('/', (req, res) => {
  res.send('Hello Express!!');
});

app.get('/burgers', (req, res) => {
    res.send('We have juicy cheese burgers!');
  })

app.get('/pizza/pepperoni', (req, res) => {
    res.send('Your pizza is on the way!');
})

app.get('/pizza/pineapple', (req, res) => {
    res.send('Delicious! I miss you so...');
})

app.get('/echo', (req, res) => {
    const responseText = `Here are some details of your request:
      Base URL: ${req.baseUrl}
      Host: ${req.hostname}
      Path: ${req.path}
      App: ${req.app}
      Body: ${req.body}
      Cookies: ${req.cookies}
      IP: ${req.ip}
      Method: ${req.method}
      Original URL: ${req.originalUrl}
      Params: ${req.params}
      Protocol: ${req.protocol}
      Query: ${req.query}
      Route: ${req.route}
      Secure: ${req.secure}
      Signed Cookies: ${req.signedCookies}
      Stale: ${req.stale}
      Subdomain: ${req.subdomains}
      XHR: ${req.xhr}
    `;
    res.send(responseText);
  });

app.get('/queryViewer', (req, res) => {
    console.log(req.query);
    res.end();
});

app.get('/greetings', (req, res) => {
    const name = req.query.name;
    const race = req.query.race;

    if(!name) {
        return res.status(400).send('Please provide a name');
    }
    if(!race) {
        return res.status(400).send('Please provide a race');
    }
    
    const greeting = `Greetings ${name} the ${race}, welcome to our kindgon.`;

    res.send(greeting);
})


app.get('/sum', (req, res) => {
    const numA = Number(req.query.numA);
    const numB = Number(req.query.numB)
    console.log(numA, "hello??");
    const sum = numA + numB;

    if(!numA) {
        return res.status(400).send('Please provide your number');
    }
    if(!numB) {
        return res.status(400).send('Please provide a number');
    }
    
    const results = `The sum of ${numA} and ${numB} is ${sum}`;

    res.send(results);
})

app.get('/cipher', (req, res) => {
    const text = req.query.text;
    const shift = req.query.shift;
    const caesarCipher = (text, shift) => {
        return text.toUpperCase().replace(/[A-Z]/g, c => String.fromCharCode((c.charCodeAt(0)-65 + shift ) % 26 + 65));
    }

    const decipher = caesarCipher(text, shift);

    console.log(text, shift, caesarCipher, decipher)

    res.send(decipher);
    
})

app.get('/lotto', (req, res) => {
    const picks = req.query.picks;
    console.log(picks);
    const numPicks = picks.map(Number);
    console.log(numPicks);
    const winners = Array.from({length: 6}, () => Math.floor(Math.random() * 20) + 1);

    res.send(winners);
})

app.get('/hello', (req, res) => {
    res
    .status(204)
    .end();
    // .send('Shall we see?');
});

app.get('/video', (req, res) => {
    const video = {
        title: 'Cats falling over',
        description: '15 minutes of hilarious fun as cats fall over',
        length: '15.40'
    }
    res.json(video);
})

app.get('/colors', (req, res) => {
    const colors = [
        {
            name: "red", 
            rgb: "FF000"
        },
        {
            name: "green",
            rgb: "00FF00"
        },
        {
            name: "blue",
            rgb: "000FF"
        }
    ];
    res.json(colors);
    
})

app.get('/grade', (req, res) => {
    const {mark} = req.query;

    if(!mark) {
        return res
            .status(400)
            .send('Please provide a mark');
    }

    const numericMark = parseFloat(mark);
    if(Number.isNaN(numericMark)) {
        return res
            .status(400)
            .send('Mark must be a numeric value');
    }

    if(numericMark < 0 || numericMark > 100) {
        return res
            .status(400)
            .send('Mark must be in range 0 to 100');
    }

    if(numericMark >= 90) {
        return res.send('A');
    }
    if(numericMark >= 80) {
        return res.send('B');
    }
    if(numericMark >= 70) {
        return res.send('C');
    }
    res.send('F');
})

app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});