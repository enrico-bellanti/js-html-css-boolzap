//   Milestone 2
// Risposta dall’interlocutore: ad ogni inserimento di un messaggio,
//  l’utente riceverà un “ok” come risposta, che apparirà dopo 1 secondo.

// Ricerca utenti: scrivendo qualcosa nell’input a sinistra,
//  vengono visualizzati solo i contatti il cui nome contiene le lettere inserite
//  (es, Marco, Matteo Martina -> Scrivo “mar” rimangono solo Marco e Martina)


$(document).ready(function() {

  $(".contact").click(function(){
    $(".contact").removeClass("active");
    $(".chat_main").removeClass("active");
    $(this).addClass("active");
    var contactAttr = $(this).attr("data-contact");
    $(".chat_main[data-chat="+contactAttr+"]").addClass("active");
    var contactImg = $(this).find("img").clone();
    console.log(contactImg);
    var contactName = $(this).find(".contact_name").text();
    console.log(contactName);
    $(".chat_header_left").find(".img_account").html(contactImg);
    $(".chat_header_left").find(".chat_header_left_info h4").html(contactName);
  });

// end document ready
});
