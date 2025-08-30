<?php
header('Content-Type: application/json');
$data = json_decode(file_get_contents("php://input"));

$user_id = $data->user_id;
$systolic = $data->systolic;
$diastolic = $data->diastolic;
$pulse = $data->pulse;

$conn = new mysqli("localhost", "root", "", "BloodPressureDB");
if($conn->connect_error) die("Connection failed: " . $conn->connect_error);

$stmt = $conn->prepare("INSERT INTO bp_readings (user_id, systolic, diastolic, pulse_rate) VALUES (?, ?, ?, ?)");
$stmt->bind_param("iiii", $user_id, $systolic, $diastolic, $pulse);
$stmt->execute();

$result = $conn->query("SELECT * FROM bp_readings WHERE user_id=$user_id ORDER BY reading_date ASC");
$readings = [];
while($row = $result->fetch_assoc()) $readings[] = $row;

$stmt->close();
$conn->close();

echo json_encode(["message"=>"Saved successfully","readings"=>$readings]);
?>
