document.getElementById("loginForm").addEventListener("submit", function(e){
    e.preventDefault();
    
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch("login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(data => {
        if(data.success){
            localStorage.setItem("user_id", data.user_id);
            window.location.href = "tracker.html";
        } else {
            document.getElementById("loginMessage").innerText = data.message;
        }
    })
    .catch(err => console.error(err));
});
