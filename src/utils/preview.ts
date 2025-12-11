// Purpose: Generate preview HTML for the live preview iframe
import { GeneratedOutput } from '../types'

/**
 * Generate a complete HTML page for the live preview
 */
export function generatePreviewHTML(output: GeneratedOutput): string {
    const { parsedIntent } = output
    const isDark = parsedIntent.theme === 'dark' || parsedIntent.theme === 'amazon'

    // Generate inline styles
    const styles = generatePreviewStyles(parsedIntent.primaryColor, isDark)

    // Generate component HTML
    const navHTML = generateNavPreview(parsedIntent.siteName, isDark)
    const heroHTML = parsedIntent.sections.includes('hero')
        ? generateHeroPreview(parsedIntent.siteName, parsedIntent.cta?.primary || 'Get Started', isDark)
        : ''
    const featuresHTML = parsedIntent.sections.includes('features') && parsedIntent.features
        ? generateFeaturesPreview(parsedIntent.features, isDark)
        : ''
    const pricingHTML = parsedIntent.sections.includes('pricing') && parsedIntent.pricingTiers
        ? generatePricingPreview(parsedIntent.pricingTiers, isDark)
        : ''
    const ctaHTML = parsedIntent.sections.includes('cta')
        ? generateCTAPreview(parsedIntent.cta?.primary || 'Get Started', isDark)
        : ''
    const contactHTML = parsedIntent.sections.includes('contact')
        ? generateContactPreview(isDark)
        : ''
    const footerHTML = generateFooterPreview(parsedIntent.siteName, isDark)

    return `<!DOCTYPE html>
<html lang="en" class="${isDark ? 'dark' : ''}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${parsedIntent.siteName} - Preview</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>${styles}</style>
</head>
<body class="${isDark ? 'dark' : ''}">
  ${navHTML}
  ${heroHTML}
  ${featuresHTML}
  ${pricingHTML}
  ${ctaHTML}
  ${contactHTML}
  ${footerHTML}
</body>
</html>`
}

