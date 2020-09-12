$(document).ready(function() {

  // al click sul bottone invia messaggio
  $( "#send_button" ).click(function() {
    // ottieni l'index del contatto active
    var indexContactActive = $(".contact.active").index();
    sendMessage(null, indexContactActive);
    setTimeout(function(){isWriting("Sta scrivendo...",indexContactActive)}, 2000);
    var cpuReply = getRandomReply();
    setTimeout(function(){sendMessage(cpuReply, indexContactActive)}, 5000);
  });
  // premendo invio manda il messaggio
  $("#text_input").keydown(function(event){
    if (event.which == 13) {
      // ottieni l'index del contatto active
      var indexContactActive = $(".contact.active").index();
      sendMessage(null, indexContactActive);
      setTimeout(function(){isWriting("Sta scrivendo...",indexContactActive)}, 2000);
      var cpuReply = getRandomReply();
      setTimeout(function(){sendMessage(cpuReply, indexContactActive)}, 5000);
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

  //seleziona contatto ottieni chat corrispondente
  $(".contact").click(
  function(){
    $(this).find(".counter_message_unread").removeClass("active");
    // riporta a 1 unita il valore del counter
    $(this).find(".counter_message_unread").text("1");
    // seleziono l'indce del contatto cliccato
    var indexContact = $(this).index();
    // rimuovo sia a tutti i contatti che a tutte le screen chat la classe active
    $(".contact").removeClass("active");
    $(".chat_screen").removeClass("active");
    // aumento di 1 unita l'indice perche' parte da 0
    indexContact++;
    // aggiungo al contatto cliccato la classe active
    $(this).addClass("active");
    // seleziono la chat screen corrispondente
    var activeChat = $(".chat_screen:nth-child("+indexContact+")");
    // aggiungo a questa chat screen la classe active
    activeChat.addClass("active");

    //logo + nome nella chat box
    var contactImg = $(this).find("img");
    var imgValue = contactImg.attr("src");
    // mi copio il nome del contatto
    var contactName = $(this).find(".contact_name").text();
    // inserisco questi valori nell'header della chat
    $(".chat_header_left .img_account .avatar").attr("src", imgValue);
    $(".chat_header_left .chat_header_left_info h4").text(contactName);
    // registra l'orario ultimo accesso dal contatto e copialo nell'header della chat
    var timeLastAccess = $(this).find(".last_typed_time").text();
    $(".chat_header_left .last_access").text(timeLastAccess);
    // mostra la fine dello scroll
    updateScroll();
  });

  // MENU TENDINA SUL TESTO CHAT message_options_list
  // al click sulla freccetta fai comparireil menu opzioni
  $(document).on( "click", ".message_options i", function() {
    $(this).next(".message_options_list").addClass("display_on");
  });
  // al mouseOut sulla freccetta fai scomparire il menu
  $(document).on( "mouseleave", ".message_container", function() {
    $(this).find(".message_options_list").removeClass("display_on");
  });
  // cliccando sulla voce "elimina messaggio" elimina l'intera riga di codice
  $(document).on( "click", ".delete_message", function() {
    $(this).parents(".message_row").remove();
  });
  // /MENU TENDINA


// end document ready
});


// my functions

// scrivo una funzione che invia messaggi sia in entrata che in uscita
function sendMessage(text, indexContact) {
  // fai una copia del template del messaggio
  var template = $(".template .message_row").clone();
  // salva l'orario in una variabile
  var time = clock();

  // distinguo un messaggio in entrata da uno in uscita
  if (text == null) {
    // salvo il contanuto della casella input
    var textMessage = $("#text_input").val();
    // inserisci la classe sent
    template.addClass("sent");
  } else {
    // inserisco nella variabile textMessage il testo del mittente
    var textMessage = text;
    // rinserisci l'orario dell'ultimo messaggio una volta finito "Sta scrivendo"
    $(".chat_header_left_info p").html("<p>Ultimo messaggio oggi alle <span class='last_access'></span></p>");
  }

  // inserisco il testo nel clone del template messaggio
  template.find("p").text(textMessage);
  // inserisci l'orario
  template.find(".message_time").text(time);
  // salvo in una variabile la selezione della chat corrispondete
  // var activeChat = $(".chat_screen:nth-child("+indexContact+")");
  var activeChat = $(".chat_screen:nth-child("+(indexContact+1)+")");
  // vado ad appendere il templae nella chat con l'index corrispondente
  activeChat.append(template);
  // inserisci l'orario nel contatto corrispondente
  $(".contact:nth-child("+(indexContact+1)+") .last_typed_time").text(time);
  // inserisci testo messaggio nel contatto corrispondente
  $(".contact:nth-child("+(indexContact+1)+") .last_typed_message").text(textMessage);
  // se la chat con l'index salvato inzialmente e' ancora active
  // allora scrivi nell'header l'orario dell'ultimo MESSAGGIO
  var isActive = $(".chat_screen:nth-child("+(indexContact + 1)+")").hasClass("active");
  if (isActive) {
    $(".chat_header_left_info .last_access").text(time);
  } else {
    var unreadCounter = $(".contact:nth-child("+(indexContact+1)+") .counter_message_unread");
    unreadCounter.addClass("active");
    // // aumentare il valore del contatore
    // var valueCounter = parseInt(unreadCounter.text());
    // console.log(valueCounter);
    // unreadCounter.text(valueCounter++);
  }
  // resetto l'imput chat
  $("#text_input").val("");
  updateScroll();
}


function clock() {
  var d = new Date();
  var h = d.getHours();
  var m = d.getMinutes();
  if (m < 10){
    m = "0" + m;
  } else if (h < 10) {
    h = "0" + h;
  }
  var time = h + ":" + m;
  return time;
}

// funzione che scrive "Sta scrivendo..." nell'header della chat
function isWriting(text, indexContact) {
  // scrivi "sta scrivendo..", quando visualizzo la chat corrispondente
  var isActive = $(".chat_screen:nth-child("+(indexContact + 1)+")").hasClass("active");
  if (isActive) {
    $(".chat_header_left_info p").text(text);
  }
  // scrivi sta scrivendo nel contatto della lista
  $(".contact:nth-child("+(indexContact+1)+") .last_typed_message").text(text);
}

// funzione per scrollare la pagina quando l'utente aggiunge testo
function updateScroll(){
    var element = $(".chat_main");
    element.scrollTop(element[0].scrollHeight);
}

// funzione per generare una risposta casuale
function getRandomReply() {
  var listReply = [
    "Ciao come stai?",
    "Ti stavo proprio pensando",
    "Ehi eccomi ti stavo dicendo...",
    "Ok!",
    "Sono daccordo.",
    "Va bene pensiamoci un attimo"
  ];
  var randomReply = Math.floor(Math.random() * listReply.length);
  return listReply[randomReply];
}
