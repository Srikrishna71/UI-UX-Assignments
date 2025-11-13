const packages = [
      { id: 1, destination: "Paris", durationDays: 5, basePrice: 1200, season: "High" },
      { id: 2, destination: "Bali", durationDays: 6, basePrice: 950, season: "Medium" },
      { id: 3, destination: "Tokyo", durationDays: 7, basePrice: 1500, season: "High" },
      { id: 4, destination: "Switzerland", durationDays: 8, basePrice: 1800, season: "Low" }
    ];

    const tbody = document.querySelector("#packageTable tbody");
    const pkgSelect = document.querySelector("#packageSelect");

    function calcFinalPrice(pkg) {
      let multiplier;
      switch (pkg.season) {
        case "High": multiplier = 1.2; break;
        case "Medium": multiplier = 1.1; break;
        default: multiplier = 1.0;
      }
      const weekend = pkg.durationDays > 6 ? 1.05 : 1;
      return (pkg.basePrice * multiplier * weekend).toFixed(2);
    }

    packages.forEach(pkg => {
      const row = document.createElement("tr");
      const price = calcFinalPrice(pkg);
      row.innerHTML = `
        <td>${pkg.id}</td>
        <td>${pkg.destination}</td>
        <td>${pkg.durationDays}</td>
        <td>$${pkg.basePrice}</td>
        <td>${pkg.season}</td>
        <td>$${price}</td>
      `;
      tbody.appendChild(row);

      const option = document.createElement("option");
      option.value = pkg.destination;
      option.textContent = pkg.destination;
      pkgSelect.appendChild(option);
    });

    const checkIn = document.getElementById("checkIn");
    const checkOut = document.getElementById("checkOut");
    const guests = document.getElementById("guests");
    const promo = document.getElementById("promo");
    const totalPrice = document.getElementById("totalPrice");
    const submitBtn = document.getElementById("submitBtn");

    function updatePrice() {
      const selected = packages.find(p => p.destination === pkgSelect.value);
      if (!selected || !checkIn.value || !checkOut.value) {
        totalPrice.textContent = "0";
        submitBtn.disabled = true;
        return;
      }
      const start = new Date(checkIn.value);
      const end = new Date(checkOut.value);
      const nights = (end - start) / (1000 * 60 * 60 * 24);
      if (nights <= 0) {
        totalPrice.textContent = "Invalid dates";
        submitBtn.disabled = true;
        return;
      }
      let total = selected.basePrice * (nights / 3);
      if (guests.value > 2) total *= 1.2;
      switch (promo.value.trim().toUpperCase()) {
        case "EARLYBIRD": total *= 0.9; break;
        case "VIP": total *= 0.85; break;
      }
      totalPrice.textContent = `$${total.toFixed(2)}`;
      submitBtn.disabled = false;
    }

    [pkgSelect, checkIn, checkOut, guests, promo].forEach(el => 
      el.addEventListener("change", updatePrice)
    );

    document.getElementById("bookingForm").addEventListener("submit", e => {
      e.preventDefault();
      alert("Booking confirmed!");
    });

    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modalImg");
    const modalCaption = document.getElementById("modalCaption");
    const closeModal = document.getElementById("closeModal");

    document.querySelectorAll(".thumbs img").forEach(img => {
      img.addEventListener("click", () => {
        modal.style.display = "flex";
        modalImg.src = img.dataset.large;
        modalCaption.textContent = img.alt;
      });
    });

    closeModal.onclick = () => (modal.style.display = "none");
