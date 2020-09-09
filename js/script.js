// Milestone 1
// Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi)
//  e dall’interlocutore (bianco) assegnando due classi CSS diverse
// Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e cliccando
//  invia il testo viene aggiunto al thread sopra, come messaggio verde

$(document).ready(function() {

  $( "#send_button" ).click(function() {
    sendMessage();
    setTimeout(function(){getReply("ok!")}, 2000);

  });

  $("#text_input").keydown(function(event){
    if (event.which == 13) {
      sendMessage();
      setTimeout(function(){getReply("ok!")}, 2000);
    }
  });

  // nel momento in cui si digita qualcosa nella casella riscerca parte una funzione
  $("#input_search").keyup(function(event){
    // salva il valore dell'input in una variabile
    var keyWord = $("#input_search").val();

    // per ogni valore nei contact name controllo se combacia
    // con la keyword inserita se no applico display none
    $('.contact_name').each(function () {

      var contact = $(this).text();
      contact = contact.toLowerCase();
      var isInArray = contact.includes(keyWord);
      if (isInArray == false) {
        $(this).parents("li").addClass("d_none");
      } else {
       $(this).parents("li").removeClass("d_none");
      }

    });
    // fine each


  });
  // /keydown


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
