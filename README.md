# Digital-Blood-Pressure-Tracker
A Digital Blood Pressure Tracker is a health monitoring tool that allows users to record, store, and analyze blood pressure readings electronically. It simplifies tracking by providing automatic logging, trend visualization, reminders, and reports, helping users and healthcare providers monitor cardiovascular health over time.
# Digital Blood Pressure Tracker

**Author:** Kahsay Kiross Meresa
**Date:** August 31, 2025
**SDG Alignment:** SDG 3 - Good Health and Well-Being
Digital Blood Pressure Tracker (Admin & User)
Overview

This is a web-based Blood Pressure Tracker that allows users to record, view, and monitor their blood pressure readings over time. It includes personal record management, public dashboards, and admin controls such as editing, deleting, blocking, and revoking users. All data is stored locally using localStorage.

Features
User Features

Register and login with username and password.

Record blood pressure readings (systolic and diastolic).

View personal records and historical trends.

Track BP categories: Normal, Elevated, Hypertension.

View public dashboard showing all users' average readings and category distributions.

Responsive charts powered by Chart.js.

Admin Features

Access the Admin Panel to manage all users’ readings.

Edit or delete any user's blood pressure records.

Block/unblock users to restrict access.

Revoke users, moving them to a "Revoked Users" section.

Restore revoked users when needed.

View all users' records and charts in real-time.

Data Security & Privacy

Personal readings are only visible to the respective user.

Admin can view and manage all users’ data.

All data is persisted in the browser's localStorage.

Installation & Usage

Download or clone the repository.

Open index.html in a modern web browser (Chrome, Firefox, Edge).

Register a user:

Select role: User or Admin.

Login with your credentials.

Navigate using the tabs:

Dashboard: View public statistics and trends.

My Records: Add and view personal readings.

Admin Panel (Admin only): Manage users and records.

Restore Users (Admin only): Restore revoked users.

Quick Start Guide
1. Open the Tracker

Open index.html in any modern browser.

No installation or server setup required.

2. Register a New Account

Go to Register section.

Enter Username and Password.

Select Role (User or Admin).

Click Register.

A confirmation alert will appear: "Registered! Now login."

3. Login

Go to Login section.

Enter Username and Password.

Click Login.

Tabs appear according to role:

Dashboard → Public stats & charts.

My Records → Add/view personal readings.

Admin Panel (admin only) → Manage all users.

Restore Users (admin only) → Restore revoked users.

4. Add Blood Pressure Readings (User)

Navigate to My Records tab.

Enter Systolic and Diastolic values.

Click Add Reading.

Readings appear in personal table and update the public dashboard automatically.

5. Admin Management

Go to Admin Panel:

Edit or save any user’s readings.

Delete readings.

Block/unblock users.

Revoke users (move to Restore Users).

Go to Restore Users to restore any revoked account.

6. Viewing Charts

Average BP per User: Shows average systolic & diastolic BP per user.

BP Category Distribution: Pie chart of Normal, Elevated, Hypertension readings.

User Trend Over Time: Select a user to view BP trends.

7. Logout

Click Logout button to safely exit your account.

How It Works

Data Storage: Users, readings, and admin actions stored in localStorage.

BP Categorization:| Category         | Systolic (mmHg) | Diastolic (mmHg) | Description                                      |
| ---------------- | --------------- | ---------------- | ------------------------------------------------ |
| **Normal**       | < 120           | < 80             | Healthy BP range; no immediate concern.          |
| **Elevated**     | 120 – 129       | < 80             | Slightly higher than normal; monitor regularly.  |
| **Hypertension** | ≥ 130           | ≥ 80             | High blood pressure; may require medical advice. |

System Flow Diagram
         ┌─────────────┐
         │   Browser   │
         │ HTML + JS   │
         └─────┬──────┘
               │
        ┌──────┴──────┐
        │ localStorage│
        │  Users &    │
        │  Readings   │
        └──────┬──────┘
               │
    ┌──────────┴──────────┐
    │  Dashboard & Charts │
    │  - Public Stats     │
    │  - User Trends      │
    └──────────┬──────────┘
               │
    ┌──────────┴──────────┐
    │      Admin Panel     │
    │  - Edit/Delete Read  │
    │  - Block/Unblock     │
    │  - Revoke/Restore    │
    └─────────────────────┘








