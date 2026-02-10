"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Send, Settings2 } from "lucide-react";
import { isAdminAuthorized } from "@/lib/auth";
import { ContactEditModal } from "./modals/ContactEditModal";
import { ContactSectionData } from "@/types/contact";

const ContactSection = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Check authorization on mount
    // Wrap in setTimeout to avoid synchronous setState cascading render warning
    const timeoutId = setTimeout(() => {
      const authStatus = isAdminAuthorized();
      setIsAuthorized(authStatus);
      console.log("Contact Section Authorization Status:", authStatus);
    }, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  const [contactData, setContactData] = useState<ContactSectionData>({
    badge: "Contact Me",
    badgeIcon: "fa-solid fa-paper-plane",
    title: "Let's Work",
    titleColor: "Together",
    contactCards: [
      {
        icon: "fa-solid fa-phone",
        title: "Phone",
        value: "+123 456 7890",
      },
      {
        icon: "fa-solid fa-envelope",
        title: "Email",
        value: "sujon@example.com",
      },
      {
        icon: "fa-solid fa-location-dot",
        title: "Address",
        value: "Dhaka, Bangladesh",
      },
    ],
  });

  return (
    <section
      id="contact"
      className="section-spacing bg-[#121A1C] relative group"
    >
      {/* Admin Edit Trigger */}
      {isAuthorized && (
        <div className="absolute top-8 right-8 z-30 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100">
          <Button
            onClick={() => setIsModalOpen(true)}
            variant="outline"
            className="bg-emerald-500/10 border-emerald-500/20 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-full px-6 py-6 shadow-2xl backdrop-blur-md font-bold flex items-center gap-3 transition-all active:scale-95 cursor-pointer"
          >
            <Settings2 className="w-5 h-5 animate-spin-slow" />
            Edit Section
          </Button>
        </div>
      )}

      <div className="main-container">
        <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto">
          {/* Left: Form */}
          <div className="w-full lg:w-[60%]">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
              <i
                className={`${contactData.badgeIcon} text-[10px] text-emerald-500`}
              ></i>
              <span className="text-[11px] font-extrabold text-emerald-500 uppercase tracking-widest">
                {contactData.badge}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
              {contactData.title}{" "}
              <span className="text-emerald-500">{contactData.titleColor}</span>
            </h2>

            <form className="space-y-6 mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-slate-400 mb-2"
                  >
                    Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    className="bg-[#172023] border-emerald-500/15 text-slate-100 placeholder:text-slate-500 focus-visible:ring-emerald-500/50"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-400 mb-2"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="bg-[#172023] border-emerald-500/15 text-slate-100 placeholder:text-slate-500 focus-visible:ring-emerald-500/50"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-slate-400 mb-2"
                >
                  Subject
                </label>
                <Input
                  id="subject"
                  type="text"
                  placeholder="Project Inquiry"
                  className="bg-[#172023] border-emerald-500/15 text-slate-100 placeholder:text-slate-500 focus-visible:ring-emerald-500/50"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-slate-400 mb-2"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Tell me about your project..."
                  rows={6}
                  className="bg-[#172023] border-emerald-500/15 text-slate-100 placeholder:text-slate-500 focus-visible:ring-emerald-500/50 resize-none header-none"
                />
              </div>
              <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-[#121A1C] font-semibold py-6 text-lg transition-all active:scale-95 shadow-xl shadow-emerald-500/10 cursor-pointer">
                <Send className="w-5 h-5 mr-3" />
                Send Message
              </Button>
            </form>
          </div>

          {/* Right: Info */}
          <div className="w-full lg:w-[40%] flex flex-col justify-center gap-4 md:gap-6">
            {contactData.contactCards.map((card, idx) => (
              <Card
                key={idx}
                className="bg-[#172023] border border-emerald-500/15 hover:border-emerald-500/50 transition-all duration-300 group/card"
              >
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="p-3 bg-emerald-500/10 rounded-full text-emerald-500 group-hover/card:scale-110 transition-transform">
                    <i className={`${card.icon} text-lg`}></i>
                  </div>
                  <div>
                    <h4 className="text-slate-100 font-bold">{card.title}</h4>
                    <p className="text-slate-400 text-sm whitespace-pre-line">
                      {card.value}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <ContactEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentData={contactData}
        onSave={(newData) => setContactData(newData)}
      />
    </section>
  );
};

export default ContactSection;
