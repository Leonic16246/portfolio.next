'use client'

import { useState, useEffect } from 'react';

interface ProjectsData {
  project: ProjectType[];
}

interface ProjectType {
  title: string;
  imgsrc: string;
  desc: string;
  skills: string[];
  source: string;
}

export default function Projects() {
  const [projectsData, setProjectsData] = useState<ProjectsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/projects', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setProjectsData(data);
    } catch (error) {
      console.error('Error loading projects:', error);
      setError(error instanceof Error ? error.message : 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadProjects(); }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-6 h-6 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
          <p className="font-geist-mono text-xs tracking-widest uppercase text-white/30">Loading projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <p className="font-geist-mono text-xs tracking-widest uppercase text-white/30">Failed to load projects</p>
          <p className="text-sm text-white/40">{error}</p>
          <button
            onClick={loadProjects}
            className="mt-2 rounded-full border border-white/15 px-6 py-2.5 text-sm font-light text-white/80 transition hover:bg-white/5 hover:border-white/25 active:scale-95"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (!projectsData || !projectsData.project || projectsData.project.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="font-geist-mono text-xs tracking-widest uppercase text-white/30">No projects found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-6 space-y-6">

      {/* Header */}
      <div className="relative bg-neutral-950 rounded-2xl px-10 py-14 ring-1 ring-white/10 shadow-2xl overflow-hidden">
        <span className="absolute top-5 left-5 w-5 h-5 border-t border-l border-white/20" />
        <span className="absolute top-5 right-5 w-5 h-5 border-t border-r border-white/20" />
        <span className="absolute bottom-5 left-5 w-5 h-5 border-b border-l border-white/20" />
        <span className="absolute bottom-5 right-5 w-5 h-5 border-b border-r border-white/20" />

        <h1 className="text-7xl tracking-tight text-white/90 leading-none">My</h1>
        <h2 className="mt-1 text-7xl font-bold tracking-tight text-white/90 leading-none">Projects.</h2>
        {/* <p className="mt-5 font-geist-mono text-sm tracking-[0.2em] uppercase text-white/40">
          {projectsData.project.length} project{projectsData.project.length !== 1 ? 's' : ''}
        </p> */}
      </div>

      {/* Grid */}
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
        {projectsData.project.map((item: ProjectType, index: number) => (
          <article
            key={index}
            className="relative bg-neutral-950 rounded-2xl ring-1 ring-white/10 shadow-2xl overflow-hidden flex flex-col hover:ring-white/20 transition-all duration-200"
          >
            {/* Corner brackets */}
            {/* <span className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/20 z-10" />
            <span className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/20 z-10" /> */}

            {/* Image */}
            <div className="relative h-64 bg-neutral-900 overflow-hidden">
              <img
                src={item.imgsrc}
                alt={`${item.title} preview`}
                className="w-full h-full object-cover opacity-80"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 to-transparent" />
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 px-6 py-6 gap-4">
              <h3 className="text-white/90 font-semibold text-lg leading-tight">{item.title}</h3>

              <p className="text-sm text-white/50 leading-relaxed flex-1">{item.desc}</p>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {item.skills.map((tech: string, techIndex: number) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1 rounded-lg border border-white/10 bg-white/5 font-geist-mono text-xs text-white/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Source link */}
              {item.source && (
                <div className="pt-4 border-t border-white/[0.07]">
                  <a
                    href={item.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-white/15 px-5 py-2 text-xs font-geist-mono tracking-widest uppercase text-white/60 transition hover:bg-white/5 hover:border-white/25 hover:text-white/90 active:scale-95 inline-block"
                  >
                    Source Code →
                  </a>
                </div>
              )}
            </div>

          </article>
        ))}
      </div>

    </div>
  );
}