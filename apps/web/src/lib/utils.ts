import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};

export function selectRandomTwColor() {
  const colors = [
    "bg-gradient-to-br from-red-200 to-red-600",
    "bg-gradient-to-br from-orange-500 to-yellow-300",
    "bg-gradient-to-br from-purple-900 to-indigo-500",
    "bg-gradient-to-br from-violet-500 to-orange-300",
    "bg-gradient-to-br from-blue-400 to-emerald-400",
    "bg-gradient-to-br from-fuchsia-500 via-red-600 to-orange-400",
    "bg-gradient-to-br from-red-200 via-red-300 to-yellow-200",
    "bg-gradient-to-br from-blue-700 via-cyan-700 to-zinc-800",
    "bg-gradient-to-br from-purple-900 via-green-600 to-neutral-200",
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}
