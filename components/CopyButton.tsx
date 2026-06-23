"use client";

import { useEffect, useRef, useState } from "react";

interface CopyButtonProps {
  text: string;
  label?: string;
  copiedLabel?: string;
  className?: string;
}

const DEFAULT_LABEL = "Copy";
const DEFAULT_COPIED_LABEL = "Copied!";
const COPIED_RESET_DELAY_MS = 1800;

export function CopyButton({
  text,
  label = DEFAULT_LABEL,
  copiedLabel = DEFAULT_COPIED_LABEL,
  className = "",
}: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);

    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
    }

    resetTimeoutRef.current = setTimeout(() => {
      setIsCopied(false);
      resetTimeoutRef.current = null;
    }, COPIED_RESET_DELAY_MS);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`rounded-md border border-neutral-700 px-3 py-1.5 text-xs font-semibold text-neutral-200 transition hover:border-neutral-500 hover:text-white ${className}`}
    >
      {isCopied ? copiedLabel : label}
    </button>
  );
}
