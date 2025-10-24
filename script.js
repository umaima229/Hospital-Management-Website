// 🌐 Navbar Scroll Effect with Smooth Transition
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  }
});
// 🧠 Doctor Search + Filter with Debouncing
const searchInput = document.getElementById("doctorSearch");
const filterSelect = document.getElementById("filterSpec");
const clearBtn = document.getElementById("clearFilters");
const grid = document.getElementById("doctorsGrid");

let debounceTimeout;

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

  // Save filters to local storage
  localStorage.setItem("doctorSearch", q);
  localStorage.setItem("filterSpec", spec);
}

// Debounce search input to improve performance on rapid typing
if (searchInput) {
  searchInput.addEventListener("input", function () {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(applyFilters, 300); // 300ms delay
  });
}

// Apply saved filters from local storage
if (searchInput && filterSelect) {
  searchInput.value = localStorage.getItem("doctorSearch") || "";
  filterSelect.value = localStorage.getItem("filterSpec") || "";
  applyFilters();
}

if (filterSelect) filterSelect.addEventListener("change", applyFilters);

if (clearBtn) {
  clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    filterSelect.value = "";
    applyFilters();
  });
}
// 💬 Modal Logic with Fade-in Animation
function openContactModal(button) {
  const doc = button.dataset.doc || "Doctor";
  const spec = button.dataset.spec || "";
  const modal = document.getElementById("contactModal");
  const docName = document.getElementById("modalDoctorName");

  if (modal && docName) {
    docName.textContent = `${doc}${spec ? " — " + spec : ""}`;
    modal.classList.add("fade-in"); // Trigger fade-in animation
    modal.style.display = "block";
  }
}

function closeContactModal() {
  const modal = document.getElementById("contactModal");
  if (modal) {
    modal.classList.remove("fade-in"); // Remove fade-in class when closing
    modal.style.display = "none";
  }
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
// ✨ Fade-In Animation on Scroll (Modern Approach with Intersection Observer)
const fadeElements = document.querySelectorAll(".fade-in");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target); // Stop observing once the element is visible
    }
  });
}, { threshold: 0.2 });

fadeElements.forEach(el => observer.observe(el));

// Get the button
let backToTopBtn = document.getElementById("backToTopBtn");

// Show the button when scrolling down 100px
window.onscroll = function () {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
};

// Scroll to the top when the button is clicked
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
// Handle Appointment Form Submission (Example)
const appointmentForm = document.querySelector('#appointmentModal form');
if (appointmentForm) {
  appointmentForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission to show the process
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    console.log("Booking Appointment: ", name, phone);
    
    alert('Appointment Booked Successfully!'); // Show a success message or handle logic here
    // Optionally close the modal
    const appointmentModal = new bootstrap.Modal(document.getElementById('appointmentModal'));
    appointmentModal.hide();
  });
}
// Ensure DOM is fully loaded before adding event listeners
document.addEventListener('DOMContentLoaded', function () {

  // Get the appointment modal and the button that triggers it
  var appointmentModal = new bootstrap.Modal(document.getElementById('appointmentModal'));
  var learnMoreModal = new bootstrap.Modal(document.getElementById('learnMoreModal'));

  // Get the buttons that will trigger the modals
  var bookAppointmentButton = document.getElementById('bookAppointmentButton');
  var learnMoreButton = document.getElementById('learnMoreButton');

  // Open Appointment Modal when "Book Appointment" button is clicked
  if (bookAppointmentButton) {
    bookAppointmentButton.addEventListener('click', function () {
      appointmentModal.show();
    });
  }

  // Open Learn More Modal when "Learn More" button is clicked
  if (learnMoreButton) {
    learnMoreButton.addEventListener('click', function () {
      learnMoreModal.show();
    });
  }

  // Optional: Close the modals when clicking outside the modal content area
  // You can also add a custom close button logic here

  // Close Appointment Modal (Manual)
  var appointmentCloseButton = document.querySelector('.close-appointment-modal');
  if (appointmentCloseButton) {
    appointmentCloseButton.addEventListener('click', function () {
      appointmentModal.hide();
    });
  }

  // Close Learn More Modal (Manual)
  var learnMoreCloseButton = document.querySelector('.close-learnmore-modal');
  if (learnMoreCloseButton) {
    learnMoreCloseButton.addEventListener('click', function () {
      learnMoreModal.hide();
    });
  }

});
