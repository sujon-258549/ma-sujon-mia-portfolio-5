# Md. Sujon Mia - Portfolio

A premium, dynamic portfolio website built with **Next.js 15**, **React 19**, and **Tailwind CSS 4**. This project features a fully dynamic administration system, allowing for real-time content updates through a professional admin interface.

## 🚀 Live Demo

- **Production:** [https://md-sujon-mia-5.vercel.app](https://md-sujon-mia-5.vercel.app)

## ✨ Features

- **Full-Stack Dynamic Content:** Manage almost every section of the portfolio directly from the admin interface.
- **Modern Tech Stack:** Built with the latest versions of Next.js, React, and Tailwind CSS.
- **Admin System:** Secure admin section with intuitive modals for content management.
- **Project Showcase:** Detailed project listings with categories, descriptions, and dynamic data fetching.
- **Blog System:** Clean blog layout with slug-based routing for articles.
- **Section Visibility Control:** Toggle any section (About, Skills, Projects, Blog, etc.) on or off directly from the dashboard.
- **Welcome Modal:** Interactive welcome experience for first-time visitors with a 10-second auto-close progress bar.
- **Smooth Animations:** Integrated micro-animations and hover effects for a premium feel.
- **Responsive Design:** Optimized for all screen sizes, from mobile to ultra-wide displays.
- **Dark Mode Support:** Built-in theme switching system.
- **SEO Optimized:** Meta tags, semantic HTML, and performant page loads.

## 🛠️ Technology Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **UI Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **State Management:** React Hooks & Session Storage
- **Authentication:** JWT & Cookie-based server/client auth
- **Animations:** CSS Transitions & Lucide animations
- **Caching:** Next.js `revalidateTag` for on-demand cache clearing

## 📁 Project Structure

```text
src/
├── app/              # Next.js App Router (pages & actions)
├── components/       # UI Components
│   ├── modals/       # Admin editing modals
│   └── ui/           # Reusable UI elements
├── services/         # API integration services
├── types/            # TypeScript interfaces
├── lib/              # Utility functions and auth logic
└── styles/           # Global styles
```

## ⚙️ Setup and Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/sujon-258549/ma-sujon-mia-portfolio-5.git
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add:

   ```env
   NEXT_PUBLIC_API_BASE_URL=https://your-api-endpoint.com/api
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

## 🔐 Administration

To access the admin features, navigate to `/login` and authenticate. Once authorized, floating edit triggers and settings icons will appear throughout the site, allowing you to modify content in real-time.

## 📄 License

This project is licensed under the MIT License.

---

_Created with ❤️ by [Md. Sujon Mia](https://github.com/sujon-258549)_
<img width="100%" height="auto" alt="screencapture-localhost-3000-2026-02-20-09_33_30" src="https://github.com/user-attachments/assets/08c386e8-e17c-4188-b7e0-e25136b535fc" />
