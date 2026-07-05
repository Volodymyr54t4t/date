// ===============================
// script.js
// ===============================

const openBtn = document.getElementById("openBtn");
const popup = document.getElementById("popup");
const form = document.getElementById("dateForm");
const success = document.getElementById("success");

const place = document.getElementById("place");
const customPlace = document.getElementById("customPlace");

const music = document.getElementById("music");

// ----------------------------
// Відкрити форму
// ----------------------------

openBtn.addEventListener("click", () => {

    popup.style.display = "flex";

    music.play().catch(() => {});

});

// ----------------------------
// Інше місце
// ----------------------------

place.addEventListener("change", () => {

    if (place.value === "Інше") {

        customPlace.style.display = "block";

    } else {

        customPlace.style.display = "none";

    }

});

// ----------------------------
// Сердечка
// ----------------------------

function createHeart() {

    const heart = document.createElement("div");

    heart.className = "heart";

    heart.innerHTML = "❤️";

    heart.style.left = Math.random() * 100 + "vw";

    heart.style.animationDuration = (4 + Math.random() * 5) + "s";

    heart.style.fontSize = (18 + Math.random() * 25) + "px";

    document.getElementById("hearts").appendChild(heart);

    setTimeout(() => {

        heart.remove();

    }, 9000);

}

setInterval(createHeart, 250);

// ----------------------------
// Надсилання форми
// ----------------------------

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    let selectedPlace = place.value;

    if (selectedPlace === "Інше") {

        selectedPlace = customPlace.value;

    }

    const data = {

        date: form.date.value,

        time: form.time.value,

        place: selectedPlace,

        message: document.getElementById("message").value

    };

    try {

        const response = await fetch("/send", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)

        });

        const result = await response.json();

        if (result.success) {

            popup.style.display = "none";

            success.style.display = "flex";

            form.reset();

        } else {

            alert("Помилка відправлення 😢");

        }

    } catch {

        alert("Сервер недоступний");

    }

});

// ----------------------------
// Закриття success
// ----------------------------

success.addEventListener("click", () => {

    success.style.display = "none";

});