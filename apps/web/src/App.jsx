import React, { useState } from 'react'

export default function App() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex items-center justify-center p-6">
      <main className="w-full max-w-xl text-center">
        {/* Logo */}
        <img
          src="/logo-1024.png"
          alt="Jargonless logo"
          className="mx-auto mb-6 h-16 w-16 rounded-2xl object-contain"
        />

        {/* Headline and subhead */}
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Jargonless is Evolving
        </h1>
        <p className="mt-3 text-base md:text-lg text-zinc-600">
          A creative lab for data storytelling, automation, and machine learning where insight meets design.
        </p>

        {/* Callouts */}
        <ul className="mt-6 grid grid-cols-1 gap-3 text-sm text-zinc-700">
          <li className="rounded-xl border border-zinc-200 bg-white p-4 text-left">
            <span className="font-medium">What’s inside</span> — Interactive posts that blend Power BI dashboards, notebooks, and AI experiments into real-world narratives.
          </li>
          <li className="rounded-xl border border-zinc-200 bg-white p-4 text-left">
            <span className="font-medium">The craft</span> — From raw datasets to polished visuals, every project is an experiment in clarity. Tools change, curiosity stays constant.
          </li>
          <li className="rounded-xl border border-zinc-200 bg-white p-4 text-left">
            <span className="font-medium">Coming soon</span> — Independent projects in analytics and machine learning built to inform, not to impress.
          </li>
        </ul>

        {/* Email capture
        <form onSubmit={handleSubmit} className="mt-8 flex gap-2">
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="Get a heads-up when we go live"
            className="flex-1 rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none focus-visible:ring-2 focus-visible:ring-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="rounded-xl bg-black px-5 py-3 text-white font-medium hover:opacity-90 active:opacity-80"
          >
            Notify me
          </button>
        </form>
        {submitted && (
          <p className="mt-2 text-sm text-emerald-700" role="status">
            Thanks. We’ll notify you closer to launch.
          </p>
        )} */}

        {/* Footer */}
        <footer className="mt-10 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} Jargonless. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
}
