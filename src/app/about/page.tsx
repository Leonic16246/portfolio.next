import skills from "../../../public/data/skills.json"
import education from "../../../public/data/education.json"
import experience from "../../../public/data/experience.json"

export default function About() {


  return (
    <div className="min-h-screen p-8">

      <div className="flex flex-col items-center gap-8 mx-auto">

        {/* Hero card */}
        <div
          className="fade-in relative w-full rounded-lg border bg-neutral-950 border-white/10 transition hover:border-white/20 px-10 py-12"
          style={{ animationDelay: '0.2s' }}
        >
          <span className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/25" />
          <span className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/25" />
          <span className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/25" />
          <span className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/25" />

          <p className="text-8xl font-light tracking-tight text-white/80 leading-none">About</p>
          <h1 className="text-8xl font-bold tracking-tight text-white/90 leading-none">Me</h1>
          <p className="mt-4 font-geist-mono text-lg tracking-[0.2em] uppercase text-white/70">
            Software Engineering
          </p>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-white/80">
            I'm a software engineering student seeking a full-time software development role to gain real-world experience and advance my career. Highly motivated to learn, passionate about problem solving, and able to keep up with industry tech.
          </p>
        </div>

        {/* Skills card */}
        <div
          className="fade-in relative w-full rounded-lg border bg-neutral-950 border-white/10 transition hover:border-white/20 px-10 py-12"
          style={{ animationDelay: '0.3s' }}
        >
          <span className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/25" />
          <span className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/25" />
          <span className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/25" />
          <span className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/25" />

          <h2 className="text-6xl font-bold tracking-tight text-white/90">Skills</h2>
          <div className="mt-2">
            {skills.map((group) => (
              <div key={group.label} className="flex flex-col gap-2">
                <span className="font-geist-mono text-lg tracking-widest uppercase text-white/80 mt-4">{group.label}</span>
                <div className="flex flex-wrap gap-4">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 rounded-xl border border-white/10 font-geist-mono text-md text-white/80 hover:text-white/90 hover:border-white/20 transition mt-2"
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
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* Experience */}
          <div
            className="fade-in relative rounded-lg border bg-neutral-950 border-white/10 transition hover:border-white/20 px-10 py-12"
            style={{ animationDelay: '0.4s' }}
          >
            <span className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/25" />
            <span className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/25" />
            <span className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/25" />
            <span className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/25" />

            <h2 className="text-4xl font-bold tracking-tight text-white/90">Experience</h2>
            <div className="mt-6 space-y-6">
              {experience.map((e) => (
                <div key={e.role} className="border-l border-white/10 pl-5">
                  <p className="text-2xl text-white/90 font-semibold">{e.role}</p>
                  <p className="font-geist-mono text-sm tracking-widest uppercase text-white/70 mt-1">{e.company} — {e.period}</p>
                  <p className="mt-2 text-lg text-white/80 leading-relaxed">{e.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div
            className="fade-in relative rounded-lg border bg-neutral-950 border-white/10 transition hover:border-white/20 px-10 py-12"
            style={{ animationDelay: '0.5s' }}
          >
            <span className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/25" />
            <span className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/25" />
            <span className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/25" />
            <span className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/25" />

            <h2 className="text-4xl font-bold tracking-tight text-white/90">Education</h2>
            <div className="mt-6 space-y-6">
              {education.map((e) => (
                <div key={e.name} className="border-l border-white/10 pl-5">
                  <p className="text-2xl text-white/90 font-semibold">{e.name}</p>
                  <p className="font-geist-mono text-sm tracking-widest uppercase text-white/70 mt-1">{e.field}</p>
                  <p className="font-geist-mono text-sm tracking-widest uppercase text-white/50 mt-0.5">{e.school}</p>
                  <p className="mt-2 text-lg text-white/80 leading-relaxed">{e.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}