"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils"; // Uses shadcn utility if available, or just use string concat

interface FadeImageProps extends ImageProps {
  className?: string;
}

export default function FadeImage({ className, alt, ...props }: FadeImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Image
      {...props}
      alt={alt}
      className={cn(
        "duration-700 ease-in-out",
        isLoading ? "opacity-0" : "opacity-100",
        className
      )}
      onLoad={() => setIsLoading(false)}
    />
  );
}
