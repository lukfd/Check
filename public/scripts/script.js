const testCardNumber = "4242424242424242"
const cvc = "123"
const expir = "07/25"

var axieID
var price

window.onload = function(){ 

    var imgsrc 
    $.getJSON("http://localhost:8080/axie", function( res ) { 
        imgsrc = res.Image
        axieID = res.Id
        name = res.Name
        price = res.Auction.PriceInUSD
        setAxieImage( axieID, imgsrc)
        setAxiePrice( price )
    })

    stripeinit()
}

function stripeTokenHandler( token ) {
    var userID
    var address

    $.getJSON("http://localhost:8080/newuser", function(res ){ 
        userID = res.UserID
        address = res.EthAddress

        data = {
            "userID": userID,
            "ammount": price,
            "axieID": axieID,
            "token": token.id,
        }
        data = JSON.stringify(data)
        console.log(data)

        $.ajax({
            type:"POST", 
            url:"http://localhost:8080/charge",
            contentType: 'application/json',
            data: data, 
            dataType: "json",
        })
    })

}


function setAxieImage( axieID, imgsrc){ 

    $("#axie").prepend('\
        <a href="https://marketplace.axieinfinity.com/axie/'+axieID+'">\
        <img id="axieImg" src="'+imgsrc+'" width="400px"/></a>'
    )
}

function setAxiePrice( price ){ 
    $("#price").prepend('<h4> Price: '+price+'</h4>')
}


function stripeinit(axieID, price){

    var stripe = Stripe('pk_test_mrBqc7daQkvsOMdZMvmf91RP00a284QgkX');
    var elements = stripe.elements();

    var style = {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };

    // Create an instance of the card Element.
    var card = elements.create('card', {style: style});

    // Add an instance of the card Element into the `card-element` <div>.
    card.mount('#card-element');


    // Create a token or display an error when the form is submitted.
    var form = document.getElementById('payment-form');
    form.addEventListener('submit', function(event) {
      event.preventDefault();

      stripe.createToken(card).then(function(result) {
        if (result.error) {
          // Inform the customer that there was an error.
          var errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
        } else {
          // Send the token to your server.
          stripeTokenHandler(result.token);
        }
      });
    });
}



