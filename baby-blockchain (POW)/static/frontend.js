function create_new_block(block){

    let blockchain = document.querySelector(".blockchain");

    let col = document.createElement("div");
    let card = document.createElement("div");
    let card_body = document.createElement("div");
    let title = document.createElement("h5");
    let data_body = document.createElement("p");
    let data_hash = document.createElement("p");


    col.classList.add("col-md-4", "mb-5");
    card.classList.add("card", "h-100");
    card_body.classList.add("card-body", "card-text");
    title.classList.add("saved-block-number", "card-title");

    console.log("Creating new block on front end...")
    console.log(block)

    title.textContent = `Block number: ${block.index}`;
    data_body.textContent = `Data: ${block.data}`;
    data_hash.textContent = `Previous hash: ${block.previous_hash}`;


    card.append(card_body);
    card_body.append(title, data_body, data_hash);

blockchain.append(card);





}