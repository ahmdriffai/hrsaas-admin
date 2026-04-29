import { Position } from "@/features/position/schemas/position-schema";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date?: Date) => {
  if (!date) return "";
  return date.toISOString().split("T")[0];
};

export function getLevel(position: Position): number {
  let level = 0;
  let current = position.parent;

  while (current) {
    level++;
    current = current.parent;
  }

  return level;
}
