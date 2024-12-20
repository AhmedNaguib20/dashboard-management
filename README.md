# Dashboard Management Application README

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [Environment Configuration](#environment-configuration)
- [Authentication](#authentication)
- [How to Run](#how-to-run)
- [Login Credentials](#login-credentials)

---

## Project Overview
This Angular application is a responsive, user-friendly dashboard management system designed with modern UI/UX practices. The application supports user management, attraction management and pets management including creating, editing, and deleting users and attractions and integrates robust authentication mechanisms.

---

## Features
- **User Management:**
  - Create, edit, and delete users.
  - View users in a responsive Angular Material table with pagination and search capabilities.
- **Attraction Management:**
  - Create, edit, and delete attractions.
  - View attraction in a responsive Angular Material table with pagination and search capabilities.
- **Authentication:**
  - Secure login functionality using JWT tokens.
  - Login credentials validation.
- **Responsive Design:**
  - Optimized for desktop and mobile devices.
  - Fully responsive Angular Material components.
- **Charts:**
  - Visualize data using Chart.js integrated with Angular.
- **Error Handling:**
  - Global error interceptor for consistent error management.
  - Display error messages using Ngx-Toastr notifications.

---

## Technologies Used
- **Framework:** Angular 18
- **Animation:** Angular Animation
- **UI Components:** Angular Material, Ng-Zorro
- **CSS Framework:** Tailwind CSS
- **Charts:** Chart.js
- **Utilities:**
  - RxJS for reactive programming
  - Moment.js for date manipulation
- **API Integration:**
  - HttpClient for REST API communication
  - JWT Authentication

---

## Getting Started

### Prerequisites
Ensure you have the following installed:
- Node.js (v14 or above)
- Angular CLI
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/AhmedNaguib20/dashboard-management.git
   cd dashboard-management
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

---

## Folder Structure
```plaintext
src/
|-- app/
|   |-- core/
|   |   |-- common/
|   |   |-- data/
|   |-- feature/
|   |   |-- auth/
|   |   |-- users/
|   |   |-- attractions/
|   |   |-- pets/
|   |-- shared/
|-- environments/
|-- styles/
```
- **core/**: Contains global services and models.
- **feature/**: Feature-specific components (e.g., `auth`, `users`, `attractions`, `pets`).
- **shared/**: Shared components, directives, and pipes.
- **environments/**: Environment-specific configurations.

---

## Authentication
The app uses JWT-based authentication. It intercepts HTTP requests to append the token automatically.

### Login Flow
1. Enter valid credentials on the login screen.
2. The app sends a POST request to the authentication endpoint.
3. Upon success, a JWT token is stored in `localStorage`.
4. Subsequent API requests include the token in the Authorization header.

---

## How to Run
1. Start the development server:
   ```bash
   ng serve
   ```
2. Open your browser and navigate to:
   ```
   http://localhost:4200
   ```

---

## Login Credentials
Use the following credentials to log in:
- **Username:** karn.yong@melivecode.com
- **Password:** melivecode

---

**Thank you for using this application! If you encounter any issues or have suggestions for improvement, feel free to open an issue.**

