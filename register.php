<?php
$data = json_decode(file_get_contents("php://input"));
$username = $data->username;
$password = $data->password;

$conn = new mysqli("localhost", "root", "", "BloodPressureDB");
if ($conn->connect_error) die("Connection failed: " . $conn->connect_error);

$password_hash = password_hash($password, PASSWORD_DEFAULT);

$stmt = $conn->prepare("INSERT INTO users (username, password_hash) VALUES (?, ?)");
$stmt->bind_param("ss", $username, $password_hash);

if($stmt->execute()) echo "Registration successful! You can now log in.";
else echo "Registration failed. Username may already exist.";

$stmt->close();
$conn->close();
?>
