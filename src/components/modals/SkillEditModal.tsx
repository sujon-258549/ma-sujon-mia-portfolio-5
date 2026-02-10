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
import { SkillCategory } from "@/types/skill";
import { Code2, Plus, Trash2, X, Wand2 } from "lucide-react";

interface SkillEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: SkillCategory | null;
  onSave: (category: SkillCategory) => void;
  mode: "add" | "edit";
}

export const SkillEditModal = ({
  isOpen,
  onClose,
  category,
  onSave,
  mode,
}: SkillEditModalProps) => {
  const [formData, setFormData] = useState<SkillCategory>(() => ({
    id: category?.id || Math.random().toString(36).substr(2, 9),
    title: category?.title || "",
    icon: category?.icon || "Code2",
    skills: category?.skills || [],
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const addSkill = () => {
    setFormData((prev) => ({
      ...prev,
      skills: [...prev.skills, ""],
    }));
  };

  const updateSkill = (index: number, value: string) => {
    const newSkills = [...formData.skills];
    newSkills[index] = value;
    setFormData((prev) => ({ ...prev, skills: newSkills }));
  };

  const removeSkill = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-[#0E1416] border-emerald-500/20 text-white p-0 overflow-hidden shadow-2xl focus:outline-none rounded-lg">
        <DialogHeader className="p-6 border-b border-emerald-500/10 bg-[#121A1C]/50 backdrop-blur-xl">
          <DialogTitle className="text-xl font-bold flex items-center gap-3 text-emerald-500">
            <Wand2 className="w-5 h-5" />
            {mode === "edit" ? "Update Skill Category" : "Add Skill Category"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] text-slate-500 uppercase font-black tracking-widest">
                  Category Title
                </Label>
                <Input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="e.g. Frontend Development"
                  className="bg-black/40 border-white/5 h-12 rounded-lg focus:ring-emerald-500/20 text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] text-slate-500 uppercase font-black tracking-widest">
                  Icon Name
                </Label>
                <Input
                  value={formData.icon}
                  onChange={(e) =>
                    setFormData({ ...formData, icon: e.target.value })
                  }
                  placeholder="Code2, Server, etc."
                  className="bg-black/40 border-white/5 h-12 rounded-lg focus:ring-emerald-500/20 text-sm font-mono"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-[10px] text-slate-500 uppercase font-black tracking-widest">
                  Skills List
                </Label>
                <Button
                  type="button"
                  onClick={addSkill}
                  variant="ghost"
                  size="sm"
                  className="h-7 text-emerald-500 hover:text-white hover:bg-emerald-500 text-[10px] px-2 cursor-pointer"
                >
                  <Plus className="w-3 h-3 mr-1" /> Add Skill
                </Button>
              </div>

              <div className="max-h-[300px] overflow-y-auto pr-2 space-y-2 scrollbar-hide">
                {formData.skills.map((skill, index) => (
                  <div key={index} className="flex gap-2 group">
                    <Input
                      value={skill}
                      onChange={(e) => updateSkill(index, e.target.value)}
                      placeholder="e.g. React"
                      className="bg-white/5 border-white/5 h-10 rounded-lg text-xs"
                    />
                    <Button
                      type="button"
                      onClick={() => removeSkill(index)}
                      variant="ghost"
                      size="sm"
                      className="h-10 w-10 p-0 text-red-500/30 group-hover:text-red-500 hover:bg-red-500/10 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                {formData.skills.length === 0 && (
                  <div className="text-center py-8 border-2 border-dashed border-white/5 rounded-lg text-slate-500 text-xs italic">
                    No skills added yet. Add your first skill!
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="px-6 h-11 rounded-lg font-bold border-white/10 hover:bg-white/5 cursor-pointer text-xs"
            >
              Discard
            </Button>
            <Button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-400 text-[#0E1416] px-8 h-11 rounded-lg font-black shadow-xl shadow-emerald-500/20 active:scale-95 cursor-pointer text-xs"
            >
              {mode === "edit" ? "Update Category" : "Save Category"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
