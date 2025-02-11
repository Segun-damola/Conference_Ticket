# Conference Ticket Generator

## 🚀 Overview
The **Conference Ticket Generator** is a React-based application that allows users to generate a personalized conference ticket. Users can enter their details, upload an avatar via a URL (Cloudinary or any hosted image), and receive a generated ticket.

## 🌟 Features
- **User Input Form**: Collects Full Name, Email, and Avatar URL.
- **Form Validation**: Ensures all fields are filled correctly before submission.
- **State Persistence**: Saves form data using Local Storage.
- **Ticket Generation**: Displays a conference ticket upon successful form submission.
- **Accessibility**: Fully keyboard-navigable and screen-reader-friendly.
- **Responsive Design**: Adapts seamlessly across all screen sizes.

## 🛠️ Technologies Used
- **Next.js (React Framework)**
- **Tailwind CSS** for styling
- **Local Storage** for state persistence
- **Cloudinary** for image hosting

## 📂 Project Structure
```
project-root/
│── public/
│── src/
│   ├── app/
│   │   ├── page.tsx (Main Form & Ticket Component)
│── next.config.js (External Image Configuration)
│── tailwind.config.js (Tailwind Configuration)
│── package.json (Dependencies & Scripts)
│── README.md (Project Documentation)
```

## 🚀 Installation & Setup
### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/your-username/conference-ticket-generator.git
cd conference-ticket-generator
```

### **2️⃣ Install Dependencies**
```bash
npm install
```

### **3️⃣ Run the Application**
```bash
npm run dev
```
> The app will be available at `http://localhost:3000`

## 🌍 Deployment
### **Deploy on Vercel**
```bash
git add .
git commit -m "Initial Commit"
git push origin main
vercel --prod
```

## ⚙️ Configuration
### **Next.js Image Optimization**
To allow external images (e.g., Cloudinary), update `next.config.js`:
```js
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.cloudinary.com" },
    ],
  },
};
module.exports = nextConfig;
```

## 🎯 How to Use
1. **Fill in your details** (Full Name, Email, Avatar URL).
2. **Click "Generate Ticket"** – If all fields are valid, your ticket will be displayed.
3. **Your ticket includes**: Your name, email, and avatar.

## 🛠️ Troubleshooting
- **Avatar not displaying?** Ensure your image URL is correct and publicly accessible.
- **Form data lost on refresh?** Check if Local Storage is enabled in your browser.
- **Build failed on Vercel?** Run `npm run build` locally to catch errors before deployment.

## 📜 License
This project is licensed under the **MIT License**.

---
**Author:** Adeniyi Oluwasegun Adedamola | **GitHub:** [Segun-damola](https://github.com/Segun-damola)

