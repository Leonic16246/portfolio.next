"use client";

import React, { useEffect, useState } from "react";

export default function About() {
    const [letterClass, setLetterClass] = useState('text-animate');
    const [isVisible, setIsVisible] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        // Check for system preference on mount
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setDarkMode(mediaQuery.matches);

        // Listen for changes in system preference
        const handleChange = (e: { matches: boolean | ((prevState: boolean) => boolean); }) => setDarkMode(e.matches);
        mediaQuery.addEventListener('change', handleChange);

        setTimeout(() => {
            setLetterClass('text-animate-hover');
        }, 2000);
        
        setTimeout(() => {
            setIsVisible(true);
        }, 500);

        // Cleanup listener
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const skills = [
        { name: "Java" },
        { name: "Python" },
        { name: "JavaScript" }
    ];

    const interests = [
        { icon: "🔒", title: "Penetration Testing", desc: "Security assessment and vulnerability analysis" },
        { icon: "📱", title: "App Development", desc: "Mobile and web applications" },
        { icon: "🌐", title: "Web Technologies", desc: "Modern frameworks and full-stack development" },
        { icon: "🔧", title: "Software Solutions", desc: "Impactful tools and systems" }
    ];

    return (
        <div className={`min-h-screen transition-all duration-300 ${darkMode ? 'bg-gradient-to-br from-slate-900 to-slate-800' : 'bg-gradient-to-br from-slate-50 to-blue-50'}`}>

            {/* Hero Section */}
            <div className="container mx-auto px-6 py-16">
                <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="max-w-4xl mx-auto">
                        <h1 className={`text-5xl md:text-6xl font-bold mb-6 leading-tight transition-colors duration-300 ${
                            darkMode ? 'text-white' : 'text-slate-800'
                        }`}>
                            About <span className="text-blue-600">Me</span>
                        </h1>
                        
                        <div className={`rounded-2xl p-8 md:p-12 shadow-xl border transition-all duration-300 ${
                            darkMode 
                                ? 'bg-slate-800/70 backdrop-blur-sm border-slate-700/50' 
                                : 'bg-white/70 backdrop-blur-sm border-white/20'
                        }`}>
                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                {/* Content */}
                                <div className="space-y-6">
                                    <div className="relative">
                                        <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                                        <p className={`text-lg leading-relaxed pl-6 transition-colors duration-300 ${
                                            darkMode ? 'text-slate-300' : 'text-slate-700'
                                        }`}>
                                            I am a <span className="font-semibold text-blue-600">software engineering student</span> seeking an internship to further my skills, knowledge, and career.
                                        </p>
                                    </div>
                                    
                                    <p className={`text-lg leading-relaxed transition-colors duration-300 ${
                                        darkMode ? 'text-slate-300' : 'text-slate-700'
                                    }`}>
                                        Versed in <span className={`font-medium ${darkMode ? 'text-white' : 'text-slate-800'}`}>Java, Python, JavaScript, SQL</span>, and collaborative teamwork, I like to produce tangible solutions with immediate feedback.
                                    </p>
                                    
                                    <p className={`text-lg leading-relaxed transition-colors duration-300 ${
                                        darkMode ? 'text-slate-300' : 'text-slate-700'
                                    }`}>
                                        Being open-minded to many aspects of technology, from <span className={`font-medium ${darkMode ? 'text-white' : 'text-slate-800'}`}>penetration testing to app development</span>, I am eager to contribute to innovative software solutions.
                                    </p>
                                    
                                </div>
                                
                                {/* Profile Card */}
                                <div className="relative">
                                    <div className={`bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-2xl ${
                                        darkMode ? 'shadow-slate-900/50' : ''
                                    }`}>
                                        <div className="text-center mb-6">
                                            <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">
                                                👨‍💻
                                            </div>
                                            <h3 className="text-xl font-semibold">Software Engineering Student</h3>
                                            <p className="text-blue-100">Seeking Internship Opportunities</p>
                                        </div>
                                        
                                        <div className="space-y-3">
                                            <div className="flex items-center text-sm">
                                                <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                                                Available for internships
                                            </div>
                                            <div className="flex items-center text-sm">
                                                <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                                                Open to remote opportunities
                                            </div>
                                            <div className="flex items-center text-sm">
                                                <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                                                Passionate about learning
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Skills Section */}
            <div className="container mx-auto px-6 py-16">
                <div className="max-w-4xl mx-auto">
                    <h2 className={`text-3xl font-bold mb-12 text-center transition-colors duration-300 ${
                        darkMode ? 'text-white' : 'text-slate-800'
                    }`}>Technical Skills</h2>
                    
                    <div className={`rounded-2xl p-8 shadow-xl border transition-all duration-300 ${
                        darkMode 
                            ? 'bg-slate-800/70 backdrop-blur-sm border-slate-700/50' 
                            : 'bg-white/70 backdrop-blur-sm border-white/20'
                    }`}>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                            {skills.map((skill, index) => (
                                <div key={index} className={`p-4 rounded-lg text-center transition-all duration-300 hover:scale-105 ${
                                    darkMode 
                                        ? 'bg-slate-700/50 text-white hover:bg-slate-600/50' 
                                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                }`}>
                                    <span className="font-medium">{skill.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Interests Section */}
            <div className="container mx-auto px-6 py-16">
                <div className="max-w-6xl mx-auto">
                    <h2 className={`text-3xl font-bold mb-12 text-center transition-colors duration-300 ${
                        darkMode ? 'text-white' : 'text-slate-800'
                    }`}>Areas of Interest</h2>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {interests.map((interest, index) => (
                            <div key={index} className={`rounded-xl p-6 shadow-lg border hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group ${
                                darkMode 
                                    ? 'bg-slate-800/70 backdrop-blur-sm border-slate-700/50 hover:bg-slate-700/70' 
                                    : 'bg-white/70 backdrop-blur-sm border-white/20 hover:bg-white/80'
                            }`}>
                                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                    {interest.icon}
                                </div>
                                <h3 className={`font-semibold mb-2 transition-colors duration-300 ${
                                    darkMode ? 'text-white' : 'text-slate-800'
                                }`}>{interest.title}</h3>
                                <p className={`text-sm transition-colors duration-300 ${
                                    darkMode ? 'text-slate-400' : 'text-slate-600'
                                }`}>{interest.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}