import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './HomePage.module.css'

/* ── Animated counter ── */
function Counter({ target, suffix = '', duration = 1800 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        let start = 0
        const step = target / (duration / 16)
        const timer = setInterval(() => {
          start += step
          if (start >= target) { setCount(target); clearInterval(timer) }
          else setCount(Math.floor(start))
        }, 16)
      }
    }, { threshold: 0.3 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

/* ── Feature card ── */
function Feature({ icon, title, desc }) {
  return (
    <div className={styles.featureCard}>
      <div className={styles.featureIcon}>{icon}</div>
      <h3 className={styles.featureTitle}>{title}</h3>
      <p className={styles.featureDesc}>{desc}</p>
    </div>
  )
}

/* ── Step ── */
function Step({ num, title, desc }) {
  return (
    <div className={styles.step}>
      <div className={styles.stepNum}>{num}</div>
      <div>
        <h4 className={styles.stepTitle}>{title}</h4>
        <p className={styles.stepDesc}>{desc}</p>
      </div>
    </div>
  )
}

export default function HomePage() {
  const heroRef = useRef(null)

  useEffect(() => {
    // Fade-in stagger on section elements
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add(styles.visible)
      })
    }, { threshold: 0.1 })

    document.querySelectorAll(`.${styles.reveal}`).forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className={styles.page}>

      {/* ── NAV ── */}
      <nav className={styles.nav}>
        <div className={styles.navInner}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>🍽️</span>
            <span className={styles.logoText}>RestroCloud</span>
          </div>
          <div className={styles.navLinks}>
            <a href="#features" className={styles.navLink}>Features</a>
            <a href="#how" className={styles.navLink}>How it works</a>
            <a href="#developer" className={styles.navLink}>Developer</a>
            <Link to="/login" className={styles.navLogin}>Sign in</Link>
            <Link to="/register" className={styles.navCta}>Get started</Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className={styles.hero} ref={heroRef}>
        <div className={styles.heroBg}>
          <div className={styles.heroBgCircle1} />
          <div className={styles.heroBgCircle2} />
        </div>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>Multi-Tenant Restaurant Platform</div>
          <h1 className={styles.heroTitle}>
            Run your restaurant.<br />
            <span className={styles.heroAccent}>Not your spreadsheets.</span>
          </h1>
          <p className={styles.heroSub}>
            RestroCloud gives every restaurant its own secure workspace — tables, menus, orders, 
            and billing, all in one place. Built for the real chaos of the floor.
          </p>
          <div className={styles.heroCtas}>
            <Link to="/register" className={styles.ctaPrimary}>Start for free →</Link>
            <Link to="/login" className={styles.ctaSecondary}>Sign in to your restaurant</Link>
          </div>
        </div>

        {/* Dashboard preview mockup */}
        <div className={styles.heroMockup}>
          <div className={styles.mockupBar}>
            <span className={styles.mockupDot} style={{ background: '#ff5f57' }} />
            <span className={styles.mockupDot} style={{ background: '#febc2e' }} />
            <span className={styles.mockupDot} style={{ background: '#28c840' }} />
            <span className={styles.mockupUrl}>restrocloud.app/dashboard</span>
          </div>
          <div className={styles.mockupBody}>
            <div className={styles.mockupSidebar}>
              {['Dashboard','Tables','Menu','Orders','Payments','Settings'].map(item => (
                <div key={item} className={`${styles.mockupSideItem} ${item === 'Orders' ? styles.mockupSideActive : ''}`}>
                  {item}
                </div>
              ))}
            </div>
            <div className={styles.mockupMain}>
              <div className={styles.mockupStats}>
                {[['12', 'Active Orders'], ['₹4,280', 'Today\'s Revenue'], ['18/24', 'Tables Occupied']].map(([v, l]) => (
                  <div key={l} className={styles.mockupStatCard}>
                    <div className={styles.mockupStatVal}>{v}</div>
                    <div className={styles.mockupStatLabel}>{l}</div>
                  </div>
                ))}
              </div>
              <div className={styles.mockupOrders}>
                {[['T-04', 'Paneer Tikka ×2, Naan ×4', 'PREPARING'],
                  ['T-11', 'Chicken Biryani ×1', 'PENDING'],
                  ['T-07', 'Masala Dosa ×3, Chai ×3', 'COMPLETED']].map(([t, items, status]) => (
                  <div key={t} className={styles.mockupOrderRow}>
                    <span className={styles.mockupTable}>{t}</span>
                    <span className={styles.mockupItems}>{items}</span>
                    <span className={`${styles.mockupStatus} ${styles['status_' + status]}`}>{status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className={styles.stats}>
        <div className={styles.statsGrid}>
          {[
            { target: 500, suffix: '+', label: 'Restaurants managed' },
            { target: 12000, suffix: '+', label: 'Orders processed' },
            { target: 99, suffix: '%', label: 'Uptime guaranteed' },
            { target: 3, suffix: ' min', label: 'Average setup time' },
          ].map(({ target, suffix, label }) => (
            <div key={label} className={styles.statItem}>
              <div className={styles.statNum}><Counter target={target} suffix={suffix} /></div>
              <div className={styles.statLabel}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section className={styles.problem}>
        <div className={styles.container}>
          <div className={`${styles.reveal} ${styles.problemContent}`}>
            <h2 className={styles.sectionTitle}>Managing a restaurant is already hard enough.</h2>
            <p className={styles.sectionSub}>
              Paper tickets get lost. WhatsApp order threads pile up. Staff track tables on sticky notes. 
              Your billing is a mess at close. RestroCloud replaces all of that — with one tool your whole 
              team actually uses.
            </p>
            <div className={styles.painPoints}>
              {[
                '❌  Orders misread or lost between kitchen and floor',
                '❌  No visibility into which tables are occupied right now',
                '❌  Manual billing errors cost money every single night',
                '❌  No record of what sold, what didn\'t, or why',
              ].map(p => (
                <div key={p} className={styles.painPoint}>{p}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className={styles.features} id="features">
        <div className={styles.container}>
          <div className={`${styles.reveal} ${styles.sectionHeader}`}>
            <h2 className={styles.sectionTitle}>Everything your restaurant needs</h2>
            <p className={styles.sectionSub}>From the first table booking to the final bill — all in one dashboard.</p>
          </div>
          <div className={`${styles.reveal} ${styles.featuresGrid}`}>
            <Feature
              icon="🏢"
              title="Multi-tenant isolation"
              desc="Each restaurant gets its own secure workspace. Your data never mixes with another restaurant's — ever."
            />
            <Feature
              icon="🪑"
              title="Live table management"
              desc="See which tables are free, occupied, or reserved. Update status with one tap — staff always see the same view."
            />
            <Feature
              icon="📋"
              title="Menu builder"
              desc="Add categories and items in minutes. Update prices and toggle availability without calling the developer."
            />
            <Feature
              icon="🛒"
              title="Order tracking"
              desc="Create orders, add items, and push status updates from PENDING → PREPARING → COMPLETED in real time."
            />
            <Feature
              icon="💳"
              title="Billing & payments"
              desc="Auto-generate invoices from completed orders. Track payment method and mark bills PAID with one click."
            />
            <Feature
              icon="🔐"
              title="Role-based access"
              desc="Owners get ADMIN access. Floor staff get STAFF access. Everyone sees only what they need."
            />
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className={styles.howSection} id="how">
        <div className={styles.container}>
          <div className={`${styles.reveal} ${styles.sectionHeader}`}>
            <h2 className={styles.sectionTitle}>Up and running in minutes</h2>
            <p className={styles.sectionSub}>No training session needed. If your staff can use a phone, they can use RestroCloud.</p>
          </div>
          <div className={`${styles.reveal} ${styles.stepsGrid}`}>
            <Step num="1" title="Register your restaurant" desc="Create your account in 30 seconds. Your restaurant gets its own isolated workspace instantly." />
            <Step num="2" title="Set up tables & menu" desc="Add your floor layout and full menu. Takes about 5 minutes. You can update anything anytime." />
            <Step num="3" title="Invite your team" desc="Add staff accounts with the right role. They log in and see exactly what they need — nothing more." />
            <Step num="4" title="Start taking orders" desc="Open RestroCloud on any device at the start of service. Orders flow from table to kitchen to billing automatically." />
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className={styles.ctaBanner}>
        <div className={styles.ctaBannerInner}>
          <h2 className={styles.ctaBannerTitle}>Your restaurant deserves better tools.</h2>
          <p className={styles.ctaBannerSub}>Free to start. No credit card required.</p>
          <div className={styles.ctaBannerButtons}>
            <Link to="/register" className={styles.ctaPrimary}>Create your restaurant →</Link>
            <Link to="/login" className={styles.ctaSecondaryLight}>Already have an account? Sign in</Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER / DEVELOPER ── */}
      <footer className={styles.footer} id="developer">
        <div className={styles.footerInner}>
          <div className={styles.footerLeft}>
            <div className={styles.footerLogo}>
              <span className={styles.logoIcon}>🍽️</span>
              <span className={styles.logoText}>RestroCloud</span>
            </div>
            <p className={styles.footerTagline}>
              A cloud-ready multi-tenant restaurant management system.<br />
              Built with Spring Boot, MySQL, JWT, and React.
            </p>
            <div className={styles.techBadges}>
              {['Java 17', 'Spring Boot', 'MySQL', 'JWT', 'React', 'Vite'].map(t => (
                <span key={t} className={styles.techBadge}>{t}</span>
              ))}
            </div>
          </div>

          <div className={styles.footerDev}>
            <div className={styles.devCard}>
              <div className={styles.devAvatar}>AJ</div>
              <div className={styles.devInfo}>
                <div className={styles.devLabel}>Built by</div>
                <div className={styles.devName}>Abhijeet Jha</div>
                <div className={styles.devRole}>BCA Student · Backend Developer</div>
                <div className={styles.devRole}>Java & Spring Boot Enthusiast</div>
              </div>
            </div>
            <div className={styles.devLinks}>
              <a
                href="mailto:abhijeetj4324@gmail.com"
                className={styles.devLink}
                target="_blank" rel="noreferrer"
              >
                <span className={styles.devLinkIcon}>✉️</span>
                <span>abhijeetj4324@gmail.com</span>
              </a>
              <a
                href="https://www.linkedin.com/in/abhijeet-jha19"
                className={styles.devLink}
                target="_blank" rel="noreferrer"
              >
                <span className={styles.devLinkIcon}>💼</span>
                <span>linkedin.com/in/abhijeet-jha19</span>
              </a>
              <a
                href="https://github.com/abhijeetIT"
                className={styles.devLink}
                target="_blank" rel="noreferrer"
              >
                <span className={styles.devLinkIcon}>🐙</span>
                <span>github.com/abhijeetIT</span>
              </a>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <span>© 2026 RestroCloud · Abhijeet Jha · All rights reserved</span>
          <span className={styles.footerBottomLinks}>
            <Link to="/login">Sign in</Link>
            <Link to="/register">Register</Link>
          </span>
        </div>
      </footer>

    </div>
  )
}
