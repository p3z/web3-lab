const ejs = require('ejs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { Blockchain } = require('./blockchain.js');

const port = 3000
app.set('view engine', 'ejs');
app.use('/static', express.static('static'));
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
  })); 
app.use(bodyParser.json());



let blockchain_inst = new Blockchain();



app.get('/', (req, res) => {

  let blockchain_state = JSON.stringify(blockchain_inst.chain);

  res.render('index', {chain: blockchain_state} );


});

app.get('/get_chain', (req, res) => {
  console.log("Getting the whole chain:")
  console.log(blockchain_inst.chain)
  return blockchain_inst.chain;
})

app.post('/mine_block', (req, res) => {

  let previous_block = blockchain_inst.get_previous_block();
  let previous_proof = previous_block.proof;
  let proof = blockchain_inst.proof_of_work(previous_proof);
  let previous_hash = blockchain_inst.get_block_hash(previous_block);
  blockchain_inst.add__new_block(proof, previous_hash);

  res.redirect('back');

});

app.listen(port, () => {
  console.log(`Blockchain app listening on port ${port}`)
})
