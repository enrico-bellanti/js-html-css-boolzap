// Milestone 1
// Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi)
//  e dall’interlocutore (bianco) assegnando due classi CSS diverse
// Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e cliccando
//  invia il testo viene aggiunto al thread sopra, come messaggio verde

$(document).ready(function() {
  // creo una funzione che al click del bottone send registra
  // il valore su una variabile
  // azzera la chat input
  $( "#send_button" ).click(function() {
      sendMessage()
  });

  $("#text_input").keydown(function(event){
    if (event.which == 13) {
      sendMessage();
    }
  });

// end document ready
});

// my functions
function sendMessage() {
  var textMessage = $("#text_input").val();
  // controllo se text contiene testo
  if (textMessage != "") {
    $("#text_input").val("");
    // fai una copia del template template_input_text
    var template = $(".template .message_row").clone();
    // inserisci il testo text nel cloudText
    template.find("p").text(textMessage);
    // inserisci la classe sent
    template.addClass("sent");
    // appendi il nuovo oggetto al li nella text area nell'html
    $("ul.chat_screen").append(template);
  }
}
