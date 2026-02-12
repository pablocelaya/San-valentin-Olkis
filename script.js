// --- PUERTA SECRETA ---
document.getElementById("secretBtn").addEventListener("click", () => {
  const val = document.getElementById("secretInput").value.toLowerCase().trim();
  const res = document.getElementById("secretResult");
  if (val === "roberto") {
    res.innerHTML =
      "<h3> Hola colis Te amo! Hice esto para que juguemos. Justo ahora no tengo ni un brillo. Pero me dijiste que la intensión vale, asique me tome el tiempo de diseñar y hacer esta pagina. Espero que te guste y te haga reir. No sabes lo bien que me haces, a todo el mundo le hablo de vos, sos una inspiración de persona. Sos lo que quiero llegar a ser. Sos todo lo que tengo y todo lo que quiero.</h3>";
    res.style.display = "block";
  } else {
    res.textContent = "❌ Intenta de nuevo...";
    res.style.display = "block";
  }
});

// --- MÚSICA MULTI-CANCIONES --- //

const playlist = [
  { title: "Sabor a Olki", file: "music/cancion1.mp3" },
  { title: "ojitos lindos...", file: "music/cancion2.mp3" },
  { title: "Fierro compa ancoo", file: "music/cancion3.mp3" },
  { title: "Croqueta", file: "music/cancion4.mp3" },
  { title: "Si me dejas, es esta...", file: "music/cancion5.mp3" },
];

let songIndex = 0;

const audio = document.getElementById("mainAudio");
const playBtn = document.getElementById("playBtn");
const playerCard = document.querySelector(".music-card-container");

function loadSong(index) {
  const song = playlist[index];
  document.getElementById("trackTitle").textContent = song.title;
  audio.src = song.file;
}

function playSong() {
  audio.play();
  playerCard.classList.add("playing");
  playBtn.className = "fas fa-pause";
}

function pauseSong() {
  audio.pause();
  playerCard.classList.remove("playing");
  playBtn.className = "fas fa-play";
}

function nextSong() {
  songIndex++;
  if (songIndex >= playlist.length) songIndex = 0;
  loadSong(songIndex);
  playSong();
}

function prevSong() {
  songIndex--;
  if (songIndex < 0) songIndex = playlist.length - 1;
  loadSong(songIndex);
  playSong();
}

// Play / Pause
document.getElementById("playBtnContainer").addEventListener("click", () => {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
});

// Botones next / prev
document.getElementById("nextBtn").addEventListener("click", nextSong);
document.getElementById("prevBtn").addEventListener("click", prevSong);

// Cuando termina una canción → pasa a la siguiente
audio.addEventListener("ended", nextSong);

// Cargar primera canción al iniciar
loadSong(songIndex);

// --- MATCH TIPO TINDER PRO --- //

const photos = [
  "images/8.jpg",
  "images/9.jpg",
  "images/10.jpg",
  "images/11.jpg",
  "images/12.jpg",
  "images/13.jpg",
  "images/14.jpg",
  "images/15.jpg",
  "images/16.jpg",
  "images/17.jpg",
];

let likesElla = new Set();
let likesYo = new Set();

let currentIndex = 0;
let turn = "ella"; // "ella" → primero ella, luego "yo"

const image = document.getElementById("carouselImage");
const frame = document.getElementById("photoFrame");
const status = document.getElementById("matchStatus");

// Inicializar
updateView();

function updateView() {
  if (currentIndex >= photos.length) {
    if (turn === "ella") {
      turn = "yo";
      currentIndex = 0;
      alert("💘 Ahora es tu turno...");
    } else {
      showFinalResult();
      return;
    }
  }

  image.src = photos[currentIndex];
  document.getElementById("turnTitle").textContent =
    turn === "ella" ? "Turno: Ella " : "Turno: Yo ";
}

// Swipe animado
function swipe(direction) {
  frame.style.transition = "transform 0.4s ease, opacity 0.4s ease";

  if (direction === "right") {
    frame.style.transform = "translateX(400px) rotate(20deg)";
  } else {
    frame.style.transform = "translateX(-400px) rotate(-20deg)";
  }

  frame.style.opacity = "0";

  setTimeout(() => {
    frame.style.transition = "none";
    frame.style.transform = "translateX(0)";
    frame.style.opacity = "1";

    processChoice(direction === "right");
  }, 400);
}

function processChoice(isLike) {
  let huboMatch = false;

  if (isLike) {
    if (turn === "ella") {
      likesElla.add(currentIndex);
    } else {
      likesYo.add(currentIndex);

      if (likesElla.has(currentIndex)) {
        huboMatch = true;
        triggerMatch();
      }
    }
  }

  if (huboMatch) {
    setTimeout(() => {
      frame.classList.remove("match-border-neon"); // 🔥 quitar borde verde
      status.classList.remove("neon-active"); // opcional: quitar texto verde
      status.textContent = ""; // opcional: limpiar mensaje

      currentIndex++;
      updateView();
    }, 1200);
  } else {
    currentIndex++;
    updateView();
  }
}

