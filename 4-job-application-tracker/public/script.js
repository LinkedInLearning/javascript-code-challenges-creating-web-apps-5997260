const jobList = document.getElementById("jobList");

const API_URL = "https://super-waffle-gxrrvrq5pvvcp9r7-3000.app.github.dev/api/jobs";

async function fetchJobs() {
  jobList.innerHTML = "";
  const res = await fetch(API_URL);
  const jobs = await res.json();
  jobs.forEach(renderJob);
}

function renderJob(job) {
  const item = document.createElement("div");
  item.className = "job-item";

  const info = document.createElement("div");
  info.className = "info";
  info.innerHTML = `
      <p><strong>${job.company}</strong> – ${job.role}</p>
      <p class="date">Applied: ${job.date || "N/A"}</p>
  `;

  const controls = document.createElement("div");
  controls.className = "controls";

  // Status input
  const statusInput = document.createElement("input");
  statusInput.type = "text";
  statusInput.value = job.status || "";
  statusInput.className = "status-input";
  statusInput.addEventListener("blur", async () => {
    await fetch(`${API_URL}/${job.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: statusInput.value }),
    });
  });

  // Delete button
  const delBtn = document.createElement("button");
  delBtn.textContent = "🗑";
  delBtn.className = "del-btn";
  delBtn.title = "Delete job";
  delBtn.addEventListener("click", async () => {
    await fetch(`${API_URL}/${job.id}`, { method: "DELETE" });
    item.remove();
  });

  controls.appendChild(statusInput);
  controls.appendChild(delBtn);

  item.appendChild(info);
  item.appendChild(controls);
  jobList.appendChild(item);
}

fetchJobs();