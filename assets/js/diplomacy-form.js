document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("diplomacy-form");
  const success = document.getElementById("diplomacy-success");
  const resetBtn = document.getElementById("diplomacy-reset-btn");
  const consentCheckbox = document.getElementById("diplomacy-consent");
  const consentHidden = document.getElementById("diplomacy-consent-hidden");

  if (!form) return;

  const submitButton = form.querySelector('button[type="submit"]');

  function updateSubmitState() {
    if (!submitButton || !consentCheckbox) return;

    submitButton.disabled = !consentCheckbox.checked;

    if (consentHidden) {
      consentHidden.value = consentCheckbox.checked
        ? "Yes, I understand the requirements."
        : "";
    }
  }

  if (submitButton) {
    submitButton.disabled = true;
  }

  if (consentCheckbox) {
    consentCheckbox.addEventListener("change", updateSubmitState);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!consentCheckbox || !consentCheckbox.checked) {
      alert("Please confirm that you understand the requirements before submitting.");
      updateSubmitState();
      return;
    }

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Submitting...";
    }

    fetch(form.action, {
      method: "POST",
      mode: "no-cors",
      body: formData
    })
      .then(function () {
        form.style.display = "none";

        if (success) {
          success.style.display = "block";

          window.scrollTo({
            top: success.offsetTop - 40,
            behavior: "smooth"
          });
        }
      })
      .catch(function () {
        alert("There was an issue submitting the form. Please try again.");

        if (submitButton) {
          submitButton.textContent = "Submit";
          updateSubmitState();
        }
      });
  });

  if (resetBtn) {
    resetBtn.addEventListener("click", function () {
      form.reset();
      form.style.display = "block";

      if (success) {
        success.style.display = "none";
      }

      if (submitButton) {
        submitButton.textContent = "Submit";
      }

      if (consentHidden) {
        consentHidden.value = "";
      }

      updateSubmitState();

      window.scrollTo({
        top: form.offsetTop - 40,
        behavior: "smooth"
      });
    });
  }

  updateSubmitState();
});