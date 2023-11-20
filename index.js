const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;


async function getApiResponse(url) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
// https://the-office.fly.dev/season/1/episode/6

let episodes = [];

app.get('/', async (req, res) => {
    try {
        const response = await getApiResponse("https://the-office.fly.dev/season/"+(Math.floor(Math.random() * 5) + 1)+"/episode/"+(Math.floor(Math.random() * 5) + 1));
        episodes.push(response);
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching data from the API');
    }
});

app.get('/all', (req, res) => {
  res.json(episodes);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
