
import React, { useState, useEffect, useRef } from 'react';
// FIX: Import Variants type from framer-motion to correctly type animation variants.
import { motion, useAnimation, useInView, useScroll, useTransform, useSpring, Variants } from 'framer-motion';
import { 
    ReactIcon, NodeIcon, MongoIcon, GithubIcon, LinkedinIcon, EmailIcon, AwsIcon, GcpIcon, 
    FirebaseIcon, MySqlIcon, HtmlIcon, CssIcon, TailwindIcon, MaterialUiIcon, ExpressIcon, 
    JwtIcon, OciIcon, GithubActionsIcon, PythonIcon, TypescriptIcon, CppIcon, AiMlIcon, 
    OwaspIcon, ShinchanCursorIcon, WavingShinchan, LaptopShinchan, ReadingShinchan, 
    WalkingShinchan, CloudDoodle, StarDoodle, ExternalLinkIcon 
} from './components/icons';

// --- DATA DEFINITIONS ---
const navLinks = ["About", "Skills", "Projects", "Experience", "Contact"];

const skillsData = {
    "Frontend": [
        { name: "React", icon: <ReactIcon className="h-8 w-8" /> },
        { name: "TailwindCSS", icon: <TailwindIcon className="h-8 w-8" /> },
        { name: "Material UI", icon: <MaterialUiIcon className="h-8 w-8" /> },
        { name: "HTML", icon: <HtmlIcon className="h-8 w-8" /> },
        { name: "CSS", icon: <CssIcon className="h-8 w-8" /> },
    ],
    "Backend": [
        { name: "Node.js", icon: <NodeIcon className="h-8 w-8" /> },
        { name: "Express.js", icon: <ExpressIcon className="h-8 w-8" /> },
        { name: "REST APIs", icon: <ReactIcon className="h-8 w-8" /> },
        { name: "JWT Auth", icon: <JwtIcon className="h-8 w-8" /> },
    ],
    "Databases": [
        { name: "MongoDB", icon: <MongoIcon className="h-8 w-8" /> },
        { name: "MySQL", icon: <MySqlIcon className="h-8 w-8" /> },
        { name: "Firebase", icon: <FirebaseIcon className="h-8 w-8" /> },
    ],
    "DevOps/Cloud": [
        { name: "AWS", icon: <AwsIcon className="h-8 w-8" /> },
        { name: "GCP", icon: <GcpIcon className="h-8 w-8" /> },
        { name: "OCI", icon: <OciIcon className="h-8 w-8" /> },
        { name: "GitHub Actions", icon: <GithubActionsIcon className="h-8 w-8" /> },
        { name: "CI/CD", icon: <GithubActionsIcon className="h-8 w-8" /> },
    ],
    "Other": [
        { name: "Python", icon: <PythonIcon className="h-8 w-8" /> },
        { name: "TypeScript", icon: <TypescriptIcon className="h-8 w-8" /> },
        { name: "C++", icon: <CppIcon className="h-8 w-8" /> },
        { name: "AI/ML", icon: <AiMlIcon className="h-8 w-8" /> },
        { name: "OWASP Security", icon: <OwaspIcon className="h-8 w-8" /> },
    ]
};

const projectsData = [
    {
        name: "College Infrastructure Management System (CIMS)",
        description: "Role-based dashboards, lab equipment management, fault reporting, notifications; optimized REST APIs (+40% efficiency).",
        stack: ["MERN"],
        codeUrl: "https://github.com/Nitish-1303/Batch-24-College-Infrastructure-Management-system-",
        liveUrl: "#"
    },
    {
        name: "E-Commerce Platform",
        description: "Scalable platform with secure payments; reduced latency by 25%.",
        stack: ["MERN"],
        codeUrl: "https://github.com/Nitish-1303/pulse-shop-plus",
        liveUrl: "#"
    },
    {
        name: "Portfolio Website",
        description: "Responsive site with CI/CD via Vercel; load speed improved by 35%.",
        stack: ["React", "Tailwind"],
        codeUrl: "https://github.com/Nitish-1303/pulse-shop-plus",
        liveUrl: "#"
    },
    {
        name: "Note-AI",  
        description: "AI-powered smart note-taking app — built to help you write, summarize, and organize notes efficiently using artificial intelligence.",
        stack: ["Node.js", "Socket.io", "MongoDB"],
        codeUrl: "https://github.com/Nitish-1303/note-ai",
        liveUrl: "#"
    }
];

