/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform } from "motion/react";
import { 
  Globe, 
  MousePointer2, 
  Layout, 
  Zap, 
  Smartphone, 
  Settings2, 
  Search, 
  Shield, 
  ArrowRight,
  Instagram,
  Linkedin,
  Github,
  Mail
} from "lucide-react";
import { useState, useEffect, useRef, FormEvent } from "react";

const LOGO_URL = "https://lh3.googleusercontent.com/aida/ADBb0ujC0Cfx7VMruepk-0alWFrTVLML4G3NmMFzX-Ae9Ml1gFOiJjKyVaVRHLH7XchgElWDERvR8VmtgZ6y0swdQn-TCsfui3SEkh9lghc44IstNj5rrrO4HbUu4A9MYGtfSjCpeB-mot9MLIM2kew60sGti_I4-Jo727KQLBKHpeRHx3HHlE8Zz-YanNnfYSjDW1q8wuz8nYv1Twgohd902IISg7e1GoOwSW5CVl55WtN7PSvtneTnhAWA1PScr0QsTVAsDirCkI-l";

function Navbar() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5">
      <div className="flex justify-between items-center px-6 md:px-12 py-5 w-full max-w-screen-2xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <img 
            alt="Dev By Darshan Logo" 
            className="h-8 md:h-10 w-auto object-contain" 
            src={LOGO_URL}
            referrerPolicy="no-referrer"
          />
          <span className="font-display font-bold text-white uppercase tracking-[0.2em] text-[12px] ml-1">
            Dev|ByDarshan
          </span>
        </motion.div>
        <div className="hidden lg:flex items-center gap-12">
          {["home", "services", "work", "about", "contact"].map((item, i) => (
            <motion.a 
              key={item}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="font-display tracking-tight uppercase text-[10px] font-bold text-on-surface-variant hover:text-white transition-colors relative group" 
              href={`#${item}`}
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all group-hover:w-full"></span>
            </motion.a>
          ))}
        </div>
        <motion.button 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToContact}
          className="metallic-gradient px-6 py-2.5 font-display font-bold uppercase tracking-widest text-[10px] hover:opacity-90 transition-all cursor-pointer"
        >
          Book a Call
        </motion.button>
      </div>
    </nav>
  );
}

