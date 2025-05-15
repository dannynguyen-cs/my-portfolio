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

// Optional: Call this on load to highlight the first page
document.addEventListener('DOMContentLoaded', () => showProject(1));

function toggleFAQ(index) {
  const answer = document.getElementById(`faq-${index}`);
  answer.style.display = (answer.style.display === 'block') ? 'none' : 'block';
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const responseMsg = document.getElementById("responseMsg");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/mqaqwyyy", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (res.ok) {
        responseMsg.textContent = "✅ Message sent!";
        form.reset();
      } else {
        responseMsg.textContent = "❌ Something went wrong. Please try again.";
      }
    } catch (error) {
      responseMsg.textContent = "⚠️ Network error. Please try later.";
    }
  });
});