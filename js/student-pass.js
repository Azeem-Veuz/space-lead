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
const studentFields = document.querySelectorAll(".student-field");
const professionalFields = document.querySelectorAll(".professional-field");

// Badge elements
const badgeCategory = document.querySelector(".badge-category");
const jobTitle = document.querySelector(".job-title");
const companyName = document.querySelector(".company-name");

cards.forEach(card => {
  card.addEventListener("click", () => {
    // Toggle active card
    cards.forEach(c => c.classList.remove("active"));
    card.classList.add("active");
    card.querySelector("input").checked = true;

    if (card.querySelector("input").value === "student") {
      // Show Student fields
      studentFields.forEach(f => f.classList.remove("d-none"));
      professionalFields.forEach(f => f.classList.add("d-none"));

      // Update badge
      badgeCategory.textContent = "STUDENT";
      jobTitle.classList.add("d-none");
      companyName.classList.add("d-none");

    } else {
      // Show Professional fields
      studentFields.forEach(f => f.classList.add("d-none"));
      professionalFields.forEach(f => f.classList.remove("d-none"));

      // Update badge
      badgeCategory.textContent = "PROFESSIONAL";
      jobTitle.classList.remove("d-none");
      companyName.classList.remove("d-none");
    }
  });
});

// ---------- FORM INPUTS ----------
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const jobTitleInput = document.getElementById("jobTitle");
const companyNameInput = document.getElementById("companyName");

// ---------- BADGE PREVIEW ELEMENTS ----------
const badgeFullName = document.querySelector(".full-name");
const badgeJobTitle = document.querySelector(".job-title");
const badgeCompanyName = document.querySelector(".company-name");

// ---------- UPDATE FUNCTIONS ----------
function updateFullName() {
  const firstName = firstNameInput.value.trim();
  const lastName = lastNameInput.value.trim();

  badgeFullName.textContent = firstName || lastName
    ? `${firstName} ${lastName}`.trim()
    : "FULL NAME";
}

function updateJobTitle() {
  badgeJobTitle.textContent = jobTitleInput.value.trim() || "Job Title";
}

function updateCompanyName() {
  badgeCompanyName.textContent = companyNameInput.value.trim() || "Company Name";
}

// ---------- EVENT LISTENERS ----------
[firstNameInput, lastNameInput].forEach(inp =>
  inp.addEventListener("input", updateFullName)
);

jobTitleInput.addEventListener("input", updateJobTitle);
companyNameInput.addEventListener("input", updateCompanyName);

// ---------- INITIAL CALL (so defaults show properly) ----------
updateFullName();
updateJobTitle();
updateCompanyName();



