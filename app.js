const express = require('express');
const app = express();
const ps4route = require('./routes/ps4');

app.set('view engine', 'pug');

app.use(express.json());
app.use('/ps4', ps4route);

app.get('/', (req, res) => {
    res.render('form');
});

app.listen(3000, () => {
    console.log("Server ready at localhost:3000");
});