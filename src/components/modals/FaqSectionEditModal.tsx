"use client";

import { useState, useEffect } from "react";
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
import { toast } from "sonner";
import {
  Loader2,
  HelpCircle,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { FaqSectionData, FaqItem } from "@/types/faq";
import { dynamicContentService } from "@/services/dynamicContentService";
import { revalidateData } from "@/app/actions";

interface FaqSectionEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentData: FaqSectionData;
  onSave: (data: FaqSectionData) => void;
}

export const FaqSectionEditModal = ({
  isOpen,
  onClose,
  currentData,
  onSave,
}: FaqSectionEditModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FaqSectionData>({
    ...currentData,
    isActive: currentData.isActive ?? true,
    slNumber: currentData.slNumber ?? 0,
    faqs: currentData.faqs || [],
  });
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        ...currentData,
        isActive: currentData.isActive ?? true,
        slNumber: currentData.slNumber ?? 0,
        faqs: currentData.faqs || [],
      });
    }
  }, [isOpen, currentData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const updateData = {
      ...formData,
      type: "faq",
    };
    console.log("faq data", updateData);
    try {
      const res = await dynamicContentService.upsertContent(updateData);
      if (res) {
        await revalidateData("dynamic-content");
        toast.success("FAQ section updated successfully!");
        onSave(formData);
        onClose();
      }
    } catch (error) {
      console.error("FAQ update failure:", error);
      toast.error("FAQ update failed!");
    } finally {
      setIsLoading(false);
    }
  };

  const addFaq = () => {
    const newFaq: FaqItem = {
      id: Date.now(),
      question: "",
      answer: "",
    };
    setFormData({
      ...formData,
      faqs: [...(formData.faqs || []), newFaq],
    });
    setExpandedIndex((formData.faqs || []).length);
  };

  const removeFaq = (index: number) => {
    const newFaqs = (formData.faqs || []).filter((_, i) => i !== index);
    setFormData({ ...formData, faqs: newFaqs });
    if (expandedIndex === index) setExpandedIndex(null);
    else if (expandedIndex !== null && expandedIndex > index)
      setExpandedIndex(expandedIndex - 1);
  };

  const updateFaq = (index: number, field: keyof FaqItem, value: string) => {
    const newFaqs = [...(formData.faqs || [])];
    newFaqs[index] = { ...newFaqs[index], [field]: value };
    setFormData({ ...formData, faqs: newFaqs });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] w-[95vw] max-h-[90vh] flex flex-col bg-[#0E1416] border-emerald-500/20 text-white p-0 overflow-hidden shadow-2xl focus:outline-none rounded-lg">
        {/* Header */}
        <DialogHeader className="p-6 pb-4 border-b border-emerald-500/10 bg-[#121A1C]/50 backdrop-blur-xl sticky top-0 z-20">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold flex items-center gap-3 text-emerald-500">
              <HelpCircle className="w-6 h-6" />
              FAQ Section Configuration
            </DialogTitle>
            <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10 mr-8">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Section Status:
              </span>
              <div className="flex items-center gap-2">
                <Switch
                  checked={formData.isActive}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isActive: checked })
                  }
                  className="data-[state=checked]:bg-emerald-500"
                />
                <span
                  className={`text-[10px] font-black uppercase tracking-widest ${
                    formData.isActive ? "text-emerald-500" : "text-slate-500"
                  }`}
                >
                  {formData.isActive ? "Active" : "Hidden"}
                </span>
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-6 scrollbar-hide bg-[#0E1416]/50">
          <form
            id="faq-section-form"
            onSubmit={handleSubmit}
            className="py-8 space-y-10"
          >
            {/* Header Configuration */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-emerald-500 font-bold uppercase text-xs tracking-[0.2em]">
                <div className="w-1 h-4 bg-emerald-500 rounded-full" />
                Section Header
              </div>
              <div className="bg-[#121A1C] border border-white/5 rounded-lg p-6 shadow-xl space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-slate-300 font-semibold uppercase text-[10px] tracking-widest">
                      Title
                    </Label>
                    <Input
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="bg-white/5 border-white/10 text-white h-11"
                      placeholder="Common Questions"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300 font-semibold uppercase text-[10px] tracking-widest">
                      Subtitle/Badge
                    </Label>
                    <Input
                      value={formData.subtitle}
                      onChange={(e) =>
                        setFormData({ ...formData, subtitle: e.target.value })
                      }
                      className="bg-white/5 border-white/10 text-white h-11"
                      placeholder="FAQ"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300 font-semibold uppercase text-[10px] tracking-widest">
                    Description
                  </Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="bg-white/5 border-white/10 text-white min-h-[80px]"
                    placeholder="Find answers to some of the most common questions..."
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300 font-semibold uppercase text-[10px] tracking-widest">
                    Sorting Number (Serial)
                  </Label>
                  <Input
                    type="number"
                    value={formData.slNumber ?? 0}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        slNumber: parseInt(e.target.value) || 0,
                      })
                    }
                    className="bg-white/5 border-white/10 text-emerald-400 h-10 w-24 font-mono font-bold"
                  />
                  <p className="text-[10px] text-slate-500 italic">
                    Lower numbers appear first on the home page.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ Items Configuration */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-500 font-bold uppercase text-xs tracking-[0.2em]">
                  <div className="w-1 h-4 bg-emerald-500 rounded-full" />
                  FAQ Questions ({formData.faqs?.length || 0})
                </div>
                <Button
                  type="button"
                  onClick={addFaq}
                  variant="outline"
                  size="sm"
                  className="bg-emerald-500/10 border-emerald-500/20 text-emerald-500 hover:bg-emerald-500 hover:text-black cursor-pointer h-8 px-4 font-bold text-[10px] uppercase tracking-widest"
                >
                  <Plus className="w-3 h-3 mr-2" />
                  Add Question
                </Button>
              </div>

              <div className="space-y-4">
                {formData.faqs?.length === 0 && (
                  <div className="text-center py-10 bg-[#121A1C] border border-dashed border-white/10 rounded-xl">
                    <p className="text-slate-500 text-sm">
                      No FAQ items added yet.
                    </p>
                  </div>
                )}
                {formData.faqs?.map((faq, index) => (
                  <div
                    key={faq.id}
                    className="bg-[#121A1C] border border-white/5 rounded-xl overflow-hidden group hover:border-emerald-500/30 transition-all shadow-xl"
                  >
                    <div
                      className="p-4 flex items-center justify-between cursor-pointer bg-white/2"
                      onClick={() =>
                        setExpandedIndex(expandedIndex === index ? null : index)
                      }
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 font-bold text-xs">
                          {index + 1}
                        </div>
                        <span className="text-sm font-medium text-slate-200 line-clamp-1">
                          {faq.question || "New Question..."}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFaq(index);
                          }}
                          className="w-8 h-8 text-slate-500 hover:text-red-500 hover:bg-red-500/10 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        <div className="text-slate-500">
                          {expandedIndex === index ? (
                            <ChevronUp className="w-5 h-5" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                        </div>
                      </div>
                    </div>

                    {expandedIndex === index && (
                      <div className="p-6 border-t border-white/5 space-y-4 animate-in slide-in-from-top-2 duration-300">
                        <div className="space-y-2">
                          <Label className="text-slate-400 font-bold uppercase text-[9px] tracking-[0.2em]">
                            Question
                          </Label>
                          <Input
                            value={faq.question}
                            onChange={(e) =>
                              updateFaq(index, "question", e.target.value)
                            }
                            className="bg-black/20 border-white/10 text-white"
                            placeholder="e.g. How long does it take for a project?"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-slate-400 font-bold uppercase text-[9px] tracking-[0.2em]">
                            Answer
                          </Label>
                          <Textarea
                            value={faq.answer}
                            onChange={(e) =>
                              updateFaq(index, "answer", e.target.value)
                            }
                            className="bg-black/20 border-white/10 text-white min-h-[100px]"
                            placeholder="Provide a detailed answer here..."
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </form>

          {/* Footer Actions */}
          <div className="p-6 pt-4 flex flex-col sm:flex-row justify-end gap-3 pb-12">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="bg-transparent border-white/10 text-white hover:bg-white/5 px-8 h-11 rounded-lg font-semibold cursor-pointer"
            >
              Discard
            </Button>
            <Button
              form="faq-section-form"
              type="submit"
              disabled={isLoading}
              className="bg-emerald-500 hover:bg-emerald-600 text-[#0E1416] shadow-xl shadow-emerald-500/20 px-8 h-11 rounded-lg font-bold transition-all hover:scale-105 cursor-pointer disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin w-4 h-4 mr-2" />
                  Saving...
                </>
              ) : (
                "Apply FAQ Changes"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
