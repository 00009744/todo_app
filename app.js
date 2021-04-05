const express = require('express')
const app = express()

app.set('view engine', 'pug')


app.use('/static', express.static('public'))

app.get('/create', (req, res) => {
    res.render('create')
})

// localhost:5000
app.get('/', (req, res) => {
    res.render('mainpage')
})

app.listen(5000, err => {
    if (err) console.log(err)

    console.log('App is running on port 5000')
})