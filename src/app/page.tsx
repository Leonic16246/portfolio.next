import Card from '@/components/card/card'
import Link from 'next/link'
import Image from 'next/image'
import logo from '../../public/images/CherryTreeGlyph.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import projects from '../../public/data/projects.json'
import skills from '../../public/data/skills.json'

export default function Home() {
  return (
    <div className="min-h-screen py-8">

      <div className="flex flex-col items-center gap-8 content-width"> {/* gap between cards */}

        {/* Hero card */}
        <Card>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left: text content */}
            <div className="flex flex-col">
              <p className="text-8xl font-light tracking-tight text-white/80 leading-none">
                Hi, I'm
              </p>
              <h1 className="text-8xl font-bold tracking-tight text-white/90 leading-none">
                Leon Lee
              </h1>
              <h2 className="mt-4 font-geist-mono text-lg tracking-[0.2em] uppercase text-white/70">
                Software Engineering Student
              </h2>
              <h3 className="mt-4 text-xl text-white/80 leading-relaxed">
                Welcome to my portfolio.
              </h3>
              <div className="mt-8 flex items-center gap-4">
                <Link
                  href="/files/Leon_Lee_CV_2026.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-white/25 px-6 py-2.5 text-center text-white/90 transition hover:bg-white/5 hover:border-white/50 active:scale-95"
                >
                  View CV
                </Link>
                <Link
                  href="/contact"
                  className="rounded-xl border border-white/25 px-6 py-2.5 text-center text-white/90 transition hover:bg-white/5 hover:border-white/50 active:scale-95"
                >
                  Get in touch
                </Link>
              </div>
            </div>

            {/* Right: logo */}
            <div className="">
              <Image
                src={logo}
                alt="glyph"
                width={384}
                height={384}
                priority
                className="mr-12 opacity-90 hover:opacity-100 transition"
              />
            </div>
          </div>
        </Card>

        {/* About Me card */}
        <Card>
          <Link href="/about">
            <h2 className="text-6xl font-bold tracking-tight text-white/90">About Me</h2>
          </Link>

          <p className="mt-4 text-xl leading-relaxed text-white/80">
            I am a software engineering student seeking a full-time software development role to gain real-world experience and advance my career. Highly motivated to learn, passionate about problem solving, and able to keep up with industry tech. I enjoy going through the software development lifecycle on my own projects. Meeting user needs is always satisfying to me.
          </p>
        </Card>

        {/* Skill cards */}
        <Card>
          <h2 className="text-6xl font-bold tracking-tight text-white/90">Skills</h2>
          {skills.map((group) => (
            <div key={group.label} className="flex flex-col gap-2">
              <span className="font-geist-mono text-lg tracking-widest uppercase text-white/80 mt-4">{group.label}</span>
              <div className="flex flex-wrap gap-4">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 rounded-xl border border-white/10 font-geist-mono  text-base text-white/80 hover:text-white/90 hover:border-white/20 transition mt-2"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </Card>

        {/* Project cards */}
        <Card>
          <Link href="/projects">
            <h2 className="text-6xl font-bold tracking-tight text-white/90">Projects</h2>
          </Link>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, i) => (
              <div
                key={i}
                className="rounded-lg border border-white/10 bg-neutral-950 overflow-hidden transition hover:border-white/20 duration-200 flex flex-col"
              >

                {/* Image */}
                <div className="relative h-96 bg-neutral-900 overflow-hidden">
                  <Image
                    src={project.imgsrc}
                    alt={`${project.title} preview`}
                    fill
                    sizes="50vw"
                    unoptimized={project.imgsrc.endsWith('.svg')}
                    className="object-cover object-center opacity-90"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 px-5 py-5 gap-3">
                  <h3 className="text-4xl font-bold text-white/90">{project.title}</h3>
                  <p className="text-lg text-white/80 leading-relaxed tracking-wide flex-1">{project.desc}</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.skills.map((tech, j) => (
                      <span
                        key={j}
                        className="px-4 py-2 rounded-xl border border-white/10 transition hover:border-white/20 hover:text-white/90 font-geist-mono text-base text-white/80"
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
                        className="rounded-xl border border-white/10 px-5 py-3 text-base font-geist-mono tracking-wide uppercase text-white/80 transition hover:bg-white/5 hover:border-white/20 hover:text-white/90 inline-flex items-center gap-2"
                      >
                        Source Code <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
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
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-base font-geist-mono tracking-wider uppercase text-white/80 transition hover:bg-white/5 hover:border-white/20 hover:text-white/90"
            >
              View all projects <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}