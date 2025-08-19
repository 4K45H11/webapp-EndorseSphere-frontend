# Endorsesphere Frontend

Frontend application built with **React** for authentication, content submission, approval workflows, and analytics visualization. Works with the [Endorsesphere Backend](https://webapp-endorsesphere-backend.onrender.com).

---

## Features

### Authentication
- Login and Signup forms  
- Stores JWT in `localStorage` after login  
- Role-based access (User / Admin)  

### Dashboard
- **User Dashboard**  
  - List of submitted content with current status (pending / approved / rejected)  
- **Admin Dashboard**  
  - List all submitted content with current status  
  - Display analytics charts (approved, pending, rejected counts)  
  - Search bar and filters (by status, keyword)  

### Content Submission
- **Submit Content Page** (User only)  
  - Form to create new content (title + description)  

### Approvals
- **Approvals Page** (Admin only)  
  - View all submissions  
  - Approve or reject content  

---

## Tech Stack
- React (Vite or CRA, depending on setup)  
- Tailwind CSS / Material UI (UI framework)  
- Recharts / Chart.js (analytics visualization)  
- Axios / Fetch API (API calls)  

---

## Getting Started

### Prerequisites
- Node.js (v18 or later recommended)  
- Backend API deployed (see [Endorsesphere Backend](https://webapp-endorsesphere-backend.onrender.com))  

### Installation
```bash
# Clone the repository
git clone <repo-url>
cd <repo-folder>

# Install dependencies
npm install

