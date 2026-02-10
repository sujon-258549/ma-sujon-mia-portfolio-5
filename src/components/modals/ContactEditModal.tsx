"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ContactSectionData, ContactInfo } from "@/types/contact";

interface ContactEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentData: ContactSectionData;
  onSave: (newData: ContactSectionData) => void;
}

export const ContactEditModal = ({
  isOpen,
  onClose,
  currentData,
  onSave,
}: ContactEditModalProps) => {
  const [formData, setFormData] = useState<ContactSectionData>(currentData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const updateCard = (
    index: number,
    field: keyof ContactInfo,
    value: string,
  ) => {
    const newCards = [...formData.contactCards];
    newCards[index] = { ...newCards[index], [field]: value };
    setFormData({ ...formData, contactCards: newCards });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[90vw] w-[95vw] h-[90vh] flex flex-col bg-[#0E1416] border-emerald-500/20 text-white p-0 overflow-hidden shadow-2xl focus:outline-none">
        <DialogHeader className="p-6 pb-4 border-b border-emerald-500/10 bg-[#121A1C]/50 backdrop-blur-xl sticky top-0 z-20">
          <DialogTitle className="text-2xl font-bold flex items-center gap-3 text-emerald-500">
            <div className="w-2 h-8 bg-emerald-500 rounded-full" />
            Customize Contact Section
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 scrollbar-hide bg-[#0E1416]/50">
          <form onSubmit={handleSubmit} className="py-8 space-y-8">
            {/* Header Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-slate-400 uppercase text-[10px] tracking-widest font-bold">
                  Section Badge Text
                </Label>
                <Input
                  value={formData.badge}
                  onChange={(e) =>
                    setFormData({ ...formData, badge: e.target.value })
                  }
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-400 uppercase text-[10px] tracking-widest font-bold">
                  Section Badge Icon (FontAwesome)
                </Label>
                <Input
                  value={formData.badgeIcon}
                  onChange={(e) =>
                    setFormData({ ...formData, badgeIcon: e.target.value })
                  }
                  className="bg-white/5 border-white/10 text-emerald-400 font-mono"
                  placeholder="fa-solid fa-paper-plane"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-400 uppercase text-[10px] tracking-widest font-bold">
                  Normal Title Text
                </Label>
                <Input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-400 uppercase text-[10px] tracking-widest font-bold">
                  Colored Title Text (Emerald)
                </Label>
                <Input
                  value={formData.titleColor}
                  onChange={(e) =>
                    setFormData({ ...formData, titleColor: e.target.value })
                  }
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              <Label className="text-emerald-500 uppercase text-xs tracking-[0.2em] font-black block mb-4">
                <i className="fa-solid fa-address-card mr-2"></i> Contact
                Information Cards
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {formData.contactCards.map((card, index) => (
                  <div
                    key={index}
                    className="bg-[#121A1C] border border-white/5 rounded-2xl p-5 space-y-4"
                  >
                    <div className="flex items-center gap-3 border-b border-white/5 pb-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                        <i className={`${card.icon} text-emerald-500`}></i>
                      </div>
                      <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">
                        {index === 0
                          ? "Main Contact"
                          : index === 2
                            ? "Location Info"
                            : `Info Card ${index + 1}`}
                      </span>
                    </div>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <Label className="text-[9px] text-slate-500 uppercase font-bold">
                          Label
                        </Label>
                        <Input
                          value={card.title}
                          onChange={(e) =>
                            updateCard(index, "title", e.target.value)
                          }
                          className="h-9 bg-black/20 border-white/5 text-sm"
                          placeholder="e.g. Phone, Email, Address"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-[9px] text-slate-500 uppercase font-bold">
                          Content / Value
                        </Label>
                        <Input
                          value={card.value}
                          onChange={(e) =>
                            updateCard(index, "value", e.target.value)
                          }
                          className="h-9 bg-black/20 border-white/5 text-sm"
                          placeholder="e.g. +123 456 789"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-[9px] text-slate-500 uppercase font-bold">
                          Icon Class (FontAwesome)
                        </Label>
                        <Input
                          value={card.icon}
                          onChange={(e) =>
                            updateCard(index, "icon", e.target.value)
                          }
                          className="h-9 bg-black/40 border-white/10 text-[10px] font-mono text-emerald-400"
                          placeholder="fa-solid fa-phone"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </form>

          <div className="p-6 pt-4 flex flex-col sm:flex-row justify-end gap-3 pb-12">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="bg-transparent border-white/10 text-white hover:bg-white/5 px-8 h-11 rounded-lg font-semibold transition-all"
            >
              Discard Changes
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-emerald-500 hover:bg-emerald-600 text-[#0E1416] px-8 h-11 rounded-lg font-bold shadow-xl shadow-emerald-500/20"
            >
              Publish Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