function generatePreviewStyles(primaryColor: string, isDark: boolean): string {
    return `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Inter', system-ui, sans-serif;
      background: ${isDark ? '#111827' : '#ffffff'};
      color: ${isDark ? '#f3f4f6' : '#111827'};
      line-height: 1.6;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }
    
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      border-radius: 0.5rem;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.2s;
      cursor: pointer;
      border: none;
    }
    
    .btn-primary {
      background: ${primaryColor};
      color: white;
    }
    
    .btn-primary:hover {
      filter: brightness(1.1);
    }
    
    .btn-secondary {
      background: transparent;
      border: 2px solid ${isDark ? '#374151' : '#e5e7eb'};
      color: ${isDark ? '#f3f4f6' : '#111827'};
    }
    
    /* Nav */
    .nav {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 50;
      background: ${isDark ? 'rgba(17, 24, 39, 0.95)' : 'rgba(255, 255, 255, 0.95)'};
      backdrop-filter: blur(8px);
      border-bottom: 1px solid ${isDark ? '#1f2937' : '#e5e7eb'};
    }
    
    .nav-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 4rem;
    }
    
    .nav-logo {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 700;
      font-size: 1.25rem;
      color: ${isDark ? '#f3f4f6' : '#111827'};
      text-decoration: none;
    }
    
    .nav-logo-icon {
      width: 2rem;
      height: 2rem;
      background: ${primaryColor};
      border-radius: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 700;
    }
    
    .nav-links {
      display: flex;
      align-items: center;
      gap: 2rem;
      list-style: none;
    }
    
    .nav-links a {
      color: ${isDark ? '#9ca3af' : '#6b7280'};
      text-decoration: none;
      transition: color 0.2s;
    }
    
    .nav-links a:hover {
      color: ${isDark ? '#f3f4f6' : '#111827'};
    }
    
    /* Hero */
    .hero {
      padding: 8rem 0 4rem;
      text-align: center;
      background: ${isDark
            ? 'linear-gradient(to bottom, #111827, #1f2937)'
            : 'linear-gradient(to bottom, #f9fafb, #ffffff)'};
    }
    
    .hero h1 {
      font-size: clamp(2.5rem, 5vw, 4rem);
      font-weight: 800;
      line-height: 1.1;
      margin-bottom: 1.5rem;
    }
    
    .hero h1 span {
      color: ${primaryColor};
    }
    
    .hero p {
      font-size: 1.25rem;
      color: ${isDark ? '#9ca3af' : '#6b7280'};
      max-width: 600px;
      margin: 0 auto 2rem;
    }
    
    .hero-buttons {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      flex-wrap: wrap;
    }
    
    /* Features */
    .features {
      padding: 5rem 0;
      background: ${isDark ? '#1f2937' : '#f9fafb'};
    }
    
    .section-header {
      text-align: center;
      margin-bottom: 3rem;
    }
    
    .section-header h2 {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }
    
    .section-header p {
      color: ${isDark ? '#9ca3af' : '#6b7280'};
      font-size: 1.125rem;
    }
    
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
    }
    
    .feature-card {
      background: ${isDark ? '#111827' : '#ffffff'};
      border: 1px solid ${isDark ? '#374151' : '#e5e7eb'};
      border-radius: 1rem;
      padding: 1.5rem;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    
    .feature-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
    }
    
    .feature-icon {
      width: 3rem;
      height: 3rem;
      background: ${primaryColor}20;
      border-radius: 0.75rem;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1rem;
      color: ${primaryColor};
      font-size: 1.5rem;
    }
    
    .feature-card h3 {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
    
    .feature-card p {
      color: ${isDark ? '#9ca3af' : '#6b7280'};
    }
    
    /* Pricing */
    .pricing {
      padding: 5rem 0;
      background: ${isDark ? '#111827' : '#ffffff'};
    }
    
    .pricing-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
      max-width: 1000px;
      margin: 0 auto;
    }
    
    .pricing-card {
      background: ${isDark ? '#1f2937' : '#ffffff'};
      border: 1px solid ${isDark ? '#374151' : '#e5e7eb'};
      border-radius: 1rem;
      padding: 2rem;
      text-align: center;
      position: relative;
    }
    
    .pricing-card.highlighted {
      border-color: ${primaryColor};
      transform: scale(1.05);
    }
    
    .pricing-badge {
      position: absolute;
      top: -0.75rem;
      left: 50%;
      transform: translateX(-50%);
      background: ${primaryColor};
      color: white;
      font-size: 0.75rem;
      font-weight: 600;
      padding: 0.25rem 1rem;
      border-radius: 9999px;
    }
    
    .pricing-card h3 {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }
    
    .pricing-price {
      font-size: 3rem;
      font-weight: 800;
      margin: 1rem 0;
    }
    
    .pricing-price span {
      font-size: 1rem;
      font-weight: 400;
      color: ${isDark ? '#9ca3af' : '#6b7280'};
    }
    
    .pricing-features {
      list-style: none;
      text-align: left;
      margin: 1.5rem 0;
    }
    
    .pricing-features li {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 0;
      color: ${isDark ? '#d1d5db' : '#4b5563'};
    }
    
    .pricing-features li::before {
      content: '✓';
      color: ${primaryColor};
      font-weight: 600;
    }
    
    /* CTA */
    .cta {
      padding: 5rem 0;
      background: ${primaryColor};
      text-align: center;
    }
    
    .cta h2 {
      font-size: 2.5rem;
      font-weight: 700;
      color: white;
      margin-bottom: 1rem;
    }
    
    .cta p {
      font-size: 1.25rem;
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 2rem;
    }
    
    .cta .btn-primary {
      background: white;
      color: ${primaryColor};
    }
    
    /* Contact */
    .contact {
      padding: 5rem 0;
      background: ${isDark ? '#1f2937' : '#f9fafb'};
    }
    
    .contact-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 3rem;
    }
    
    .contact-form {
      background: ${isDark ? '#111827' : '#ffffff'};
      border: 1px solid ${isDark ? '#374151' : '#e5e7eb'};
      border-radius: 1rem;
      padding: 2rem;
    }
    
    .form-group {
      margin-bottom: 1.5rem;
    }
    
    .form-group label {
      display: block;
      font-weight: 500;
      margin-bottom: 0.5rem;
    }
    
    .form-group input,
    .form-group textarea {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 1px solid ${isDark ? '#374151' : '#d1d5db'};
      border-radius: 0.5rem;
      background: ${isDark ? '#1f2937' : '#ffffff'};
      color: ${isDark ? '#f3f4f6' : '#111827'};
      font-family: inherit;
    }
    
    .form-group textarea {
      min-height: 120px;
      resize: vertical;
    }
    
    /* Footer */
    .footer {
      padding: 3rem 0;
      background: ${isDark ? '#111827' : '#f9fafb'};
      border-top: 1px solid ${isDark ? '#1f2937' : '#e5e7eb'};
      text-align: center;
      color: ${isDark ? '#6b7280' : '#9ca3af'};
    }
    
    @media (max-width: 768px) {
      .nav-links {
        display: none;
      }
      
      .hero h1 {
        font-size: 2rem;
      }
      
      .pricing-card.highlighted {
        transform: none;
      }
    }
  `
}