const experienceData = [
    {
        role: "Contributor",
        company: "Open Source Connect",
        date: "Jul 2025 – Present",
        description: "Improved code efficiency by 35%, implemented CI/CD workflows."
    },
    {
        role: "Full Stack Developer Intern",
        company: "SmartInternz",
        date: "May–Jul 2024",
        description: "Built CIMS with role-based dashboards and MongoDB optimizations."
    },
    {
        role: "Cyber Security Analyst",
        company: "EduSkills Foundation",
        date: "Jun–Jul 2023",
        description: "Performed penetration testing, implemented RBAC and audit logging."
    }
];

const socialLinks = {
    github: "https://github.com/Nitish-1303",
    linkedin: "https://www.linkedin.com/in/yeluru-nitish",
    email: "mailto:yelurunitish0060@gmail.com"
};

const resumeLink = "https://drive.google.com/file/d/1EvmWJZ8AfKVh4--Q3J2nzPzRrcHkT9xe/view?usp=sharing"; 
// Replace this with your actual resume URL

// --- ANIMATION VARIANTS ---
// FIX: Explicitly type sectionVariants with Variants to fix type incompatibility issues with framer-motion.
const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const cardContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

// --- HELPER & UI COMPONENTS ---
const AnimatedDoodles = () => {
    const doodles = [
        { component: <CloudDoodle />, className: "top-[10%] left-[10%] w-24 h-24" },
        { component: <StarDoodle />, className: "top-[20%] right-[15%] w-12 h-12" },
        { component: <CloudDoodle />, className: "top-[60%] right-[10%] w-20 h-20" },
        { component: <StarDoodle />, className: "top-[70%] left-[5%] w-16 h-16" },
        { component: <CloudDoodle />, className: "bottom-[5%] left-[25%] w-16 h-16" },
    ];

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden -z-10">
            {doodles.map((doodle, index) => (
                <motion.div
                    key={index}
                    className={`absolute ${doodle.className}`}
                    animate={{
                        y: [0, -10, 0, 10, 0],
                        x: [0, 5, 0, -5, 0],
                        rotate: [0, 2, -2, 2, 0],
                    }}
                    transition={{
                        duration: Math.random() * 5 + 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    {doodle.component}
                </motion.div>
            ))}
        </div>
    );
};


const CustomCursor = () => {
    const [isPointer, setIsPointer] = useState(false);
    const cursorSpring = {
        type: "spring",
        stiffness: 500,
        damping: 28
    };

    const cursorX = useSpring(0, cursorSpring);
    const cursorY = useSpring(0, cursorSpring);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 20);
            cursorY.set(e.clientY - 20);
        };
        
        const handleMouseDown = () => {
            setIsPointer(true);
        };
        const handleMouseUp = () => {
            setIsPointer(false);
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        
        document.addEventListener('mouseenter', () => {
            const cursor = document.querySelector('.shinchan-cursor');
            cursor?.classList.remove('hidden');
        });
        document.addEventListener('mouseleave', () => {
            const cursor = document.querySelector('.shinchan-cursor');
            cursor?.classList.add('hidden');
        });

        // Add pointer class on hoverable elements
        const hoverables = document.querySelectorAll('a, button, input[type="submit"]');
        hoverables.forEach(el => {
            el.addEventListener('mouseenter', () => setIsPointer(true));
            el.addEventListener('mouseleave', () => setIsPointer(false));
        });

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            hoverables.forEach(el => {
                el.removeEventListener('mouseenter', () => setIsPointer(true));
                el.removeEventListener('mouseleave', () => setIsPointer(false));
            });
        };
    }, [cursorX, cursorY]);

    return (
        <motion.div
            className={`shinchan-cursor hidden md:flex ${isPointer ? 'shinchan-cursor-pointer' : ''}`}
            style={{ translateX: cursorX, translateY: cursorY }}
        >
            <ShinchanCursorIcon />
        </motion.div>
    );
};

