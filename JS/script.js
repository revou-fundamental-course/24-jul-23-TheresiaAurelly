// AUTO SLIDESHOW

let slideIndex = 1;
showSlides(slideIndex);

function changeSlide(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

// Function untuk mendapatkan posisi sentuhan awal
let touchStartX = 0;

// Function untuk mendapatkan posisi sentuhan akhir dan menentukan arah pergeseran
function handleTouchMove(e) {
    if (touchStartX > e.touches[0].clientX) {
        changeSlide(1); // Geser ke kanan (maju)
    } else if (touchStartX < e.touches[0].clientX) {
        changeSlide(-1); // Geser ke kiri (mundur)
    }
}

// Function untuk menyimpan posisi awal saat sentuhan dimulai
function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
}

let slideshowContainer = document.querySelector(".slideshow-container");
slideshowContainer.addEventListener("touchstart", handleTouchStart, false);
slideshowContainer.addEventListener("touchmove", handleTouchMove, false);

showSlides(slideIndex);

// Fungsi untuk otomatis mengganti slide setiap 7 detik
function autoSlide() {
    changeSlide(1);
    setTimeout(autoSlide, 7000);
}

setTimeout(autoSlide, 7000);

// Fungsi untuk mengubah slide berdasarkan tombol dot yang diklik
let dots = document.getElementsByClassName("dot");
for (let i = 0; i < dots.length; i++) {
    dots[i].addEventListener("click", function() {
        currentSlide(i + 1);
    });
}

// Hentikan slideshow ketika pengguna mengarahkan kursor ke atasnya
slideshowContainer.addEventListener("mouseover", function () {
    clearTimeout(slideshowTimeout);
});

// Mulai slideshow kembali ketika pengguna mengeluarkan kursor dari atasnya
slideshowContainer.addEventListener("mouseout", function () {
    slideshowTimeout = setTimeout(showSlides, 7000);
});







// VALIDATION FUNCTION

const nameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/; // Regex untuk memastikan nama terdiri dari dua kata
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex untuk memastikan email address sesuai format

// Function untuk menampilkan pesan validasi
function showValidationMessage(inputElement, isValid) {
    const validationMessage = inputElement.nextElementSibling;
    if (isValid) {
        inputElement.style.borderColor = 'green';
        validationMessage.style.display = 'none';
    } else {
        inputElement.style.borderColor = 'red';
        validationMessage.style.display = 'block';
    }
}

// Function untuk menyembunyikan pesan validasi saat memasukkan ulang data
function hideValidationMessage(inputElement) {
    const validationMessage = inputElement.nextElementSibling;
    inputElement.style.borderColor = '#9FAFC1';
    validationMessage.style.display = 'none';
}

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Menghentikan submit form secara default

    const firstNameInput = document.getElementById('namee');
    const emailInput = document.getElementById('email');

    // Validasi Nama (First Name)
    const firstNameIsValid = nameRegex.test(firstNameInput.value);
    showValidationMessage(firstNameInput, firstNameIsValid);

    // Validasi Email Address
    const emailIsValid = emailRegex.test(emailInput.value);
    showValidationMessage(emailInput, emailIsValid);

    // Cek apakah semua input sudah valid, jika ya, kirimkan formulir
    if (firstNameIsValid && emailIsValid) {
        // Mengirimkan formulir
        this.submit();
    } else {
        alert('Make sure the data you enter is correct!');
    }
});

// Event listener untuk menyembunyikan pesan validasi saat memasukkan ulang data
document.querySelectorAll('.field').forEach(inputElement => {
    inputElement.addEventListener('input', function() {
        hideValidationMessage(inputElement);
    });
});

// Sembunyikan pesan validasi kesalahan secara default saat halaman dimuat
document.querySelectorAll('.message').forEach(messageElement => {
    messageElement.style.display = 'none';
});