import dotenv from 'dotenv';
import express from 'express';
import { Router } from 'express';
import bodyParser from 'body-parser';
import request from 'request';
import fetch from 'node-fetch';

dotenv.config();
const router = Router();

router.use(bodyParser.urlencoded({ extended: true }));

router.post('/postMethod', (req, res) => {
    const ingr = req.body.name;
    const options = {
        url: `https://api.edamam.com/api/food-database/v2/parser?ingr=${ingr}&app_id=${process.env.APP_ID}&app_key=${process.env.API_KEY}`,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    new Promise((resolve, reject) => {
        request.get(options, (error, response, body) => {
            if (error) {
                reject(error);
            } else {
                resolve(JSON.parse(body));
            }
        });
    })
    .then(data => res.render('template', { data }))
    .catch(error => res.send(error));
});

router.post('/asyncMethod', async (req, res) => {
    const ingr = req.body.name2;
    const url = `https://api.edamam.com/api/food-database/v2/parser?ingr=${ingr}&app_id=${process.env.APP_ID}&app_key=${process.env.API_KEY}`;

    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        res.render('template', { data });
    } catch (error) {
        res.send(error);
    }
});

router.post('/callbackMethod', (req, res) => {
    const ingr = req.body.name3;
    const url = `https://api.edamam.com/api/food-database/v2/parser?ingr=${ingr}&app_id=${process.env.APP_ID}&app_key=${process.env.API_KEY}`;

    request(url, { json: true }, (error, response, body) => {
        if (error) {
            res.send(error);
        } else {
            res.render('template', { data: body });
        }
    });
});

export default router;
