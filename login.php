<?php
session_start();
$data = json_decode(file_get_contents("php://input"));
$username = $data->username;
$password = $data->password;

$conn = new mysqli("localhost", "root", "", "BloodPressureDB");
if ($conn->connect_error) die("Connection failed: " . $conn->connect_error);

$stmt = $conn->prepare("SELECT user_id, password_hash FROM users WHERE username=?");
$stmt->bind_param("s", $username);
$stmt->execute();
$stmt->store_result();
$stmt->bind_result($user_id, $password_hash);
$stmt->fetch();

$response = ["success" => false, "message" => "Invalid username or password"];

if($stmt->num_rows > 0 && password_verify($password, $password_hash)){
    $_SESSION["user_id"] = $user_id;
    $response = ["success" => true, "user_id" => $user_id];
}

echo json_encode($response);
$stmt->close();
$conn->close();
?>
