CREATE DATABASE BloodPressureDB;

USE BloodPressureDB;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE bp_readings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    systolic INT NOT NULL,
    diastolic INT NOT NULL,
    pulse_rate INT,
    reading_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
