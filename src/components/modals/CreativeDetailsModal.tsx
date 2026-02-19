"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreativeItem } from "@/types/creative";
import Image from "next/image";
import { ExternalLink, X, Share2, Copy } from "lucide-react";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon,
  RedditShareButton,
  RedditIcon,
} from "next-share";
import { toast } from "sonner";

interface CreativeDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: CreativeItem | null;
}

export const CreativeDetailsModal = ({
  isOpen,
  onClose,
  item,
}: CreativeDetailsModalProps) => {
  const [isSharing, setIsSharing] = useState(false);

  if (!item) return null;

  const shareUrl =
    item.link || (typeof window !== "undefined" ? window.location.href : "");
  const shareTitle = `Check out "${item.title}" from this Portfolio!`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied to clipboard!");
  };

  const handleClose = () => {
    setIsSharing(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-6xl!  h-[95%] p-0 bg-[#0E1416] border border-white/10 text-white overflow-hidden shadow-2xl rounded-2xl outline-none flex flex-col md:flex-row">
        {/* Close Button - Simple & Accessible */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/40 text-white/70 hover:text-white hover:bg-black/60 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Left Side - Large Visual */}
        <div className="w-full md:w-1/2 h-[40%] md:h-full relative bg-[#121A1C] border-r border-white/5">
          {item.image ? (
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#121A1C]">
              <i
                className={`${item.icon || "fa-solid fa-layer-group"} text-8xl text-emerald-500/20`}
              />
            </div>
          )}
          {/* Subtle Gradient Overlay for text protection if needed */}
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Right Side - Clean Content */}
        <div className="w-full md:w-1/2 h-[60%] md:h-full flex flex-col bg-[#0E1416]">
          <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-bold uppercase tracking-widest">
                  Project Details
                </div>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                {item.title}
              </h2>
            </div>

            {/* Description */}
            <div className="space-y-6">
              <p className="text-slate-300 text-lg leading-relaxed font-light">
                {item.description}
              </p>

              <div className="p-6 rounded-xl bg-white/5 border border-white/5 space-y-2">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  About this piece
                </h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  This creative work showcases modern design principles and
                  aesthetic precision. It represents a specific exploration in
                  visual style and technical execution.
                </p>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-8 border-t border-white/10 bg-[#121A1C] min-h-[110px] flex items-center">
            {isSharing ? (
              <div className="w-full flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                    Share via:
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsSharing(false)}
                    className="text-slate-500 hover:text-white h-auto p-0"
                  >
                    Cancel
                  </Button>
                </div>
                <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  <FacebookShareButton url={shareUrl} quote={shareTitle}>
                    <FacebookIcon
                      size={40}
                      round
                      className="hover:opacity-80 transition-opacity"
                    />
                  </FacebookShareButton>

                  <TwitterShareButton url={shareUrl} title={shareTitle}>
                    <TwitterIcon
                      size={40}
                      round
                      className="hover:opacity-80 transition-opacity"
                    />
                  </TwitterShareButton>

                  <LinkedinShareButton
                    url={shareUrl}
                    title={item.title}
                    summary={item.description}
                  >
                    <LinkedinIcon
                      size={40}
                      round
                      className="hover:opacity-80 transition-opacity"
                    />
                  </LinkedinShareButton>

                  <WhatsappShareButton url={shareUrl} title={shareTitle}>
                    <WhatsappIcon
                      size={40}
                      round
                      className="hover:opacity-80 transition-opacity"
                    />
                  </WhatsappShareButton>

                  <TelegramShareButton url={shareUrl} title={shareTitle}>
                    <TelegramIcon
                      size={40}
                      round
                      className="hover:opacity-80 transition-opacity"
                    />
                  </TelegramShareButton>

                  <RedditShareButton url={shareUrl} title={shareTitle}>
                    <RedditIcon
                      size={40}
                      round
                      className="hover:opacity-80 transition-opacity"
                    />
                  </RedditShareButton>

                  <button
                    onClick={handleCopyLink}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-emerald-500 text-white flex items-center justify-center transition-all"
                    title="Copy Link"
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="w-full flex flex-col sm:flex-row gap-4">
                {item.link ? (
                  <Button
                    onClick={() => window.open(item.link, "_blank")}
                    className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-black font-bold h-12 rounded-lg text-sm uppercase tracking-widest transition-all"
                  >
                    <span>Visit Project</span>
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    disabled
                    className="flex-1 bg-white/5 text-slate-500 h-12 rounded-lg border border-white/5"
                  >
                    No Link Available
                  </Button>
                )}

                <Button
                  variant="outline"
                  className="h-12 w-12 p-0 rounded-lg border-white/10 bg-transparent hover:bg-white/5 text-white"
                  onClick={() => setIsSharing(true)}
                  title="Share"
                >
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
