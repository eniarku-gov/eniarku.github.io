document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const success = document.getElementById("contact-success");
  const resetBtn = document.getElementById("contact-reset-btn");

  if (!form) return;

  const submitButton = form.querySelector('button[type="submit"]');

  form.addEventListener("submit", function (e) {
    e.preventDefault();

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
          submitButton.disabled = false;
          submitButton.textContent = "Submit";
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
        submitButton.disabled = false;
        submitButton.textContent = "Submit";
      }

      window.scrollTo({
        top: form.offsetTop - 40,
        behavior: "smooth"
      });
    });
  }
});
