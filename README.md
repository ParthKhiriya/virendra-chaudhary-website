# Virender Choudhary - Official Website

This is the official portfolio and foundation website for **Virender Choudhary**, an educator, industrialist, and social leader based in Rajasthan, India. The website also serves as the digital hub for the **Dr. Sahdev Choudhary Foundation**, showcasing its initiatives, objectives, and social impact.

Live Website: [virenderchoudhary.com](https://www.virenderchoudhary.com)

## ✨ Key Features

- **Bilingual Interface**: Seamlessly switch between English and Hindi using `react-i18next`.
- **Modern Animations**: High-performance, premium scroll and hover animations powered by **GSAP** and **Framer Motion**.
- **Responsive Layout**: fully responsive design that works elegantly across desktops, tablets, and mobile devices (using **Tailwind CSS**).
- **Interactive Galleries**: Dynamic image sliders and media sections displaying real-world social impact and events.
- **Contact Integration**: Fully functional contact form linked with **EmailJS** for direct communication.
- **Smooth Scrolling**: Implemented smooth momentum scrolling using **Lenis** for a premium feel.

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/) with [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [GSAP](https://gsap.com/) & [Framer Motion](https://www.framer.com/motion/)
- **Localization**: [react-i18next](https://react.i18next.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: [Vercel](https://vercel.com/)

## 📂 Project Structure

```text
src/
├── assets/         # Images, PDFs, and static assets
├── components/     # Reusable UI components (Navbar, Footer, Sections, UI elements)
├── locales/        # Translation JSON files (en.json, hi.json)
├── pages/          # Full page layouts (Home, About, Foundation, Contact, etc.)
├── App.tsx         # Main application routing and layout wrapping
├── i18n.ts         # Configuration for i18next
└── main.tsx        # React DOM entry point
```

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have Node.js installed on your machine.

### Installation

1. **Clone the repository** (if hosted on GitHub):
   ```bash
   git clone https://github.com/your-username/virendra-chaudhary-website.git
   ```

2. **Navigate into the project directory**:
   ```bash
   cd virendra-chaudhary-website
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```
   The website will now be running locally at `http://localhost:5173`.

## 📦 Building for Production

To create an optimized production build, run:
```bash
npm run build
```
The compiled files will be generated in the `dist/` directory, ready to be deployed to any static hosting service.

## 🌐 Deployment

This project is configured to be deployed effortlessly on **Vercel**. 
Whenever you push changes to your linked GitHub repository, Vercel will automatically build the site and deploy the updates to the custom domain.

## 🤝 Contributing

This project is tailored specifically for the client, but you can fork this repository to use the layout and architecture as a base for similar personal or foundation portfolios.

## 📄 License

This project is strictly for the personal and professional use of the Dr. Sahdev Choudhary Foundation and Virender Choudhary. 
