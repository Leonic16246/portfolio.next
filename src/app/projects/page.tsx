'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-6 h-6 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
          <p className="font-geist-mono text-xs tracking-widest uppercase text-white/30">Loading projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-geist-mono text-xs tracking-widest uppercase text-white/30">No projects found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">

      <div className="flex flex-col items-center gap-8 mx-auto">

        {/* Header card */}
        <div
          className="fade-in relative w-full rounded-lg border bg-neutral-950 border-white/10 transition hover:border-white/20 px-10 py-12"
          style={{ animationDelay: '0.2s' }}
        >
          <span className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/25" />
          <span className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/25" />
          <span className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/25" />
          <span className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/25" />

          <p className="text-8xl font-light tracking-tight text-white/80 leading-none">My</p>
          <h1 className="text-8xl font-bold tracking-tight text-white/90 leading-none">Projects</h1>
        </div>

        {/* Projects grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-6">
          {projectsData.project.map((project: ProjectType, i: number) => (
            <div
              key={i}
              className="fade-in rounded-lg border border-white/10 bg-neutral-950 overflow-hidden transition hover:border-white/20 duration-200 flex flex-col"
              style={{ animationDelay: `${0.3 + i * 0.08}s` }}
            >

              {/* Image */}
              <div className="relative h-96 bg-neutral-900 overflow-hidden">
                <Image
                  src={project.imgsrc}
                  alt={`${project.title} preview`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized={project.imgsrc.endsWith('.svg')}
                  className="object-cover object-center opacity-90"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 px-5 py-5 gap-3">
                <h3 className="text-3xl font-bold text-white/90">{project.title}</h3>
                <p className="text-lg text-white/80 tracking-wide flex-1">{project.desc}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.skills.map((tech: string, j: number) => (
                    <span
                      key={j}
                      className="px-4 py-2 rounded-xl border border-white/10 transition hover:border-white/20 hover:text-white/90 font-geist-mono text-sm text-white/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {project.source && (
                  <div className="pt-3">
                    <a
                      href={project.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl border border-white/10 px-5 py-3 text-md font-geist-mono tracking-wide uppercase text-white/80 transition hover:bg-white/5 hover:border-white/20 hover:text-white/90 inline-flex items-center gap-2"
                    >
                      Source Code <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}