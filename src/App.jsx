import './App.css'
import { RevealSection, RevealParagraph } from './components/RevealSection'
import { PathReveal } from './components/PathReveal'
import { ExplodingHero } from './components/ExplodingHero'
import { FrozenQuote } from './components/FrozenQuote'
import { SaturatingQuote } from './components/SaturatingQuote'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Glass Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-12 bg-black/40 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="flex items-center">
            <img src="/ao-logo-white.png" alt="AO Labs" className="h-8" />
          </a>
          
          {/* Nav Links */}
          <div className="flex gap-10 text-[11px] tracking-[0.2em] heading-font opacity-60">
            <a href="#problem" className="link-hover">Problem</a>
            <a href="#solution" className="link-hover">Solution</a>
            <a href="#contact" className="link-hover">Contact</a>
            <a href="#partners" className="link-hover">Partners</a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-6 pt-40 pb-32 md:pt-52">
        {/* Hero - Exploding Opening Statement */}
        <ExplodingHero 
          text="We've spent the last decade believing that more data and bigger models would solve intelligence."
          subtext="They won't."
        />

        {/* Core Problem Section */}
        <section id="problem" className="space-y-12 mb-24">
          <RevealSection>
            <h2 className="heading-font text-[11px] text-white/30 tracking-[0.5em] mb-8">The Scaling Plateau</h2>
          </RevealSection>
          <div className="prose-text space-y-8">
            <RevealParagraph>
              The way to smarter AI has been presumed to be through scaling. But as scaling deep learning hits a plateau, we are witnessing a fundamental reliability gap.
            </RevealParagraph>
            <RevealParagraph className="muted-prose">
              The market is shifting toward <span className="text-white">test-time compute</span> and reinforcement learning (like o3) to bridge this gap, yet these remain patches on a pre-trained foundation. LLMs remain static by design, limiting reasoning to fixed definitions and leaving a massive surface area for hallucination.
            </RevealParagraph>
            <RevealParagraph>
              Scaling compute no longer yields the same intelligence returns. We are reaching the limit of what pre-trained architectures can accomplish in dynamic, real-world environments.
            </RevealParagraph>
          </div>
        </section>

        {/* The Deeper Problem - Frozen Quote */}
        <FrozenQuote text={`"Every LLM deployed today is frozen in time—a snapshot of knowledge that begins degrading the moment training ends."`} />

        {/* Expanding on the problem */}
        <section className="space-y-12 mb-24">
          <RevealSection>
            <h2 className="heading-font text-[11px] text-white/30 tracking-[0.5em] mb-8">The Trust Deficit</h2>
          </RevealSection>
          <div className="prose-text space-y-8">
            <RevealParagraph>
              When AI systems cannot learn from their mistakes in real-time, trust becomes impossible. Every hallucination erodes confidence. Every outdated response reveals the brittleness beneath.
            </RevealParagraph>
            <RevealParagraph className="muted-prose">
              Enterprises deploy guardrails upon guardrails. Developers build elaborate validation pipelines. Users learn to double-check everything. This isn't intelligence—it's managed unreliability.
            </RevealParagraph>
            <RevealParagraph>
              The fundamental architecture is broken. We're not going to patch our way to trustworthy AI.
            </RevealParagraph>
          </div>
        </section>

        {/* Transition - Path into the solution */}
        <PathReveal />

        {/* Solution Section */}
        <section id="solution" className="pt-8 mb-24">
          <RevealSection>
            <h2 className="heading-font text-[11px] text-white/30 tracking-[0.5em] mb-8">The Solution</h2>
          </RevealSection>
          <div className="prose-text space-y-8">
            <RevealParagraph>
              We are building an alternative outside the deep learning stack. AO Labs is rebuilding the intelligence layer around <span className="text-white">continuous learning</span> using weightless neural networks.
            </RevealParagraph>
            <RevealParagraph className="muted-prose italic">
              This is prelingual learning natively integrated into AI, starting with intelligence at its simplest levels. By moving away from fixed weight matrices toward dynamic, decentralized learning, we create a path to robust agents that can learn their own definitions rather than relying on frozen training data.
            </RevealParagraph>
            <RevealParagraph>
              Instead of hacking agency on top of pre-trained LLMs, we shift the LLM to its rightful place as a perceptual interface, while the core reasoning evolves through weightless, automatic learning.
            </RevealParagraph>
          </div>
        </section>

        {/* How it works */}
        <section className="space-y-12 mb-24">
          <RevealSection>
            <h2 className="heading-font text-[11px] text-white/30 tracking-[0.5em] mb-8">How It Works</h2>
          </RevealSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <RevealSection delay={0}>
              <div className="space-y-4">
                <div className="text-4xl font-light text-white/20">01</div>
                <h3 className="text-lg font-light text-white">Weightless Architecture</h3>
                <p className="text-sm muted-prose leading-relaxed">
                  No gradient descent. No backpropagation. Learning happens through direct memory addressing—instant, interpretable, and reversible.
                </p>
              </div>
            </RevealSection>
            <RevealSection delay={150}>
              <div className="space-y-4">
                <div className="text-4xl font-light text-white/20">02</div>
                <h3 className="text-lg font-light text-white">Continuous Adaptation</h3>
                <p className="text-sm muted-prose leading-relaxed">
                  Every interaction refines the model. Mistakes become lessons in milliseconds. The system evolves with its environment, not against it.
                </p>
              </div>
            </RevealSection>
            <RevealSection delay={300}>
              <div className="space-y-4">
                <div className="text-4xl font-light text-white/20">03</div>
                <h3 className="text-lg font-light text-white">Decentralized Trust</h3>
                <p className="text-sm muted-prose leading-relaxed">
                  Learning is local and verifiable. No black boxes. Each agent's reasoning can be audited, understood, and trusted.
                </p>
              </div>
            </RevealSection>
          </div>
        </section>

        {/* Vision quote - Saturating */}
        <SaturatingQuote text="Intelligence that learns continuously. Reasoning you can verify. Trust you can build on." />

        {/* Timing Section */}
        <section className="pt-16 border-t border-white/10 mb-24">
          <RevealSection>
            <h2 className="heading-font text-[11px] text-white/30 tracking-[0.5em] mb-8">The 2012 Moment</h2>
          </RevealSection>
          <div className="prose-text space-y-8">
            <RevealParagraph>
              In 2012, ImageNet proved that deep learning was the future of perception. Today, the scaling plateau marks a similar inflection point. The era of static, pre-trained intelligence is concluding; the era of continuous, agentic learning is beginning.
            </RevealParagraph>
            <RevealParagraph>
              AO Labs is at the center of this transition, ensuring that the next generation of AI is unique to every individual and fundamentally trustworthy.
            </RevealParagraph>
          </div>
        </section>

        {/* The Stakes */}
        <section className="space-y-12 mb-24">
          <RevealSection>
            <h2 className="heading-font text-[11px] text-white/30 tracking-[0.5em] mb-8">Why Now</h2>
          </RevealSection>
          <div className="prose-text space-y-8">
            <RevealParagraph>
              The window is narrow. As the industry doubles down on scaling's diminishing returns, we have a rare opportunity to establish a new foundation. One built on learning, not memorization. On adaptation, not approximation.
            </RevealParagraph>
            <RevealParagraph className="muted-prose">
              The teams that solve continuous learning will define the next decade of AI. The infrastructure they build will become the substrate for every agent, every assistant, every autonomous system.
            </RevealParagraph>
            <RevealParagraph>
              We're not building another model. We're building the architecture that makes models trustworthy.
            </RevealParagraph>
          </div>
        </section>

        {/* Newsletter Section - Hidden for now
        <RevealSection>
          <section className="pt-16 border-t border-white/10 mb-24">
            <h2 className="heading-font text-[11px] text-white/30 tracking-[0.5em] mb-8">Stay Updated</h2>
            <div className="prose-text mb-8">
              <p className="muted-prose">
                Join our newsletter for the latest research updates, protocol developments, and insights into the future of agentic learning.
              </p>
            </div>
            <form className="flex flex-col md:flex-row gap-4 max-w-xl">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 bg-transparent border border-white/20 px-6 py-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/50 transition-colors"
              />
              <button 
                type="submit"
                className="text-xs border border-white/20 px-8 py-4 hover:bg-white hover:text-black transition-all tracking-widest uppercase"
              >
                Subscribe
              </button>
            </form>
          </section>
        </RevealSection>
        */}

        {/* Get in Touch Section */}
        <RevealSection>
          <section id="contact" className="pt-16 border-t border-white/10 mb-24">
            <h2 className="heading-font text-[11px] text-white/30 tracking-[0.5em] mb-8">Get in Touch</h2>
            <div className="prose-text space-y-6 mb-12">
              <p className="muted-prose">
                Whether you're a researcher, investor, or builder—we'd love to hear from you.
              </p>
            </div>
            <form 
              action="https://formsubmit.co/renee@aolabs.ai" 
              method="POST"
              className="space-y-6 max-w-xl"
            >
              {/* FormSubmit configuration */}
              <input type="hidden" name="_subject" value="New contact from AO Labs website" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input 
                  type="text" 
                  name="name"
                  placeholder="Name"
                  required
                  className="bg-transparent border border-white/20 px-6 py-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/50 transition-colors"
                />
                <input 
                  type="email" 
                  name="email"
                  placeholder="Email"
                  required
                  className="bg-transparent border border-white/20 px-6 py-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/50 transition-colors"
                />
              </div>
              <select 
                name="interest"
                className="w-full bg-black border border-white/20 px-6 py-4 text-sm text-white/50 focus:outline-none focus:border-white/50 transition-colors appearance-none cursor-pointer"
                defaultValue=""
                required
              >
                <option value="" disabled>I'm interested in...</option>
                <option value="investing">Investing</option>
                <option value="partnership">Strategic Partnership</option>
                <option value="research">Research Collaboration</option>
                <option value="building">Building on AO</option>
                <option value="other">Other</option>
              </select>
              <textarea 
                name="message"
                placeholder="Your message"
                rows={4}
                required
                className="w-full bg-transparent border border-white/20 px-6 py-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/50 transition-colors resize-none"
              />
              <button 
                type="submit"
                className="text-xs border border-white/20 px-8 py-4 hover:bg-white hover:text-black transition-all tracking-widest uppercase"
              >
                Send Message
              </button>
            </form>
          </section>
        </RevealSection>

        {/* Call to Action / Footer */}
        <footer id="partners" className="mt-24 pt-16 border-t border-white/10">
          <RevealSection>
            <div className="text-center space-y-12">
              <h3 className="text-2xl font-light">Join the Evolution</h3>
              <div className="flex flex-col md:flex-row justify-center gap-6 text-xs">
                <a 
                  href="mailto:invest@aolabs.ai" 
                  className="border border-white/20 px-8 py-4 hover:bg-white hover:text-black transition-all tracking-widest uppercase"
                >
                  Investors
                </a>
                <a 
                  href="#contact" 
                  className="border border-white/20 px-8 py-4 hover:bg-white hover:text-black transition-all tracking-widest uppercase"
                >
                  Strategic Partners
                </a>
                <a 
                  href="https://github.com/aolabs-ai" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-white/20 px-8 py-4 hover:bg-white hover:text-black transition-all tracking-widest uppercase"
                >
                  Developers
                </a>
              </div>
              <div className="pt-12">
                <div className="heading-font text-[10px] tracking-[0.6em] text-white/20">
                  SAN FRANCISCO &bull; CALIFORNIA &bull; 37.7749° N, 122.4194° W
                </div>
              </div>
              <p className="text-[9px] text-white/10 mt-8 uppercase tracking-[0.3em]">
                © 2026 AO LABS SF. BEYOND THE STACK.
              </p>
            </div>
          </RevealSection>
        </footer>
      </main>
    </div>
  )
}

export default App
