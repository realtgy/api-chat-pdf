import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPDFFileNameFromURL(url: string) {
  // extract file name from url
  const matches = url.match(/([^\/?#]+\.pdf)(?=$|[?#])/i);
  return matches ? matches[1] : null;
}