function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const xPercent = (clientX / innerWidth) * 100;
      const yPercent = (clientY / innerHeight) * 100;
      setMousePos({ x: xPercent, y: yPercent });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 overflow-hidden" 
      id="home"
    >
      <div 
        className="absolute inset-0 z-0 opacity-0 lg:opacity-100 pointer-events-none" 
        style={{
          background: `radial-gradient(circle 400px at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,0.08), transparent 80%)`
        }}
      ></div>
      <div className="absolute inset-0 z-0 subtle-grid opacity-20"></div>
      
      <div className="relative z-10 max-w-screen-xl mx-auto px-8 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <img 
            alt="Logo Icon" 
            className="h-20 w-auto opacity-10 mb-12" 
            src={LOGO_URL}
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="inline-flex items-center gap-3 mb-10 px-4 py-1.5 bg-surface-container-low ghost-border"
        >
          <div className="w-1 h-1 bg-white animate-pulse"></div>
          <span className="text-[9px] tracking-[0.4em] uppercase font-bold text-on-surface-variant">
            Digital Architecture Studio
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="font-display text-5xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.95] max-w-4xl mx-auto metallic-text"
        >
          HIGH PERFORMANCE <br className="hidden md:block"/> DIGITAL ECOSYSTEMS
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-on-surface-variant text-sm md:text-base max-w-xl mx-auto mb-16 font-light leading-relaxed tracking-wide"
        >
          We build websites that convert. Scale your digital presence with us.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-32"
        >
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="metallic-gradient font-display font-bold px-12 py-5 text-[11px] uppercase tracking-[0.2em] w-full sm:w-auto cursor-pointer"
          >
            Start a Project
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            className="ghost-border text-white font-display font-bold px-12 py-5 text-[11px] uppercase tracking-[0.2em] w-full sm:w-auto transition-all cursor-pointer"
          >
            Our Expertise
          </motion.button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24 w-full max-w-4xl border-t border-white/5 pt-12"
        >
          {["PRECISION", "MODERN", "BUSINESS IMPACT", "FUTURE SCALE"].map((text) => (
            <div key={text} className="flex flex-col items-center gap-2">
              <span className="text-[9px] tracking-widest text-on-surface-variant/60 uppercase">{text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    { icon: Globe, title: "Business Systems", desc: "Sophisticated corporate platforms tailored for conversion and operational efficiency." },
    { icon: MousePointer2, title: "Lead Capture", desc: "Highly optimized single-page architectures focused on measurable user action." },
    { icon: Layout, title: "UI/UX Modernization", desc: "Complete architectural overhaul for outdated platforms requiring modern aesthetics." },
    { icon: Zap, title: "Performance", desc: "Technical audit and speed tuning to achieve elite-level core web vitals." },
    { icon: Smartphone, title: "Mobile First", desc: "Adaptive interfaces designed specifically for seamless touch-based interactions." },
    { icon: Settings2, title: "Integrations", desc: "Complex API connectivity ensuring your website communicates with your entire stack." },
    { icon: Search, title: "SEO Engine", desc: "Semantic HTML structure and metadata optimization for visibility dominance." },
    { icon: Shield, title: "Security", desc: "Hardened codebase and continuous technical stewardship for peace of mind." },
  ];

  return (
    <section className="py-48 bg-surface-container-lowest" id="services">
      <div className="max-w-screen-2xl mx-auto px-8 lg:px-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-32 gap-12">
          <div className="max-w-xl">
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-8 metallic-text">Solutions</h2>
            <p className="text-on-surface-variant text-base font-light leading-relaxed">
              Synthesizing design thinking with engineering excellence to build robust digital products.
            </p>
          </div>
          <div className="text-[10px] tracking-[0.6em] text-on-surface-variant/40 uppercase font-bold border-b border-white/10 pb-2">
            Modules / 01
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5 overflow-hidden">
          {services.map((service, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ backgroundColor: "var(--color-surface-container-low)", y: -5 }}
              className="group p-12 bg-surface-container-lowest transition-all duration-500"
            >
              <service.icon className="w-8 h-8 mb-12 text-on-surface-variant group-hover:text-white transition-colors" strokeWidth={1} />
              <h3 className="font-display text-lg font-bold uppercase mb-4 tracking-tight text-white">{service.title}</h3>
              <p className="text-on-surface-variant text-xs leading-relaxed mb-12 font-light">{service.desc}</p>
              <div className="w-12 h-0.5 bg-white/20 group-hover:bg-white group-hover:w-full transition-all duration-700"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Edge() {
  return (
    <section className="py-48 bg-surface overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative group"
        >
          <div className="aspect-[4/5] bg-surface-container-high overflow-hidden border border-white/5">
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 1.5 }}
              alt="Data center visualization" 
              className="w-full h-full object-cover opacity-40 grayscale group-hover:opacity-60 transition-all duration-1000" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKPZ9Z5dEZ25ysNRji6tE8bJLcDRbYsF-cC20t1xiGO_LXewDHm5Jnxo91VypTYnakIJM7ueo7QNGJuebEF914i1JUgAy2oiYGQ1iU1V9kLgQuQs_roQggbMELlXFkeIhtQrjpz5Hz7xuTjLxWyuuxdbdUCXC3WnRQUFBza3_lIwx0qhGq1E96gt_a23gGUoKev4zzG4VbWTbIMMNRAVFQyGNG3axwoFcOINzjZ5sI0DiPXv0rPPi74CThLc4D1q5qfIG3d-WBjRg"
              referrerPolicy="no-referrer"
            />
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="absolute -bottom-8 -right-8 p-10 bg-white text-black hidden md:block border border-black/10 shadow-2xl"
          >
            <div className="text-4xl font-display font-bold leading-none">100%</div>
            <div className="text-[9px] tracking-widest uppercase font-bold mt-2 opacity-60">Code Integrity</div>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-16 metallic-text">The Architect's Edge</h2>
          <div className="space-y-16">
            {[
              { num: "01", title: "Bespoke Blueprinting", desc: "No off-the-shelf templates. We engineer every project from the first line of code to suit your specific business logic." },
              { num: "02", title: "Performance-First", desc: "Optimization isn't an afterthought. It's built into the foundation, ensuring instant response times across all nodes." },
              { num: "03", title: "Conversion Logic", desc: "Strategic layout engineering designed to reduce friction and guide users toward high-value objectives." }
            ].map((item, i) => (
              <motion.div 
                key={item.num} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex gap-10 items-start"
              >
                <span className="text-white/20 font-display text-2xl font-bold">{item.num}</span>
                <div>
                  <h4 className="font-display text-base font-bold uppercase tracking-widest mb-4 text-white">{item.title}</h4>
                  <p className="text-on-surface-variant font-light text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Portfolio() {
  return (
    <section className="py-48 bg-surface-container-lowest" id="work">
      <div className="max-w-screen-2xl mx-auto px-8 lg:px-16">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div>
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-6 metallic-text">Selected Works</h2>
            <div className="w-16 h-px bg-white/30"></div>
          </div>
          <div className="text-[10px] tracking-[0.6em] text-on-surface-variant/40 uppercase font-bold border-b border-white/10 pb-2">
            Portfolio / 02
          </div>
        </div>
        <div className="w-full py-32 border border-white/5 bg-surface flex flex-col items-center justify-center text-center">
          <Layout className="w-12 h-12 text-white/10 mb-8" />
          <h3 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-widest text-white mb-4">Portfolio Under Construction</h3>
          <p className="text-on-surface-variant font-light text-sm max-w-md mx-auto mb-12 px-6">
            Premium Projects Coming Soon. We are currently curating our latest high-performance case studies for public viewing.
          </p>
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] tracking-[0.2em] font-bold uppercase text-white/60">Currently Taking on New Projects</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pipeline() {
  const steps = [
    { num: "01 / DISCOVERY", title: "Logic Mapping", desc: "Analyzing requirements and establishing the core technical constraints." },
    { num: "02 / STRATEGY", title: "Architecture", desc: "Designing the system backbone and user interaction frameworks." },
    { num: "03 / DEVELOPMENT", title: "Execution", desc: "Transforming designs into high-performance, validated source code." },
    { num: "04 / LAUNCH", title: "Deployment", desc: "Final optimization, testing cycles, and production delivery." },
  ];

  return (
    <section className="py-48 bg-surface overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-8 lg:px-16">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl md:text-5xl font-bold tracking-tighter uppercase mb-32 text-center metallic-text"
        >
          The Deployment Pipeline
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5 overflow-hidden">
          {steps.map((step, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-16 bg-surface group border border-white/5 hover:bg-surface-container-low transition-colors duration-500"
            >
              <span className="text-[9px] font-bold tracking-[0.5em] text-white/30 block mb-12">{step.num}</span>
              <h3 className="font-display text-lg font-bold uppercase mb-6 text-white">{step.title}</h3>
              <p className="text-xs text-on-surface-variant font-light leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="py-48 bg-surface-container-lowest overflow-hidden" id="about">
      <div className="max-w-screen-2xl mx-auto px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-12 leading-[0.9] metallic-text">THE MAN BEHIND THE SCREEN</h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-white/60 text-lg mb-12 font-light italic leading-relaxed"
            >
              "Code is art, Work is worship"
            </motion.p>
            <div className="space-y-8 text-on-surface-variant leading-relaxed font-light text-sm max-w-lg">
              <p>I am Darshan, a Web Developer who is just helping businesses grow digitally.</p>
              <p>Specialization in building high performance, interactive and modern websites.</p>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative max-w-md w-full">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="absolute inset-0 border border-white/10 translate-x-10 translate-y-10 -z-10"
              ></motion.div>
              <div className="overflow-hidden border border-white/5 bg-surface-container-low">
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 1.5 }}
                  alt="Portrait" 
                  className="w-full h-[600px] object-cover grayscale brightness-75 hover:brightness-100 transition-all duration-1000" 
                  src="https://lh3.googleusercontent.com/aida/ADBb0ujTbIwzIdPmPylxz_GLCrNSJUkwoeRlZt819q_5uc5ZOjMqzBHUoLb5MakTz_EMYOBXVxlq470inq0cOZ_jjWZ-d89gErdCmTYwroQhuBz0Gapp7rq-_iiLgvd7o_SGDD50ytT8NTrB1lXf8cSLpaKGPiHUHOSIW92AzVn2kpjHsemGe1pXe-6_4TDAi-5q7lpHwSITHcmqon8DZjh3K6E98cXawayVnr_aziJ4nfPY5UJn75U-eLkJClIBW0j48LVaMlRqcmsB"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("Form submission started");
    setStatus("sending");
    
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        company: formData.get("company"),
        scope: formData.get("scope"),
        message: formData.get("message"),
      };
      console.log("Form data collected:", { ...data, message: "..." });

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      console.log("Response received:", response.status);

      if (response.ok) {
        setStatus("sent");
      } else {
        const errorData = await response.json();
        console.error("Server error:", errorData);
        alert(`Server Error: ${errorData.error || "Unknown error"}`);
        setStatus("idle");
      }
    } catch (error: any) {
      console.error("Fetch error:", error);
      alert(`Network/Connection Error: ${error.message || "Could not connect to server"}`);
      setStatus("idle");
    }
  };

  return (
    <section className="py-48 bg-surface border-t border-white/5" id="contact">
      <div className="max-w-screen-2xl mx-auto px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-32">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-16 metallic-text">Let’s<br/>CONTACT</h2>
            <div className="space-y-16 mt-32">
              <div>
                <span className="text-[9px] tracking-[0.5em] text-white/30 uppercase font-bold block mb-6">Direct Line</span>
                <a className="text-xl font-display font-bold text-white hover:opacity-60 transition-all block mb-8" href="mailto:devbydarshan@gmail.com">devbydarshan@gmail.com</a>
                
                <div className="flex gap-6 items-center">
                  <motion.a 
                    whileHover={{ scale: 1.1, color: "#fff" }} 
                    whileTap={{ scale: 0.9 }}
                    className="text-white/40 transition-colors p-2 bg-white/5 rounded-full border border-white/10" 
                    href="https://instagram.com" 
                    target="_blank"
                  >
                    <Instagram size={18} />
                  </motion.a>
                  <motion.a 
                    whileHover={{ scale: 1.1, color: "#fff" }} 
                    whileTap={{ scale: 0.9 }}
                    className="text-white/40 transition-colors p-2 bg-white/5 rounded-full border border-white/10" 
                    href="https://linkedin.com" 
                    target="_blank"
                  >
                    <Linkedin size={18} />
                  </motion.a>
                  <motion.a 
                    whileHover={{ scale: 1.1, color: "#fff" }} 
                    whileTap={{ scale: 0.9 }}
                    className="text-white/40 transition-colors p-2 bg-white/5 rounded-full border border-white/10" 
                    href="https://github.com" 
                    target="_blank"
                  >
                    <Github size={18} />
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-surface-container-lowest p-10 md:p-16 border border-white/5 relative overflow-hidden"
          >
            {status === "sent" ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-surface-container-lowest z-10 p-12 text-center"
              >
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-8">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-display text-3xl font-bold uppercase tracking-widest text-white mb-4">Transmission Received</h3>
                <p className="text-on-surface-variant font-light text-sm max-w-xs mx-auto mb-12">
                  Your inquiry has been successfully transmitted to our core systems. We will respond within 24 cycles.
                </p>
                <button 
                  onClick={() => setStatus("idle")}
                  className="text-[10px] uppercase font-bold tracking-widest text-white border-b border-white/40 pb-1 hover:border-white transition-all"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : null}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="flex flex-col gap-3">
                <label className="text-[9px] uppercase font-bold tracking-[0.3em] text-white/40">Identification</label>
                <input name="name" required className="bg-transparent border-0 border-b border-white/10 py-5 px-0 focus:ring-0 focus:border-white transition-all text-sm text-white placeholder-white/5" placeholder="Full Name" type="text"/>
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-[9px] uppercase font-bold tracking-[0.3em] text-white/40">Communication</label>
                <input name="email" required className="bg-transparent border-0 border-b border-white/10 py-5 px-0 focus:ring-0 focus:border-white transition-all text-sm text-white placeholder-white/5" placeholder="Email Address" type="email"/>
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-[9px] uppercase font-bold tracking-[0.3em] text-white/40">Entity</label>
                <input name="company" className="bg-transparent border-0 border-b border-white/10 py-5 px-0 focus:ring-0 focus:border-white transition-all text-sm text-white placeholder-white/5" placeholder="Company Name" type="text"/>
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-[9px] uppercase font-bold tracking-[0.3em] text-white/40">Scope</label>
                <select name="scope" className="bg-surface-container-low border-0 border-b border-white/10 py-5 px-0 focus:ring-0 focus:border-white transition-all text-sm text-white appearance-none">
                  <option>New Digital Ecosystem</option>
                  <option>Architecture Overhaul</option>
                  <option>SaaS Engineering</option>
                  <option>Technical Stewardship</option>
                </select>
              </div>
              <div className="md:col-span-2 flex flex-col gap-3">
                <label className="text-[9px] uppercase font-bold tracking-[0.3em] text-white/40">Project Specifications</label>
                <textarea name="message" required className="bg-transparent border-0 border-b border-white/10 py-5 px-0 focus:ring-0 focus:border-white transition-all text-sm text-white placeholder-white/5" placeholder="Define your digital objectives..." rows={5}></textarea>
              </div>
              <div className="md:col-span-2 pt-8">
                <motion.button 
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  disabled={status === "sending"}
                  className="metallic-gradient w-full py-6 font-display font-bold uppercase tracking-[0.3em] text-[11px] disabled:opacity-50 cursor-pointer" 
                  type="submit"
                >
                  {status === "sending" ? "Transmitting..." : "Transmit Inquiry"}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="w-full border-t border-white/5 pt-32 pb-16 px-8 lg:px-16 bg-[#050505]">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-24 mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-sm"
          >
            <img 
              alt="Dev By Darshan Logo" 
              className="h-10 w-auto object-contain mb-8 opacity-100" 
              src={LOGO_URL}
              referrerPolicy="no-referrer"
            />
            <p className="text-on-surface-variant font-body text-xs font-light leading-relaxed tracking-wide">
              Synthesizing design thinking with elite software engineering. Architectural precision for the digital landscape.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h5 className="text-white font-display text-[10px] font-bold uppercase tracking-[0.4em] mb-10">Systems</h5>
              <ul className="space-y-6 text-on-surface-variant/60 font-display text-[10px] tracking-[0.2em] uppercase">
                <li><a className="hover:text-white transition-all" href="#home">Initiate</a></li>
                <li><a className="hover:text-white transition-all" href="#services">Modules</a></li>
                <li><a className="hover:text-white transition-all" href="#work">Archives</a></li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h5 className="text-white font-display text-[10px] font-bold uppercase tracking-[0.4em] mb-10">Social Nodes</h5>
              <ul className="space-y-6 text-on-surface-variant/60 font-display text-[10px] tracking-[0.2em] uppercase">
                <li><a className="hover:text-white transition-all" href="https://instagram.com" target="_blank">Instagram</a></li>
                <li><a className="hover:text-white transition-all" href="https://linkedin.com" target="_blank">LinkedIn</a></li>
                <li><a className="hover:text-white transition-all" href="https://github.com" target="_blank">GitHub</a></li>
              </ul>
            </motion.div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/5 pt-12 gap-8">
          <div className="text-white/20 font-display text-[9px] tracking-[0.5em] uppercase">
            © 2026  DEV BY DARSHAN. ALL SYSTEMS NOMINAL.
          </div>
          <motion.button 
            whileHover={{ scale: 1.05, color: "#fff" }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-white/20 font-display text-[9px] tracking-[0.5em] uppercase cursor-pointer transition-colors"
          >
            Back to Command Center ↑
          </motion.button>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-surface selection:bg-white selection:text-black">
      <div className="noise-overlay"></div>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Edge />
        <Portfolio />
        <Pipeline />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
