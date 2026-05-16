import Link from 'next/link'
import Image from 'next/image'
import logo from '../../public/images/CherryTreeGlyph.png'

const projects = [
  {
    title: 'Personal Website',
    imgsrc: 'images/CherryTreeGlyph.png',
    desc: 'A portfolio website, using Next.js, tailwind CSS, Supabase for authentication & PostgreSQL, and MongoDB for NoSQL, using an ASP.NET backend for REST api calls. Frontend and backend are hosted on Netlify and Azure respectively. Demonstrates my understanding of modern full-stack web development.',
    skills: ['Next.js', 'TypeScript', 'ASP.NET Core', 'Supabase', 'Auth', 'MongoDB', 'Netlify', 'Azure', 'CI/CD'],
    source: 'https://github.com/Leonic16246/portfolio.next',
  },
  {
    title: 'The Battle of Hamburg-err',
    imgsrc: 'images/TBoHE.png',
    desc: 'As the product owner in a Scrum team of four, I lead the conceptualisation of a food-themed tower defence game, using the Unity game engine and MagicaVoxel for art styling. My contributions included menu UI logic, resolution options, independent audio controls, and saving/loading. Leveraging Scrum methodologies and GitHub for Collaboration.',
    skills: ['Unity', 'C#', 'Agile Scrum'],
    source: 'https://github.com/Leonic16246/Battle-of-Hamburg-Err',
  },
  {
    title: 'Licence Plate Reader',
    imgsrc: 'images/menu-icon.svg',
    desc: 'A collaborative embedded project written in Python utilising a Raspberry Pi 4B, custom trained YOLOv7 model, EasyOCR, and OpenCV to read licence play numbers displayed in front of a camera. Results are saved to the local SQLite database hosted on the Pi and displayed on its local php web page.',
    skills: ['Python', 'Raspberry Pi', 'YOLOv7', 'EasyOCR', 'OpenCV', 'SQLite', 'PHP', 'Apache'],
    source: 'https://github.com/Leonic16246/license-plate-reader',
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-black p-8">
      <div className="relative bg-neutral p-24">

        {/* Corner bracket decorations */}
        <span className="absolute top-5 left-5 w-5 h-5 border-t-2 border-l-2 border-white/50" />
        <span className="absolute top-5 right-5 w-5 h-5 border-t-2 border-r-2 border-white/50" />
        <span className="absolute bottom-5 left-5 w-5 h-5 border-b-2 border-l-2 border-white/50" />
        <span className="absolute bottom-5 right-5 w-5 h-5 border-b-2 border-r-2 border-white/50" />

        <div className="flex flex-col items-center gap-8 max-w-5xl mx-auto">

          {/* Hero card */}
          <div className="relative w-full rounded-xl border border-white/50 px-10 py-12">
            <span className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-white/50" />
            <span className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-white/50" />
            <span className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-white/50" />
            <span className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-white/50" />

            <h1 className="text-7xl font-light tracking-tight text-white leading-none">
              Hi, I&apos;m
            </h1>
            <h2 className="mt-1 text-7xl font-bold tracking-tight text-white leading-none">
              Leon Lee
            </h2>

            <p className="mt-5 font-geist-mono text-sm tracking-[0.2em] uppercase text-white/60">
              Software Engineering Student
            </p>

            <p className="mt-4 text-base leading-relaxed text-white/80">
              Welcome to my portfolio.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <Link
                href="/files/Leon-Lee-CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white/90 px-6 py-2.5 text-sm text-black transition hover:bg-white/75 active:scale-95"
              >
                View CV
              </Link>
              <Link
                href="/contact"
                className="rounded-full border-2 border-white/50 px-6 py-2.5 text-sm text-white/90 transition hover:bg-white/5 hover:border-white/50 active:scale-95"
              >
                Get in touch
              </Link>
            </div>
          </div>

          {/* About Me card */}
          <div className="relative w-full rounded-xl border border-white/50 px-10 py-12">
            <span className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-white/50" />
            <span className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-white/50" />
            <span className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-white/50" />
            <span className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-white/50" />

            <h2 className="text-5xl font-bold tracking-tight text-white">About Me</h2>
            <p className="mt-5 text-lg leading-relaxed text-white/90">
              I am a software engineering student seeking a full-time software development role to gain real-world experience and advance my career. Highly motivated to learn, passionate about problem solving, and able to keep up with industry tech. I enjoy going through the software development lifecycle on my own projects. Meeting user needs is always satisfying to me.
            </p>
          </div>

          {/* Skills card */}
          <div className="relative w-full rounded-xl border border-white/50 px-10 py-12 space-y-8">
            <span className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-white/50" />
            <span className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-white/50" />
            <span className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-white/50" />
            <span className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-white/50" />

            {[
              { label: 'Languages', skills: ['Java', 'Python', 'C#', 'JavaScript', 'HTML', 'CSS', 'SQL', 'PHP', 'Rust'] },
              { label: 'Frameworks', skills: ['Next.js', 'React', 'ASP.NET Core', 'Tailwind CSS', 'Symfony'] },
              { label: 'Technologies', skills: ['Git', 'Linux', 'Agile / Scrum', 'REST APIs', 'Node.js', 'Docker'] },
              { label: 'Certifications', skills: ['ISC2 Certified in Cybersecurity (CC)'] }
            ].map((group) => (
              <div key={group.label} className="flex flex-col gap-2.5">
                <span className="font-geist-mono text-xs tracking-widest uppercase text-white/90">{group.label}</span>
                <div className="flex flex-wrap gap-2.5">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-1.5 rounded-lg border border-white/50 bg-white/5 font-geist-mono text-sm text-white/80 hover:text-white/90 hover:border-white/50 hover:bg-white/10 transition-colors duration-150"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Projects card */}
          <div className="relative w-full rounded-xl border border-white/50 px-10 py-12">
            <span className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-white/50" />
            <span className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-white/50" />
            <span className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-white/50" />
            <span className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-white/50" />

            <h2 className="text-5xl font-bold tracking-tight text-white">Projects</h2>

            <div className="mt-8 grid grid-cols-1 gap-6">
              {projects.map((project, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-white/50 overflow-hidden hover:border-white/50 transition-all duration-200 flex flex-col"
                >

                  {/* Screenshot */}
                  <div className="relative h-50 bg-neutral-900 overflow-hidden">
                    <img
                      src={project.imgsrc}
                      alt={`${project.title} preview`}
                      className="w-full h-full object-cover object-center opacity-90"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 px-5 py-5 gap-3">
                    <h3 className="text-base font-semibold text-white">{project.title}</h3>
                    <p className="text-sm text-white/90 leading-relaxed flex-1">{project.desc}</p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.skills.map((tech, j) => (
                        <span
                          key={j}
                          className="px-3 py-1 rounded-full border-2 border-white/50 bg-white/5 font-geist-mono text-xs text-white/80"
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
                          className="rounded-full border-2 border-white/50 px-5 py-2 text-xs font-geist-mono tracking-widest uppercase text-white/80 transition hover:bg-white/5 hover:border-white/50 hover:text-white/90 active:scale-95 inline-block"
                        >
                          Source Code &rarr;
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link
                href="/projects"
                className="rounded-full border-2 border-white/50 px-6 py-2.5 text-sm text-white/90 transition hover:bg-white/5 hover:border-white/50 active:scale-95"
              >
                View all projects &rarr;
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}