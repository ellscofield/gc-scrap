const pages = document.querySelectorAll(".page");

pages.forEach((page, index) => {
    page.style.zIndex = pages.length - index;
});

let current = 0;
let heartInterval = null;

function createHeart() {

    const heart = document.createElement("div");

    heart.className = "heart";

    heart.innerHTML = "❤️";

    heart.style.left =
        Math.random() * window.innerWidth + "px";

    heart.style.bottom = "0px";

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 4000);
}

function nextPage() {

    if (current < pages.length - 1) {

        pages[current].classList.add("flipped");
        current++;

        if(current === 5){

            typeLetter();

            if(!heartInterval){
                heartInterval =
                setInterval(createHeart, 500);
            }

        }

    }

}

function prevPage() {

    if (current > 0) {

        if(current === 5){

            clearInterval(heartInterval);
            heartInterval = null;

        }

        current--;
        pages[current].classList.remove("flipped");

    }

}

function startBook() {

    const music =
    document.getElementById("music");

    music.play();

    document
    .getElementById("navigation")
    .classList.add("show");

    pages[0].classList.add("flipped");

    current = 1;

}

function restartBook() {

    pages.forEach(page => {
        page.classList.remove("flipped");
    });

    current = 0;

    document
        .getElementById("navigation")
        .classList.remove("show");

    document
        .getElementById("typedLetter")
        .innerHTML = "";

    typed = false;

    clearInterval(heartInterval);
    heartInterval = null;

}

const startDate = new Date("2026-05-01");

function updateTogetherTime() {
    const now = new Date();

    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();

    if (days < 0) {
        months--;

        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    document.getElementById("daysTogether").innerHTML =
        `${years} Tahun ${months} Bulan ${days} Hari ❤️`;
}

// update awal
updateTogetherTime();

// update otomatis tiap jam
setInterval(updateTogetherTime, 1000 * 60 * 60);

/* ===========================
   EFEK MENGETIK SURAT CINTA
=========================== */

const letterText = `
Untuk Chantika,

Terima kasih sudah hadir dalam hidupku.

Terima kasih untuk setiap tawa,
setiap cerita,
setiap perhatian kecil yang mungkin
terlihat sederhana, tetapi sangat berarti bagiku.

Jika semua kenangan kita ditulis menjadi sebuah buku,
aku berharap halaman terakhirnya tidak pernah ada.

Dengan cinta,

Giellsyah ❤️
`;

let typed = false;

function typeLetter() {

    if (typed) return;

    typed = true;

    const target =
    document.getElementById("typedLetter");

    let i = 0;

    function typing() {

        if (i < letterText.length) {

            if(letterText.charAt(i) === "\n"){
                target.innerHTML += "<br>";
            } else {
                target.innerHTML += letterText.charAt(i);
            }

            i++;

            setTimeout(typing, 50);

        }

    }

    typing();
}

document.querySelectorAll(".polaroid-inner").forEach(photo => {

    photo.addEventListener("click", () => {

        // Tutup foto lain yang sedang terbuka
        document
            .querySelectorAll(".polaroid-inner")
            .forEach(item => {

                if(item !== photo){
                    item.classList.remove("active");
                }

            });

        // Toggle foto yang ditekan
        photo.classList.toggle("active");

    });

});
