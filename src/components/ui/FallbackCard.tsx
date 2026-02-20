import React from "react";
import { AlertCircle, FileQuestion, RefreshCw } from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
import { cn } from "@/lib/utils";

interface FallbackCardProps {
  title?: string;
  description?: string;
  icon?: React.ElementType;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
  type?: "error" | "empty";
}

export function FallbackCard({
  title,
  description,
  icon: Icon,
  actionLabel,
  onAction,
  className,
  type = "error",
}: FallbackCardProps) {
  const isError = type === "error";
  const DefaultIcon = isError ? AlertCircle : FileQuestion;
  const IconToUse = Icon || DefaultIcon;

  return (
    <Card
      className={cn(
        "flex flex-col items-center justify-center p-8 text-center w-full min-h-[300px]",
        isError
          ? "bg-red-500/5 border-red-500/20"
          : "bg-zinc-900/50 border-zinc-800",
        className,
      )}
    >
      <div
        className={cn(
          "rounded-full p-4 mb-4 ring-1",
          isError
            ? "bg-red-500/10 ring-red-500/20 text-red-500"
            : "bg-zinc-800 ring-white/10 text-zinc-400",
        )}
      >
        <IconToUse className="w-8 h-8" />
      </div>

      <h3
        className={cn(
          "text-xl font-bold mb-2",
          isError ? "text-red-500" : "text-zinc-200",
        )}
      >
        {title || (isError ? "Something went wrong" : "No data found")}
      </h3>

      <p className="text-zinc-400 mb-6 max-w-sm">
        {description ||
          (isError
            ? "We couldn't load this section due to a technical issue."
            : "There is currently no information to display in this section.")}
      </p>

      {onAction && actionLabel && (
        <Button
          variant="outline"
          onClick={onAction}
          className={cn(
            "gap-2",
            isError
              ? "border-red-500/20 hover:bg-red-500/10 text-red-500 hover:text-red-500"
              : "border-zinc-700 hover:bg-zinc-800 text-zinc-300",
          )}
        >
          {actionLabel === "format_retry" ? (
            <RefreshCw className="w-4 h-4" />
          ) : null}
          {actionLabel}
        </Button>
      )}
    </Card>
  );
}
