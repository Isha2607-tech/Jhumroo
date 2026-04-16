import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiPlay, 
  FiSmartphone, 
  FiUsers, 
  FiZap, 
  FiLayers, 
  FiShield, 
  FiGlobe,
  FiArrowRight,
  FiDownload,
  FiInstagram,
  FiTwitter,
  FiYoutube,
  FiX
} from 'react-icons/fi';
import './WebsiteLandingPage.css';

const WebsiteLandingPage = () => {
  const [isTermsOpen, setIsTermsOpen] = React.useState(false);

  useEffect(() => {
    document.body.classList.add('app-website-route');
    return () => {
      document.body.classList.remove('app-website-route');
    };
  }, []);

  return (
    <div className="website-landing">
      {/* Terms Modal */}
      {isTermsOpen && (
        <div className="w-modal-overlay" onClick={() => setIsTermsOpen(false)}>
          <div className="w-modal-container" onClick={e => e.stopPropagation()}>
            <div className="w-modal-header">
              <h2>Terms & Conditions</h2>
              <div className="w-modal-close" onClick={() => setIsTermsOpen(false)}>
                <FiX />
              </div>
            </div>
            <div className="w-modal-body">
              <p>Welcome to Jhumroo. By using our platform, you agree to the following terms and conditions. Please read them carefully.</p>
              
              <h3>1. General Terms</h3>
              <p>Jhumroo is a creative platform for short-form video content. Users are responsible for the content they post and must ensure it complies with local laws and our community guidelines.</p>
              
              <h3>2. User Content</h3>
              <p>You retain ownership of the content you create, but by posting on Jhumroo, you grant us a worldwide, non-exclusive license to use, display, and distribute your content within the platform.</p>
              
              <h3>3. Prohibited Conduct</h3>
              <p>Users are strictly prohibited from posting content that is illegal, harmful, threatening, abusive, harassing, defamatory, or otherwise objectionable.</p>
              
              <h3>4. Privacy</h3>
              <p>Your privacy is important to us. Please refer to our Privacy Policy section for details on how we handle your personal data.</p>
              
              <h3>5. Modifications</h3>
              <p>We reserve the right to modify these terms at any time. Continued use of the platform after changes constitutes acceptance of the new terms.</p>
              
              <div className="w-hero-actions" style={{ marginTop: '40px' }}>
                 <button className="w-btn-primary" onClick={() => setIsTermsOpen(false)} style={{ width: '100%' }}>I Accept These Terms</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="w-nav">
        <Link to="/" className="w-logo">
          <div className="w-logo-box">
            <img src="/src/assets/loginPage/Logo.png" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          Jhumroo
        </Link>
        <div className="w-nav-links">
          <a href="#features" className="w-nav-link">Features</a>
          <a href="#about" className="w-nav-link">About</a>
          <div className="w-nav-link" style={{ cursor: 'pointer' }} onClick={() => setIsTermsOpen(true)}>Terms & Conditions</div>
          <Link to="/login" className="w-btn-primary">Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="w-hero">
        <div className="w-hero-content">
          <div className="w-hero-badge">✨ Next Generation Entertainment</div>
          <h1 className="w-hero-title">
            <span>CREATE.</span>
            <span>CONNECT.</span>
            <span style={{ color: 'var(--w-lavender-primary)' }}>SHINE.</span>
          </h1>
          <p className="w-hero-desc">
            Experience the world's most dynamic short-video community. 
            From viral trends to niche passions, Jhumroo is where your 
            creativity finds its home and your voice finds an audience.
          </p>
          <div className="w-hero-actions">
            <Link to="/signup" className="w-btn-primary" style={{ padding: '16px 40px', fontSize: '16px' }}>
              Join Jhumroo Now
            </Link>
            <a href="#features" className="w-app-btn" style={{ background: 'transparent', border: '1px solid rgba(0,0,0,0.1)' }}>
              Explore Features <FiArrowRight />
            </a>
          </div>
        </div>

        <div className="w-hero-visual">
          {/* Floating Cards for premium feel */}
          <div className="w-floating-card w-card-1">
            <div style={{ padding: '8px', background: 'var(--w-lavender-soft)', borderRadius: '10px' }}>
              <FiPlay size={20} color="var(--w-lavender-primary)" />
            </div>
            <div>
              <div style={{ fontWeight: '700', fontSize: '14px' }}>1.2M+ Views</div>
              <div style={{ fontSize: '12px', opacity: 0.5 }}>Trending Now</div>
            </div>
          </div>

          <div className="w-floating-card w-card-2">
            <FiUsers size={24} color="var(--w-lavender-primary)" />
            <div style={{ fontWeight: '700' }}>Live Stream</div>
          </div>

          <div className="w-main-img-container">
            <img 
              src="/src/assets/jhumroo_hero.png" 
              alt="Hero" 
              className="w-hero-img" 
            />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="w-features">
        <div className="w-section-header">
          <h2 className="w-section-title">Designed for Creators</h2>
          <p style={{ opacity: 0.5, fontSize: '18px', marginTop: '16px' }}>Everything you need to grow your digital presence.</p>
        </div>

        <div className="w-features-grid">
          <div className="w-feature-card">
            <div className="w-f-icon"><FiZap /></div>
            <h3 className="w-f-title">Ultra-Fast Editing</h3>
            <p className="w-f-desc">Create professional quality content in seconds with our intuitive, lightning-fast editor and massive effects library.</p>
          </div>

          <div className="w-feature-card">
            <div className="w-f-icon"><FiLayers /></div>
            <h3 className="w-f-title">Immersive Effects</h3>
            <p className="w-f-desc">Access thousands of AR filters, royalty-free music, and dynamic transitions to make your content stand out from the crowd.</p>
          </div>

          <div className="w-feature-card">
            <div className="w-f-icon"><FiGlobe /></div>
            <h3 className="w-f-title">Global REACH</h3>
            <p className="w-f-desc">Our intelligent algorithm ensures your content reaches the right audience, helping you build a loyal global community.</p>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="w-about">
        <div className="w-about-bg-text">
          <span>JHUMROO</span>
          <span>THE BEST APP</span>
        </div>
        <div className="w-about-content">
          <div className="w-about-image-container">
            <img 
              src="/src/assets/landing.png" 
              alt="About Jhumroo" 
              className="w-about-img" 
            />
          </div>
          <div className="w-about-info">
            <span className="w-about-label">About Us</span>
            <h2 className="w-about-title">Revolutionizing Digital Creativity</h2>
            <p className="w-about-text">
              Jhumroo is a leading short-video platform dedicated to empowering individual creators. 
              We believe in giving everyone a stage to showcase their unique talents to the world.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-cta">
        <div className="w-cta-card">
          <h2 className="w-cta-title">Ready to start your journey?</h2>
          <p style={{ fontSize: '20px', marginBottom: '40px', opacity: 0.8 }}>Download Jhumroo today and become part of the future.</p>
          <div className="w-cta-apps">
            <a href="#" className="w-app-btn">
              <FiSmartphone size={24} />
              App Store
            </a>
            <a href="#" className="w-app-btn">
              <FiDownload size={24} />
              Google Play
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-footer">
        <div className="w-footer-brand">
          <Link to="/" className="w-logo">
            <div className="w-logo-box">
              <img src="/src/assets/loginPage/Logo.png" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            Jhumroo
          </Link>
          <p>The premier short-video platform for the next generation of creative minds.</p>
          <div style={{ display: 'flex', gap: '20px', marginTop: '30px' }}>
            <FiInstagram size={20} style={{ cursor: 'pointer' }} />
            <FiTwitter size={20} style={{ cursor: 'pointer' }} />
            <FiYoutube size={20} style={{ cursor: 'pointer' }} />
          </div>
        </div>
        
        <div className="w-footer-col">
          <h4>Platform</h4>
          <div className="w-footer-links">
            <a href="#features" className="w-footer-link">How it works</a>
            <a href="#features" className="w-footer-link">Creator Fund</a>
            <a href="#features" className="w-footer-link">Safety Center</a>
          </div>
        </div>

        <div className="w-footer-col">
          <h4>Support</h4>
          <div className="w-footer-links">
            <a href="#" className="w-footer-link">Help Center</a>
            <a href="#" className="w-footer-link">Community Guidelines</a>
            <a href="#" className="w-footer-link">Contact Us</a>
          </div>
        </div>

        <div className="w-footer-col">
          <h4>Company</h4>
          <div className="w-footer-links">
            <a href="#about" className="w-footer-link">About Us</a>
            <div className="w-footer-link" style={{ cursor: 'pointer' }} onClick={() => setIsTermsOpen(true)}>Privacy Policy</div>
            <div className="w-footer-link" style={{ cursor: 'pointer' }} onClick={() => setIsTermsOpen(true)}>Terms of Service</div>
          </div>
        </div>
      </footer>

      <div className="w-footer-bottom">
        <div>© 2026 Jhumroo. All Rights Reserved.</div>
        <div className="w-powered-by">
          Powered by <strong>Vrushahi Holiday Inn</strong>
        </div>
      </div>
    </div>
  );
};

export default WebsiteLandingPage;
