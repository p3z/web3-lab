function create_new_block(block){

    let blockchain = document.querySelector(".blockchain");

    let card = document.createElement("div");
    let card_body = document.createElement("div");
    let title = document.createElement("h5");
    let data_body = document.createElement("p");
    let data_hash = document.createElement("p");


    card.classList.add("card");
    card_body.classList.add("card-body");
    title.classList.add("saved-block-number");

    title.textContent = `Block number: ${block.index}`;
    data_body.textContent = `Data: ${block.data}`;
    data_hash.textContent = `Previous hash: ${block.previous_hash}`;


    card.append(card_body);
    card_body.append(title, data_body, data_hash);

blockchain.append(card);





}

// function update_form(){
//     let block_input = document.getElementById("block-number");
//     let hash_input = document.getElementById("previous-hash");

//     console.log(block_input)
//     console.log(block_count)

//     block_input.value = block_count;
    
//     hash_input.value = prev_hash;

// }