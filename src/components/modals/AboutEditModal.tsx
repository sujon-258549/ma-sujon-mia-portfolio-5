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
import { Textarea } from "@/components/ui/textarea";
import { AboutSectionData } from "@/types/about";
import {
  Sparkles,
  Plus,
  Trash2,
  Settings2,
  Code2,
  Rocket,
  Globe,
  Briefcase,
  Layout,
  User,
  Info,
  Type,
  FileText,
  BarChart3,
  Award,
} from "lucide-react";
import * as LucideIcons from "lucide-react";

interface AboutEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentData: AboutSectionData;
  onSave: (newData: AboutSectionData) => void;
}

export const AboutEditModal = ({
  isOpen,
  onClose,
  currentData,
  onSave,
}: AboutEditModalProps) => {
  const [formData, setFormData] = useState<AboutSectionData>(currentData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const updateParagraph = (index: number, value: string) => {
    const newDesc = [...formData.description];
    newDesc[index] = value;
    setFormData({ ...formData, description: newDesc });
  };

  const addParagraph = () => {
    setFormData({
      ...formData,
      description: [...formData.description, ""],
    });
  };

  const removeParagraph = (index: number) => {
    setFormData({
      ...formData,
      description: formData.description.filter((_, i) => i !== index),
    });
  };

  const updateHighlight = (index: number, field: string, value: string) => {
    const newHighlights = [...formData.highlights];
    newHighlights[index] = { ...newHighlights[index], [field]: value };
    setFormData({ ...formData, highlights: newHighlights });
  };

  const updateStat = (index: number, field: string, value: string) => {
    const newStats = [...formData.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setFormData({ ...formData, stats: newStats });
  };

  const renderIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName];
    return IconComponent ? (
      <IconComponent className="w-4 h-4" />
    ) : (
      <Info className="w-4 h-4" />
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[1000px] w-[95vw] max-h-[90vh] flex flex-col bg-[#0E1416] border-emerald-500/20 text-white p-0 overflow-hidden shadow-2xl focus:outline-none rounded-lg">
        <DialogHeader className="p-6 border-b border-emerald-500/10 bg-[#121A1C]/50 backdrop-blur-xl sticky top-0 z-20">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold flex items-center gap-3 text-emerald-500">
              <Settings2 className="w-6 h-6 animate-spin-slow" />
              Customize About Section
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6 space-y-10 bg-[#0E1416]/50">
          {/* Section Hero Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-emerald-500 font-bold uppercase text-xs tracking-[0.2em] mb-4">
              <Type className="w-4 h-4" />
              Main Content
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#121A1C] p-6 rounded-lg border border-white/5">
              <div className="space-y-2">
                <Label className="text-[10px] text-slate-500 uppercase font-black tracking-widest ml-1">
                  Badge Text
                </Label>
                <div className="relative">
                  <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500/50" />
                  <Input
                    value={formData.badge}
                    onChange={(e) =>
                      setFormData({ ...formData, badge: e.target.value })
                    }
                    className="bg-black/40 border-white/5 h-12 rounded-lg pl-12 focus:ring-emerald-500/20 text-sm"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] text-slate-500 uppercase font-black tracking-widest ml-1">
                  Badge Icon
                </Label>
                <Input
                  value={formData.badgeIcon}
                  onChange={(e) =>
                    setFormData({ ...formData, badgeIcon: e.target.value })
                  }
                  className="bg-black/40 border-white/5 h-12 rounded-lg focus:ring-emerald-500/20 text-sm font-mono"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] text-slate-500 uppercase font-black tracking-widest ml-1">
                  Main Title
                </Label>
                <Input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="bg-black/40 border-white/5 h-12 rounded-lg focus:ring-emerald-500/20 text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] text-slate-500 uppercase font-black tracking-widest ml-1">
                  Highlighted Title
                </Label>
                <Input
                  value={formData.titleHighlight}
                  onChange={(e) =>
                    setFormData({ ...formData, titleHighlight: e.target.value })
                  }
                  className="bg-black/40 border-white/5 h-12 rounded-lg focus:ring-emerald-500/20 text-sm text-emerald-500 font-bold"
                />
              </div>
            </div>
          </div>

          {/* Profile Basic Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-emerald-500 font-bold uppercase text-xs tracking-[0.2em] mb-4">
              <User className="w-4 h-4" />
              Profile Card
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#121A1C] p-6 rounded-lg border border-white/5">
              <div className="space-y-2">
                <Label className="text-[10px] text-slate-500 uppercase font-black tracking-widest ml-1">
                  Full Name
                </Label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="bg-black/40 border-white/5 h-12 rounded-lg focus:ring-emerald-500/20 text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] text-slate-500 uppercase font-black tracking-widest ml-1">
                  Role/Profession
                </Label>
                <Input
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  className="bg-black/40 border-white/5 h-12 rounded-lg focus:ring-emerald-500/20 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Description Paragraphs */}
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-emerald-500 font-bold uppercase text-xs tracking-[0.2em]">
                <FileText className="w-4 h-4" />
                Description Paragraphs
              </div>
              <Button
                onClick={addParagraph}
                variant="ghost"
                size="sm"
                className="h-8 text-xs bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-lg px-3"
              >
                <Plus className="w-4 h-4 mr-2" /> Add Paragraph
              </Button>
            </div>
            <div className="space-y-4">
              {formData.description.map((para, idx) => (
                <div key={idx} className="relative group">
                  <Textarea
                    value={para}
                    onChange={(e) => updateParagraph(idx, e.target.value)}
                    className="bg-[#121A1C] border-white/5 min-h-[100px] rounded-lg focus:ring-emerald-500/20 text-sm leading-relaxed"
                  />
                  <button
                    onClick={() => removeParagraph(idx)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Stats */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-emerald-500 font-bold uppercase text-xs tracking-[0.2em] mb-4">
                <BarChart3 className="w-4 h-4" />
                Statistics
              </div>
              <div className="space-y-4">
                {formData.stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="bg-[#121A1C] p-4 rounded-lg border border-white/5 grid grid-cols-2 gap-4"
                  >
                    <div className="space-y-2">
                      <Label className="text-[10px] text-slate-500 uppercase font-black ml-1">
                        Label
                      </Label>
                      <Input
                        value={stat.label}
                        onChange={(e) =>
                          updateStat(idx, "label", e.target.value)
                        }
                        className="bg-black/40 border-none h-10 text-xs"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] text-slate-500 uppercase font-black ml-1">
                        Value
                      </Label>
                      <Input
                        value={stat.value}
                        onChange={(e) =>
                          updateStat(idx, "value", e.target.value)
                        }
                        className="bg-black/40 border-none h-10 text-xs font-bold text-emerald-500"
                      />
                    </div>
                    <div className="space-y-2 col-span-2">
                      <Label className="text-[10px] text-slate-500 uppercase font-black ml-1">
                        Icon (Lucide)
                      </Label>
                      <div className="flex gap-3">
                        <Input
                          value={stat.icon}
                          onChange={(e) =>
                            updateStat(idx, "icon", e.target.value)
                          }
                          className="bg-black/40 border-none h-10 text-[10px] flex-1 font-mono"
                        />
                        <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                          {renderIcon(stat.icon)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-emerald-500 font-bold uppercase text-xs tracking-[0.2em] mb-4">
                <Award className="w-4 h-4" />
                Key Highlights
              </div>
              <div className="space-y-4">
                {formData.highlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-[#121A1C] p-4 rounded-lg border border-white/5 space-y-4"
                  >
                    <div className="space-y-2">
                      <Label className="text-[10px] text-slate-500 uppercase font-black ml-1">
                        Title
                      </Label>
                      <Input
                        value={item.title}
                        onChange={(e) =>
                          updateHighlight(idx, "title", e.target.value)
                        }
                        className="bg-black/40 border-none h-10 text-xs font-bold"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] text-slate-500 uppercase font-black ml-1">
                        Description
                      </Label>
                      <Input
                        value={item.desc}
                        onChange={(e) =>
                          updateHighlight(idx, "desc", e.target.value)
                        }
                        className="bg-black/40 border-none h-10 text-xs text-slate-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] text-slate-500 uppercase font-black ml-1">
                        Icon (Lucide)
                      </Label>
                      <div className="flex gap-3">
                        <Input
                          value={item.icon}
                          onChange={(e) =>
                            updateHighlight(idx, "icon", e.target.value)
                          }
                          className="bg-black/40 border-none h-10 text-[10px] flex-1 font-mono"
                        />
                        <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                          {renderIcon(item.icon)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Non-fixed footer inside the scroll container */}
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
              Update Section
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
