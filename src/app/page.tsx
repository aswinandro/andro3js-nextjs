import { UnifiedEngine } from "@/components/canvas/UnifiedEngine";
import { Navbar } from "@/components/ui/Navbar";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <UnifiedEngine />
      
      <Navbar />

      {/* Hero Content Section (Invisible but provides scroll context) */}
      <section id="hero" className="h-screen flex flex-col items-center justify-center relative pointer-events-none">
        <div className="max-w-4xl px-8">
           <h1 className="text-8xl md:text-[12rem] font-bold text-white leading-none tracking-tighter opacity-10">
             SYSTEM<br/>ARCHITECT
           </h1>
        </div>
      </section>

      <section id="work" className="h-[200vh]" />
      <section id="experience" className="h-screen" />
      <section id="contact" className="h-screen" />
    </main>
  );
}
