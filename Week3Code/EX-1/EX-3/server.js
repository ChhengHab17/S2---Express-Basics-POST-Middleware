// server.js
import fs from "fs";
import express from 'express';

const app = express();
const PORT = 3000;

// Use built-in body parser
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send("Welcome to the Home Page");
});

app.get('/contact', (req, res) => {
  res.send(`
    <form method="POST" action="/contact">
      <input type="text" name="name" placeholder="Your name" />
      <button type="submit">Submit</button>
    </form>
  `);
});

app.post('/contact', (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).type('text').send('Name is required');
  }

  const newSubmission = { name };
  const filePath = './submissions.json';

  fs.readFile(filePath, 'utf8', (err, fileData) => {
    let submissions = [];
    if (!err && fileData) {
      try {
        const parsed = JSON.parse(fileData);
        submissions = Array.isArray(parsed) ? parsed : [];
      } catch (parseErr) {
        console.error('Error parsing JSON:', parseErr);
      }
    }
    submissions.push(newSubmission);

    fs.writeFile(filePath, JSON.stringify(submissions, null, 2), (err) => {
      if (err) {
        console.error('Error writing to file', err);
        return res.status(500).type('text').send('Error saving to file');
      }
      res.type('html').send(`
        <h1>Thank you for your submission!</h1>
        <p>We received your name: ${name}</p>
        <a href="/contact">Submit another response</a>
      `);
    });
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).type('text').send('404 Not Found');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
