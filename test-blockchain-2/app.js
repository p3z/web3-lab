const ejs = require('ejs')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
const { Console } = require('console')

const crypto = require('crypto');

const port = 3000
app.set('view engine', 'ejs');
app.use('/static', express.static('static'));
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
  })); 
  app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.render('index');
})

app.post('/add_block',(req, res) => {

    let block_num = req.body.block_number;
    let block_data = req.body.block_data;
    let previous_hash = req.body.previous_hash;
    
    let data_body = JSON.stringify({
        block_num: block_num,
        block_data: block_data, 
        previous_hash: previous_hash
    })


    let hash = crypto.createHash('sha256')
        .update(data_body)
        .digest('hex');

        
    
    res.send({
        hash: hash
    });
})

app.post('/unhash', (req, res) => {
    let hash = req.body.hash;

    let test = crypto.decrypt(hash);
    res.send(test)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
