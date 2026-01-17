"use client";

import React, { useEffect, useRef } from "react";
import { Navbar } from "@/components/ui/Navbar";
import { skillsData } from "@/constants";
import { gsap } from "gsap";
import { 
  Code2, 
  Layers, 
  Monitor, 
  Database, 
  Cloud, 
  Cpu, 
  Eye, 
  CheckCircle2, 
  ShieldCheck 
} from "lucide-react";

const categoryIcons: Record<string, any> = {
  "Languages": Code2,
  "Frameworks": Layers,
  "Frontend": Monitor,
  "Databases": Database,
  "Cloud & DevOps": Cloud,
  "Architecture & Patterns": Cpu,
  "Observability & Logging": Eye,
  "Testing & Quality": CheckCircle2,
  "Payments & Security": ShieldCheck,
};

const getDevIcon = (name: string) => {
  const map: Record<string, string> = {
    // Languages
    "java": "java/java-original",
    "j2ee": "java/java-original",
    "node.js": "nodejs/nodejs-original",
    "python": "python/python-original",
    "typescript": "typescript/typescript-original",
    "javascript": "javascript/javascript-original",
    
    // Frameworks
    "spring boot": "spring/spring-original",
    "spring mvc": "spring/spring-original",
    "hibernate": "hibernate/hibernate-original",
    "nestjs": "nestjs/nestjs-original",
    "express.js": "express/express-original",
    "express": "express/express-original",
    "fastapi": "fastapi/fastapi-original",
    "flask": "flask/flask-original",
    
    // Frontend
    "react.js": "react/react-original",
    "angular": "angularjs/angularjs-original",
    "next.js": "nextjs/nextjs-original",
    "react native": "react/react-original",
    "html5": "html5/html5-original",
    "css3": "css3/css3-original",
    "tailwind": "tailwindcss/tailwindcss-original",
    
    // Databases
    "mongodb": "mongodb/mongodb-original",
    "mysql": "mysql/mysql-original",
    "postgresql": "postgresql/postgresql-original",
    "oracle": "oracle/oracle-original",
    "sql server": "microsoftsqlserver/microsoftsqlserver-plain",
    "firebase": "firebase/firebase-plain",
    "graphql": "graphql/graphql-plain",
    
    // Cloud & DevOps
    "aws": "amazonwebservices/amazonwebservices-original",
    "azure": "azure/azure-original",
    "docker": "docker/docker-original",
    "kubernetes": "kubernetes/kubernetes-plain",
    "terraform": "terraform/terraform-original",
    "jenkins": "jenkins/jenkins-original",
    "ansible": "ansible/ansible-original",
    "github actions": "github/github-original",
    
    // Others
    "git": "git/git-original",
    "prometheus": "prometheus/prometheus-original",
    "grafana": "grafana/grafana-original",
    "linux": "linux/linux-original",
  };
  
  const cleanName = name.toLowerCase().split(' [')[0].split(' (')[0].trim();
  
  if (map[cleanName]) {
    return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${map[cleanName]}.svg`;
  }
  
  // Try generic if not in map
  const fallback = cleanName.replace('.', '');
  return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${fallback}/${fallback}-original.svg`;
};

export default function SkillsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.fromTo(
        cardRefs.current,
        { opacity: 0, y: 50, scale: 0.9 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.8, 
          stagger: 0.1, 
          ease: "back.out(1.7)" 
        }
      );
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500 selection:text-white">
      <Navbar />
      
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-20">
            <div className="w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        </div>
      </div>

      <div className="relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <header className="mb-16 text-center lg:text-left">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 bg-gradient-to-r from-white via-white to-white/20 bg-clip-text text-transparent">
            Technical Stack
          </h1>
          <p className="text-cyan-400/60 font-mono tracking-widest uppercase text-sm">
            Visualizing the architecture of my expertise
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.map((category, idx) => {
            const Icon = categoryIcons[category.category] || Code2;
            return (
              <div 
                key={category.category}
                ref={el => { cardRefs.current[idx] = el; }}
                className="group relative bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-md hover:bg-white/[0.08] hover:border-cyan-500/50 transition-all duration-500"
              >
                {/* Decorative glow */}
                <div className="absolute -inset-px bg-gradient-to-br from-cyan-500/20 to-purple-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
                
                <div className="relative">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 group-hover:scale-110 transition-transform duration-500">
                      <Icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <h2 className="text-xl font-bold tracking-tight text-white/90 group-hover:text-cyan-400 transition-colors">
                      {category.category}
                    </h2>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {category.skills.map((skill) => (
                      <div 
                        key={skill}
                        className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-medium text-white/70 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all"
                      >
                        <img 
                          src={getDevIcon(skill)} 
                          alt={skill}
                          className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Corner accent */}
                <div className="absolute top-4 right-4 text-[10px] font-mono text-cyan-500/20 group-hover:text-cyan-500/40 transition-colors">
                  0{idx + 1}
                </div>
              </div>
            );
          })}
        </div>

        <footer className="mt-20 text-center text-white/20 font-mono text-[10px] uppercase tracking-[0.5em]">
          End of Skills Registry // Ver 2.0
        </footer>
      </div>
    </main>
  );
}
