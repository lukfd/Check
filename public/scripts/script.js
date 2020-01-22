/* 

VERSION 0.0.1

*/

// GLOBAL VARIABLE
var app;

// MODAL
window.onload = function(){ 
    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal
    btn.onclick = function() {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // VUE
    app = new Vue({
        el: '#vue',
        data: {
            req : {
                "UserID": "",
                "BillingName": "",
                "BillingAddress": {
                    "Address": "",
                    "City": "",
                    "State": "",
                    "Zip": "",
                    "Country": ""
               },
               "CreditCardInfo": {
                    "CCNumber":"",
                    "CardVerficationCode": "",
                    "ExpirationDate": ""
               }
            },
            prices: {
                vegeta: '5.00'
            }
        },
        methods: {
            // MAKE A POST REQUEST
            submit: function() {
                // const xhttp = new XMLHttpRequest();
                // //console.log(this.req);
                // xhttp.open('POST', 'http://localhost:8000', true);
                // xhttp.setRequestHeader("Content-type", "application/json");
                // xhttp.send(JSON.stringify(this.req));
                // $.post("http://localhost:8000", this.req);
                $.ajax({
                    type: "POST",
                    contentType: 'application/json',
                    url: 'http://10.66.36.19:8080/newuser',
                    data: JSON.stringify(this.req),
                    dataType: 'json'
                  });
            }
        }
    });

    // 0x.js

    
    
};