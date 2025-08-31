document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let user = users.find(u => u.username === username && u.password === password);
    if(user){
        localStorage.setItem('currentUser', username);
        window.location.href = 'tracker.html';
    } else {
        document.getElementById('loginMsg').innerText = 'Invalid credentials';
    }
});