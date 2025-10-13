// 🌐 Navbar Scroll Effect
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  }
});

// 🧠 Doctor Search + Filter
const searchInput = document.getElementById("doctorSearch");
const filterSelect = document.getElementById("filterSpec");
const clearBtn = document.getElementById("clearFilters");
const grid = document.getElementById("doctorsGrid");

function applyFilters() {
  if (!grid) return;

  const q = searchInput?.value.trim().toLowerCase() || "";
  const spec = filterSelect?.value.trim().toLowerCase() || "";
  const items = grid.querySelectorAll(".doctor-item");

  items.forEach(item => {
    const name = item.dataset.name.toLowerCase();
    const s = item.dataset.spec.toLowerCase();
    const matchesQuery = !q || name.includes(q) || s.includes(q);
    const matchesSpec = !spec || s === spec;
    item.style.display = (matchesQuery && matchesSpec) ? "" : "none";
  });
}

if (searchInput) searchInput.addEventListener("input", applyFilters);
if (filterSelect) filterSelect.addEventListener("change", applyFilters);
if (clearBtn) {
  clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    filterSelect.value = "";
    applyFilters();
  });
}

// 💬 Modal Logic
function openContactModal(button) {
  const doc = button.dataset.doc || "Doctor";
  const spec = button.dataset.spec || "";
  const modal = document.getElementById("contactModal");
  const docName = document.getElementById("modalDoctorName");
  
  if (modal && docName) {
    docName.textContent = `${doc}${spec ? " — " + spec : ""}`;
    modal.style.display = "block";
  }
}

function closeContactModal() {
  const modal = document.getElementById("contactModal");
  if (modal) modal.style.display = "none";
}

function submitContact() {
  const name = document.getElementById("userName")?.value.trim();
  const phone = document.getElementById("userPhone")?.value.trim();
  const email = document.getElementById("userEmail")?.value.trim();
  const date = document.getElementById("prefDate")?.value;
  const time = document.getElementById("prefTime")?.value;
  const msg = document.getElementById("userMessage")?.value.trim();
  const doctor = document.getElementById("modalDoctorName")?.textContent;

  if (!name || !phone) {
    alert("Please enter your name and phone number.");
    return;
  }

  const payload = { doctor, name, phone, email, date, time, msg, sentAt: new Date().toISOString() };
  console.log("📩 Appointment payload:", payload);

  alert("✅ Appointment Request Sent! (Demo Mode)\nCheck Console for Details.");
  closeContactModal();
}

// ✨ Fade-In Animation on Scroll
const fadeElements = document.querySelectorAll(".fade-in");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

fadeElements.forEach(el => observer.observe(el));
