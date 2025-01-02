import express from 'express'; 
import bodyParser from 'body-parser';
import axios from 'axios';
import dotenv from 'dotenv';

const app = express();
const PORT = 3000; 
dotenv.config();

app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.post('/weather', async(req, res) => {
    try {
        const city = req.body.city; 
        const API_KEY = process.env.API_KEY;

        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        res.render('index.ejs', {
            weather: response.data,
            error: null
        })

    } catch(err) {
        console.log("Error fetching API", err);
        res.status(500).send("Error fetching data from API")
    }
})

app.listen(PORT, ()=> {
    console.log(`Server is running on ${PORT}`)
})