/**
 * SAGAR DIGITAL MARKETING - Services Page Interactivity
 * Interactive Growth Package Estimator and Scope Calculator
 */

document.addEventListener("DOMContentLoaded", () => {
  initEstimator();
});

function initEstimator() {
  const checkboxes = document.querySelectorAll(".estimator-service");
  const businessSizeSelect = document.querySelector("#estimator-size");
  const outputPackage = document.querySelector("#estimator-recommendation");
  const outputTimeline = document.querySelector("#estimator-timeline");
  const outputScope = document.querySelector("#estimator-scope-count");

  if (!checkboxes.length || !outputPackage) return;

  const calculateRecommendation = () => {
    let checkedCount = 0;
    checkboxes.forEach(cb => {
      if (cb.checked) checkedCount++;
    });

    if (outputScope) {
      outputScope.textContent = `${checkedCount} Selected`;
    }

    if (checkedCount === 0) {
      outputPackage.textContent = "Select services above to see recommendation";
      if (outputTimeline) outputTimeline.textContent = "—";
      return;
    }

    if (checkedCount <= 1) {
      outputPackage.textContent = "Starter Focus Sprint";
      if (outputTimeline) outputTimeline.textContent = "2–3 Weeks Setup";
    } else if (checkedCount <= 3) {
      outputPackage.textContent = "Growth Accelerator Partnership";
      if (outputTimeline) outputTimeline.textContent = "4–6 Weeks Full Rollout";
    } else {
      outputPackage.textContent = "Complete Brand Authority Suite";
      if (outputTimeline) outputTimeline.textContent = "Ongoing Strategic Scaling";
    }
  };

  checkboxes.forEach(cb => {
    cb.addEventListener("change", calculateRecommendation);
  });

  if (businessSizeSelect) {
    businessSizeSelect.addEventListener("change", calculateRecommendation);
  }

  // Initial calculation
  calculateRecommendation();
}

