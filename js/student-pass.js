// ---------- SELECT2 ----------
$("#title").select2({
  placeholder: "Select Title",
  allowClear: true
});

// ---------- PHONE INPUT ----------
const phoneInput = document.querySelector("#phone");
const iti = window.intlTelInput(phoneInput, {
  initialCountry: "sa",
  separateDialCode: true
});

// ---------- FORM ----------
const form = document.getElementById("registrationForm");
const fields = form.querySelectorAll("input, select");

// ---------- ERROR HELPERS ----------
function showError(field, message) {
  const errorDiv = field.closest(".form-group")?.querySelector(".error");
  if (errorDiv) {
    errorDiv.style.display = "block";
    errorDiv.textContent = message;
  }
}

function hideError(field) {
  const errorDiv = field.closest(".form-group")?.querySelector(".error");
  if (errorDiv) errorDiv.style.display = "none";
}

// ---------- VALIDATION ----------
function validateField(field) {
  const value = field.value.trim();
  if (!value) {
    showError(field, `${field.previousElementSibling.textContent.replace("*", "")} is required`);
    return false;
  }
  if (field.type === "email" && !/\S+@\S+\.\S+/.test(value)) {
    showError(field, "Enter a valid email address");
    return false;
  }
  hideError(field);
  return true;
}

function validateTitle() {
  if (!$("#title").val()) {
    showError(document.getElementById("title"), "Title is required");
    return false;
  }
  hideError(document.getElementById("title"));
  return true;
}

function validatePhone() {
  if (!phoneInput.value.trim()) {
    showError(phoneInput, "Phone number is required");
    return false;
  }
  hideError(phoneInput);
  return true;
}

// ---------- FIELD EVENTS ----------
fields.forEach(field => {
  if (field.id !== "title" && field.id !== "phone") {
    field.addEventListener("blur", () => validateField(field));
    field.addEventListener("input", () => validateField(field));
  }
});

$("#title").on("change select2:close", validateTitle);
phoneInput.addEventListener("blur", validatePhone);
phoneInput.addEventListener("input", () => {
  if (phoneInput.value.trim()) hideError(phoneInput);
});

// ---------- FORM SUBMIT ----------
form.addEventListener("submit", function (e) {
  e.preventDefault();
  let valid = true;

  fields.forEach(field => {
    if (field.id !== "title" && field.id !== "phone") {
      if (!validateField(field)) valid = false;
    }
  });

  if (!validateTitle()) valid = false;
  if (!validatePhone()) valid = false;

  if (valid) {
    alert("Form submitted successfully!");
    form.reset();
    $("#title").val(null).trigger("change");
    iti.setNumber("");
  }
});

// ---------- EVENT CARDS ----------
const cards = document.querySelectorAll(".event-cards");
const ticketSummary = document.getElementById("ticketSummary");

cards.forEach(card => {
  card.addEventListener("click", () => {
    cards.forEach(c => c.classList.remove("active"));
    card.classList.add("active");
    card.querySelector("input").checked = true;

    ticketSummary.classList.toggle("d-none", card.querySelector("input").value !== "workshop");
  });
});
