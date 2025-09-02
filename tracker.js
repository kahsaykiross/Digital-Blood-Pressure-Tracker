document.addEventListener("DOMContentLoaded", () => {
  const bpForm = document.getElementById("bpForm");
  const bpTable = document.getElementById("bpTable");
  const latestSystolic = document.getElementById("latestSystolic");
  const latestDiastolic = document.getElementById("latestDiastolic");
  const averageBP = document.getElementById("averageBP");

  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const loginSection = document.getElementById("loginSection");
  const registerSection = document.getElementById("registerSection");
  const recordSection = document.getElementById("recordSection");
  const logoutBtn = document.getElementById("logoutBtn");

  let users = JSON.parse(localStorage.getItem("users")) || [];
  let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

  function categorize(s,d){ if(s<120&&d<80) return "Normal"; if(s<130&&d<80) return "Elevated"; return "Hypertension"; }
  function getBPColor(s,d){ if(s<120&&d<80) return "green"; if(s<130&&d<80) return "orange"; return "red"; }

  function getAllReadings(){
    let all=[];
    users.forEach(u=>u.readings?.forEach(r=>all.push({...r,user:u.username})));
    return all;
  }
  let bpReadings = getAllReadings();

  // Chart
  const ctx = document.getElementById("bpChart").getContext("2d");
  const bpChart = new Chart(ctx,{type:"line", data:{labels:[], datasets:[]}, options:{responsive:true, plugins:{legend:{position:"top"}, tooltip:{mode:'index', intersect:false}}, interaction:{mode:'nearest', intersect:false}, scales:{y:{beginAtZero:true}}}});

  function updateDashboard(){
    // Table
    bpTable.innerHTML="<tr><th>Date</th><th>User</th><th>Systolic</th><th>Diastolic</th><th>Category</th></tr>";
    bpReadings.forEach(r=>{
      bpTable.innerHTML+=`<tr><td>${r.date}</td><td>${r.user||'Public'}</td><td>${r.systolic}</td><td>${r.diastolic}</td><td>${r.category}</td></tr>`;
    });

    // Cards
    if(bpReadings.length>0){
      const last=bpReadings[bpReadings.length-1];
      const avgS=(bpReadings.reduce((sum,r)=>sum+r.systolic,0)/bpReadings.length).toFixed(1);
      const avgD=(bpReadings.reduce((sum,r)=>sum+r.diastolic,0)/bpReadings.length).toFixed(1);

      latestSystolic.textContent=last.systolic;
      latestDiastolic.textContent=last.diastolic;
      averageBP.textContent=`${avgS}/${avgD}`;

      latestSystolic.style.color=getBPColor(last.systolic,last.diastolic);
      latestDiastolic.style.color=getBPColor(last.systolic,last.diastolic);
      averageBP.style.color=getBPColor(avgS,avgD);
    }

    // Chart
    bpChart.data.labels = bpReadings.map(r=>r.date+" ("+r.user+")");
    bpChart.data.datasets = [
      {
        label:"Systolic",
        data:bpReadings.map(r=>r.systolic),
        borderColor:"red",
        fill:false,
        pointBackgroundColor:bpReadings.map(r=>getBPColor(r.systolic,r.diastolic)),
        tension:0.2
      },
      {
        label:"Diastolic",
        data:bpReadings.map(r=>r.diastolic),
        borderColor:"blue",
        fill:false,
        pointBackgroundColor:bpReadings.map(r=>getBPColor(r.systolic,r.diastolic)),
        tension:0.2
      }
    ];
    bpChart.update();
  }

  updateDashboard();

  // Registration
  registerForm.addEventListener("submit", e=>{
    e.preventDefault();
    const u=document.getElementById("regUsername").value;
    const p=document.getElementById("regPassword").value;
    if(users.find(user=>user.username===u)){ alert("Username exists"); return; }
    users.push({username:u,password:p,readings:[]});
    localStorage.setItem("users",JSON.stringify(users));
    alert("Registration successful!");
    registerForm.reset();
  });

  // Login
  loginForm.addEventListener("submit", e=>{
    e.preventDefault();
    const u=document.getElementById("username").value;
    const p=document.getElementById("password").value;
    const user=users.find(user=>user.username===u && user.password===p);
    if(user){
      currentUser=user.username;
      localStorage.setItem("currentUser",JSON.stringify(currentUser));
      loginSection.style.display="none";
      registerSection.style.display="none";
      recordSection.style.display="block";
      alert("Login successful! You can now add readings.");
    } else alert("Invalid credentials");
  });

  // Add reading
  bpForm.addEventListener("submit", e=>{
    e.preventDefault();
    if(!currentUser){ alert("Login required"); return; }
    const s=parseInt(document.getElementById("systolic").value);
    const d=parseInt(document.getElementById("diastolic").value);
    const userObj=users.find(u=>u.username===currentUser);
    const reading={date:new Date().toLocaleDateString(), systolic:s, diastolic:d, category:categorize(s,d)};
    userObj.readings.push(reading);
    localStorage.setItem("users",JSON.stringify(users));
    bpReadings=getAllReadings();
    updateDashboard();
    bpForm.reset();
  });

  // Logout
  logoutBtn.addEventListener("click", ()=>{
    currentUser=null;
    localStorage.removeItem("currentUser");
    recordSection.style.display="none";
    loginSection.style.display="block";
    registerSection.style.display="block";
    alert("Logged out. Dashboard remains visible to all visitors.");
  });
});
