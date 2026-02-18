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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { dynamicContentService } from "@/services/dynamicContentService";
import { toast } from "sonner";
import { Loader2, LayoutPanelLeft } from "lucide-react";
import { WorkflowSectionData, WorkflowStep } from "@/types/workflow";

interface WorkflowSectionEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentData: WorkflowSectionData;
  onSave: (data: WorkflowSectionData) => void;
}

export const WorkflowSectionEditModal = ({
  isOpen,
  onClose,
  currentData,
  onSave,
}: WorkflowSectionEditModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<WorkflowSectionData>({
    ...currentData,
    isActive: currentData.isActive ?? true,
    steps: currentData.steps || [],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const updateData = {
      ...formData,
      type: "workflow",
    };

    try {
      console.log('workflow', updateData)
      const res = await dynamicContentService.upsertContent(updateData);
      if (res.success) {
        toast.success("Workflow Section updated successfully!");
        onSave(formData);
        onClose();
      }
    } catch (error) {
      console.error("Workflow Section update failure:", error);
      toast.error("Failed to update Workflow Section!");
    } finally {
      setIsLoading(false);
    }
  };

  const updateStep = (
    index: number,
    field: keyof WorkflowStep,
    value: string,
  ) => {
    const newSteps = [...formData.steps];
    newSteps[index] = { ...newSteps[index], [field]: value };
    setFormData({ ...formData, steps: newSteps });
  };

  const addStep = () => {
    setFormData({
      ...formData,
      steps: [
        ...formData.steps,
        {
          id: Math.random().toString(36).substr(2, 9),
          stepNumber: (formData.steps.length + 1).toString().padStart(2, "0"),
          title: "",
          description: "",
          icon: "fa-solid fa-code",
        },
      ],
    });
  };

  const removeStep = (index: number) => {
    setFormData({
      ...formData,
      steps: formData.steps.filter((_, i) => i !== index),
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] w-[95vw] max-h-[90vh] flex flex-col bg-[#0E1416] border-emerald-500/20 text-white p-0 overflow-hidden shadow-2xl focus:outline-none rounded-lg">
        <DialogHeader className="p-6 pb-4 border-b border-emerald-500/10 bg-[#121A1C]/50 backdrop-blur-xl sticky top-0 z-20">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold flex items-center gap-3 text-emerald-500">
              <LayoutPanelLeft className="w-6 h-6" />
              Workflow Section Configuration
            </DialogTitle>
            <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Status:
              </span>
              <div className="flex items-center gap-2">
                <Switch
                  checked={formData.isActive}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isActive: checked })
                  }
                  className="data-[state=checked]:bg-emerald-500 scale-75"
                />
                <span
                  className={`text-[10px] font-black uppercase tracking-widest ${formData.isActive ? "text-emerald-500" : "text-slate-500"}`}
                >
                  {formData.isActive ? "Active" : "Hidden"}
                </span>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 scrollbar-hide bg-[#0E1416]/50">
          <form onSubmit={handleSubmit} className="py-8 space-y-8">
            {/* Header Settings */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-emerald-500 font-bold uppercase text-xs tracking-[0.2em]">
                <i className="fa-solid fa-heading"></i>
                <span>Section Header</span>
              </div>
              <div className="bg-[#121A1C] border border-white/5 rounded-lg p-6 shadow-xl space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="uppercase text-[10px] tracking-widest text-slate-400 font-bold">
                      Badge Text
                    </Label>
                    <Input
                      value={formData.badge}
                      onChange={(e) =>
                        setFormData({ ...formData, badge: e.target.value })
                      }
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="uppercase text-[10px] tracking-widest text-slate-400 font-bold">
                      Badge Icon
                    </Label>
                    <Input
                      value={formData.badgeIcon}
                      onChange={(e) =>
                        setFormData({ ...formData, badgeIcon: e.target.value })
                      }
                      className="bg-white/5 border-white/10 font-mono text-emerald-400"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="uppercase text-[10px] tracking-widest text-slate-400 font-bold">
                      Title
                    </Label>
                    <Input
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="bg-white/5 border-white/10 font-bold text-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="uppercase text-[10px] tracking-widest text-slate-400 font-bold">
                      Highlight
                    </Label>
                    <Input
                      value={formData.titleHighlight}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          titleHighlight: e.target.value,
                        })
                      }
                      className="bg-white/5 border-white/10 font-bold text-lg text-emerald-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="uppercase text-[10px] tracking-widest text-slate-400 font-bold">
                    Description
                  </Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="bg-white/5 border-white/10 min-h-[100px]"
                  />
                </div>
              </div>
            </div>

            {/* Workflow Steps */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-500 font-bold uppercase text-xs tracking-[0.2em]">
                  <i className="fa-solid fa-list-ol"></i>
                  <span>Workflow Steps</span>
                </div>
                <Button
                  type="button"
                  onClick={addStep}
                  size="sm"
                  className="h-7 text-[10px] bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-black uppercase font-black tracking-widest border border-emerald-500/20"
                >
                  + Add Step
                </Button>
              </div>

              <div className="space-y-4">
                {formData.steps.map((step, index) => (
                  <div
                    key={index}
                    className="bg-[#121A1C] border border-white/5 rounded-lg p-6 relative group"
                  >
                    <div className="absolute top-4 right-4 flex items-center gap-2">
                      <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest px-2 py-1 bg-black/20 rounded">
                        Step {step.stepNumber}
                      </span>
                      <Button
                        type="button"
                        onClick={() => removeStep(index)}
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0 text-red-500/30 hover:text-red-500 hover:bg-red-500/10 rounded-full"
                      >
                        <i className="fa-solid fa-trash text-xs"></i>
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      <div className="space-y-2">
                        <Label className="uppercase text-[9px] tracking-widest text-slate-500 font-bold">
                          Step Title
                        </Label>
                        <Input
                          value={step.title}
                          onChange={(e) =>
                            updateStep(index, "title", e.target.value)
                          }
                          className="bg-white/5 border-white/10 h-9 text-sm font-bold"
                          placeholder="e.g. Discovery"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="uppercase text-[9px] tracking-widest text-slate-500 font-bold">
                          Icon (FontAwesome)
                        </Label>
                        <div className="relative">
                          <i
                            className={`absolute left-3 top-1/2 -translate-y-1/2 ${step.icon} text-emerald-500/50 text-xs`}
                          ></i>
                          <Input
                            value={step.icon}
                            onChange={(e) =>
                              updateStep(index, "icon", e.target.value)
                            }
                            className="bg-white/5 border-white/10 h-9 text-xs font-mono pl-9 text-emerald-400"
                            placeholder="fa-solid fa-..."
                          />
                        </div>
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label className="uppercase text-[9px] tracking-widest text-slate-500 font-bold">
                          Step Image URL (Optional)
                        </Label>
                        <Input
                          value={step.image || ""}
                          onChange={(e) =>
                            updateStep(index, "image", e.target.value)
                          }
                          className="bg-white/5 border-white/10 h-9 text-sm text-sky-400 font-mono"
                          placeholder="https://..."
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label className="uppercase text-[9px] tracking-widest text-slate-500 font-bold">
                          Description
                        </Label>
                        <Textarea
                          value={step.description}
                          onChange={(e) =>
                            updateStep(index, "description", e.target.value)
                          }
                          className="bg-white/5 border-white/10 min-h-[80px] text-sm"
                          placeholder="Describe what happens in this step..."
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </form>

          <div className="p-6 pt-0 flex justify-end gap-3 pb-8">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="px-6 h-10 rounded-lg font-bold border-white/10 text-slate-300 hover:text-white hover:bg-white/5"
            >
              Discard
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="px-8 h-10 rounded-lg font-bold bg-emerald-500 text-black hover:bg-emerald-400 shadow-lg shadow-emerald-500/20"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
