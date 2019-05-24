//Script för quizen, kunde inte existera i samma script som nedräkningen, eller på samma sida
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
    //Lagrar html output
    const output = [];

    // Varje fråga
    questions.forEach((current, questionNr) => {
      // Lista av svarsalternativ
      const svar = [];

      // För varje svar
      for (letter in current.svar) {
        // Lägger till en knapp
        svar.push(
          `<label>
             <input type="radio" name="question${questionNr}" value="${letter}">
              ${letter} :
              ${current.svar[letter]}
           </label>`
        );
      }

      // Skriver ut fråga och svarsalternativ
      output.push(
        `<div class="slide">
           <div class="question"> ${current.question} </div>
           <div class="answers"> ${svar.join("")} </div>
         </div>`
      );
    });

    // Skriver ut allt
    quizContainer.innerHTML = output.join("");
  }

  function Results() {
    // Samlar in svar
    const svarLagring = quizContainer.querySelectorAll(".answers");

    // Håller koll på användarens svar
    let antalKorrekt = 0;

    // För varje fråga
    questions.forEach((current, questionNr) => {
      // Hittar valt svar
      const svarLager = svarLagring[questionNr];
      const selector = `input[name=question${questionNr}]:checked`;
      const usersvar = (svarLager.querySelector(selector) || {}).value;

      // Kollar om svaret är rätt
      if (usersvar === current.korrektSvar) {
        // Lägger till på antal korrekt
        antalKorrekt++;

        // Gör svaren gröna om användaren svarat korrekt
       svarLagring[questionNr].style.color = "lightgreen";
      } else {
        // Om svaret är fel eller blankt
        // Gör svaren röda
        svarLagring[questionNr].style.color = "red";
      }
    });

    // Visar antal rätt utav totalen
    resultatLager.innerHTML = ` Du fick ${antalKorrekt} av ${questions.length} rätt`;
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;
    
    if (currentSlide === 0) {
      tillbakaKnapp.style.display = "none";
      
    } else {
      tillbakaKnapp.style.display = "inline-block";
    }

   

    if (currentSlide > 0) {
      document.getElementById("fram").innerHTML = "Nästa fråga";
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

  // Visar quizen direkt
  buildQuiz();

  const tillbakaKnapp = document.getElementById("tillbaka");
  const framKnapp = document.getElementById("fram");
  const slides = document.querySelectorAll(".slide" );
  let currentSlide = 0;

  showSlide(0);

  // Visar resultatet på skärmen då quizen avslutats
  svarKnapp.addEventListener("click", Results);
  tillbakaKnapp.addEventListener("click", PreviousSlide);
  framKnapp.addEventListener("click", NextSlide);
}