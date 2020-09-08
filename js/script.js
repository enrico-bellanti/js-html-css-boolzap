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
      var myText = $("#text_input").val();
      // controllo se text contiene testo
      if (myText != "") {
        // $("#text_input").val("");
        // fai una copia del template template_input_text
        var cloudText = $(".template.input_text").clone();

        // inserisci il testo text nel cloudText
        cloudText.children($(".cloud_text p")).text(myText);
        // rimuovo il display none
        // cloudText.removeClass("d_none");
        // inserisci la classe green
        // cloudText.addClass("green");
        // appendi il nuovo oggetto al li nella text area nell'html
        $("ul.text_screen").append(cloudText);
      }

  });






// end document ready
});
