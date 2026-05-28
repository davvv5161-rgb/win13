import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Download, Monitor, Zap, Shield, Cpu, ChevronRight, ArrowRight } from 'lucide-react';
import './index.css';

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className="glass-panel"
    style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}
  >
    <div style={{
      width: '48px', height: '48px', borderRadius: '12px',
      background: 'rgba(59, 130, 246, 0.1)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', color: '#3b82f6'
    }}>
      <Icon size={24} />
    </div>
    <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>{title}</h3>
    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{description}</p>
  </motion.div>
);

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div 
      className="glass-panel" 
      style={{ padding: '24px', cursor: 'pointer', marginBottom: '16px', transition: 'all 0.3s ease' }}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ fontSize: '1.125rem', fontWeight: '600', margin: 0 }}>{question}</h4>
        <ChevronRight style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }} />
      </div>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }} 
          animate={{ opacity: 1, height: 'auto' }} 
          style={{ marginTop: '16px', color: 'var(--text-secondary)', lineHeight: '1.6', overflow: 'hidden' }}
        >
          {answer}
        </motion.div>
      )}
    </div>
  );
};

function App() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const [showSource, setShowSource] = React.useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'F11') {
        e.preventDefault();
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
        } else {
          document.exitFullscreen().catch(() => {});
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>

      {/* Fullscreen Overlay */}
      {showSource && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowSource(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(5,5,5,0.97)',
            backdropFilter: 'blur(20px)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <motion.div
            initial={{ scale: 0.5, rotate: -5 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', bounce: 0.5 }}
            style={{ textAlign: 'center' }}
          >
            <div style={{ fontSize: 'clamp(3rem, 10vw, 7rem)', fontFamily: 'Outfit', fontWeight: 800, lineHeight: 1.1 }}>
              не чото
            </div>
            <div style={{
              fontSize: 'clamp(3rem, 10vw, 7rem)', fontFamily: 'Outfit', fontWeight: 800,
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1.1
            }}>
              не хочу
            </div>
            <p style={{ color: 'var(--text-secondary)', marginTop: '32px', fontSize: '1rem' }}>нажми куда угодно чтобы выйти</p>
          </motion.div>
        </motion.div>
      )}
      {/* Background Effects */}
      <div style={{
        position: 'fixed', top: '-20%', left: '-10%', width: '50%', height: '50%',
        background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(0,0,0,0) 70%)',
        filter: 'blur(80px)', zIndex: -1
      }} />
      <div style={{
        position: 'fixed', bottom: '-20%', right: '-10%', width: '50%', height: '50%',
        background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, rgba(0,0,0,0) 70%)',
        filter: 'blur(80px)', zIndex: -1
      }} />

      {/* Navigation */}
      <nav style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 100,
        background: 'rgba(5, 5, 5, 0.7)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--glass-border)'
      }}>
        <div className="container" style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '80px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Monitor className="accent-text" size={28} />
            <span style={{ fontFamily: 'Outfit', fontWeight: '800', fontSize: '1.5rem', letterSpacing: '-0.5px' }}>
              Win13
            </span>
          </div>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <a href="#features" style={{ color: 'var(--text-secondary)', fontWeight: 500, transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = '#fff'} onMouseOut={e => e.target.style.color = 'var(--text-secondary)'}>Features</a>
            <a href="#preview" style={{ color: 'var(--text-secondary)', fontWeight: 500, transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = '#fff'} onMouseOut={e => e.target.style.color = 'var(--text-secondary)'}>Preview</a>
            <a href="#faq" style={{ color: 'var(--text-secondary)', fontWeight: 500, transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = '#fff'} onMouseOut={e => e.target.style.color = 'var(--text-secondary)'}>FAQ</a>
            <a href="https://drive.google.com/file/d/1pkqfbOgLFVccZkri2TMsR48hebiaX-Br/view?usp=sharing" target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
              <button className="btn-primary" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>
                Get Early Access
              </button>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '160px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '6px 16px', borderRadius: '999px',
              background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)',
              color: '#60a5fa', fontSize: '0.875rem', fontWeight: 600, marginBottom: '32px'
            }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#60a5fa', boxShadow: '0 0 10px #60a5fa' }} />
              .cmdteam presents Windows 13 v2.0
            </div>
            
            <h1 style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)', lineHeight: 1.1, marginBottom: '24px', letterSpacing: '-2px' }}>
              The Next Era of <br />
              <span className="accent-text">Operating Systems</span>
            </h1>
            
            <p style={{
              fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px',
              margin: '0 auto 48px', lineHeight: 1.6
            }}>
              Experience the pinnacle of desktop operating systems. Built from the ground up for unprecedented performance, breathtaking aesthetics, and seamless interaction.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <a href="https://drive.google.com/file/d/1pkqfbOgLFVccZkri2TMsR48hebiaX-Br/view?usp=sharing" target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                <button className="btn-primary">
                  <Download size={20} />
                  Download OS
                </button>
              </a>
              <button className="btn-secondary" onClick={() => setShowSource(true)}>
                View Source <ArrowRight size={20} />
              </button>
            </div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="floating"
            style={{ marginTop: '80px', position: 'relative' }}
          >
            <div className="glass-panel" style={{
              width: '100%', maxWidth: '900px', height: '500px', margin: '0 auto',
              background: 'linear-gradient(180deg, rgba(30,30,30,0.8) 0%, rgba(15,15,15,0.9) 100%)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '16px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
            }}>
              {/* Fake Window Header */}
              <div style={{ height: '32px', background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', padding: '0 16px', gap: '8px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#eab308' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#22c55e' }} />
              </div>
              {/* Fake Desktop */}
              <div style={{ height: 'calc(100% - 32px)', position: 'relative', background: 'url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop") center/cover' }}>
                <div style={{ position: 'absolute', bottom: 0, width: '100%', height: '48px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
                   {/* Fake Taskbar Icons */}
                   <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--accent)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Monitor size={18} color="#fff" /></div>
                   <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(255,255,255,0.1)' }} />
                   <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(255,255,255,0.1)' }} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section" style={{ background: 'rgba(255,255,255,0.01)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '16px' }}>Engineered for <span className="gradient-text">Excellence</span></h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto' }}>
              Every pixel, animation, and interaction has been meticulously crafted to provide a truly next-generation experience.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            <FeatureCard 
              icon={Zap} 
              title="Lightning Fast" 
              description="Optimized rendering engine ensures 60FPS animations and zero latency across all system UI components."
              delay={0.1}
            />
            <FeatureCard 
              icon={Shield} 
              title="Rock Solid Core" 
              description="Built on a stable event-driven architecture that prevents crashing and handles intense multi-tasking effortlessly."
              delay={0.2}
            />
            <FeatureCard 
              icon={Cpu} 
              title="Advanced Multitasking" 
              description="True window management with proper z-indexing, minimization, dragging, and complex state preservation."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)', background: 'rgba(59,130,246,0.03)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '48px', textAlign: 'center' }}>
            {[
              { value: '60', unit: 'FPS', label: 'Smooth Animations' },
              { value: '10+', unit: '', label: 'Built-in Apps' },
              { value: '5+', unit: '', label: 'Languages Supported' },
              { value: '100%', unit: '', label: 'Open Source' },
            ].map(({ value, unit, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div style={{ fontSize: '3rem', fontFamily: 'Outfit', fontWeight: '800', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {value}<span style={{ fontSize: '1.5rem' }}>{unit}</span>
                </div>
                <div style={{ color: 'var(--text-secondary)', marginTop: '8px', fontWeight: 500 }}>{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's New Section */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '16px' }}>What's New in <span className="accent-text">v2.0</span></h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}>The biggest update yet — here's everything that dropped.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {[
              { emoji: '🌍', title: 'Multi-Language (i18n)', desc: 'Full internationalization system. Switch the entire UI to any supported language instantly.' },
              { emoji: '🎵', title: 'Music Player', desc: 'Play your local tracks directly inside the OS. Full controls, album art, and playlist support.' },
              { emoji: '🪟', title: 'Fixed Window Events', desc: 'Resolved all event bubbling issues. Windows no longer lose focus or misbehave during interaction.' },
              { emoji: '🖱️', title: 'Drag & Drop Icons', desc: 'Desktop icons can now be freely repositioned with smooth drag-and-drop interaction.' },
              { emoji: '⚙️', title: 'Task Manager', desc: 'Monitor and kill running apps from the new fully integrated Task Manager window.' },
              { emoji: '🔒', title: 'Lock Screen', desc: 'A polished lock screen with animated clock and clean unlock flow.' },
            ].map(({ emoji, title, desc }, i) => (
              <motion.div
                key={title}
                className="glass-panel"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ translateY: -4, boxShadow: '0 16px 40px rgba(59,130,246,0.15)' }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                viewport={{ once: true }}
                style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '12px', cursor: 'default', transition: 'box-shadow 0.3s ease' }}
              >
                <span style={{ fontSize: '2rem' }}>{emoji}</span>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>{title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="section" style={{ position: 'relative' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '16px' }}>Frequently Asked <span className="gradient-text">Questions</span></h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}>Everything you need to know about Windows 13.</p>
          </div>
          
          <div>
            <FAQItem 
              question="What is Windows 13?" 
              answer="Windows 13 is a next-generation web-based OS experience created by .cmdteam. It features smooth animations, deep customization, and a robust event-driven architecture." 
            />
            <FAQItem 
              question="Does it support multiple languages?" 
              answer="Yes! We built a robust internationalization (i18n) system that allows you to switch languages seamlessly across the entire OS interface." 
            />
            <FAQItem 
              question="Is there a built-in media player?" 
              answer="Absolutely. Windows 13 comes with a fully functional local music player out of the box, allowing you to enjoy your favorite tracks while you work." 
            />
            <FAQItem 
              question="How does the window management work?" 
              answer="We engineered a custom architecture that handles true window dragging, minimizing, proper z-indexing, and advanced event bubbling for flawless multitasking." 
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--glass-border)', padding: '48px 0', background: 'var(--bg-color)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Monitor className="accent-text" size={24} />
            <span style={{ fontFamily: 'Outfit', fontWeight: '700', fontSize: '1.25rem' }}>Win13</span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            © {new Date().getFullYear()} .cmdteam. All rights reserved. Not affiliated with Microsoft.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
