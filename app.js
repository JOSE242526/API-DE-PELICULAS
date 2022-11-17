/* dependencias*/
const express = require('express')

const file = require('./package.json');
/* iniciando configuracion*/
const port = 9000
const app = express()

/* Habilitacion o recibiendo Json*/
app.use(express.json())

const movies = []

let id = 1

app.get('/', (req, res) => {
    res.json({
    messeger: 'Good'
    })
})

/* */
app.get('/api-peliculas', (req, res) => {
res.status(200).json(movies)
})

app.post('/api-peliculas', (req, res) => {
        const {title, year, director, gender} = req.body

        if(title && year && director && gender){
            const newMovies = {
                id: id++,
                title,
                year,
                director,
                gender,
                is_completed: false
            }
            movies.push(newMovies)
            res.status(200).json(newMovies)
        } else {
            res.status(400).json({message: 'Invalid data'})
        }
    })


app.get('/api-peliculas/:id', (req, res) => {
    const id = req.params.id;
    
    const todo = movies.find(ref => ref.id == id)
    
    if(todo){
        res.status(200).json(todo)
    } else {
        res.status(404).json({message: 'Invalid ID'})
    }
})


app.listen(port, () => {
    console.log(`Server started at port ${port}`)
})