function generateNavPreview(siteName: string, isDark: boolean): string {
    return `
    <nav class="nav">
      <div class="container nav-content">
        <a href="#" class="nav-logo">
          <div class="nav-logo-icon">${siteName.charAt(0)}</div>
          ${siteName}
        </a>
        <ul class="nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">Features</a></li>
          <li><a href="#">Pricing</a></li>
          <li><a href="#">Contact</a></li>
          <li><a href="#" class="btn btn-primary">Get Started</a></li>
        </ul>
      </div>
    </nav>
  `
}

function generateHeroPreview(siteName: string, cta: string, isDark: boolean): string {
    return `
    <section class="hero">
      <div class="container">
        <h1>${siteName}<br><span>The Future Starts Here</span></h1>
        <p>Transform your business with our cutting-edge solutions. Built for performance, designed for success.</p>
        <div class="hero-buttons">
          <a href="#" class="btn btn-primary">${cta} →</a>
          <a href="#" class="btn btn-secondary">▶ See How It Works</a>
        </div>
      </div>
    </section>
  `
}

function generateFeaturesPreview(features: { title: string; description: string }[], isDark: boolean): string {
    const featureCards = features.map(f => `
    <div class="feature-card">
      <div class="feature-icon">⚡</div>
      <h3>${f.title}</h3>
      <p>${f.description}</p>
    </div>
  `).join('')

    return `
    <section class="features">
      <div class="container">
        <div class="section-header">
          <h2>Everything you need to succeed</h2>
          <p>Powerful features designed to help you achieve your goals</p>
        </div>
        <div class="features-grid">
          ${featureCards}
        </div>
      </div>
    </section>
  `
}

function generatePricingPreview(tiers: { name: string; price: number; period: string; features: string[]; highlighted?: boolean }[], isDark: boolean): string {
    const pricingCards = tiers.map(tier => `
    <div class="pricing-card ${tier.highlighted ? 'highlighted' : ''}">
      ${tier.highlighted ? '<div class="pricing-badge">Most Popular</div>' : ''}
      <h3>${tier.name}</h3>
      <div class="pricing-price">${tier.price === 0 ? 'Free' : `$${tier.price}`}<span>/${tier.period}</span></div>
      <ul class="pricing-features">
        ${tier.features.slice(0, 4).map(f => `<li>${f}</li>`).join('')}
      </ul>
      <button class="btn btn-primary" style="width: 100%">Get Started</button>
    </div>
  `).join('')

    return `
    <section class="pricing">
      <div class="container">
        <div class="section-header">
          <h2>Simple, transparent pricing</h2>
          <p>Choose the plan that's right for you</p>
        </div>
        <div class="pricing-grid">
          ${pricingCards}
        </div>
      </div>
    </section>
  `
}

function generateCTAPreview(cta: string, isDark: boolean): string {
    return `
    <section class="cta">
      <div class="container">
        <h2>Ready to get started?</h2>
        <p>Join thousands of satisfied customers and take your business to the next level.</p>
        <a href="#" class="btn btn-primary">${cta} →</a>
      </div>
    </section>
  `
}

function generateContactPreview(isDark: boolean): string {
    return `
    <section class="contact">
      <div class="container">
        <div class="section-header">
          <h2>Get in touch</h2>
          <p>Have a question? We'd love to hear from you.</p>
        </div>
        <div class="contact-grid">
          <div>
            <h3 style="margin-bottom: 1rem;">Contact Information</h3>
            <p style="margin-bottom: 0.5rem;">📧 hello@example.com</p>
            <p style="margin-bottom: 0.5rem;">📞 +1 (555) 000-0000</p>
            <p>📍 San Francisco, CA</p>
          </div>
          <form class="contact-form">
            <div class="form-group">
              <label>Name</label>
              <input type="text" placeholder="Your name">
            </div>
            <div class="form-group">
              <label>Email</label>
              <input type="email" placeholder="you@example.com">
            </div>
            <div class="form-group">
              <label>Message</label>
              <textarea placeholder="Your message..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  `
}

function generateFooterPreview(siteName: string, isDark: boolean): string {
    const year = new Date().getFullYear()
    return `
    <footer class="footer">
      <div class="container">
        <p>© ${year} ${siteName}. All rights reserved.</p>
      </div>
    </footer>
  `
}
