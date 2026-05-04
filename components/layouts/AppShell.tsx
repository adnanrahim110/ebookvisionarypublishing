"use client";

import { Navbar } from "@/components/layouts/navbar";
import { Footer } from "@/components/layouts/footer";

const AppShell = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col w-full overflow-hidden">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default AppShell;
