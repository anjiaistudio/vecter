import React, { useEffect, useRef, useState } from 'react';
import { useScrollReveal } from './useScrollReveal';
import azureLogo from './assets/Microsoft-Azure.png';
import anthropicLogo from './assets/Anthropic.png';
import pineconeLogo from './assets/Pinecone.png';
import langchainLogo from './assets/LangChain.png';
import openaiLogo from './assets/OpenAI.png';
import awsLogo from './assets/aws.png';

function App() {
  const headerRef = useRef(null);

  // Example: add/remove a class on scroll for fixed effect
  useEffect(() => {
    const handleScroll = () => {
      if (!headerRef.current) return;
      if (window.scrollY > 100) {
        headerRef.current.classList.add('scrolled');
      } else {
        headerRef.current.classList.remove('scrolled');
      }
      // You can call your own function here as well
      // onHeaderScroll(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  
// TimelineProgress component must be outside App
  function TimelineProgress() {
    const timelineRef = useRef(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      const handleScroll = () => {
        if (!timelineRef.current) return;
        const steps = Array.from(timelineRef.current.querySelectorAll('.timeline-step'));
        const barHeight = timelineRef.current.getBoundingClientRect().height;
        const wrapperTop = timelineRef.current.getBoundingClientRect().top;
        const viewportCenter = window.innerHeight / 2;

        // Find the step whose center is closest to the viewport center
        let closestIdx = 0;
        let minDist = Infinity;
        let stepCenters = [];
        steps.forEach((step, idx) => {
          const rect = step.getBoundingClientRect();
          const center = rect.top + rect.height / 2;
          stepCenters.push(center);
          const dist = Math.abs(center - viewportCenter);
          if (dist < minDist) {
            minDist = dist;
            closestIdx = idx;
          }
        });

        // Calculate progress: fill up to the center of the closest step
        let percent = 0;
        if (steps.length > 1) {
          // The bar starts at the center of the first step and ends at the center of the last
          const start = stepCenters[0];
          const end = stepCenters[stepCenters.length - 1];
          const target = stepCenters[closestIdx];
          percent = (target - start) / (end - start);
          percent = Math.max(0, Math.min(1, percent));
          steps[closestIdx].classList.add('scrolled');
        } else {
          percent = 0;
          steps[closestIdx].classList.remove('scrolled');
        }
        setProgress(percent);
      };
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleScroll);
      handleScroll();
      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
      };
    }, []);

    return (
      <div className="timeline-progress-wrapper" ref={timelineRef}>
        <div className="timeline-progress-bar-bg"/>
        <div className="timeline-progress-bar" style={{height: `${progress * 100}%`}} />
        <div className="timeline-steps">
          <div className="timeline-step" ref={useScrollReveal({ direction: 'left' })}>
            <div className="timeline-content">
              <h3>Discover</h3>
              <p>Free readiness assessment to identify opportunities and gaps in your current setup.</p>
            </div>
          </div>
          <div className="timeline-step" ref={useScrollReveal({ direction: 'right' })}>
            <div className="timeline-content">
              <h3>Design</h3>
              <p>Tailored strategy, governance frameworks, and custom agent blueprints.</p>
            </div>
          </div>
          <div className="timeline-step" ref={useScrollReveal({ direction: 'left' })}>
            <div className="timeline-content">
              <h3>Deploy</h3>
              <p>Secure implementation with seamless integrations and testing.</p>
            </div>
          </div>
          <div className="timeline-step" ref={useScrollReveal({ direction: 'right' })}>
            <div className="timeline-content">
              <h3>Optimize</h3>
              <p>Ongoing monitoring, team training, and scaling for maximum ROI.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  
  // Carousel component for testimonials
  function TestimonialCarousel() {
    const testimonials = [
      {
        text: "Vecter's AI agents transformed our workflows—497% ROI in 6 months!",
        author: '– Retail Client, Melbourne',
      },
      {
        text: 'Secure governance gave us confidence to scale AI ethically.',
        author: '– Finance Firm, Sydney',
      },
      // Add more testimonials as needed
    ];
    const [activeIdx, setActiveIdx] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const goLeft = () => setActiveIdx((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    const goRight = () => setActiveIdx((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));

    useEffect(() => {
      if (isPaused) return;
      const interval = setInterval(() => {
        setActiveIdx((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
      }, 4000); // 4 seconds per slide
      return () => clearInterval(interval);
    }, [isPaused, testimonials.length]);

    return (
      <div
        className="wrapper testimonial-carousel"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className='wrapper hidden-overflow'>
          <button className='goLeft' onClick={goLeft} aria-label="Previous">&#8592;</button>
          <div
            className="testimonial-track"
            style={{
              transform: `translateX(-${activeIdx * 100}%)`,
              transition: 'transform 0.5s cubic-bezier(.4,0,.2,1)',
            }}
          >
            {testimonials.map((t, i) => (
              <div
                className={`testimonial-card${i === activeIdx ? ' active' : ''}`}
                key={i}
                style={{
                  opacity: i === activeIdx ? 1 : 0.7,
                  transition: 'opacity 0.5s',
                }}
              >
                <p>"{t.text}"</p>
                <span>{t.author}</span>
              </div>
            ))}
          </div>
          <button className='goRight' onClick={goRight} aria-label="Next">&#8594;</button>
          <div className='testimonial-dots'>
            {testimonials.map((_, i) => (
              <span
                key={i}
                onClick={() => setActiveIdx(i)}
                style={{
                  background: i === activeIdx ? '#0044cc' : '#e5e5e5',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <header ref={headerRef} className='wrapper floating_header'>
        <div className="container">
          <div className="wrapper container_inner">
            <a href="/" className="logo">
              <img 
                src={`${process.env.PUBLIC_URL}/vecter-white.png`}   
                alt="Vecter"          
              />
              VECTER
            </a>
            <div className="nav-links">
              <a href="#services">Services</a>
              <a href="#process">Our Process</a>
              <a href="#enterprise">Enterprise Governance</a>
              <a href="#cases">Case Studies</a>
              <a href="#contact" className="cnt-btn">Start Your AI Journey</a>
            </div>
          </div>
        </div>
      </header>

      <main className='wrapper '>
        <div className="wrapper hero">
          <div className="container">
            <div className='wrapper'>
              <h1>The Infrastructure of AI Automation in Australia.</h1>
              <h6 className="tagline">Deploy. Secure. Scale.</h6>
              <p>Based in Sydney, we empower mid-market and enterprise businesses with AI strategy, governance, agent building, and automation consulting. Bridge the gap from AI hype to real revenue—securely and compliantly.</p>
              <div className="hero-actions">
                <a href="#services" className="btn btn-outline">Explore Services</a>
                <a href="#enterprise" className="btn btn-highlight">Book a Free Assessment</a>
              </div>
            </div>
          </div>
        </div>

        <div className="wrapper problem-section dark-bg">
          <div className="container">
            <div className="wrapper">
              <div
                className="problem-graphic"
                ref={useScrollReveal({ direction: 'left' })}
              >
                <svg width="100%" height="320" viewBox="0 0 420 320" xmlns="http://www.w3.org/2000/svg">
                  {/* Background grid lines - shifted right */}
                  <g stroke="#e5e5e5" strokeWidth="1">
                    <line x1="80" y1="20" x2="80" y2="270" />   {/* Y-axis */}
                    <line x1="80" y1="270" x2="380" y2="270" /> {/* X-axis */}
                    {/* Horizontal grid */}
                    <line x1="80" y1="220" x2="380" y2="220" />
                    <line x1="80" y1="170" x2="380" y2="170" />
                    <line x1="80" y1="120" x2="380" y2="120" />
                    <line x1="80" y1="70" x2="380" y2="70" />
                    {/* Vertical grid */}
                    <line x1="130" y1="270" x2="130" y2="20" />
                    <line x1="180" y1="270" x2="180" y2="20" />
                    <line x1="230" y1="270" x2="230" y2="20" />
                    <line x1="280" y1="270" x2="280" y2="20" />
                    <line x1="330" y1="270" x2="330" y2="20" />
                    <line x1="380" y1="270" x2="380" y2="20" />
                  </g>
                  
                  {/* Data line - adjusted points to match new coordinates */}
                  <polyline 
                    points="80,270 130,220 180,170 230,120 280,70 330,40 380,30" 
                    fill="none" 
                    stroke="#0044cc" 
                    strokeWidth="3" 
                  />
                  
                  {/* X-axis labels (Months) */}
                  <text x="80" y="290" fontSize="13" fill="#666">0</text>
                  <text x="130" y="290" fontSize="13" fill="#666">1</text>
                  <text x="180" y="290" fontSize="13" fill="#666">2</text>
                  <text x="230" y="290" fontSize="13" fill="#666">3</text>
                  <text x="280" y="290" fontSize="13" fill="#666">4</text>
                  <text x="330" y="290" fontSize="13" fill="#666">5</text>
                  <text x="380" y="290" fontSize="13" fill="#666">6 Months</text>
                  
                  {/* Y-axis labels (ROI %) */}
                  <text x="40" y="270" fontSize="13" fill="#666" textAnchor="end">0%</text>
                  <text x="40" y="220" fontSize="13" fill="#666" textAnchor="end">20%</text>
                  <text x="40" y="170" fontSize="13" fill="#666" textAnchor="end">40%</text>
                  <text x="40" y="120" fontSize="13" fill="#666" textAnchor="end">60%</text>
                  <text x="40" y="70" fontSize="13" fill="#666" textAnchor="end">80%</text>
                  <text x="40" y="30" fontSize="13" fill="#666" textAnchor="end">100%</text>
                  
                  {/* Axis titles */}
                  <text x="200" y="310" fontSize="14" fill="#111" textAnchor="middle">Time (Months)</text>
                  <text 
                    x="15" 
                    y="170" 
                    fontSize="14" 
                    fill="#111" 
                    textAnchor="middle"
                    transform="rotate(-90 15 170)"
                  >
                    Efficiency / ROI (%)
                  </text>
                  
                  {/* Title */}
                  <text x="210" y="25" fontSize="15" fill="#0044cc" textAnchor="middle">Your AI Growth Trajectory</text>
                </svg>
              </div>

              <div
                className="problem-content"
                ref={useScrollReveal({ direction: 'right' })}
              >
                <h3>Powerful AI is Useless Without Strategy and Control.</h3>
                <p>Open-source tools and agents demand secure environments, API management, and ongoing governance—especially under Australian regulations like the Voluntary AI Safety Standard.</p>
                <p><strong>The Automation Delta:</strong><br />Manual Execution: $45/hr (Human Cost)<br />Vecter Agent: $0.04/task (Compute Cost)<br />Setup Time: 24 Hours.<br />Achieve up to 497% ROI on projects, as seen in similar Australian implementations.</p>
                <p>We don't replace your team. We give them superpowers. Vecter provides the strategy, secure infrastructure, and governance you need for ethical, scalable AI adoption.</p>
              </div>
            </div>
          </div>
        </div>

        <div id="services" className="wrapper services-section">
          <div className="container">
            <div className='wrapper'>
            <div
              className="section-header"
              ref={useScrollReveal({ direction: 'top' })}
            >
              <h2>Our AI Consulting Services</h2>
              <p style={{ color: 'var(--secondary-text)' }}>Tailored for Australian businesses. Launch secure AI solutions in under 48 hours. From strategy to agents—deploy, secure, scale.</p>
            </div>
            
            <div className="grid-container">
              <div className="service-card" ref={useScrollReveal({ direction: 'right' })}>
                <h4>AI Strategy & Roadmap</h4>
                <p>Develop a custom AI roadmap aligned with your goals. Includes readiness assessments and quick-win identification.</p>
                <a href="#" className="btn btn-outline">Get Started &rarr;</a>
              </div>
              <div className="service-card" ref={useScrollReveal({ direction: 'left' })}>
                <h4>AI Governance & Risk</h4>
                <p>Build ethical frameworks, compliance checks, and risk management. Ensure secure, transparent AI under AU standards.</p>
                <a href="#" className="btn btn-outline">Configure &rarr;</a>
              </div>
              <div className="service-card" ref={useScrollReveal({ direction: 'right' })}>
                <h4>Custom AI Agents</h4>
                <p>Design and deploy intelligent agents for automation, decision-making, and workflows. Integrate with Microsoft Azure or AWS.</p>
                <a href="#" className="btn btn-outline">Build Now &rarr;</a>
              </div>
              <div className="service-card" ref={useScrollReveal({ direction: 'left' })}>
                <h4>Automation Implementation</h4>
                <p>Streamline operations with AI-powered workflows, integrations, and optimizations. Focus on efficiency gains.</p>
                <a href="#" className="btn btn-outline">Automate &rarr;</a>
              </div>
              <div className="service-card" ref={useScrollReveal({ direction: 'right' })}>
                <h4>Training & Adoption</h4>
                <p>Hands-on training for your team, plus ongoing support. Includes AI upskilling and change management.</p>
                <a href="#" className="btn btn-outline">Train Team &rarr;</a>
              </div>
              <div className="service-card" ref={useScrollReveal({ direction: 'left' })}>
                <h4>Cost & ROI Dashboard</h4>
                <p>Monitor AI costs, usage, and returns. Prevent overruns and track value.</p>
                <a href="#" className="btn btn-outline">Monitor &rarr;</a>
              </div>
            </div>
          </div>
          </div>
        </div>

        {/* <div id="process" className="process-section" style={{ padding: '100px 0', background: '#fafafa' }}>
          <div className="container">
            <h2>Our Proven AI Consulting Process</h2>
            <p>Inspired by industry leaders like Matrix AI's START framework and OfficePro's step-by-step delivery.</p>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li><strong>Discover:</strong> Free readiness assessment to identify opportunities.</li>
              <li><strong>Design:</strong> Tailored strategy, governance, and agent blueprints.</li>
              <li><strong>Deploy:</strong> Secure implementation with integrations.</li>
              <li><strong>Optimize:</strong> Ongoing monitoring, training, and scaling.</li>
            </ul>
          </div>
        </div> */}
        <div id="process" className="wrapper process-section dark-bg">
          <div className="container">
            <div className="wrapper">
              <div className="process-title">
                <h2 ref={useScrollReveal({ direction: 'top' })}>Our Proven AI Consulting Process</h2>
                <p ref={useScrollReveal({ direction: 'top' })}>Inspired by industry leaders our step-by-step delivery.</p>
              </div>
              <TimelineProgress/>
            </div>
          </div>
        </div>

        <div id="enterprise" className="wrapper enterprise-section">
          <div className="container">
          <div className="wrapper enterprise-content">
            <div ref={useScrollReveal({ direction: 'left' })}>
              <h2>Enterprise AI Governance Protocol.</h2>
              <p className='wrapper'>For Australian enterprises needing robust AI. We architect secure, compliant systems with human-in-the-loop safeguards.</p>
              <div className='wrapper'>
              <a href="/" className="btn btn-primary">Request Free Audit</a>
                </div>
            </div>
            <div ref={useScrollReveal({ direction: 'right' })}>
              <ul className="enterprise-list">
                <li><span className="check">01 /</span><div><strong>Ethical AI Frameworks</strong><br /><span style={{ color: '#666', fontSize: '14px' }}>Compliant with AU standards, no public data training.</span></div></li>
                <li><span className="check">02 /</span><div><strong>Human Oversight</strong><br /><span style={{ color: '#666', fontSize: '14px' }}>Approval gates for decisions (inspired by OfficePro).</span></div></li>
                <li><span className="check">03 /</span><div><strong>Audit & Transparency</strong><br /><span style={{ color: '#666', fontSize: '14px' }}>Full logging for accountability (from AI Consulting Group).</span></div></li>
              </ul>
            </div>
          </div>
          </div>
        </div>

        {/* <div id="cases" className="cases-section" style={{ padding: '100px 0' }}>
          <div className="container">
            <h2>Client Success Stories</h2>
            <p>Placeholders inspired by real testimonials from peers like Advancer and Dear Watson.</p>
            <div className="grid-container">
              <div className="service-card"><p>"Vecter's AI agents transformed our workflows—497% ROI in 6 months!" – Retail Client, Melbourne</p></div>
              <div className="service-card"><p>"Secure governance gave us confidence to scale AI ethically." – Finance Firm, Sydney</p></div>
            </div>
          </div>
        </div> */}
        
        <div className="wrapper trust-bar dark-bg">
          <div className="container">
            <div className="wrapper">
              <h3 className='wrapper' ref={useScrollReveal({ direction: 'top' })}>Powered by Trusted Partners:</h3>
              <div className="wrapper trust-bar-card">
                <div ref={useScrollReveal({ direction: 'zoomIn' })}>
                  <img src={azureLogo} alt='Microsoft Azure' />
                  <span>Microsoft Azure</span>
                </div>
                <div ref={useScrollReveal({ direction: 'zoomIn' })}>
                  <img src={openaiLogo} alt='OpenAI' />
                  <span>OpenAI</span>
                </div>
                <div ref={useScrollReveal({ direction: 'zoomIn' })}>
                  <img src={anthropicLogo} alt='Anthropic' />
                  <span>Anthropic</span>
                </div>
                <div ref={useScrollReveal({ direction: 'zoomIn' })}>
                  <img src={langchainLogo} alt='LangChain' />
                  <span>LangChain</span>
                </div>
                <div ref={useScrollReveal({ direction: 'zoomIn' })}>
                  <img src={pineconeLogo} alt='Pinecone' />
                  <span>Pinecone</span>
                </div>
                <div ref={useScrollReveal({ direction: 'zoomIn' })}>
                  <img src={awsLogo} alt='AWS' /> 
                  <span>AWS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="cases" className="wrapper cases-section">
          <div className="container">
            <div className="wrapper">
              <h2>Client Success Stories</h2>
              <p>Placeholders inspired by real testimonials from peers.</p>
              <TestimonialCarousel />
            </div>
          </div>
        </div>
      </main>
      
      <footer className='wrapper'>
        <div className="container">
          <div className="wrapper">
            <p>Central Coast, Australia. © 2026 Vecter AI Consulting.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;