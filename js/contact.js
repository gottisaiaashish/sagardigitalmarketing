/**
 * SAGAR DIGITAL MARKETING - Contact Form & Consultation Questionnaire
 * Form Validation, Service Pre-selection via Query Params, and Web3Forms Gmail Delivery
 */

document.addEventListener("DOMContentLoaded", () => {
  initContactForm();
  preselectServiceFromQuery();
});

// Pre-check service checkbox if URL contains ?service=...
function preselectServiceFromQuery() {
  const urlParams = new URLSearchParams(window.location.search);
  const serviceParam = urlParams.get("service");
  if (!serviceParam) return;

  const targetCheckbox = document.querySelector(`input[name="services"][value="${serviceParam}"]`);
  if (targetCheckbox) {
    targetCheckbox.checked = true;
  }
}

// Contact Form Submission & Web3Forms Integration
function initContactForm() {
  const form = document.querySelector("#contact-form");
  const successModal = document.querySelector("#form-success-modal");
  const successClose = document.querySelector("#success-modal-close");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Basic Validation
    const name = form.querySelector("#client-name")?.value.trim();
    const email = form.querySelector("#client-email")?.value.trim();
    const business = form.querySelector("#business-name")?.value.trim();

    if (!name || !email || !business) {
      alert("Please provide your name, business name, and email address.");
      return;
    }

    const submitBtn = form.querySelector("#submit-button");
    const originalText = submitBtn.innerHTML;

    // Loading State
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span>Sending Message...</span>
    `;

    try {
      const formData = new FormData(form);

      // Collect checked services
      const selectedServices = Array.from(form.querySelectorAll('input[name="services"]:checked'))
        .map(el => el.parentElement.querySelector("span")?.textContent.trim() || el.value)
        .join(", ");
      
      if (selectedServices) {
        formData.set("services", selectedServices);
      }

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const result = await response.json();

      if (response.ok && result.success) {
        form.reset();
        if (successModal) {
          successModal.classList.remove("hidden");
          successModal.classList.add("flex");
        } else {
          alert("Thank you! Your message has been sent to our team.");
        }
      } else {
        alert(result.message || "Failed to send message. Please contact us directly on WhatsApp at +91 70326 19866.");
      }
    } catch (err) {
      console.error("Form submission error:", err);
      alert("Submission error. Please connect directly via WhatsApp at +91 70326 19866.");
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });

  if (successClose && successModal) {
    successClose.addEventListener("click", () => {
      successModal.classList.add("hidden");
      successModal.classList.remove("flex");
    });
  }
}
