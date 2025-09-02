document.addEventListener("DOMContentLoaded", () => {
  const bpForm = document.getElementById("bpForm");
  const bpTable = document.getElementById("bpTable");
  const latestSystolic = document.getElementById("latestSystolic");
  const latestDiastolic = document.getElementById("latestDiastolic");
  const averageBP = document.getElementById("averageBP");

  const loginForm = document.getElementById("loginForm");
  const loginSection = document.getElementById("loginSection");
  const recordSection = document.getElementById("recordSection");
  const logoutBtn = document.getElementById("logoutBtn");

  // Load stored readings
  let bpReadings = JSON.parse(localStorage.getItem("bpReadings")) || [];

  // Helper functions
  function categorize(s, d) {
    if (s < 120 && d < 80) return "Normal";
    if (s < 130 && d < 80) return "Elevated";
    return "Hypertension";
  }

  function getBPColor(s, d) {
    if (s < 120 && d < 80) return "green";
    if (s < 130 && d < 80) return "orange";
    return "red";
  }

  // Initialize Chart.js
  const ctx = document.getElementById("bpChart").getContext("2d");
  const bpChart = new Chart(ctx, {
    type: "line",
    data: { labels: [], datasets: [] },
    options: {
      responsive: true,
      plugins: { legend: { position: "top" }, tooltip: { mode: 'index', intersect: false } },
      interaction: { mode: 'nearest', intersect: false },
      scales: { y: { beginAtZero: true } }
    }
  });

  // Update dashboard
  function updateDashboard() {
    // Table
    bpTable.innerHTML = "<tr><th>Date</th><th>Systolic</th><th>Diastolic</th><th>Category</th></tr>";
    bpReadings.forEach(r => {
      bpTable.innerHTML += `<tr>
        <td>${r.date}</td>
        <td>${r.systolic}</td>
        <td>${r.diastolic}</td>
        <td>${r.category}</td>
      </tr>`;
    });

    // Cards
    if (bpReadings.length > 0) {
      const last = bpReadings[bpReadings.length - 1];
      const avgS = (bpReadings.reduce((sum,r)=>sum+r.systolic,0)/bpReadings.length).toFixed(1);
      const avgD = (bpReadings.reduce((sum,r)=>sum+r.diastolic,0)/bpReadings.length).toFixed(1);

      latestSystolic.textContent = last.systolic;
      latestDiastolic.textContent = last.diastolic;
      averageBP.textContent = `${avgS}/${avgD}`;

      latestSystolic.style.color = getBPColor(last.systolic,last.diastolic);
      latestDiastolic.style.color = getBPColor(last.systolic,last.diastolic);
      averageBP.style.color = getBPColor(avgS,avgD);
    }

    // Chart
    bpChart.data.labels = bpReadings.map(r=>r.date);
    bpChart.data.datasets = [
      {
        label: "Systolic",
        data: bpReadings.map(r=>r.systolic),
        borderColor: "red",
        fill: false,
        pointBackgroundColor: bpReadings.map(r => {
          if(r.systolic<120) return "green";
          if(r.systolic<130) return "orange";
          return "red";
        }),
        tension: 0.2
      },
      {
        label: "Diastolic",
        data: bpReadings.map(r=>r.diastolic),
        borderColor: "blue",
        fill: false,
        pointBackgroundColor: bpReadings.map(r => {
          if(r.diastolic<80) return "green";
          if(r.diastolic<90) return "orange";
          return "red";
        }),
        tension: 0.2
      }
    ];
    bpChart.update();

    // Persist
    localStorage.setItem("bpReadings", JSON.stringify(bpReadings));
  }

  updateDashboard();

  // Login logic (simple demo)
  loginForm.addEventListener("submit", e=>{
    e.preventDefault();
    const username=document.getElementById("username").value;
    const password=document.getElementById("password").value;
    if(username==="user" && password==="1234"){
      loginSection.style.display="none";
      recordSection.style.display="block";
      alert("Login successful! You can now add readings.");
    } else alert("Invalid username or password");
  });

  // Add reading
  bpForm.addEventListener("submit", e=>{
    e.preventDefault();
    const s = parseInt(document.getElementById("systolic").value);
    const d = parseInt(document.getElementById("diastolic").value);
    bpReadings.push({ date:new Date().toLocaleDateString(), systolic:s, diastolic:d, category:categorize(s,d) });
    updateDashboard();
    bpForm.reset();
  });

  // Logout
  logoutBtn.addEventListener("click", ()=>{
    recordSection.style.display="none";
    loginSection.style.display="block";
    alert("Logged out. Dashboard remains visible to all visitors.");
  });
});
