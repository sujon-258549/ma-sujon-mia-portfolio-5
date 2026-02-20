"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useIsAuthorized } from "@/lib/auth";
import {
  CreativeSectionData,
  CreativeItem,
  CreativeSectionProps,
} from "@/types/creative";
import { CreativeSectionHeaderEditModal } from "@/components/modals/CreativeSectionHeaderEditModal";
import { CreativeItemModal } from "@/components/modals/CreativeItemModal";
import { CreativeDetailsModal } from "@/components/modals/CreativeDetailsModal";
import { Settings2, ArrowUpRight, Plus, PenSquare, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { creativeService } from "@/services/creativeService";
import { revalidateData } from "@/app/actions";
import { FallbackCard } from "@/components/ui/FallbackCard";

// Swiper Imports
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  Navigation,
  EffectCreative,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-creative";

const CreativeSection = ({ headerData, items = [] }: CreativeSectionProps) => {
  const isAuthorized = useIsAuthorized();
  const [isHeaderModalOpen, setIsHeaderModalOpen] = useState(false);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CreativeItem | null>(null);
  const [selectedItem, setSelectedItem] = useState<CreativeItem | null>(null);

  const sectionRef = useRef<HTMLElement>(null);

  const [sectionData, setSectionData] = useState<CreativeSectionData>(() => ({
    badge: headerData?.badge || "Creative Corner",
    badgeIcon: headerData?.badgeIcon || "fa-solid fa-paintbrush",
    title: headerData?.title || "Featured",
    titleHighlight: headerData?.titleHighlight || "Creations",
    description:
      headerData?.description ||
      "A showcase of selected creative works, UI experiments, and visual explorations.",
    isActive: headerData?.isActive ?? true,
    slNumber: headerData?.slNumber ?? 0,
  }));

  const [currentItems, setCurrentItems] = useState<CreativeItem[]>(items);

  // Sync with initial props if they change
  useEffect(() => {
    if (headerData) {
      // eslint-disable-next-line
      setSectionData((prev) => {
        const newData = { ...prev, ...headerData };
        if (JSON.stringify(prev) === JSON.stringify(newData)) return prev;
        return newData;
      });
    }
    if (items.length > 0) {
      setCurrentItems((prev) => {
        if (JSON.stringify(prev) === JSON.stringify(items)) return prev;
        return items;
      });
    }
  }, [headerData, items]);

  const handleSaveHeader = (newData: CreativeSectionData) => {
    setSectionData(newData);
  };

  const handleSaveItem = (item: CreativeItem) => {
    // Optimistic update
    console.log("Saving item:", item);
    setCurrentItems((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        return prev.map((i) => (i.id === item.id ? item : i));
      }
      return [...prev, item];
    });
    // In a real app, you might re-fetch from server here to be safe
  };

  const handleDeleteItem = async (e: React.MouseEvent, itemId: string) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      const res = await creativeService.deleteItem(itemId);
      if (res.success) {
        await revalidateData("creative-items");
        setCurrentItems((prev) => prev.filter((item) => item.id !== itemId));
        toast.success("Creative item deleted successfully!");
      } else {
        toast.error("Failed to delete item!");
      }
    } catch (error) {
      console.error("Delete failure:", error);
      toast.error("Failed to delete item!");
    }
  };

  const handleCardClick = (item: CreativeItem) => {
    setSelectedItem(item);
    setIsDetailsModalOpen(true);
  };

  if (!sectionData.isActive && !isAuthorized) return null;

  return (
    <section
      ref={sectionRef}
      id="creative"
      className={`section-spacing bg-[#0a0f11] relative overflow-hidden ${
        !sectionData.isActive ? "opacity-60 grayscale-[0.5]" : ""
      }`}
    >
      {/* Background Ambience - Minimal */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Admin Controls - Floating Action Buttons */}
      {isAuthorized && (
        <div className="absolute top-4 right-4 z-50 flex gap-4">
          <button
            onClick={() => {
              setEditingItem(null);
              setIsItemModalOpen(true);
            }}
            className="w-12 h-12 rounded-full bg-emerald-500 text-black flex items-center justify-center shadow-lg hover:bg-emerald-400 hover:scale-105 transition-all border border-emerald-500/15 group"
            title="Add New Project"
          >
            <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
          </button>

          <button
            onClick={() => setIsHeaderModalOpen(true)}
            className="w-12 h-12 rounded-full bg-[#172023] text-emerald-500 flex items-center justify-center shadow-lg hover:bg-[#1f2b2f] hover:text-white transition-all border border-emerald-500/20 group"
            title="Edit Section Settings"
          >
            <Settings2 className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
          </button>
        </div>
      )}

      {!sectionData.isActive && isAuthorized && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50">
          <Badge className="bg-red-500/20 text-red-500 border-red-500/50 uppercase text-[9px] font-black tracking-widest px-4 py-1">
            Hidden
          </Badge>
        </div>
      )}

      <section className="main-container">
        <div className=" relative z-10">
          {/* Section Header */}
          <div className="text-center mb-10 md:mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6">
              <i
                className={`${sectionData.badgeIcon} text-[10px] text-emerald-500`}
              ></i>
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-500">
                {sectionData.badge}
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              {sectionData.title}{" "}
              <span className="text-emerald-500">
                {sectionData.titleHighlight}
              </span>
            </h2>

            <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
              {sectionData.description}
            </p>
          </div>

          {/* Unique Slider Carousel */}
          <div className="relative">
            {currentItems.length > 0 ? (
              <Swiper
                modules={[Autoplay, Pagination, Navigation, EffectCreative]}
                spaceBetween={24}
                slidesPerView={1}
                loop={true}
                autoplay={{
                  delay: 3500,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 24,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                  },
                }}
                className="pb-12"
              >
                {currentItems.map((item) => (
                  <SwiperSlide key={item.id} className="pt-2 pb-2">
                    <div
                      onClick={() => handleCardClick(item)}
                      className={`group relative h-[400px] md:h-[500px] w-full overflow-hidden cursor-pointer bg-transparent perspective-1000 transition-all duration-500`}
                    >
                      {/* Glassmorphism Card Wrapper */}
                      <div className="relative h-full w-full rounded-xl bg-[#121A1C]/60 backdrop-blur-xl border border-emerald-500/15 group-hover:border-emerald-500/30 transition-all duration-500 overflow-hidden shadow-2xl">
                        {/* Image Area - Floating Effect */}
                        <div className="absolute top-3 left-3 right-3 h-[55%] md:h-[60%] rounded-lg overflow-hidden shadow-lg group-hover:shadow-emerald-500/10 transition-shadow duration-500">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              unoptimized
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          ) : (
                            <div className="w-full h-full bg-[#172023] flex items-center justify-center">
                              <i
                                className={`${item.icon || "fa-solid fa-image"} text-6xl text-white/5 group-hover:text-white/10 transition-colors`}
                              />
                            </div>
                          )}

                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0E1416]/80 via-transparent to-transparent opacity-80" />

                          {/* Floating Action Button on Image */}
                          <div className="absolute bottom-4 right-4 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                            <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 group-hover:text-emerald-400 transition-colors" />
                          </div>
                        </div>

                        {/* Icon Bubble - overlapping */}
                        <div className="absolute top-[50%] md:top-[55%] left-6 md:left-8 w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#0E1416] border border-emerald-500/15 flex items-center justify-center z-20 shadow-xl group-hover:scale-110 group-hover:border-emerald-500/50 transition-all duration-500">
                          <i
                            className={`${item.icon || "fa-solid fa-star"} text-base md:text-lg text-emerald-500 group-hover:rotate-12 transition-transform duration-500`}
                          />
                        </div>

                        {/* Content Area - Clean Typography */}
                        <div className="absolute bottom-0 inset-x-0 h-[45%] md:h-[40%] p-6 md:p-8 pt-8 md:pt-10 flex flex-col justify-center">
                          <div className="space-y-2 md:space-y-3">
                            <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors tracking-tight line-clamp-1">
                              {item.title}
                            </h3>
                            <p className="text-slate-400 text-xs md:text-sm leading-relaxed line-clamp-3 group-hover:text-slate-300 transition-colors">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Authorized Admin Controls - Card Level */}
                      {isAuthorized && (
                        <div className="absolute top-6 left-6 z-30 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingItem(item);
                              setIsItemModalOpen(true);
                            }}
                            className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-xl text-white flex items-center justify-center hover:bg-emerald-500 hover:text-[#0E1416] transition-all border border-emerald-500/15 shadow-lg"
                            title="Edit Project"
                          >
                            <PenSquare className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => handleDeleteItem(e, item.id!)}
                            className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-xl text-red-400 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all border border-emerald-500/15 shadow-lg"
                            title="Delete Project"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <FallbackCard
                type="empty"
                title="No Creative Items Found"
                description="There are currently no creative items to display. Check back later!"
                className="min-h-[400px] bg-white/5 border-emerald-500/15"
              />
            )}
          </div>
        </div>
      </section>

      <CreativeSectionHeaderEditModal
        isOpen={isHeaderModalOpen}
        onClose={() => setIsHeaderModalOpen(false)}
        currentData={sectionData}
        onSave={handleSaveHeader}
      />

      <CreativeItemModal
        isOpen={isItemModalOpen}
        onClose={() => setIsItemModalOpen(false)}
        currentItem={editingItem}
        onSave={handleSaveItem}
      />

      <CreativeDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        item={selectedItem}
      />

      <style jsx global>{`
        .swiper-pagination-bullet {
          background-color: rgba(255, 255, 255, 0.2);
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background-color: #10b981; /* Emerald 500 */
        }
      `}</style>
    </section>
  );
};

export default CreativeSection;
