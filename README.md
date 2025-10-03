# intern_hub_web

[![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue.svg)](https://www.typescriptlang.org/)
[![Framework-Next.js](https://img.shields.io/badge/Framework-Next.js-black.svg)](https://nextjs.org/)
[![Styling-TailwindCSS](https://img.shields.io/badge/Styling-TailwindCSS-06B6D4.svg)](https://tailwindcss.com/)
[![Stars](https://img.shields.io/github/stars/intern_hub_web?style=social)](https://github.com/intern_hub_web/stargazers)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 📑 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [File Structure](#file-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

## 🔎 Overview

**`intern_hub_web`** is a comprehensive web application designed to streamline the internship discovery, application, and management process.  

It serves as a **central hub** connecting students seeking internships with companies offering opportunities and provides **administrative tools** for oversight.  

Built with **Next.js**, **TypeScript**, and **Tailwind CSS**, the platform offers a **dynamic and responsive** user experience across multiple user roles:  

- **Students**
- **Companies**
- **Administrators**

---

## ✨ Key Features

- **Multi-Role Dashboards** – Tailored dashboards for Students, Companies, and Administrators.  
- **User Authentication & Authorization** – Secure sign-up, sign-in, password reset, and email verification flows.  
- **Internship Listing & Browsing** – Students can browse internships with detailed descriptions.  
- **Internship Posting** – Companies can create and manage internships.  
- **Application Management** – Students apply for internships, companies manage applications.  
- **Profile Management** – Users can update details and manage settings.  
- **Admin Tools** – Manage users, approve companies and internship postings.  
- **Responsive UI** – Built with Tailwind CSS for modern and adaptive design.  

---

## 📂 File Structure

The project follows the **Next.js App Router** structure:

## 📂 Project Structure

```bash
intern_hub_web/
├── app/
│   ├── (auth)/                   # Authentication routes
│   │   ├── forgotpassword/
│   │   ├── resetpassword/
│   │   ├── signin/
│   │   ├── signup/
│   │   └── verify-email/
│   ├── _components/              # Reusable UI components
│   │   ├── AdminDashBoard.tsx
│   │   ├── ApplicationCard.tsx
│   │   ├── CompanyDashBoard.tsx
│   │   ├── InternshipCard.tsx
│   │   ├── Navbar.tsx
│   │   ├── StudentDashBoard.tsx
│   │   └── ...
│   ├── _context/                 # Context API (e.g., AuthContext)
│   │   └── AuthContext.tsx
│   ├── _lib/                     # Utility functions & API services
│   │   ├── api.ts
│   │   └── trends.ts
│   ├── dashboard/                # Protected routes
│   │   ├── applications/         # Student applications
│   │   │   └── [id]/
│   │   ├── approval-request/     # Admin approvals
│   │   ├── internships/          # Internship listings
│   │   │   └── [id]/
│   │   ├── my-internships/       # Company internships
│   │   │   └── [id]/applicants/[applicantId]/
│   │   ├── post-Internship/      # Post new internship
│   │   ├── profile/              # User profile
│   │   │   ├── password/
│   │   │   └── personal/
│   │   ├── users/                # Admin user management
│   │   │   └── [company]/
│   │   └── page.tsx              # Dashboard home
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Public homepage
│   └── ...
├── public/                       # Static assets
│   ├── default-user.jpg
│   ├── pexels-fauxels-3183150.jpg
│   └── ...
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

---

## ⚙️ Installation

### Prerequisites
- **Node.js** v18+  
- **npm** (comes with Node.js) or **Yarn**  

### Steps
```bash
# Clone repository
git clone https://github.com/your-username/intern_hub_web.git
cd intern_hub_web

# Install dependencies
npm install
# or
yarn install
```
## 🔧 Configuration

### Create Environment File
```bash
touch .env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/
# Add other variables as needed

🚀 Usage
Run in Development
npm run dev
# or
yarn dev
```
``` bash
Build for Production
npm run build
# or
yarn build

Run Production Build
npm start
# or
yarn start
```
## User Roles

- Authentication → /signin, /signup, /forgotpassword

- Student → /dashboard/internships, /dashboard/applications

- Company → /dashboard/post-Internship, /dashboard/my-internships

- Admin → /dashboard/users, /dashboard/approval-request

## 📦 Dependencies

- Next.js

- React

- TypeScript

- Tailwind CSS

🤝 Contributing

- Fork the repo

- Create a branch → git checkout -b feature/your-feature-name

- Commit changes → git commit -m "feat: add feature"

- Push branch → git push origin feature/your-feature-name

- Open a Pull Request

## 📜 License

Licensed under the MIT License – see the LICENSE
 file.

## 🙏 Acknowledgements

Inspired by modern internship platforms and career portals.
