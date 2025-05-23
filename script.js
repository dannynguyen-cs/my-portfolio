function openPopup(id) {
  const win = document.getElementById(id);
  win.style.display = 'block';
  win.style.zIndex = getNextZIndex();
}

function closePopup(id) {
  document.getElementById(id).style.display = 'none';
}

let zIndexCounter = 10;
function getNextZIndex() {
  return zIndexCounter++;
}

// Drag functionality
let draggedWindow = null;
let offsetX = 0;
let offsetY = 0;

function startDrag(e, windowId) {
  draggedWindow = document.getElementById(windowId);
  offsetX = e.clientX - draggedWindow.offsetLeft;
  offsetY = e.clientY - draggedWindow.offsetTop;

  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', stopDrag);
}

function drag(e) {
  if (!draggedWindow) return;
  draggedWindow.style.left = `${e.clientX - offsetX}px`;
  draggedWindow.style.top = `${e.clientY - offsetY}px`;
  draggedWindow.style.zIndex = getNextZIndex();
}

function stopDrag() {
  draggedWindow = null;
  document.removeEventListener('mousemove', drag);
  document.removeEventListener('mouseup', stopDrag);
}

let currentProject = 1;
const totalProjects = 3;

function showProject(num) {
  for (let i = 1; i <= totalProjects; i++) {
    document.getElementById(`project-${i}`).style.display = i === num ? 'block' : 'none';
    document.getElementById(`page-${i}`).classList.toggle('active-page', i === num);
  }
  currentProject = num;
}

function nextProject() {
  const next = currentProject === totalProjects ? 1 : currentProject + 1;
  showProject(next);
}

function prevProject() {
  const prev = currentProject === 1 ? totalProjects : currentProject - 1;
  showProject(prev);
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const responseMsg = document.getElementById("responseMsg");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(form);

      try {
        const res = await fetch("https://formspree.io/f/mqaqwyyy", {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: formData,
        });

        if (res.ok) {
          responseMsg.textContent = "✅ Message sent!";
          form.reset();
          history.replaceState(null, null, window.location.pathname);
        } else {
          responseMsg.textContent = "❌ Submission failed. Please try again.";
        }
      } catch (err) {
        responseMsg.textContent = "⚠️ Network error. Try again later.";
        console.error("Form submission error:", err);
      }
    });
  }

  // FAQ toggle logic
  const faqButtons = document.querySelectorAll(".faq-question");
  faqButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const answerId = button.getAttribute("onclick")?.match(/toggleFAQ\((\d)\)/)?.[1];
      if (answerId) {
        const answer = document.getElementById(`faq-${answerId}`);
        if (answer) {
          answer.style.display = answer.style.display === "block" ? "none" : "block";
        }
      }
    });
  });
});