# Portfolio Quick Start Guide

## 🚀 Your Portfolio is Ready!

Your professional portfolio is now running at **http://localhost:3000**

## 🎨 Design Highlights

### Color Scheme

- **Background**: `#121A1C` (as requested)
- **Primary Accent**: Emerald Green `#10B981`
- **Secondary Accent**: Teal `#14B8A6`
- **Professional dark theme with vibrant accents**

### Sections Included

1. **Navigation** - Fixed header with smooth scroll links
2. **Hero** - Eye-catching introduction with CTAs
3. **About** - Professional bio section
4. **Skills** - 4 skill categories with icons
5. **Projects** - 3 featured project cards
6. **Contact** - Call-to-action section
7. **Footer** - Simple copyright

## 📝 Customization Guide

### Update Your Information

#### 1. Hero Section (lines 28-60)

```tsx
// Change the badge text
<Badge>Your Status</Badge>

// Update the main heading
<h1>Your Title</h1>

// Modify the description
<p>Your description...</p>

// Update social links
<a href="your-github-url">
```

#### 2. About Section (lines 67-81)

```tsx
// Replace the bio text with your own
<p>Your bio here...</p>
```

#### 3. Skills Section (lines 87-142)

- Modify the skill categories
- Change technology names
- Update icons (from lucide-react)

#### 4. Projects Section (lines 148-180)

- Change the number of projects: `{[1, 2, 3].map...}`
- Update project titles and descriptions
- Modify technology badges
- Add real project links

#### 5. Contact Section (lines 185-198)

- Update the heading and description
- Add your email or contact form

### Color Customization

All colors are defined in `src/app/globals.css` (lines 42-103):

```css
--primary: 16 185 129; /* Change emerald green */
--accent: 20 184 166; /* Change teal */
--background: 18 26 28; /* #121A1C */
```

## 🎯 Next Steps

### Add Real Content

1. Replace placeholder text with your information
2. Add your actual projects
3. Update social media links
4. Add your resume/CV link

### Add More Sections

- **Experience/Timeline**
- **Testimonials**
- **Blog Posts**
- **Certifications**

### Enhance Functionality

- Add contact form with email integration
- Implement dark/light mode toggle
- Add project filtering
- Create individual project pages

### Deploy

```bash
npm run build
npm start
```

Or deploy to Vercel:

```bash
vercel deploy
```

## 🛠️ Technologies Used

- **Next.js 16** - React framework
- **Tailwind CSS v4** - Styling
- **Shadcn UI** - Component library
- **Lucide Icons** - Icon library
- **TypeScript** - Type safety

## 📦 Installed Components

- Button
- Card (with CardHeader, CardContent, CardTitle, CardDescription)
- Badge

### Add More Components

```bash
npx shadcn@latest add [component-name]
```

Popular components to add:

- `input` - For contact forms
- `textarea` - For message fields
- `dialog` - For modals
- `tabs` - For organizing content
- `avatar` - For profile images

## 🎨 Design Philosophy

This portfolio follows modern web design principles:

1. **Dark Theme**: Professional and easy on the eyes
2. **Vibrant Accents**: Emerald green for energy and growth
3. **Clear Hierarchy**: Size and color guide attention
4. **Smooth Interactions**: Hover effects and transitions
5. **Responsive**: Works on all devices
6. **Accessible**: Proper contrast ratios and semantic HTML

## 📱 Responsive Design

The portfolio automatically adapts to:

- **Mobile** (< 768px): Single column
- **Tablet** (768px - 1024px): 2 columns
- **Desktop** (> 1024px): Full layout

## 🔧 Troubleshooting

### Port Already in Use

```bash
# Kill the process on port 3000
Stop-Process -Id [PID] -Force
npm run dev
```

### Styling Not Updating

- Clear .next folder: `rm -rf .next`
- Restart dev server

### Component Not Found

```bash
npx shadcn@latest add [component-name]
```

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Shadcn UI](https://ui.shadcn.com)
- [Lucide Icons](https://lucide.dev)

---

**Your portfolio is live at http://localhost:3000** 🎉

Open it in your browser to see the professional design with #121A1C background and emerald green accents!
