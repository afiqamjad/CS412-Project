import express from 'express';
import ps4route from './routes/ps4.js';


const app = express();

app.set('view engine', 'pug');

app.use(express.json());
app.use('/ps4', ps4route);

app.get('/', (req, res) => {
    res.render('form');
});

app.listen(3000, () => {
    console.log("Server ready at localhost:3000");
});
