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
});

app.post('/add_new_block', (req, res) => {
  class Blockchain {

    constructor(){
        this.chain = [];
        this.add__new_block(proof = 1, previous_hash = "0"); // calling this in constructor = genesis block

    }

    add__new_block(proof, previous_hash){
        let block = {
            index: this.chain.length + 1,
            timestamp: `${Date.now()}`,
            proof: proof,
            previous_hash: previous_hash,
            data: {}
        };

        this.chain.push(block);
        return block;
    }

    get_previous_block(this){
        return this.chain[-1];
    }

    proof_of_work(this, previous_proof){
        let new_proof = 1;
        let check_proof = false;

        while(!check_proof){
          let hash = crypto.createHash('sha256')
                  .update(`${new_proof**2 - previous_proof**2}`) 
                  // ^^ this ensures the arg passed in is 'non-symmetrical' (ie shd we add them together, the result is the same regardless of the order we add them, minusing however creates 2 separate answers, which in turn would create 2 separate hashes). If we don't do this, the hash would be identical every couple of blocks because:
                  // - the new_proof becomes the previous_proof
                  // - the iteration always starts at one and iterates up
                  // Squaring is just for the sake of adding complexity, still too easy in the real world
                  .digest('hex');

          if (hash.substr(0, 4) === "0000"){
            check_proof = true;
          } else {
            new_proof++;
          }

          return new_proof;


        }
    }

    get_block_hash(this, block){
        let json_block = JSON.stringify(block);
        return crypto.createHash('sha256')
                  .update(json_block)
                  .digest('hex');
    }
  
    is_chain_valid(this, chain){

      let prev_block = chain[0];
      let block_index = 1;

      while(block_index < chain.length){
          let block = chain[block_index];

          if( block.previous_hash !== this.hash(prev_block)){
            return false;
          }

          let previous_proof = prev_block['proof'];
          let cur_proof = block['proof'];

          let hash = crypto.createHash('sha256')
                  .update(`${cur_proof**2 - previous_proof**2}`)
                  .digest('hex');


          if (hash.substr(0, 4) !== "0000"){
            return false;
          }

          prev_block = block;
          block_index++;
      }

      return true;

    }


}
})

// app.post('/add_block',(req, res) => {

//     let block_num = req.body.block_number;
//     let block_data = req.body.block_data;
//     let previous_hash = req.body.previous_hash;
    
//     let data_body = JSON.stringify({
//         block_num: block_num,
//         block_data: block_data, 
//         previous_hash: previous_hash
//     })


//     let hash = crypto.createHash('sha256')
//         .update(data_body)
//         .digest('hex');

        
    
//     res.send({
//         hash: hash
//     });
// })

// app.post('/unhash', (req, res) => {
//     let hash = req.body.hash;

//     let test = crypto.decrypt(hash);
//     res.send(test)
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
