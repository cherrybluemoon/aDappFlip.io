var web3 = new Web3(Web3.givenProvider);
var contractInstance;

$(document).ready(function() {
    window.ethereum.enable().then(function(accounts){
        contractInstance = new web3.eth.Contract(abi, "0xb2A529e80625963703f034406461816a3E3A92fE", {from: accounts[0]});
        console.log(contractInstance);
    });
    $("#flip_box").click(flip);
});

function flip(){
    var bet = $("#bet_input").val();
    var config = {
        value: web3.utils.toWei(bet,"ether")
    }
    contractInstance.methods.flip().send(config)
    .on("transactionHash", function(hash){
        console.log(hash);
    })
    .on("confirmation", function(confirmationNr){
        console.log(confirmationNr);
    })
    .on("receipt", function(receipt){
        console.log(receipt);
        if(receipt.events.bet.returnValues[2] === false){
            alert("You lost " + bet + " Ether!");
        }
        else if(receipt.events.bet.returnValues[2] === true){
            alert("You won " + bet + " Ether!");
        }
    })
}

