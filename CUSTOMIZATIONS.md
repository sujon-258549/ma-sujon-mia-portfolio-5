# Common Customizations

## Adding a Mobile Menu

Create `src/components/MobileMenu.tsx`:

```tsx
"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="text-slate-300"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-[#121A1C] border-b border-slate-700/50 p-6">
          <div className="flex flex-col gap-4">
            <a
              href="#about"
              onClick={() => setIsOpen(false)}
              className="text-slate-300 hover:text-emerald-400 transition-colors"
            >
              About
            </a>
            <a
              href="#skills"
              onClick={() => setIsOpen(false)}
              className="text-slate-300 hover:text-emerald-400 transition-colors"
            >
              Skills
            </a>
            <a
              href="#projects"
              onClick={() => setIsOpen(false)}
              className="text-slate-300 hover:text-emerald-400 transition-colors"
            >
              Projects
            </a>
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="text-slate-300 hover:text-emerald-400 transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
```

## Adding a Contact Form

Install required component:

```bash
npx shadcn@latest add input textarea
```

Create `src/components/ContactForm.tsx`:

```tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log(formData);
  };

  return (
    <Card className="bg-[#172023] border-slate-700 max-w-2xl mx-auto">
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-slate-300 mb-2 block">Name</label>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="bg-[#121A1C] border-slate-700 text-slate-100"
              required
            />
          </div>
          <div>
            <label className="text-slate-300 mb-2 block">Email</label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="bg-[#121A1C] border-slate-700 text-slate-100"
              required
            />
          </div>
          <div>
            <label className="text-slate-300 mb-2 block">Message</label>
            <Textarea
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="bg-[#121A1C] border-slate-700 text-slate-100 min-h-[150px]"
              required
            />
          </div>
          <Button
            type="submit"
            className="bg-emerald-500 hover:bg-emerald-600 text-[#121A1C] font-semibold w-full"
          >
            Send Message
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
```

## Adding Project Images

Replace the gradient placeholder in the Projects section:

```tsx
import Image from "next/image";

// In your project card:
<div className="h-48 relative overflow-hidden">
  <Image
    src="/projects/project-1.jpg"
    alt="Project 1"
    fill
    className="object-cover group-hover:scale-105 transition-transform duration-300"
  />
</div>;
```

## Adding Scroll Animations

Install framer-motion:

```bash
npm install framer-motion
```

Create animated sections:

```tsx
"use client";

import { motion } from "framer-motion";

export function AnimatedSection({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
}
```

Usage:

```tsx
<AnimatedSection>
  <Card>...</Card>
</AnimatedSection>
```

## Adding a Skills Progress Bar

```tsx
interface SkillBarProps {
  name: string;
  level: number; // 0-100
}

export function SkillBar({ name, level }: SkillBarProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-slate-300">{name}</span>
        <span className="text-emerald-400">{level}%</span>
      </div>
      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-1000"
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );
}
```

## Adding a Theme Toggle

```tsx
"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setIsDark(!isDark)}
      className="text-slate-300"
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
}
```

## Adding Particle Background

Install particles:

```bash
npm install tsparticles @tsparticles/react @tsparticles/slim
```

Create `src/components/ParticlesBackground.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export function ParticlesBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return null;

  return (
    <Particles
      className="absolute inset-0"
      options={{
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 120,
        particles: {
          color: {
            value: "#10B981",
          },
          links: {
            color: "#10B981",
            distance: 150,
            enable: true,
            opacity: 0.1,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1,
          },
          number: {
            value: 50,
          },
          opacity: {
            value: 0.3,
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
      }}
    />
  );
}
```

## Adding Typing Animation

```tsx
"use client";

import { useState, useEffect } from "react";

export function TypingAnimation({ texts }: { texts: string[] }) {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        const fullText = texts[currentIndex];

        if (!isDeleting) {
          setCurrentText(fullText.substring(0, currentText.length + 1));

          if (currentText === fullText) {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          setCurrentText(fullText.substring(0, currentText.length - 1));

          if (currentText === "") {
            setIsDeleting(false);
            setCurrentIndex((currentIndex + 1) % texts.length);
          }
        }
      },
      isDeleting ? 50 : 100,
    );

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentIndex, texts]);

  return (
    <span className="text-emerald-400">
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
}
```

Usage:

```tsx
<h1>
  I'm a <TypingAnimation texts={["Developer", "Designer", "Creator"]} />
</h1>
```

## Adding Social Share Buttons

```tsx
import { Share2, Twitter, Linkedin, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="icon"
        className="border-slate-700 text-slate-300 hover:bg-slate-800"
        onClick={() => window.open(shareUrls.twitter, "_blank")}
      >
        <Twitter className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="border-slate-700 text-slate-300 hover:bg-slate-800"
        onClick={() => window.open(shareUrls.linkedin, "_blank")}
      >
        <Linkedin className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="border-slate-700 text-slate-300 hover:bg-slate-800"
        onClick={() => window.open(shareUrls.facebook, "_blank")}
      >
        <Facebook className="h-4 w-4" />
      </Button>
    </div>
  );
}
```

---

These snippets maintain the same design system with #121A1C background and emerald green accents!
