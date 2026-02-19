"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useIsAuthorized } from "@/lib/auth";
import { ContactEditModal } from "./modals/ContactEditModal";
import { ContactSectionData } from "@/types/contact";
import { toast } from "sonner";
import { contactMessageService } from "@/services/contactMessageService";

interface ContactSectionProps {
  initialData?: ContactSectionData | null;
}

const ContactSection = ({ initialData }: ContactSectionProps) => {
  const isAuthorized = useIsAuthorized();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultData: ContactSectionData = {
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
        value: "sujon258549@gmail.com",
      },
      {
        icon: "fa-solid fa-location-dot",
        title: "Address",
        value: "Dhaka, Bangladesh",
      },
    ],
  };

  const [contactData, setContactData] = useState<ContactSectionData>(() => ({
    ...(initialData || defaultData),
    isActive: initialData?.isActive ?? true,
  }));

  const [formPayload, setFormPayload] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await contactMessageService.sendMessage(formPayload);
      if (res.success) {
        toast.success("Message sent successfully!");
        setFormPayload({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to send message",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!contactData.isActive && !isAuthorized) return null;

  return (
    <section
      id="contact"
      className={`section-spacing bg-[#121A1C] relative group transition-all duration-300 ${!contactData.isActive ? "opacity-50 grayscale hover:opacity-100 transition-opacity" : ""}`}
    >
      {/* Admin Edit Trigger */}
      {isAuthorized && (
        <div className="absolute top-8 right-8 z-30 flex flex-col items-center gap-4">
          {!contactData.isActive && (
            <div className="bg-red-500 text-[8px] font-black px-2 py-1 rounded uppercase tracking-[0.2em] shadow-lg animate-pulse whitespace-nowrap">
              Section Hidden from Public
            </div>
          )}
          <Button
            onClick={() => setIsModalOpen(true)}
            variant="outline"
            className="w-12 h-12 bg-emerald-500/10 border-emerald-500/20 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-full shadow-2xl backdrop-blur-md flex items-center justify-center transition-all active:scale-95 cursor-pointer"
          >
            <i className="fa-solid fa-pen-to-square text-lg transition-transform"></i>
          </Button>
        </div>
      )}

      <div className="main-container">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 max-w-7xl mx-auto">
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
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 text-white">
              {contactData.title}{" "}
              <span className="text-emerald-500">{contactData.titleColor}</span>
            </h2>

            <form onSubmit={handleFormSubmit} className="space-y-6 mt-8">
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
                    value={formPayload.name}
                    onChange={(e) =>
                      setFormPayload({ ...formPayload, name: e.target.value })
                    }
                    placeholder="John Doe"
                    required
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
                    value={formPayload.email}
                    onChange={(e) =>
                      setFormPayload({ ...formPayload, email: e.target.value })
                    }
                    placeholder="john@example.com"
                    className="bg-[#172023] border-emerald-500/15 text-slate-100 placeholder:text-slate-500 focus-visible:ring-emerald-500/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-slate-400 mb-2"
                  >
                    Phone
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formPayload.phone}
                    onChange={(e) =>
                      setFormPayload({ ...formPayload, phone: e.target.value })
                    }
                    placeholder="+123 456 7890"
                    className="bg-[#172023] border-emerald-500/15 text-slate-100 placeholder:text-slate-500 focus-visible:ring-emerald-500/50"
                  />
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
                    value={formPayload.subject}
                    onChange={(e) =>
                      setFormPayload({
                        ...formPayload,
                        subject: e.target.value,
                      })
                    }
                    placeholder="Project Inquiry"
                    required
                    className="bg-[#172023] border-emerald-500/15 text-slate-100 placeholder:text-slate-500 focus-visible:ring-emerald-500/50"
                  />
                </div>
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
                  value={formPayload.message}
                  onChange={(e) =>
                    setFormPayload({ ...formPayload, message: e.target.value })
                  }
                  placeholder="Tell me about your project..."
                  rows={6}
                  required
                  className="bg-[#172023] border-emerald-500/15 text-slate-100 placeholder:text-slate-500 focus-visible:ring-emerald-500/50 resize-none header-none"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-[#121A1C] font-semibold py-5 sm:py-6 text-base sm:text-lg transition-all active:scale-95 shadow-xl shadow-emerald-500/10 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <i
                  className={`${isSubmitting ? "fa-solid fa-spinner animate-spin" : "fa-solid fa-paper-plane"} text-lg mr-3`}
                ></i>
                {isSubmitting ? "Sending..." : "Send Message"}
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
                  <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 flex items-center justify-center bg-emerald-500/10 rounded-full text-emerald-500 group-hover/card:scale-110 transition-transform shadow-lg shadow-emerald-500/5">
                    <i className={`${card.icon} text-base sm:text-lg`}></i>
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
