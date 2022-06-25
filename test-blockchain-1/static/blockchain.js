window.onload = () => {

const blockchain = document.querySelector(".blockchain");
const form = document.querySelector(".data-form");
const unhash_form = document.querySelector("#unhash-form");
let block_count = 0;
let prev_hash = 0;

let 




form.onsubmit = (e) => {
    e.preventDefault();

    let formData = new FormData(e.target);
    
    let block_data = formData.get("block_data");


    let data_obj = {
        block_number: block_count,
        block_data: block_data,
        previous_hash: prev_hash
    }
    

    axios({
        method: 'post',
        url: '/add_block',
        data: data_obj
      })
      .then( data => {
         prev_hash = data.data.hash;
         create_new_block(block_data, prev_hash);
         update_form();
      })
    
    
}

unhash_form.onsubmit = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    
    let hash = formData.get("hash_value");
    axios({
        method: 'POST',
        url: '/unhash',
        data: {
            hash: hash
        }
    }).then( data => {
        console.log(data)
    })
}


function create_new_block(data, hash){

    block_count++;

    let card = document.createElement("div");
    let card_body = document.createElement("div");
    let title = document.createElement("h5");
    let data_body = document.createElement("p");
    let data_hash = document.createElement("p");


    card.classList.add("card");
    card_body.classList.add("card-body");
    title.classList.add("saved-block-number");

    title.textContent = `Block number: ${block_count}`;
    data_body.textContent = `Data: ${data}`;
    data_hash.textContent = `Previous hash: ${hash}`;


    card.append(card_body);
    card_body.append(title, data_body, data_hash);

   blockchain.append(card);

   
   


}

function update_form(){
    let block_input = document.getElementById("block-number");
    let hash_input = document.getElementById("previous-hash");

    console.log(block_input)
    console.log(block_count)

    block_input.value = block_count;
    
    hash_input.value = prev_hash;

}
} // onload




function validate_block(hash){
    
}
