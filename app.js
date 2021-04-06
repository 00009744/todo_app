const { json } = require('body-parser')
const express = require('express')
const app = express()

const fs = require('fs')

app.set('view engine', 'pug')


app.use('/static', express.static('public'))
app.use(express.urlencoded({ extended: false }))


app.post('/create', (req, res) => {
    const name = req.body.name
    const description = req.body.description

    if (name.trim() === '' && description.trim() === '') {
        res.render('create', { error: true })
    } else {
        fs.readFile('./db/tasks.json', (err, db) => {
            if (err) throw err

            const tasks = JSON.parse(db)

            tasks.push({
                id: id (),
                name: name,
                description: description,
            })
            fs.writeFile('./db/tasks.json', JSON.stringify(tasks), err => {
                if (err) throw err 
                res.render('create', { success: true })
            })
        })
    }
})

function id (){
    return '_' + Math.random().toString(36).substr(2, 9);
}

app.get('/create', (req, res) => {
    res.render('create')
})


app.get('/tasks', (req, res) => {

    fs.readFile('./db/tasks.json', (err, db) => {
        if (err) throw err

        const tasks = JSON.parse(db)
        res.render('tasks', { tasks: tasks })
    })
})


app.get('/api/v1/tasks', (req, res) => {
    fs.readFile('./db/tasks.json', (err, db) => {
        if (err) throw err

        const tasks = JSON.parse(db)
        res.json(tasks)
    })
})




app.get('/tasks/:id', (req, res) => {
    const id = req.params.id

    fs.readFile('./db/tasks.json', (err, db) => {
        if (err) throw err

        const tasks = JSON.parse(db)

        const task = tasks.filter(task => task.id == id )[0]

        res.render('detail', { task: task})
    })
})

// localhost:5000
app.get('/', (req, res) => {
    res.render('mainpage')
})

app.listen(5000, err => {
    if (err) console.log(err)

    console.log('App is running on port 5000')
})