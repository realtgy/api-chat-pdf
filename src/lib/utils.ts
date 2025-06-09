import { clsx, type ClassValue } from "clsx";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPDFFileNameFromURL(url: string) {
  // extract file name from url
  const matches = url.match(/([^\/?#]+\.pdf)(?=$|[?#])/i);
  return matches ? matches[1] : null;
}

export function showToast(message: string) {
  toast.error(message, {
    position: "top-right",
    className: "foo-bar",
  });
}

export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "Kb", "Mb", "Gb"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export function scrollToBottom(messageEndRef: React.RefObject<HTMLElement>) {
  if (messageEndRef.current) {
    messageEndRef.current.scrollIntoView({
      behavior: "smooth",
    });
  }
}
