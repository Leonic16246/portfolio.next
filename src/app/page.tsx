import Link from 'next/link'
import Image from 'next/image'
import logo from '../../public/images/CherryTreeGlyph.png'

export default function Home() {
  return (
    <div className="min-h-screen bg-black p-6">
      <div className="relative bg-neutral-950 rounded-2xl px-10 py-14 ring-1 ring-white/10 shadow-2xl overflow-hidden">

        {/* Corner bracket decorations */}
        <span className="absolute top-5 left-5 w-5 h-5 border-t border-l border-white/20" />
        <span className="absolute top-5 right-5 w-5 h-5 border-t border-r border-white/20" />
        <span className="absolute bottom-5 left-5 w-5 h-5 border-b border-l border-white/20" />
        <span className="absolute bottom-5 right-5 w-5 h-5 border-b border-r border-white/20" />

        <div className="relative flex justify-between items-center gap-8">

          {/* LEFT — text content */}
          <div className="flex flex-col">

            {/* Headline */}
            <h1 className="text-7xl font-light tracking-tight text-white/90 leading-none">
              Hi, I&apos;m
            </h1>
            <h2 className="mt-1 text-7xl font-bold tracking-tight text-white/90 leading-none">
              Leon.
            </h2>

            {/* Role */}
            <p className="mt-5 font-geist-mono text-sm tracking-[0.2em] uppercase text-white/40">
              Software Engineering Student
            </p>

            {/* Bio */}
            <p className="mt-4 max-w-sm text-base leading-relaxed text-white/80">
              Welcome to my portfolio.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex items-center gap-3">
              <Link
                href="/projects"
                className="rounded-full bg-white/90 px-6 py-2.5 text-sm font-medium text-black transition hover:bg-white/75 active:scale-95"
              >
                View my projects
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-white/15 px-6 py-2.5 text-sm font-light text-white/80 transition hover:bg-white/5 hover:border-white/25 active:scale-95"
              >
                Get in touch
              </Link>
            </div>

            {/* Skills */}
            <div className="mt-10 border-t border-white/[0.1] pt-8 space-y-8">
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

          {/* RIGHT — logo/image */}
          <div className="relative shrink-0 opacity-100 -translate-x-16">
            <div className="absolute inset-0 rounded-full border border-black scale-120" />
            <Image
              src={logo}
              alt="Logo"
              width={400}
              height={400}
              priority
              className="relative z-10 drop-shadow-2xl"
            />
          </div>

        </div>
      </div>
    </div>
  )
}