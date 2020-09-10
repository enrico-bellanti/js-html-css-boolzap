//   Milestone 2
// Risposta dall’interlocutore: ad ogni inserimento di un messaggio,
//  l’utente riceverà un “ok” come risposta, che apparirà dopo 1 secondo.

// Ricerca utenti: scrivendo qualcosa nell’input a sinistra,
//  vengono visualizzati solo i contatti il cui nome contiene le lettere inserite
//  (es, Marco, Matteo Martina -> Scrivo “mar” rimangono solo Marco e Martina)


$(document).ready(function() {

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

// end document ready
});
