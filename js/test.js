//   Milestone 2
// Risposta dall’interlocutore: ad ogni inserimento di un messaggio,
//  l’utente riceverà un “ok” come risposta, che apparirà dopo 1 secondo.

// Ricerca utenti: scrivendo qualcosa nell’input a sinistra,
//  vengono visualizzati solo i contatti il cui nome contiene le lettere inserite
//  (es, Marco, Matteo Martina -> Scrivo “mar” rimangono solo Marco e Martina)


$(document).ready(function() {

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


  });


// end document ready
});
