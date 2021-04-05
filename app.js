const express = require('express')
const app = express()


app.set('view engine', 'pug')
app.use('/static', express.static('public'))

app.get('/', (req, res) => {
    res.render('maintodo')
})



const listener = app.listen(9000, () => {
    console.log(`App is running on port  http://localhost:9000`);
  });
