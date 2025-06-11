"use client";

import React from "react";

export default function About() {
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
        <div className="min-h-screen transition-all duration-300 bg-gradient-to-br from-neutral-50 to-blue-50 dark:from-black dark:to-blue-800">

            {/* Hero Section */}
            <div className="container mx-auto px-6 py-16">
                <div className="transition-all duration-1000 opacity-100 translate-y-0">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight transition-colors duration-300 text-neutral-800 dark:text-white">
                            About <span className="text-blue-600">Me</span>
                        </h1>
                        
                        <div className="rounded-2xl p-8 md:p-12 shadow-xl border transition-all duration-300 bg-gradient-to-br from-white/90 to-neutral-50/80 backdrop-blur-sm border-white/30 dark:bg-gradient-to-br dark:from-neutral-900/95 dark:to-blue-900/90 dark:backdrop-blur-sm dark:border-neutral-700/30">
                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                {/* Content */}
                                <div className="space-y-6">
                                    <div className="relative">
                                        <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                                        <p className="text-lg leading-relaxed pl-6 transition-colors duration-300 text-neutral-700 dark:text-neutral-300">
                                            I am a <span className="font-semibold text-blue-600">software engineering student</span> seeking an internship/graduate role to further my skills, knowledge, and career.
                                        </p>
                                    </div>
                                    
                                    <p className="text-lg leading-relaxed transition-colors duration-300 text-neutral-700 dark:text-neutral-300">
                                        Versed in <span className="font-medium text-neutral-800 dark:text-white">Java, Python, and JavaScript</span>, and collaborative teamwork, I like to produce tangible solutions with immediate feedback.
                                    </p>
                                    
                                    <p className="text-lg leading-relaxed transition-colors duration-300 text-neutral-700 dark:text-neutral-300">
                                        Being open-minded and interested in many aspects of technology, from <span className="font-medium text-neutral-800 dark:text-white">penetration testing to app development</span>, I love being able to create and iterate on innovative software solutions.
                                    </p>
                                    
                                </div>
                                
                                {/* Profile Card */}
                                <div className="relative">
                                    <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-2xl dark:shadow-blue-900/50">
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
                                                Available for roles
                                            </div>
                                            <div className="flex items-center text-sm">
                                                <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                                                Up to date on tech
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
                    <h2 className="text-3xl font-bold mb-12 text-center transition-colors duration-300 text-neutral-800 dark:text-white">
                        Technical Skills
                    </h2>
                    
                    <div className="rounded-2xl p-8 shadow-xl border transition-all duration-300 bg-gradient-to-br from-white/90 to-neutral-100/80 backdrop-blur-sm border-white/30 dark:bg-gradient-to-br dark:from-neutral-900/95 dark:to-blue-900/90 dark:backdrop-blur-sm dark:border-neutral-700/30">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                            {skills.map((skill, index) => (
                                <div key={index} className="p-4 rounded-lg text-center transition-all duration-300 hover:scale-105 bg-gradient-to-br from-neutral-50 to-neutral-100 text-neutral-800 hover:from-neutral-100 hover:to-neutral-200 shadow-md hover:shadow-lg dark:bg-gradient-to-br dark:from-neutral-800 dark:to-blue-800 dark:text-white dark:hover:from-neutral-700 dark:hover:to-blue-700 dark:shadow-neutral-900/50">
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
                    <h2 className="text-3xl font-bold mb-12 text-center transition-colors duration-300 text-neutral-800 dark:text-white">
                        Areas of Interest
                    </h2>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {interests.map((interest, index) => (
                            <div key={index} className="rounded-xl p-6 shadow-lg border hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group bg-gradient-to-br from-white/90 to-neutral-50/80 backdrop-blur-sm border-white/30 hover:from-white/95 hover:to-neutral-100/85 dark:bg-gradient-to-br dark:from-neutral-900/95 dark:to-blue-900/90 dark:backdrop-blur-sm dark:border-neutral-700/30 dark:hover:from-neutral-800/95 dark:hover:to-blue-800/90 dark:shadow-neutral-900/50">
                                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                    {interest.icon}
                                </div>
                                <h3 className="font-semibold mb-2 transition-colors duration-300 text-neutral-800 dark:text-white">
                                    {interest.title}
                                </h3>
                                <p className="text-sm transition-colors duration-300 text-neutral-600 dark:text-neutral-400">
                                    {interest.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}