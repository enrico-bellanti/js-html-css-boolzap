$(document).ready(function() {

  // al click sul bottone invia messaggio
  $( "#send_button" ).click(function() {
    // salvo il valore del text input
    var textMessage = $("#text_input").val();
    // copia il valore della chat con classe active
    var contactAttr = $(".chat_screen.active").attr("data-chat");

    // controllo se text contiene testo
    if (textMessage != "") {
    sendMessage(textMessage, contactAttr);
    setTimeout(function(){getMessage(null, contactAttr)}, 2000);
    }
  });
  // premendo invio manda il messaggio
  $("#text_input").keydown(function(event){
    if (event.which == 13) {
      // salvo il valore del text input
      var textMessage = $("#text_input").val();
      // copia il valore della chat con classe active
      var contactAttr = $(".chat_screen.active").attr("data-chat");
      // controllo se text contiene testo
      if (textMessage != "") {
        sendMessage(textMessage, contactAttr);
        setTimeout(function(){getMessage(null, contactAttr)}, 2000);
      }

    }
  });

  // CASELLA RICERCA
  // nel momento in cui si digita qualcosa nella casella riscerca parte una funzione
  $("#input_search").keyup(function(event){
    // salva il valore dell'input in una variabile
    var keyWord = $("#input_search").val();
    keyWord = keyWord.toLowerCase();

    // per ogni valore nei contact name controllo se combacia
    // con la keyword inserita se no applico display none
    $('.contact_name').each(function () {

      var contact = $(this).text();
      contact = contact.toLowerCase();
      var isInArray = contact.includes(keyWord);
      if (isInArray == false) {
        $(this).parents(".contact").addClass("d_none");
      } else {
       $(this).parents(".contact").removeClass("d_none");
      }
    });
    // /fine each
  });
  // /keyup
  // fine CASELLA RICERCA

  // Cliccando su un contatto mostra la chat associata
  $(".contact").click(function(){
    // rimuovo le classi active sia ai contatti che alle chat screen
    $(".contact").removeClass("active");
    $(".chat_screen").removeClass("active");
    // aggiungo la classe active al contatto cliccato
    $(this).addClass("active");
    // salvo il valore data_chat in variabile
    var contactAttr = $(this).attr("data-contact");
    // applico la classe active alla chat screen con lo stesso valore
    $(".chat_screen[data-chat="+contactAttr+"]").addClass("active");
    // creo una copia dell'immagine contatto
    var contactImg = $(this).find("img").clone();
    // mi copio il nome del contatto
    var contactName = $(this).find(".contact_name").text();
    // inserisco questi valori nell'header della chat
    $(".chat_header_left").find(".img_account").html(contactImg);
    $(".chat_header_left").find(".chat_header_left_info h4").html(contactName);
  });

  // MENU TENDINA SUL TESTO CHAT message_options_list
  // al click sulla freccetta fai comparire o scomparire il menu opzioni
  $(document).on( "click", ".message_options i", function() {
    $(this).next(".message_options_list").toggle();
  });
  // cliccando sulla voce "elimina messaggio" elimina l'intera riga di codice
  $(document).on( "click", ".delete_message", function() {
    $(this).parents(".message_row").remove();
  });


// end document ready
});


// my functions

// creo una funzione per inviare una risposta all'utente in cui dice "ok!"
function getMessage(text, value) {
  // controllo se l'argomento e' null manda un testo di default
  if (text == null) {
    text = "ok!";
  }
  // fai una copia del template template_input_text
  var template = $(".template .message_row").clone();
  // inserisci il testo p del template
  template.find("p").text(text);
  // inserisci l'orario
  template.find(".message_time").text(clock());
  // appendi il nuovo oggetto al li nella text area nell'html
  $(".chat_screen[data-chat="+value+"]").append(template);
}

// creo una funzione cheregistra il valore su una variabile
// azzera la chat input
// e inserisce il valore inserito nello chat_screen dell'html
function sendMessage(textMessage, value) {
  // fai una copia del template template_input_text
  var template = $(".template .message_row").clone();
  // inserisci il testo p del template
  template.find("p").text(textMessage);
  // inserisci l'orario
  template.find(".message_time").text(clock());
  // inserisci la classe sent
  template.addClass("sent");
  // appendi il nuovo oggetto al li nella text area nell'html
  $(".chat_screen[data-chat="+value+"]").append(template);
  $("#text_input").val("");
}

// funzione per ottenere l'orario
function clock() {
  var d = new Date();
  var h = d.getHours();
  var m = d.getMinutes();
  if (m < 10){
    m = "0" + m;
  }
  var time = h + ":" + m;
  return time;
}
