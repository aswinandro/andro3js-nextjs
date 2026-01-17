import { UnifiedEngine } from "@/components/canvas/UnifiedEngine";
import { Navbar } from "@/components/ui/Navbar";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <UnifiedEngine />
      
      <Navbar />

      {/* Hero Content Section */}
      <section id="hero" className="h-screen flex flex-col items-center justify-center relative pointer-events-none px-4">
         <div className="max-w-7xl w-full">
           <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] xl:text-[12rem] font-black text-white leading-[0.9] tracking-tighter opacity-10 select-none" style={{ fontFamily: "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif", fontWeight: 900 }}>
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
