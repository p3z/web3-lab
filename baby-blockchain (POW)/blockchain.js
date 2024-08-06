const crypto = require('crypto');

class Blockchain {

    constructor(){
        this.chain = [];
        this.add_new_block(1, "0"); // genesis block inits proof as 1, prev_hash as 0
    }
  
    add_new_block(proof, previous_hash, data){
        let block = {
            index: this.chain.length + 1,
            timestamp: `${Date.now()}`,
            proof: proof,
            previous_hash: previous_hash,
            data: data ?? "genesis_block"
        };
  
        this.chain.push(block);
        return block;
    }
    
    // Returns last block of chain (in array)
    get_previous_block = () => {
      let full_chain_length = this.chain.length;
      return this.chain[full_chain_length - 1];
    }
  
    proof_of_work = (previous_proof) => {
        // initialize variables before updating in the loop below
        let new_proof = 1; 
        let check_proof = false; // flag for exiting the loop
        let proof_criteria = "0000";
  
        // mining loop
        while(!check_proof){ // keep running until a valid proof is found
          
          // Let's get some randomness thrown in so is difficult to predict
          const rand_bytes = crypto.randomBytes(32); // 256 bit value
          const rand_val = rand_bytes.readUInt32LE();

          let hash = crypto.createHash('sha256')
              .update(`${rand_val}${new_proof}${previous_proof}`)
              .digest('hex');

            if (hash.substr(0, 4) === proof_criteria){
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

      console.log("Is chain valid running...")
  
      let prev_block = chain[0];
      let block_index = 1;
  
      while(block_index < chain.length){
          let block = chain[block_index];
  
          if( block.previous_hash !== this.get_block_hash(prev_block)){
            return false;
          }
  
          let previous_proof = prev_block['proof'];
          let cur_proof = block['proof'];
  
          let hash = crypto.createHash('sha256')
                  .update(`${cur_proof**2 - previous_proof**2}`)
                  .digest('hex');
  
  
          if (hash.substr(0, 4) !== "0000"){
            console.log("Chain is NOT valid!")
            return false;
          }
  
          prev_block = block;
          block_index++;
      }
  
      console.log("Chain is valid!")
      return true;
  
    }
  
  
}




exports.Blockchain = Blockchain;