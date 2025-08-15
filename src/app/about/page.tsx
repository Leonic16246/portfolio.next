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
        <div className="min-h-screen transition-all duration-300 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">

            {/* Hero Section */}
            <div className="container mx-auto px-6 py-16">
                <div className="transition-all duration-1000 opacity-100 translate-y-0">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight transition-colors duration-300 text-neutral-800 dark:text-white">
                            About <span className="text-blue-600">Me</span>
                        </h1>
                        
                        <div className="rounded-2xl p-8 md:p-12 shadow-2xl ring-1 ring-neutral-900/5 dark:ring-neutral-700/50 transition-all duration-300 bg-white dark:bg-neutral-800 backdrop-blur-sm">
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
                    
                    <div className="rounded-2xl p-8 shadow-2xl ring-1 ring-neutral-900/5 dark:ring-neutral-700/50 transition-all duration-300 bg-white dark:bg-neutral-800 backdrop-blur-sm">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                            {skills.map((skill, index) => (
                                <div key={index} className="p-4 rounded-lg text-center transition-all duration-300 hover:scale-105 bg-neutral-50 dark:bg-neutral-700 text-neutral-800 dark:text-white hover:bg-neutral-100 dark:hover:bg-blue-600 shadow-md hover:shadow-lg ">
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
                            <div key={index} className="rounded-xl p-6 shadow-lg ring-1 ring-neutral-900/5 dark:ring-neutral-700/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group bg-white dark:bg-neutral-800 backdrop-blur-sm">
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