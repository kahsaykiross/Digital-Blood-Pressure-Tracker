# Digital-Blood-Pressure-Tracker
A Digital Blood Pressure Tracker is a health monitoring tool that allows users to record, store, and analyze blood pressure readings electronically. It simplifies tracking by providing automatic logging, trend visualization, reminders, and reports, helping users and healthcare providers monitor cardiovascular health over time.
# Digital Blood Pressure Tracker

**Author:** Kahsay Kiross Meresa
**Date:** August 31, 2025
**SDG Alignment:** SDG 3 - Good Health and Well-Being

---

## Project Overview

The Digital Blood Pressure Tracker is a web-based application designed to help users monitor and record their blood pressure readings over time. This tool aims to promote health awareness and support well-being by providing users with a simple way to track their blood pressure trends.

---

## Features

* User registration and login system.
* Secure password storage.
* Add, view, and track blood pressure readings.
* Classification of blood pressure readings (Normal, Elevated, High).
* Data visualization for trends over time.

---

## Folder Structure

```
BloodPressureTracker/
│
├─ index.html          (Redirects to login.html)
├─ login.html
├─ register.html
├─ tracker.html
│
├─ style.css
├─ register.js
├─ login.js
├─ tracker.js
│
├─ register.php
├─ login.php
├─ save_reading.php
│
└─ sql/
   └─ BloodPressureDB.sql
```

---

## Technologies Used

* **Frontend:** HTML, CSS, JavaScript
* **Backend:** PHP
* **Database:** MySQL
* **Server:** XAMPP (for local development) or cPanel hosting (for live deployment)

---

## Installation and Deployment

### Local Deployment (XAMPP)

1. Install XAMPP: [https://www.apachefriends.org](https://www.apachefriends.org)
2. Start Apache and MySQL via XAMPP Control Panel.
3. Create the database `BloodPressureDB` in phpMyAdmin and import `sql/BloodPressureDB.sql`.
4. Copy the project folder to `C:\xampp\htdocs\`.
5. Update PHP files (`register.php`, `login.php`, `save_reading.php`) to use:

```php
$conn = new mysqli("localhost", "root", "", "BloodPressureDB");
```

6. Access the application at `http://localhost/BloodPressureTracker/index.html`.

### Live Server Deployment (cPanel Hosting)

1. Upload the project folder to `public_html` using FTP or File Manager.
2. Create a MySQL database and user in cPanel.
3. Import `BloodPressureDB.sql` into the database using phpMyAdmin.
4. Update PHP files with live database credentials.
5. Enable HTTPS using Let’s Encrypt (recommended).
6. Access the application via your domain.

---

## Usage

1. Register a new account.
2. Login with your credentials.
3. Add your blood pressure readings.
4. View and monitor trends over time.
5. Logout when finished.

---

## Best Practices

* Use strong and secure passwords.
* Regularly backup the database.
* Sanitize and validate all input to prevent SQL injection.
* Use HTTPS on live servers to secure user data.

---

## License

This project is open-source and available for educational and personal use.