const Section: React.FC<{id: string; children: React.ReactNode; className?: string}> = ({ id, children, className = '' }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <motion.section
            id={id}
            ref={ref}
            className={`py-20 md:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden ${className}`}
            variants={sectionVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            <div className="max-w-7xl mx-auto">
                {children}
            </div>
        </motion.section>
    );
};

const SectionTitle: React.FC<{children: React.ReactNode}> = ({ children }) => (
    <h2 className="text-4xl md:text-5xl font-baloo text-center mb-12 text-gray-900">{children}</h2>
);

// FIX: Add 'type' prop to allow this component to be used as a submit button in forms.
const Button: React.FC<{children: React.ReactNode, href?: string, onClick?: () => void, primary?: boolean, className?: string, type?: 'submit' | 'reset' | 'button'}> = 
({ children, href, onClick, primary = false, className = '', type }) => {
    const baseClasses = "font-bold py-3 px-6 rounded-full inline-flex items-center justify-center transition-all duration-300 shadow-lg focus:outline-none focus:ring-4";
    const primaryClasses = "bg-shinchan-red text-white hover:bg-red-700 focus:ring-red-300";
    const secondaryClasses = "bg-shinchan-yellow text-gray-900 hover:bg-yellow-400 focus:ring-yellow-200";

    const motionProps = {
        whileHover: { scale: 1.05, y: -2 },
        whileTap: { scale: 0.95 },
        // FIX: Use 'as const' to assert a literal type for 'type', satisfying framer-motion's Transition type.
        transition: { type: "spring" as const, stiffness: 400, damping: 17 }
    };
    
    if (href) {
        const isDownload = href.includes("resume.pdf");
        return (
            <motion.a 
                href={href} 
                {...(isDownload ? { download: "Yeluru_Nitish_Resume.pdf" } : { target: "_blank", rel: "noopener noreferrer" })}
                className={`${baseClasses} ${primary ? primaryClasses : secondaryClasses} ${className}`}
                {...motionProps}
            >
                {children}
            </motion.a>
        );
    }

    return (
        <motion.button 
            onClick={onClick} 
            type={type}
            className={`${baseClasses} ${primary ? primaryClasses : secondaryClasses} ${className}`}
            {...motionProps}
        >
            {children}
        </motion.button>
    );
};


// --- SECTION COMPONENTS ---

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    
    const scrollToSection = (id: string) => {
        document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-shinchan-cream/80 backdrop-blur-sm shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <a href="#" className="font-baloo text-2xl text-shinchan-red">Welcome To My Portfolio.</a>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navLinks.map(link => (
                                <button key={link} onClick={() => scrollToSection(link)} className="text-gray-800 hover:text-shinchan-red px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                    {link}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-shinchan-red focus:outline-none">
                            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map(link => (
                            <button key={link} onClick={() => scrollToSection(link)} className="text-gray-800 hover:text-shinchan-red block px-3 py-2 rounded-md text-base font-medium w-full text-left">
                                {link}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
};


const Hero = () => {
    const scrollToProjects = () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    };
    return (
        <section id="home" className="min-h-screen flex items-center justify-center pt-16">
            <div className="text-center max-w-4xl mx-auto px-4">
                <motion.div 
                    className="relative inline-block mb-8"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
                >
                    <WavingShinchan className="h-48 w-48 md:h-64 md:w-64" />
                </motion.div>
                <motion.h1 
                    className="text-3xl md:text-5xl lg:text-6xl font-baloo text-gray-900"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    Hi, I’m Yeluru Nitish <span className="inline-block animate-wave">👋</span>
                </motion.h1>
                <motion.p 
                    className="mt-4 text-lg md:text-xl text-gray-700"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                >
                    Full Stack Developer (MERN) & Aspiring Product Manager.
                </motion.p>
                <motion.div 
                    className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                >
                    <Button onClick={scrollToProjects} primary>View Projects</Button>
                   <Button href={resumeLink}>View Resume</Button>

                </motion.div>
            </div>
        </section>
    );
};

const About = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    return (
        <Section id="about" className="bg-shinchan-blue/10">
            <div ref={ref} className="grid md:grid-cols-3 gap-10 items-center">
                <motion.div 
                  className="md:col-span-1 flex justify-center"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.7 }}
                >
                    <div className="relative">
                        <LaptopShinchan className="w-64 h-64" />
                        <motion.div className="absolute -bottom-4 -right-4" style={{ x }}>
                            <StarDoodle className="w-16 h-16 text-shinchan-yellow" />
                        </motion.div>
                    </div>
                </motion.div>
                <motion.div 
                  className="md:col-span-2"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                    <SectionTitle>About Me</SectionTitle>
                    <p className="text-center md:text-left text-lg text-gray-700 leading-relaxed">
                        Full Stack Engineer skilled in scalable MERN applications, CI/CD, and cloud integration (AWS, GCP, OCI). Passionate about building modern, user-focused products with measurable impact.
                    </p>
                </motion.div>
            </div>
        </Section>
    );
};

