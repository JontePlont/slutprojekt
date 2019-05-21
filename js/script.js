//Funktion för nedräkning till tjejhack
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
  document.getElementById("nedrak").innerHTML = dag + " dagar " + timmar + " timmar "
  + minut + " minuter " + sekund + " sekunder ";

  // Skriver text om datumet passerat
  if (tidkvar < 0) {
    clearInterval(x);
    document.getElementById("nedrak").innerHTML = "Information om nästa tjejhack kommer snart!";
  }
}, 1000);
}















window.onload = function() {
  const questions = [
    {
      question: "Varifrån har programspråket Python fått sitt namn?",
      svar: {
        a: "Ormen",
        b: "Monty Python",
        c: "Lukten"
      },
      korrektSvar: "b"
    },
    {
      question: "Vilket bibliotek använder man när man ritar med Python?",
      svar: {
        a: "Turtle",
        b: "Paint",
        c: "Draw"
      },
      korrektSvar: "a"
    },
    {
      question: "Vilken typ av programmering gör man med Python?",
      svar: {
        a: "Blockprogrammering",
        b: "Textprogrammering",
        c: "Analog programmering",
      },
      korrektSvar: "b"
    }
  ];

  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    questions.forEach((current, questionNr) => {
      // we'll want to store the list of answer choices
      const svar = [];

      // and for each available answer...
      for (letter in current.svar) {
        // ...add an HTML radio button
        svar.push(
          `<label>
             <input type="radio" name="question${questionNr}" value="${letter}">
              ${letter} :
              ${current.svar[letter]}
           </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="slide">
           <div class="question"> ${current.question} </div>
           <div class="answers"> ${svar.join("")} </div>
         </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function Results() {
    // gather answer containers from our quiz
    const svarLagring = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let antalKorrekt = 0;

    // for each question...
    questions.forEach((current, questionNr) => {
      // find selected answer
      const svarLager = svarLagring[questionNr];
      const selector = `input[name=question${questionNr}]:checked`;
      const usersvar = (svarLager.querySelector(selector) || {}).value;

      // if answer is correct
      if (usersvar === current.korrektSvar) {
        // add to the number of correct answers
        antalKorrekt++;

        // color the answers green
       svarLagring[questionNr].style.color = "lightgreen";
      } else {
        // if answer is wrong or blank
        // color the answers red
        svarLagring[questionNr].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultatLager.innerHTML = ` Du fick ${antalKorrekt} av ${questions.length} rätt`;
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;
    
    if (currentSlide === 0) {
      tillbakaKnapp.style.display = "none";
      document.getElementById("next").innerHTML = "Starta quiz";
    } else {
      tillbakaKnapp.style.display = "inline-block";
    }

    if (currentSlide ===1) {
      tillbakaKnapp.style.display = "none";
    }

    if (currentSlide > 0) {
      document.getElementById("next").innerHTML = "Nästa fråga";
    }
    
    if (currentSlide === slides.length - 1) {
      framKnapp.style.display = "none";
      svarKnapp.style.display = "inline-block";
    } else {
      framKnapp.style.display = "inline-block";
      svarKnapp.style.display = "none";
    }
  }

  function NextSlide() {
    showSlide(currentSlide + 1);
  }

  function PreviousSlide() {
    showSlide(currentSlide - 1);
  }

  const quizContainer = document.getElementById("quiz");
  const resultatLager = document.getElementById("resultat");
  const svarKnapp = document.getElementById("svarknapp");

  // display quiz right away
  buildQuiz();

  const tillbakaKnapp = document.getElementById("previous");
  const framKnapp = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  showSlide(0);

  // on submit, show results
  svarKnapp.addEventListener("click", Results);
  tillbakaKnapp.addEventListener("click", PreviousSlide);
  framKnapp.addEventListener("click", NextSlide);
}