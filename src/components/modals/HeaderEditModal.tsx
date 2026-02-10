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
import { HeaderData } from "@/types/header";
import { Settings2, Image as ImageIcon, Link as LinkIcon } from "lucide-react";

interface HeaderEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentData: HeaderData;
  onSave: (newData: HeaderData) => void;
}

export const HeaderEditModal = ({
  isOpen,
  onClose,
  currentData,
  onSave,
}: HeaderEditModalProps) => {
  const [formData, setFormData] = useState<HeaderData>(currentData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] w-[95vw] max-h-[90vh] flex flex-col bg-[#0E1416] border-emerald-500/20 text-white p-0 overflow-hidden shadow-2xl focus:outline-none rounded-lg">
        <DialogHeader className="p-6 border-b border-emerald-500/10 bg-[#121A1C]/50 backdrop-blur-xl sticky top-0 z-20">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold flex items-center gap-3 text-emerald-500">
              <Settings2 className="w-6 h-6 animate-spin-slow" />
              Customize Header
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6 space-y-10 bg-[#0E1416]/50">
          {/* Logo Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-emerald-500 font-bold uppercase text-xs tracking-[0.2em] mb-4">
              <ImageIcon className="w-4 h-4" />
              Logo Configuration
            </div>

            <div className="bg-[#121A1C] p-6 rounded-lg border border-white/5 space-y-4">
              <div className="space-y-2">
                <Label className="text-[10px] text-slate-500 uppercase font-black tracking-widest ml-1">
                  Logo URL
                </Label>
                <Input
                  value={formData.logo}
                  onChange={(e) =>
                    setFormData({ ...formData, logo: e.target.value })
                  }
                  className="bg-black/40 border-white/5 h-12 rounded-lg focus:ring-emerald-500/20 text-sm"
                  placeholder="/logo.png or https://..."
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] text-slate-500 uppercase font-black tracking-widest ml-1">
                  Logo Alt Text
                </Label>
                <Input
                  value={formData.logoAlt}
                  onChange={(e) =>
                    setFormData({ ...formData, logoAlt: e.target.value })
                  }
                  className="bg-black/40 border-white/5 h-12 rounded-lg focus:ring-emerald-500/20 text-sm"
                  placeholder="Sujon Logo"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[10px] text-slate-500 uppercase font-black tracking-widest ml-1">
                    Logo Width (px)
                  </Label>
                  <Input
                    type="number"
                    value={formData.logoWidth}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        logoWidth: parseInt(e.target.value) || 200,
                      })
                    }
                    className="bg-black/40 border-white/5 h-12 rounded-lg focus:ring-emerald-500/20 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] text-slate-500 uppercase font-black tracking-widest ml-1">
                    Logo Height (px)
                  </Label>
                  <Input
                    type="number"
                    value={formData.logoHeight}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        logoHeight: parseInt(e.target.value) || 50,
                      })
                    }
                    className="bg-black/40 border-white/5 h-12 rounded-lg focus:ring-emerald-500/20 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Buttons Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-emerald-500 font-bold uppercase text-xs tracking-[0.2em] mb-4">
              <LinkIcon className="w-4 h-4" />
              Action Buttons
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Primary Button */}
              <div className="bg-[#121A1C] p-6 rounded-lg border border-white/5 space-y-4">
                <h4 className="text-sm font-bold text-emerald-500 uppercase tracking-wider">
                  Primary Button
                </h4>
                <div className="space-y-2">
                  <Label className="text-[10px] text-slate-500 uppercase font-black ml-1">
                    Text
                  </Label>
                  <Input
                    value={formData.buttons.primary.text}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        buttons: {
                          ...formData.buttons,
                          primary: {
                            ...formData.buttons.primary,
                            text: e.target.value,
                          },
                        },
                      })
                    }
                    className="bg-black/40 border-none h-10 text-xs"
                    placeholder="Hire Me"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] text-slate-500 uppercase font-black ml-1">
                    Link
                  </Label>
                  <Input
                    value={formData.buttons.primary.link}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        buttons: {
                          ...formData.buttons,
                          primary: {
                            ...formData.buttons.primary,
                            link: e.target.value,
                          },
                        },
                      })
                    }
                    className="bg-black/40 border-none h-10 text-xs"
                    placeholder="#contact"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] text-slate-500 uppercase font-black ml-1">
                    Icon (Lucide)
                  </Label>
                  <Input
                    value={formData.buttons.primary.icon}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        buttons: {
                          ...formData.buttons,
                          primary: {
                            ...formData.buttons.primary,
                            icon: e.target.value,
                          },
                        },
                      })
                    }
                    className="bg-black/40 border-none h-10 text-xs font-mono"
                    placeholder="Send"
                  />
                </div>
              </div>

              {/* Secondary Button */}
              <div className="bg-[#121A1C] p-6 rounded-lg border border-white/5 space-y-4">
                <h4 className="text-sm font-bold text-sky-500 uppercase tracking-wider">
                  Secondary Button
                </h4>
                <div className="space-y-2">
                  <Label className="text-[10px] text-slate-500 uppercase font-black ml-1">
                    Text
                  </Label>
                  <Input
                    value={formData.buttons.secondary.text}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        buttons: {
                          ...formData.buttons,
                          secondary: {
                            ...formData.buttons.secondary,
                            text: e.target.value,
                          },
                        },
                      })
                    }
                    className="bg-black/40 border-none h-10 text-xs"
                    placeholder="Resume"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] text-slate-500 uppercase font-black ml-1">
                    Link
                  </Label>
                  <Input
                    value={formData.buttons.secondary.link}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        buttons: {
                          ...formData.buttons,
                          secondary: {
                            ...formData.buttons.secondary,
                            link: e.target.value,
                          },
                        },
                      })
                    }
                    className="bg-black/40 border-none h-10 text-xs"
                    placeholder="/resume.pdf"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] text-slate-500 uppercase font-black ml-1">
                    Icon (Lucide)
                  </Label>
                  <Input
                    value={formData.buttons.secondary.icon}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        buttons: {
                          ...formData.buttons,
                          secondary: {
                            ...formData.buttons.secondary,
                            icon: e.target.value,
                          },
                        },
                      })
                    }
                    className="bg-black/40 border-none h-10 text-xs font-mono"
                    placeholder="Download"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-10 border-t border-emerald-500/10 flex justify-end gap-3 pb-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="px-8 h-12 rounded-lg font-bold border-white/10 hover:bg-white/5 cursor-pointer"
            >
              Discard
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-emerald-500 hover:bg-emerald-400 text-[#0E1416] px-10 h-12 rounded-lg font-black shadow-xl shadow-emerald-500/20 active:scale-95 cursor-pointer"
            >
              Update Header
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
