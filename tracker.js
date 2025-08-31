let currentUser = localStorage.getItem('currentUser');
if(!currentUser) window.location.href = 'login.html';

document.getElementById('logoutBtn').addEventListener('click', function() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
});

function loadReadings() {
    let readings = JSON.parse(localStorage.getItem('bp_readings')) || {};
    let userReadings = readings[currentUser] || [];
    let table = document.getElementById('bpTable');
    table.innerHTML = '<tr><th>Date</th><th>Systolic</th><th>Diastolic</th><th>Category</th></tr>';
    userReadings.forEach(r => {
        let category = 'Normal';
        if(r.systolic >= 130 || r.diastolic >= 80) category = 'High';
        else if(r.systolic >= 120 || r.diastolic >= 80) category = 'Elevated';
        let row = table.insertRow();
        row.insertCell(0).innerText = r.date;
        row.insertCell(1).innerText = r.systolic;
        row.insertCell(2).innerText = r.diastolic;
        row.insertCell(3).innerText = category;
    });
}

document.getElementById('bpForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let systolic = document.getElementById('systolic').value;
    let diastolic = document.getElementById('diastolic').value;
    let readings = JSON.parse(localStorage.getItem('bp_readings')) || {};
    if(!readings[currentUser]) readings[currentUser] = [];
    readings[currentUser].push({systolic, diastolic, date: new Date().toLocaleString()});
    localStorage.setItem('bp_readings', JSON.stringify(readings));
    loadReadings();
    document.getElementById('bpForm').reset();
});

loadReadings();