"use client";

import React from "react";

export default function About() {
  const experience = [
    {
      role: "Assembly Technician",
      company: "PB Tech",
      period: "Jan 2025 – Present",
      desc: "Disassembly, diagnosing, erasing, testing, building, and setup/enrollment of OS and devices for customers and clients.",
    },
  ];

  const education = [
    {
      degree: "Bachelor of Engineering (Honours)",
      field: "Software Engineering",
      school: "Auckland University of Technology",
      desc: "OOP, SQL, Data Structures & Algorithms, Software Construction, Linux, Agile Scrum, Cryptography, Full Stack development, Software Architecture, CCNA, Machine Learning.",
    },
  ];

  return (
    <div className="min-h-screen bg-black p-6 space-y-6">

      {/* Hero */}
      <div className="relative bg-neutral-950 rounded-2xl px-10 py-14 ring-1 ring-white/10 shadow-2xl overflow-hidden">
        <span className="absolute top-5 left-5 w-5 h-5 border-t border-l border-white/20" />
        <span className="absolute top-5 right-5 w-5 h-5 border-t border-r border-white/20" />
        <span className="absolute bottom-5 left-5 w-5 h-5 border-b border-l border-white/20" />
        <span className="absolute bottom-5 right-5 w-5 h-5 border-b border-r border-white/20" />

        <h1 className="text-7xl tracking-tight text-white/90 leading-none">About</h1>
        <h2 className="mt-1 text-7xl font-bold tracking-tight text-white/90 leading-none">Me.</h2>
        <p className="mt-5 font-geist-mono text-sm tracking-[0.2em] uppercase text-white/40">
          Software Engineering
        </p>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/60">
          I&apos;m a software engineering student seeking a full-time software development role to gain real-world experience and advance my career. Highly motivated to learn, passionate about problem solving, and able to keep up with industry tech.
        </p>
      </div>

      {/* Skills */}
      <div className="relative bg-neutral-950 rounded-2xl px-10 py-10 ring-1 ring-white/10 shadow-2xl overflow-hidden">
        <span className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/20" />
        <span className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/20" />
        <span className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/20" />
        <span className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/20" />

        <div className="space-y-6">
          {[
            { label: 'Languages', skills: ['Java', 'Python', 'C#', 'JavaScript', 'HTML', 'CSS', 'SQL', 'PHP', 'Rust'] },
            { label: 'Frameworks', skills: ['Next.js', 'React', 'ASP.NET Core', 'Tailwind CSS', 'Symfony'] },
            { label: 'Technologies', skills: ['Git', 'Linux', 'Agile / Scrum', 'REST APIs', 'Node.js', 'Docker'] },
            { label: 'Certifications', skills: ['ISC2 Certified in Cybersecurity (CC)'] },
          ].map((group) => (
            <div key={group.label} className="flex flex-col gap-2.5">
              <span className="font-geist-mono text-xs tracking-widest uppercase text-white/90">{group.label}</span>
              <div className="flex flex-wrap gap-2.5">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-1.5 rounded-lg border border-white/10 bg-white/5 font-geist-mono text-sm text-white/75 hover:text-white/90 hover:border-white/20 hover:bg-white/10 transition-colors duration-150"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience + Education */}
      <div className="grid grid-cols-2 gap-6">

        {/* Experience */}
        <div className="relative bg-neutral-950 rounded-2xl px-8 py-10 ring-1 ring-white/10 shadow-2xl overflow-hidden">
          <span className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/20" />
          <span className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/20" />
          <span className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/20" />
          <span className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/20" />

          <span className="font-geist-mono text-[10px] tracking-widest uppercase text-white/25">Experience</span>
          <div className="mt-6 space-y-6">
            {experience.map((e) => (
              <div key={e.role} className="border-l border-white/10 pl-5">
                <p className="text-white/90 font-semibold">{e.role}</p>
                <p className="font-geist-mono text-xs tracking-widest uppercase text-white/40 mt-0.5">{e.company} — {e.period}</p>
                <p className="mt-2 text-sm text-white/50 leading-relaxed">{e.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="relative bg-neutral-950 rounded-2xl px-8 py-10 ring-1 ring-white/10 shadow-2xl overflow-hidden">
          <span className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/20" />
          <span className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/20" />
          <span className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/20" />
          <span className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/20" />

          <span className="font-geist-mono text-[10px] tracking-widest uppercase text-white/25">Education</span>
          <div className="mt-6 space-y-6">
            {education.map((e) => (
              <div key={e.degree} className="border-l border-white/10 pl-5">
                <p className="text-white/90 font-semibold">{e.degree}</p>
                <p className="font-geist-mono text-xs tracking-widest uppercase text-white/40 mt-0.5">{e.field}</p>
                <p className="font-geist-mono text-xs tracking-widest uppercase text-white/25 mt-0.5">{e.school}</p>
                <p className="mt-2 text-sm text-white/50 leading-relaxed">{e.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>


    </div>
  );
}