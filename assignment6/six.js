const packages = [
  { id: 1, destination: "Goa", durationDays: 4, basePrice: 5000, season: "summer" },
  { id: 2, destination: "Manali", durationDays: 6, basePrice: 7000, season: "winter" },
  { id: 3, destination: "Kerala", durationDays: 5, basePrice: 6000, season: "monsoon" }
];

function calculateFinalPrice(pkg) {
  let multiplier = 1;
  switch (pkg.season) {
    case "summer": multiplier = 1.1; break;
    case "winter": multiplier = 1.2; break;
    case "monsoon": multiplier = 0.9; break;
  }
  return pkg.basePrice * multiplier;
}

const tableBody = document.querySelector("#packageTable tbody");
const packageSelect = document.querySelector("#packageSelect");

packages.forEach(pkg => {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${pkg.id}</td>
    <td>${pkg.destination}</td>
    <td>${pkg.durationDays}</td>
    <td>${pkg.basePrice}</td>
    <td>${pkg.season}</td>
    <td>${calculateFinalPrice(pkg)}</td>
  `;
  tableBody.appendChild(row);

  const opt = document.createElement("option");
  opt.value = pkg.id;
  opt.textContent = pkg.destination;
  packageSelect.appendChild(opt);
});

const checkIn = document.querySelector("#checkIn");
const checkOut = document.querySelector("#checkOut");
const guests = document.querySelector("#guests");
const promo = document.querySelector("#promo");
const totalPrice = document.querySelector("#totalPrice");
const submitBtn = document.querySelector("#submitBtn");

function updatePrice() {
  const pkg = packages.find(p => p.id == packageSelect.value);
  if (!pkg || !checkIn.value || !checkOut.value) {
    totalPrice.textContent = 0;
    submitBtn.disabled = true;
    return;
  }

  let nights = (new Date(checkOut.value) - new Date(checkIn.value)) / (1000 * 60 * 60 * 24);
  if (nights <= 0) {
    totalPrice.textContent = 0;
    submitBtn.disabled = true;
    return;
  }

  let price = calculateFinalPrice(pkg) * nights;

  if (guests.value > 2) price *= 1.2;

  switch (promo.value.trim().toUpperCase()) {
    case "EARLYBIRD": price *= 0.9; break;
    case "FESTIVE": price *= 0.85; break;
  }

  totalPrice.textContent = price.toFixed(2);
  submitBtn.disabled = false;
}

[packageSelect, checkIn, checkOut, guests, promo].forEach(el => {
  el.addEventListener("input", updatePrice);
});

const thumbs = document.querySelectorAll("#gallery img");
const modal = document.querySelector("#modal");
const modalImg = document.querySelector("#modalImg");
const modalCaption = document.querySelector("#modalCaption");
const closeModal = document.querySelector("#closeModal");

thumbs.forEach(img => {
  img.addEventListener("click", () => {
    modal.style.display = "block";
    modalImg.src = img.dataset.large;
    modalCaption.textContent = img.title;
  });
});

closeModal.addEventListener("click", () => modal.style.display = "none");

const navLinks = document.querySelectorAll("nav a");
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
  });
});
