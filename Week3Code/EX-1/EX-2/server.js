// server.js
import express from "express";

const app = express();
const PORT = 3000;

app.use((req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    next();
});

app.get("/", (req, res) => {
    res.end(`
                <html>
                    <head><title>Home</title></head>
                    <body>
                        <h1>Welcome to the Home Page</h1>
                        <p>This is a simple Node.js server.</p>
                    </body>
                </html>
            `);
});
app.get("/about", (req, res) => {
    res.end(`
                <html>
                    <head><title>About</title></head>
                    <body>
                        <h1>About Us:</h1>
                        <p>at CADT, we love node.js! .</p>
                    </body>
                </html>
            `);
});

app.get("/contact-us", (req, res) => {
    res.end(`
                <html>
                    <head><title>Contact Us</title><head>
                    <body>
                        <h1>Contact Us</h1>
                        <p>You can reach us vai email ... </p>
                    </body>
                </html>
            `);
});
app.get("/products", (req, res) => {
    res.end(`
                <html>
                    <head><title>Products</title></head>
                    <body>
                        <h1>Our Products</h1>
                        <p>Buy one get one ...</p>
                    </body>
                </html>
            `);
});
app.get("/projects", (req, res) => {
    res.end(`
                <html>
                    <head><title>Projects</title></head>
                    <body>
                        <h1>Our Projects</h1>
                        <p>Here are our awesome projects </p>
                    </body>
                </html>
            `);
});
app.use((req, res) => {
    res.status(404).send('404 Not Found');
});
app.listen(PORT, () => {
    console.log("Server is running at http://localhost:3000");
});