function triggerMatch() {
  status.textContent = "💥 ¡HICIMOS MATCH! 😍";
  status.className = "neon-active";

  frame.classList.add("match-border-neon");

  // Animación explosiva
  frame.animate(
    [
      { transform: "scale(1)" },
      { transform: "scale(1.2)" },
      { transform: "scale(1)" },
    ],
    {
      duration: 600,
      easing: "ease-out",
    },
  );

  createMatchHearts();
}

function createMatchHearts() {
  for (let i = 0; i < 20; i++) {
    const heart = document.createElement("div");
    heart.innerHTML = "💖";
    heart.style.position = "fixed";
    heart.style.left = "50%";
    heart.style.top = "50%";
    heart.style.fontSize = "20px";
    heart.style.pointerEvents = "none";
    heart.style.transform = `translate(-50%, -50%)`;

    document.body.appendChild(heart);

    heart.animate(
      [
        { transform: "translate(-50%, -50%) scale(1)", opacity: 1 },
        {
          transform: `translate(${Math.random() * 600 - 300}px, ${
            Math.random() * 600 - 300
          }px) scale(1.5)`,
          opacity: 0,
        },
      ],
      {
        duration: 1000,
        easing: "ease-out",
      },
    );

    setTimeout(() => heart.remove(), 1000);
  }
}

function showFinalResult() {
  if (likesYo.size === 0) {
    status.textContent = "💔 No hubo matches...";
  } else {
    status.textContent = "🔥 Revisa los matches arriba 😏";
  }
}

// Botones
document.getElementById("matchLikeBtn").onclick = () => swipe("right");
document.getElementById("dislikeBtn").onclick = () => swipe("left");

// --- RULETA SIN REPETICIONES Y SIN PUNTOS --- //

const questions = [
  {
    q: "¿Mi comida favorita es..?",
    opts: ["Asado", "Sandwich de milanesa", "Bife a la frontera"],
    correct: 2,
  },
  {
    q: "¿Mi primer perro se llamaba?",
    opts: ["Pichilo", "Julian", "Nando"],
    correct: 1,
  },
  {
    q: "¿Cuál de estas cosas me gusta menos?",
    opts: ["Suei", "Bad Bunny", "Little buggie"],
    correct: 2,
  },
  {
    q: "¿Que escuché más últimamente?",
    opts: ["Melon", "Batata", "Flan"],
    correct: 0,
  },
  {
    q: "¿En qué año de primaria vivía en Palermo, Cachi?",
    opts: ["4to", "5to", "6to"],
    correct: 0,
  },
  {
    q: "¿Mi color favorito?",
    opts: ["Azul", "Amarillo", "Negro"],
    correct: 1,
  },
];

const punishments = [
  "Me tenés que cocinar algo rico 🍝",
  "Haz un petizo de 5 minutos 😏",
  "Me debés un masaje de 5 minutos 💆‍♂️",
  "Dame un beso 😘",
  "Tenés que comprar un helado 🍦",
  "Colita calech hoy 🔥",
];

let currentQuestionIndex = 0;

function nextQuestion() {
  document.getElementById("punishmentArea").style.display = "none";
  document.getElementById("gameArea").style.display = "block";

  // 🔥 Si ya no hay más preguntas
  if (currentQuestionIndex >= questions.length) {
    document.getElementById("qText").textContent =
      "🎉 ¡Completaste todas las preguntas!";
    document.getElementById("qOptions").innerHTML =
      '<button class="secret-btn" onclick="restartGame()">Reiniciar 🔁</button>';
    return;
  }

  const item = questions[currentQuestionIndex];

  document.getElementById("qNumber").textContent =
    `Pregunta ${currentQuestionIndex + 1}`;
  document.getElementById("qText").textContent = item.q;

  const optsDiv = document.getElementById("qOptions");
  optsDiv.innerHTML = "";

  item.opts.forEach((o, i) => {
    const b = document.createElement("button");
    b.className = "secret-btn";
    b.style.margin = "5px";
    b.textContent = o;

    b.onclick = () => {
      if (i === item.correct) {
        currentQuestionIndex++;
        nextQuestion();
      } else {
        showPunishment();
      }
    };

    optsDiv.appendChild(b);
  });
}

function showPunishment() {
  document.getElementById("gameArea").style.display = "none";
  document.getElementById("punishmentArea").style.display = "block";
  document.getElementById("punishmentText").textContent =
    punishments[Math.floor(Math.random() * punishments.length)];
}

function resetAfterPunishment() {
  currentQuestionIndex++;
  nextQuestion();
}

function restartGame() {
  currentQuestionIndex = 0;
  nextQuestion();
}

// --- CORAZONES ---
setInterval(() => {
  const h = document.createElement("div");
  h.className = "floating-heart";
  h.innerHTML = "❤";
  h.style.left = Math.random() * 100 + "vw";
  h.style.fontSize = Math.random() * 20 + 10 + "px";
  h.style.animationDuration = Math.random() * 3 + 3 + "s";
  document.querySelector(".hearts-container").appendChild(h);
  setTimeout(() => h.remove(), 5000);
}, 400);

loadSong(playlist[0]);
updateMatchView();
