// ====== Theme (Dark/Light) ======
const themeBtn = document.getElementById("themeBtn");
const savedTheme = localStorage.getItem("theme");

function applyTheme(theme){
  document.documentElement.dataset.theme = theme;
  themeBtn.querySelector(".theme-label").textContent = theme === "light" ? "Light" : "Dark";
  themeBtn.setAttribute("aria-label", `Ganti tema ke ${theme === "light" ? "dark" : "light"}`);
  themeBtn.firstChild.textContent = theme === "light" ? "🌞 " : "🌙 ";
}

if (savedTheme){
  applyTheme(savedTheme);
} else {
  // default: dark
  applyTheme("dark");
}

themeBtn.addEventListener("click", () => {
  const current = document.documentElement.dataset.theme || "dark";
  const next = current === "dark" ? "light" : "dark";
  applyTheme(next);
  localStorage.setItem("theme", next);
});

// ====== Mobile Nav Toggle ======
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.getElementById("navMenu");

navToggle?.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

// Close menu when click a link (mobile)
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    if (navMenu.classList.contains("open")) {
      navMenu.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
});

// ====== Active Link on Scroll ======
const sections = ["home", "about", "projects", "skills", "contact"].map(id => document.getElementById(id));
const navLinks = document.querySelectorAll(".nav-link");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      navLinks.forEach(l => l.classList.remove("active"));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      active?.classList.add("active");
    }
  });
}, { root: null, threshold: 0.35 });

sections.forEach(sec => sec && observer.observe(sec));

// ====== Contact Form Validation + Toast ======
const form = document.getElementById("contactForm");
const toast = document.getElementById("toast");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");

function setError(inputEl, errorEl, message){
  errorEl.textContent = message;
  inputEl.setAttribute("aria-invalid", "true");
}

function clearError(inputEl, errorEl){
  errorEl.textContent = "";
  inputEl.setAttribute("aria-invalid", "false");
}

function isValidEmail(email){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let ok = true;

  // Name
  const name = nameInput.value.trim();
  if(name.length < 2){
    ok = false;
    setError(nameInput, nameError, "Nama minimal 2 karakter.");
  } else {
    clearError(nameInput, nameError);
  }

  // Email
  const email = emailInput.value.trim();
  if(!isValidEmail(email)){
    ok = false;
    setError(emailInput, emailError, "Email tidak valid.");
  } else {
    clearError(emailInput, emailError);
  }

  // Message
  const msg = messageInput.value.trim();
  if(msg.length < 10){
    ok = false;
    setError(messageInput, messageError, "Pesan minimal 10 karakter.");
  } else {
    clearError(messageInput, messageError);
  }

  if(!ok) return;

  // Demo submit success
  toast.hidden = false;
  toast.textContent = "✅ Terima kasih! Pesanmu sudah siap dikirim.";

  form.reset();

  setTimeout(() => {
    toast.hidden = true;
  }, 3500);
});

// ====== Year ======
document.getElementById("year").textContent = new Date().getFullYear();