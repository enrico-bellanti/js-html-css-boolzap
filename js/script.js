// Milestone 1
// Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi)
//  e dall’interlocutore (bianco) assegnando due classi CSS diverse
// Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e cliccando
//  invia il testo viene aggiunto al thread sopra, come messaggio verde

$(document).ready(function() {

  $( "#send_button" ).click(function() {
    sendMessage();
    setTimeout(getReply("ok!"), 3000);

  });

  $("#text_input").keydown(function(event){
    if (event.which == 13) {
      sendMessage();
      setTimeout(getReply("ok!"), 3000);
    }
  });


// end document ready
});

// my functions

// creo una funzione per inviare una risposta all'utente in cui dice "ok!"
function getReply(text) {
  // fai una copia del template template_input_text
  var template = $(".template .message_row").clone();
  // inserisci il testo p del template
  template.find("p").text(text);
  // appendi il nuovo oggetto al li nella text area nell'html
  $("ul.chat_screen").append(template);
}

// creo una funzione cheregistra il valore su una variabile
// azzera la chat input
// e inserisce il valore inserito nello chat_screen dell'html
function sendMessage() {
  var textMessage = $("#text_input").val();
  // controllo se text contiene testo
  if (textMessage != "") {
    $("#text_input").val("");
    // fai una copia del template template_input_text
    var template = $(".template .message_row").clone();
    // inserisci il testo p del template
    template.find("p").text(textMessage);
    // inserisci la classe sent
    template.addClass("sent");
    // appendi il nuovo oggetto al li nella text area nell'html
    $("ul.chat_screen").append(template);
  }
}
