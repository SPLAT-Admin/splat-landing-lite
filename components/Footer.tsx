import Link from "next/link";
import { BodySmall, Caption } from "./Typography";

export default function Footer() {
  return (
    <footer 
      className="bg-background border-t border-white/10 py-6 px-8"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex justify-between items-center text-sm md:text-base">
          <span className="text-acid-white">
            © 2025 SPL@T
          </span>
          <span className="text-deep-crimson font-semibold">
            Unapologetic. Bold. Authentic.
          </span>
        </div>
      </div>
    </footer>
  );
}
