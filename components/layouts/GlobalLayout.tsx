import React from "react";
import GlobalHeader from "@/components/navigation/GlobalHeader";
import Footer from "@/components/navigation/Footer";

type Props = {
  children: React.ReactNode;
};

export default function GlobalLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen flex-col bg-jet-black text-acid-white">
      <GlobalHeader />
      <main id="main-content" className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
