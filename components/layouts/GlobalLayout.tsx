import type { PropsWithChildren } from "react";
import GlobalHeader from "@/components/navigation/GlobalHeader";
import Footer from "@/components/navigation/Footer";

export default function GlobalLayout({ children }: PropsWithChildren) {
  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      <a href="#main-content" className="skip-nav">
        Skip to main content
      </a>
      <GlobalHeader />
      <main
        id="main-content"
        role="main"
        aria-label="Main content"
        className="flex-grow"
        style={{ paddingInline: "clamp(24px, 8vw, 96px)" }}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
