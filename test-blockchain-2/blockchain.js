const crypto = require('crypto');

class Blockchain {

    constructor(){
        this.chain = [];
        this.add__new_block(1, "0"); // genesis block inits proof as 1, prev_hash as 0
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
  
    // Returns last block of chain (in array)
    get_previous_block = () => {
        return this.chain.at(-1);
    }
  
    proof_of_work = (previous_proof) => {
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
            console.log("Hash passed!");
            console.log(hash)
            check_proof = true;
          } else {
            console.log("Hash failed!")
            new_proof++;
          }
  
        }
  
        return new_proof;
    }
  
    get_block_hash = (block) => {
        let json_block = JSON.stringify(block);
        return crypto.createHash('sha256')
                  .update(json_block)
                  .digest('hex');
    }
  
    is_chain_valid = (chain) => {
  
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




exports.Blockchain = Blockchain;