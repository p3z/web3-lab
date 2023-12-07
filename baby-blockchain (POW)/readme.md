# Baby blockchain


## Technologies
- Web foundation (HTML, CSS, JavaScript)
- Architecture: Node, Express, EJS

## Structure
[ // the blockchain in and of itself makes use of an array as its primary data structure

        // blocks are stored inside objects. Each of them will have this schema:
        {
                // the very first block in the chain = the 'genesis' block
                "index": 1, // -> the block's number, literally an id made by adding 1 to the total number of blocks at the time a new block is made
                "timestamp": "1701981571933", // a timestamp retrieved via Date.now() at the time a new block is added
                "proof": 1, // the ge
                "previous_hash": "0", // a hash value created by the hashing the contents of the previous block. the exception is the genesis block which has a hash of 0 because there not yet blocks preceding it
                "data":{
                        // any data included in the block
                      }
        },
        {
                "index": 2,                
                "timestamp": "1701981571933", // a timestamp retrieved via Date.now() at the time a new block is added
                "proof": 1,
                "previous_hash": "0",
                "data":{
                        // any data included in the block
                      }
        },
        {
                // etc
        }
]



## Logic
- app.js handles routing (ejs, bodyParser and express are used together to handle this)
- blockchain.js contains the blockchain logic. It'a single class containing 5 methods and a very simple constuctor:
  - constructor: initialises the blockchain, im using an array as a simple data structure to store the chain, and the add_new_block function to create the genesis block
  - add_new_block: takes 'proof' and 'previous_hash'. From the data passed in, it creates a new block
  - get_previous_block: returns the very last block in the chain
  - proof_of_work: finds a valid proof for the current block based on the previous proof
  - get_block_hash: returns a hash of the object passed in
  - is_chain_valid