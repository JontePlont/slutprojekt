//FUnktion för nedräkning till tjejhack
window.onload = function(){// Här skrivs datum för nästa event in
var datum = new Date("May 29, 2019 08:30:00").getTime();

// Countdown ska uppdateras varje sekund
var x = setInterval(function() {

  // Hämtar dagens datum
  var nu = new Date().getTime();

  // Räknar ut hur lång tid det är från dagens datum till datumet då eventet sker
  var tidkvar = datum - nu;

  // Räknar ut dagar, timmar, minuter och sekunder
  var dag = Math.floor(tidkvar / (1000 * 60 * 60 * 24));
  var timmar = Math.floor((tidkvar % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minut = Math.floor((tidkvar % (1000 * 60 * 60)) / (1000 * 60));
  var sekund = Math.floor((tidkvar % (1000 * 60)) / 1000);

  // Skriver ut det i div med id "demo"
  document.getElementById("demo").innerHTML = dag + " dagar " + timmar + " timmar "
  + minut + " minuter " + sekund + " sekunder ";

  // Skriver text om datumet passerat
  if (tidkvar < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "Information om nästa tjejhack kommer snart!";
  }
}, 1000);
}