# Baby blockchain

## Overview
A rudimentary proof-of-work (PoW) blockchain using JavaScript. 

## Background
A blockchain is a digital ledger that stores transaction data from participants in the network. Transaction data may be literal monetary transaction data, but may be more generalised in nature. In effect, a blockchain is a form of data storage.

Data is stored inside 'blocks' which in turn are listed in an array. Each block is crytpographically tied to the previous by a hashing algorithm ensuring the chain is valid (ie uncompromised) via its concensus mechanism (in this case 'proof of work').

The proof-of-work concensus mechanism works by requiring participants (miners) to perform a certain amount of computational work to add a new block to the blockchain. In other words, it makes it so that it is computationally expensive and time-consuming to add data to the chain, a process that ensures...

This is done by specifying some sort of arbitrary criteria that must be passed in order for a block to be allowed to be added to the chain. A miner then uses their computational resource to find a value that meets the given criteria. Once found, they can add their block of data to the chain.

forces agents to demonstrate



The purpose of this Proof of Work mechanism is to make it  to find a valid proof, thereby providing security to the blockchain. Miners compete to find a valid proof, and the first one to find it gets the right to add a new block to the blockchain.

It's worth noting that while this mechanism has been widely used (e.g., in Bitcoin), it has some drawbacks, including high energy consumption. Some newer blockchain systems explore alternative consensus mechanisms like Proof of Stake (PoS) to address these issues.

All blockchain logic is contained within a class whose methods are responsible for updating the chain.

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
- app.js handles routing users to appropriate views in the app. Express and bodyParser together provide the functionality for this.
  - There are only 3 routes besides the root.
    - root: loads the only view from the views folder, index.ejs. ejs allows us to pass variables from the route file to the view
    - mine_block: is called when a user submits the form. This route 
    - is_chain_valid: is called when user uses 'is chain valid' button
    - get_chain



- blockchain.js contains the blockchain logic. It'a single class containing 5 methods and a very simple constuctor:
  - constructor: initialises the blockchain, im using an array as a simple data structure to store the chain, and the add_new_block function to create the genesis block
  - add_new_block: takes 'proof' and 'previous_hash'. From the data passed in, it creates a new block
  - get_previous_block: returns the very last block in the chain
  - proof_of_work: finds a valid proof for the current block based on the previous proof
  - get_block_hash: returns a hash of the object passed in
  - is_chain_valid