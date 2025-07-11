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
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setProjectsData(data);
    } catch (error) {
      console.error('Error loading projects:', error);
      setError(error instanceof Error ? error.message : 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  // Load projects on component mount
  useEffect(() => {
    loadProjects();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-medium text-neutral-600 dark:text-neutral-400 mb-4">
            Loading projects...
          </div>
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-medium text-red-600 dark:text-red-400 mb-4">
            Error loading projects
          </div>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">{error}</p>
          <button 
            onClick={loadProjects}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!projectsData || !projectsData.project || projectsData.project.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-medium text-neutral-600 dark:text-neutral-400 mb-4">
            No projects found
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 p-8">
      <div className="max-w-6xl mx-auto">
        <section className="mb-12">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent pb-2">
            Projects
          </h1>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {projectsData.project.map((item: ProjectType, index: number) => (
              <article 
                key={index}
                className="bg-white dark:bg-neutral-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-neutral-200 dark:border-neutral-700"
              >
                <div className="relative h-48 bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-700 dark:to-neutral-800">
                  <img 
                    src={item.imgsrc}
                    alt={`${item.title} preview`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-neutral-900 dark:text-neutral-100">
                    {item.title}
                  </h3>
                  
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
                    {item.desc}
                  </p>
                  
                  <div className="mb-5">
                    <ul className="flex flex-wrap gap-2">
                      {item.skills.map((tech: string, techIndex: number) => (
                        <li 
                          key={techIndex}
                          className="px-3 py-1 text-sm bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-md font-medium"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {item.source && (
                    <div className="pt-4 border-t border-neutral-100 dark:border-neutral-700">
                      <a 
                        href={item.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-4 py-2 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-sm font-medium rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors duration-200"
                      >
                        Source Code
                      </a>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}