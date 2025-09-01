

  // Initialize Select2
  $("#title").select2({
    placeholder: "Select Title",
    allowClear: true
  });

  // Initialize intl-tel-input (Default: Saudi Arabia)
  const phoneInput = document.querySelector("#phone");
  const iti = window.intlTelInput(phoneInput, {
    initialCountry: "sa",
    separateDialCode: true
  });

  const form = document.getElementById('registrationForm');
  const fields = form.querySelectorAll('input, select');

  // Show error message
  function showError(field, message) {
    const errorDiv = field.closest(".form-group").querySelector('.error');
    if (errorDiv) {
      errorDiv.style.display = 'block';
      errorDiv.textContent = message;
    }
  }

  // Hide error message
  function hideError(field) {
    const errorDiv = field.closest(".form-group").querySelector('.error');
    if (errorDiv) errorDiv.style.display = 'none';
  }

  // Validation for normal fields (excluding title + phone)
  fields.forEach(field => {
    if (field.id !== "title" && field.id !== "phone") {
      field.addEventListener('blur', () => {
        if (!field.value) {
          showError(field, `${field.previousElementSibling.textContent.replace('*','')} is required`);
        } else {
          if (field.type === 'email' && !/\S+@\S+\.\S+/.test(field.value)) {
            showError(field, "Enter a valid email address");
          } else {
            hideError(field);
          }
        }
      });

      field.addEventListener('input', () => {
        if (field.value) {
          if (field.type === 'email' && !/\S+@\S+\.\S+/.test(field.value)) {
            showError(field, "Enter a valid email address");
          } else {
            hideError(field);
          }
        }
      });
    }
  });

  // Special handling for Select2 (Title)
  $("#title").on("change", function () {
    if (!this.value) {
      showError(this, "Title is required");
    } else {
      hideError(this);
    }
  });

  $("#title").on("select2:close", function () {
    if (!this.value && document.activeElement !== this) {
      showError(this, "Title is required");
    }
  });

  /** ---------------- PHONE VALIDATION ---------------- **/

  // Blur (leaving field)
  phoneInput.addEventListener("blur", function () {
    if (!phoneInput.value.trim()) {
      showError(phoneInput, "Phone number is required");
    } else if (!iti.isValidNumber()) {
      showError(phoneInput, "Enter a valid phone number");
    } else {
      hideError(phoneInput);
    }
  });

  // Input (typing) → remove "required" error immediately
  phoneInput.addEventListener("input", function () {
    if (phoneInput.value.trim()) {
      hideError(phoneInput); // clear "required" as soon as typing
    }
  });

  /** ---------------- FORM SUBMIT ---------------- **/
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;

    fields.forEach(field => {
      if (!field.value && field.id !== "phone") {
        showError(field, `${field.previousElementSibling.textContent.replace('*','')} is required`);
        valid = false;
      } else if (field.type === 'email' && !/\S+@\S+\.\S+/.test(field.value)) {
        showError(field, "Enter a valid email address");
        valid = false;
      } else {
        hideError(field);
      }
    });

    // Validate title
    if (!$("#title").val()) {
      showError(document.getElementById("title"), "Title is required");
      valid = false;
    }

    // Validate phone
    if (!phoneInput.value.trim()) {
      showError(phoneInput, "Phone number is required");
      valid = false;
    } else if (!iti.isValidNumber()) {
      showError(phoneInput, "Enter a valid phone number");
      valid = false;
    } else {
      hideError(phoneInput);
    }

    if (valid) {
      alert("Form submitted successfully!");
      form.reset();
      $("#title").val(null).trigger("change"); // reset Select2
      iti.setNumber(""); // reset phone
    }
  });

//   

const cards = document.querySelectorAll('.event-cards');
    const radios = document.querySelectorAll('input[name="event"]');
    const ticketSummary = document.getElementById('ticketSummary');

    cards.forEach(card => {
      card.addEventListener('click', () => {
        cards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        card.querySelector('input').checked = true;

        if (card.querySelector('input').value === 'workshop') {
          ticketSummary.classList.remove('d-none');
        } else {
          ticketSummary.classList.add('d-none');
        }
      });
    });