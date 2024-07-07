import express from 'express';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(express.json())

let teaData = [];
let nextId = 1;

app.get('/', (req, res) => {
    res.status(200).send('Welcome to the Tea server');
});

// add new tea data
app.post('/teas', (req, res) => {
    const { name, price } = req.body;
    const newTea = { id: nextId++, name, price }
    teaData.push(newTea);
    res.status(201).send(teaData);
});

// get all teas
app.get('/teas', (req, res) => {
    res.status(200).send(teaData);
});

// get a tea with id
app.get('/teas/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if (!tea) {
        return res.status(404).send('Teas not found');
    }
    res.status(200).send(tea)
});

// update existing teas
app.put('/teas/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if (!tea) {
        return res.status(404).send('Teas not found');
    }
    const { name, price } = req.body;
    tea.name = name;
    tea.price = price;
    res.status(200).send(teaData)
});

// delete a specific tea
app.delete('/teas/:id', (req, res) => {
    const index = teaData.findIndex(t => t.id === parseInt(req.params.id))
    if (index === -1) {
        return res.status(404).send('Teas not exist');
    }
    teaData.splice(index, 1);
    return res.status(200).send('Successfully deleted')
});

app.listen(port, () => {
    console.log(`Serving on port ${port}`);
});