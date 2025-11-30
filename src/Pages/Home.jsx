import React, { useState, useEffect, useCallback, memo } from "react"
import { Github, Linkedin, Mail, ExternalLink, Instagram, Sparkles } from "lucide-react"
import AOS from 'aos'
import 'aos/dist/aos.css'

// Memoized Components
const StatusBadge = memo(() => (
  <div className="inline-block animate-float" data-aos="zoom-in" data-aos-delay="400">
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#F4EEE0] to-[#6D5D6E] rounded-full blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
      <div className="relative bg-black/10 backdrop-blur-xl border border-white/10 rounded-full px-4 py-1.5">
        <span className="bg-gradient-to-r from-[#F4EEE0] to-[#6D5D6E] text-transparent bg-clip-text sm:text-sm text-[0.7rem] font-medium">
          Ready to Innovate
        </span>
      </div>
    </div>
  </div>
));

const MainTitle = memo(() => (
  <div className="space-y-2 text-center" data-aos="fade-up" data-aos-delay="600">
    <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
      <span className="relative inline-block">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#F4EEE0] to-[#6D5D6E] blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
          Backend
        </span>
      </span>
      <br />
      <span className="relative inline-block mt-2">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#F4EEE0] to-[#6D5D6E] blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r from-[#F4EEE0] to-[#6D5D6E] bg-clip-text text-transparent">
          Developer
        </span>
      </span>
    </h1>
  </div>
));

const TechStack = memo(({ tech }) => (
  <div className="px-4 py-2 hidden sm:block rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-gray-300 hover:bg-white/10 transition-colors">
    {tech}
  </div>
));

const CTAButton = memo(({ href, text, icon: Icon }) => {
  const scrollToSection = (e, href) => {
    e.preventDefault();
    const section = document.querySelector(href);
    if (section) {
      const top = section.offsetTop - 100;
      window.scrollTo({
        top: top,
        behavior: "smooth"
      });
    }
  };

  return (
    <a href={href} onClick={(e) => scrollToSection(e, href)}>
      <button className="group relative w-[160px]">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4f52c9] to-[#8644c5] rounded-xl opacity-50 blur-md group-hover:opacity-90 transition-all duration-700"></div>
        <div className="relative h-11 bg-[#03001C] backdrop-blur-xl rounded-lg border border-white/10 leading-none overflow-hidden">
          <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-[#4f52c9]/20 to-[#8644c5]/20"></div>
          <span className="absolute inset-0 flex items-center justify-center gap-2 text-sm group-hover:gap-3 transition-all duration-300">
            <span className="bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent font-medium z-10">
              {text}
            </span>
            <Icon className={`w-4 h-4 text-gray-200 ${text === 'Contact' ? 'group-hover:translate-x-1' : 'group-hover:rotate-45'} transform transition-all duration-300 z-10`} />
          </span>
        </div>
      </button>
    </a>
  );
});

const SocialLink = memo(({ icon: Icon, link }) => (
  <a href={link} target="_blank" rel="noopener noreferrer">
    <button className="group relative p-3">
      <div className="absolute inset-0 bg-gradient-to-r from-[#F4EEE0] to-[#6D5D6E] rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
      <div className="relative rounded-xl bg-black/50 backdrop-blur-xl p-2 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all duration-300">
        <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
      </div>
    </button>
  </a>
));

// Constants
const TYPING_SPEED = 100;
const ERASING_SPEED = 50;
const PAUSE_DURATION = 2000;
const WORDS = ["Software Engineering Student", "Tech Enthusiast"];
const TECH_STACK = ["Laravel", "PHP", "Golang", "MySQL", "PostgreSQL"];
const SOCIAL_LINKS = [
  { icon: Github, link: "https://github.com/rfqrenaldo" },
  { icon: Linkedin, link: "https://www.linkedin.com/in/rifqirenaldo/" },
  { icon: Instagram, link: "https://www.instagram.com/r.aldo__/?hl=id" }
];

const Home = () => {
  const [text, setText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  // Optimize AOS initialization
  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        once: true,
        offset: 10,
      });
    };

    initAOS();
    window.addEventListener('resize', initAOS);
    return () => window.removeEventListener('resize', initAOS);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    return () => setIsLoaded(false);
  }, []);

  // Optimize typing effect
  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText(prev => prev + WORDS[wordIndex][charIndex]);
        setCharIndex(prev => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setText(prev => prev.slice(0, -1));
        setCharIndex(prev => prev - 1);
      } else {
        setWordIndex(prev => (prev + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const timeout = setTimeout(
      handleTyping,
      isTyping ? TYPING_SPEED : ERASING_SPEED
    );
    return () => clearTimeout(timeout);
  }, [handleTyping]);

  return (
    <div className="min-h-screen bg-[#03001C] overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%] flex justify-center items-center" id="Home">
      <div className={`relative z-10 transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        <div className="container mx-auto min-h-[80vh] flex items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-8 lg:gap-12 w-full">
            
            {/* Main Content */}
            <div className="w-full space-y-6 sm:space-y-8 text-center flex flex-col items-center justify-center"
              data-aos="fade-up"
              data-aos-delay="200">
              
              <div className="space-y-4 sm:space-y-6 flex flex-col items-center">
                <StatusBadge />
                <MainTitle />

                {/* Typing Effect */}
                <div className="h-8 flex items-center justify-center" data-aos="fade-up" data-aos-delay="800">
                  <span className="text-xl md:text-2xl bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent font-light">
                    {text}
                  </span>
                  <span className="w-[3px] h-6 bg-gradient-to-t from-[#F4EEE0] to-[#6D5D6E] ml-1 animate-blink"></span>
                </div>

                {/* Description */}
                <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed font-light"
                  data-aos="fade-up"
                  data-aos-delay="1000">
                  Developing Secure, Scalable, and High-Performance Back-End Architectures for Digital Innovation
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-3 justify-center" data-aos="fade-up" data-aos-delay="1200">
                  {TECH_STACK.map((tech, index) => (
                    <TechStack key={index} tech={tech} />
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-row gap-3 w-full justify-center" data-aos="fade-up" data-aos-delay="1400">
                  <CTAButton href="#Portofolio" text="Projects" icon={ExternalLink} />
                  <CTAButton href="#contact" text="Contact" icon={Mail} />
                </div>

                {/* Social Links */}
                <div className="hidden sm:flex gap-4 justify-center" data-aos="fade-up" data-aos-delay="1600">
                  {SOCIAL_LINKS.map((social, index) => (
                    <SocialLink key={index} {...social} />
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Home);