const SkillCard = ({ name, icon }: { name: string, icon: React.ReactNode }) => (
    <motion.div
        className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg flex flex-col items-center justify-center gap-2 border-2 border-transparent hover:border-shinchan-red"
        variants={cardVariants}
        whileHover={{ y: -10, scale: 1.05, boxShadow: "0px 15px 30px -10px rgba(0,0,0,0.2)" }}
        transition={{ type: "spring", stiffness: 300 }}
    >
        {icon}
        <span className="font-semibold text-gray-800 text-center">{name}</span>
    </motion.div>
);

const Skills = () => {
    return (
        <Section id="skills" className="relative">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iI2ZmZjhlMSI+PC9yZWN0Pgo8Y2lyY2xlIGN4PSIxMCIgY3k9IjEwIiByPSIzIiBmaWxsPSJyZ2JhKDAsMCwwLDAuMDUpIj48L2NpcmNsZT4KPC9zdmc+')] opacity-50"></div>
            <SectionTitle>My Superpowers (Skills)</SectionTitle>
            <div className="space-y-12">
                {Object.entries(skillsData).map(([category, skills]) => (
                    <div key={category}>
                        <h3 className="text-2xl font-baloo text-center mb-6">{category}</h3>
                        <motion.div 
                            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
                            variants={cardContainerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            {skills.map(skill => <SkillCard key={skill.name} {...skill} />)}
                        </motion.div>
                    </div>
                ))}
            </div>
        </Section>
    );
};

const ProjectCard = ({ name, description, stack, codeUrl, liveUrl }: typeof projectsData[0]) => (
    <motion.div
        className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col h-full border-4 border-black"
        variants={cardVariants}
        whileHover={{ y: -10, boxShadow: "0px 20px 40px -15px rgba(0,0,0,0.3)" }}
    >
        <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-baloo mb-2">{name}</h3>
            <p className="text-gray-600 mb-4 flex-grow">{description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
                {stack.map(tech => (
                    <span key={tech} className="bg-shinchan-yellow text-gray-900 text-xs font-bold px-2 py-1 rounded-full">{tech}</span>
                ))}
            </div>
        </div>
        <div className="bg-gray-100 p-4 flex justify-between items-center border-t-4 border-black">
            <a href={codeUrl} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-shinchan-red font-semibold flex items-center gap-1">
                <GithubIcon className="h-5 w-5" /> View Code
            </a>
            <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-shinchan-red font-semibold flex items-center gap-1">
                <ExternalLinkIcon className="h-5 w-5" /> Live Demo
            </a>
        </div>
    </motion.div>
);

const Projects = () => {
    return (
        <Section id="projects" className="bg-shinchan-red/10">
            <SectionTitle>My Awesome Creations</SectionTitle>
            <motion.div 
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={cardContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
            >
                {projectsData.map(project => <ProjectCard key={project.name} {...project} />)}
            </motion.div>
        </Section>
    );
};

const TimelineItem = ({ role, company, date, description, isLast }: typeof experienceData[0] & { isLast: boolean }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <div ref={ref} className="flex gap-x-3">
            <div className="relative">
                {!isLast && <div className="absolute left-1/2 top-5 -ml-[1px] w-0.5 h-full bg-shinchan-blue"></div>}
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-shinchan-yellow">
                    <StarDoodle className="w-6 h-6 text-gray-800" />
                </div>
            </div>
            <motion.div
                className="bg-white/70 backdrop-blur-sm p-4 rounded-xl shadow-md w-full mb-8"
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
            >
                <p className="text-sm text-gray-500">{date}</p>
                <h3 className="font-baloo text-lg">{role} at {company}</h3>
                <p className="mt-1 text-gray-600">{description}</p>
            </motion.div>
        </div>
    );
};

const Experience = () => {
    return (
        <Section id="experience">
            <SectionTitle>My Adventures (Experience)</SectionTitle>
            <div className="max-w-3xl mx-auto">
                {experienceData.map((item, index) => (
                    <TimelineItem key={index} {...item} isLast={index === experienceData.length - 1} />
                ))}
            </div>
        </Section>
    );
};

const Education = () => {
    return (
        <Section id="education" className="bg-shinchan-blue/10">
            <div className="text-center">
                <SectionTitle>Where I Learned My Spells</SectionTitle>
                <div className="flex justify-center mb-6">
                    <ReadingShinchan className="w-32 h-32" />
                </div>
                <p className="text-xl font-semibold">B.Tech in Computer Science Engineering (CSE)</p>
                <p className="text-lg text-gray-700">BITS Visakhapatnam (2021–2025)</p>
            </div>
        </Section>
    );
};

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send the form data to a backend or service
        alert(`Thanks ${formData.name}! Your message has been "sent" (not really, this is a demo).`);
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <Section id="contact">
            <div className="text-center">
                <h2 className="text-4xl md:text-5xl font-baloo text-center mb-4 text-gray-900">Let’s Code, Not Cry 😄</h2>
                <p className="text-lg text-gray-600 mb-12">Have a project, a question, or just want to say hi? Go for it!</p>
            </div>
            <div className="max-w-2xl mx-auto bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg border-2 border-gray-200">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-shinchan-red focus:border-shinchan-red" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-shinchan-red focus:border-shinchan-red" />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                        <textarea name="message" id="message" rows={4} required value={formData.message} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-shinchan-red focus:border-shinchan-red"></textarea>
                    </div>
                    <div>
                        <Button primary type="submit" className="w-full">Send Message!</Button>
                    </div>
                </form>
            </div>
            <div className="mt-12 flex justify-center items-center gap-6">
                <motion.a href={socialLinks.github} target="_blank" rel="noopener noreferrer" whileHover={{scale: 1.2, rotate: 5}}><GithubIcon className="h-8 w-8 text-gray-700 hover:text-shinchan-red" /></motion.a>
                <motion.a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" whileHover={{scale: 1.2, rotate: 5}}><LinkedinIcon className="h-8 w-8 text-gray-700 hover:text-shinchan-red" /></motion.a>
                <motion.a href={socialLinks.email} whileHover={{scale: 1.2, rotate: -5}}><EmailIcon className="h-8 w-8 text-gray-700 hover:text-shinchan-red" /></motion.a>
            </div>
        </Section>
    );
};


const Footer = () => {
    return (
        <footer className="py-12 bg-gray-800 text-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p className="font-baloo text-xl italic mb-4">“I’m not lazy, I’m just saving my energy for coding!”</p>
                <p className="text-sm">&copy; {new Date().getFullYear()} Yeluru Nitish. All rights reserved.</p>
            </div>
            <motion.div 
                className="absolute bottom-0 left-0"
                animate={{ x: ["-100%", "110%"] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            >
                <WalkingShinchan className="h-24 w-24" />
            </motion.div>
        </footer>
    );
};

// --- MAIN APP COMPONENT ---
const App: React.FC = () => {
    return (
        <div className="relative">
            <CustomCursor />
            <AnimatedDoodles />
            <Header />
            <main>
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Experience />
                <Education />
                <Contact />
            </main>
            <Footer />
        </div>
    );
};

export default App;
