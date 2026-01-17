import { UnifiedEngine } from "@/components/canvas/UnifiedEngine";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <UnifiedEngine />
      
      {/* Navigation Overlay */}
      <nav className="fixed top-0 left-0 w-full p-8 flex justify-between items-center z-50 pointer-events-none">
        <div className="text-white font-bold text-2xl tracking-tighter pointer-events-auto cursor-pointer">
          ASWIN<span className="text-cyan-500">ANDRO</span>
        </div>
        <div className="flex gap-8 pointer-events-auto">
          {["Work", "Experience", "Skills", "Contact"].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-white/50 hover:text-cyan-400 font-mono text-xs uppercase tracking-widest transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
      </nav>

      {/* Hero Content Section (Invisible but provides scroll context) */}
      <section id="hero" className="h-screen flex flex-col items-center justify-center relative pointer-events-none">
        <div className="max-w-4xl px-8">
           <h1 className="text-8xl md:text-[12rem] font-bold text-white leading-none tracking-tighter opacity-10">
             SYSTEM<br/>ARCHITECT
           </h1>
        </div>
      </section>

      <section id="cloud" className="h-screen" />
      <section id="backend" className="h-screen" />
      <section id="mobile" className="h-screen" />
      <section id="contact" className="h-screen" />
    </main>
  );
}
