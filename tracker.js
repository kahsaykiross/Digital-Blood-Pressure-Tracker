const userId = localStorage.getItem("user_id");

if(!userId){
    window.location.href = "login.html";
}

document.getElementById("bpForm").addEventListener("submit", function(e){
    e.preventDefault();

    const systolic = parseInt(document.getElementById("systolic").value);
    const diastolic = parseInt(document.getElementById("diastolic").value);
    const pulse = parseInt(document.getElementById("pulse").value);

    let status = "";
    if(systolic < 120 && diastolic < 80) status = "Normal";
    else if(systolic <= 129 && diastolic < 80) status = "Elevated";
    else if(systolic <= 139 || diastolic <= 89) status = "High (Stage 1)";
    else status = "High (Stage 2)";

    document.getElementById("status").innerText = `Status: ${status}`;

    fetch("save_reading.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, systolic, diastolic, pulse })
    })
    .then(response => response.json())
    .then(data => updateChart(data.readings))
    .catch(err => console.error(err));
});

let ctx = document.getElementById('bpChart').getContext('2d');
let bpChart = new Chart(ctx, {
    type: 'line',
    data: { labels: [], datasets: [
        { label: 'Systolic', data: [], borderColor: 'red', fill: false },
        { label: 'Diastolic', data: [], borderColor: 'blue', fill: false }
    ]},
    options: { scales: { x: { title: { display: true, text: 'Date' } }, y: { title: { display: true, text: 'mmHg' } } } }
});

function updateChart(readings){
    bpChart.data.labels = readings.map(r => r.reading_date);
    bpChart.data.datasets[0].data = readings.map(r => r.systolic);
    bpChart.data.datasets[1].data = readings.map(r => r.diastolic);
    bpChart.update();
}

document.getElementById("logoutBtn").addEventListener("click", function(){
    localStorage.removeItem("user_id");
    window.location.href = "login.html";
});
