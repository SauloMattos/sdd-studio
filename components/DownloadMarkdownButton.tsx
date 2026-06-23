"use client";

interface DownloadMarkdownButtonProps {
  markdown: string;
  fileName?: string;
  label?: string;
  className?: string;
}

const DEFAULT_FILE_NAME = "sdd-spec.md";
const DEFAULT_LABEL = "Baixar .md";

export function DownloadMarkdownButton({
  markdown,
  fileName = DEFAULT_FILE_NAME,
  label = DEFAULT_LABEL,
  className = "",
}: DownloadMarkdownButtonProps) {
  const handleDownload = () => {
    const blob = new Blob([markdown], {
      type: "text/markdown;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      className={`rounded-md border border-neutral-700 px-3 py-1.5 text-xs font-semibold text-neutral-200 transition hover:border-neutral-500 hover:text-white ${className}`}
    >
      {label}
    </button>
  );
}
