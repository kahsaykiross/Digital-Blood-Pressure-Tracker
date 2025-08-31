document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let users = JSON.parse(localStorage.getItem('users')) || [];
    if(users.some(u => u.username === username)){
        document.getElementById('registerMsg').innerText = 'Username already exists';
        return;
    }
    users.push({username, password});
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', username);
    window.location.href = 'tracker.html';
});