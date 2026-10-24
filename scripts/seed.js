const { Client } = require('C:/WorldZone/worldzone-platform/node_modules/pg');

const connectionString = 'postgresql://postgres.knuxlyewqbidnahrvhfb:JwvlW3irY3zcw9pb@aws-0-us-west-1.pooler.supabase.com:5432/postgres';

async function seed() {
  const client = new Client({ connectionString });
  await client.connect();

  // 1. Seed Articles
  const articles = [
    {
      slug: 'next-gen-autonomous-ai-agents-2026',
      title: 'Next-Gen Autonomous AI Agents: Transforming Enterprise Productivity in 2026',
      excerpt: 'As autonomous orchestration frameworks replace traditional rule-based pipelines, organizations report unprecedented efficiency gains across complex development and verification workloads.',
      content: `The transition from static prompt-response language interfaces to autonomous, multi-agent execution graphs represents the most significant architectural evolution in software engineering since cloud migration. In 2026, enterprise systems no longer rely solely on human orchestration; instead, teams of specialized agents collaborate across environments to build, audit, and deploy production software.

### The Shift to Reactive Multi-Agent Topology
Early agentic prototypes frequently suffered from runaway execution loops, context saturation, and unpredictable tool calling. Modern 2026 agent runtimes have resolved these bottlenecks through deterministic state graphs and structured event buses. In this architecture, subagents are spun up with strictly bounded tools, domain-specific memory, and immutable audit logs.

### Key Architectural Improvements:
- **Context Compaction:** Intelligent summarization algorithms retain critical state while trimming ephemeral logs.
- **Isolated Sandboxing:** Subagents execute within separated environments, preventing cross-profile data leakage.
- **Deterministic Verification:** Code generation steps are accompanied by automated test execution before merges.

### Economic Impact Across Global Industries
According to recent corporate benchmarking studies, engineering organizations deploying multi-agent test frameworks achieved a 47% reduction in regression bug discovery cycles. Furthermore, automated proxy verification systems and browser test harnesses have allowed distributed teams to validate global localization with zero manual intervention.`,
      category: 'Artificial Intelligence',
      cover_image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80',
      author: 'Dr. Elena Rostova, AI Systems Fellow',
      reading_time: '6 min read',
      is_published: true,
      is_featured: true,
      views_count: 342
    },
    {
      slug: 'zero-trust-quantum-cryptography-networks',
      title: 'Zero-Trust Architecture and Quantum Cryptography: Defending Modern Networks',
      excerpt: 'Why leading infrastructure providers are transitioning from standard RSA encryption to post-quantum resistant cryptographic suites.',
      content: `With the advent of high-coherence quantum computing processors, traditional asymmetric cryptographic algorithms such as RSA-2048 and classic elliptic curve key exchanges face structural obsolescence. In 2026, global critical infrastructure organizations are aggressively migrating to post-quantum lattice-based encryption algorithms coupled with immutable Zero-Trust network perimeters.

### Post-Quantum Cryptography in Production
The National Institute of Standards and Technology (NIST) finalized post-quantum standards have now been integrated into foundational protocols, including TLS 1.3 and SSH. Implementing ML-KEM (Module-Lattice Key Encapsulation Mechanism) and ML-DSA (Module-Lattice Digital Signature Algorithm) ensures that data encrypted today remains unreadable to future quantum decryption sweeps.

### Core Zero-Trust Tenets:
- **Continuous Verification:** Every session must undergo continuous dynamic risk assessment based on client telemetry.
- **Least-Privilege Containment:** Micro-segmentation prevents lateral movement across distributed services.
- **Cryptographic Isolation:** Ephemeral session tokens eliminate long-lived credential vulnerabilities.

### The Role of Anti-Detect and Browser Isolation
Modern security analysts rely heavily on clean, isolated browser environments to investigate threat intelligence without leaking organizational signatures. By employing localized profile isolation, granular timezone synthesis, and residential IP routing, security practitioners can conduct anonymous penetration testing and threat verification without exposing internal corporate subnets.`,
      category: 'Cybersecurity',
      cover_image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
      author: 'Marcus Vance, Chief Security Architect',
      reading_time: '5 min read',
      is_published: true,
      is_featured: false,
      views_count: 218
    },
    {
      slug: 'decentralized-finance-global-digital-payments-2026',
      title: 'Decentralized Finance & Global Digital Payments: The 2026 Roadmap',
      excerpt: 'An examination of cross-border payment settlement rails, algorithmic compliance, and high-frequency automated liquidity pools.',
      content: `The international banking landscape is undergoing a structural transformation as legacy settlement networks are superseded by real-time cryptographic rails. In 2026, cross-border remittances that once took days now conclude in sub-second intervals, powered by algorithmic clearinghouses and institutional liquidity protocols.

### Real-Time Global Settlement Rails
Central banks and major financial clearing systems have integrated decentralized ledger technologies into sovereign payment systems. The synthesis of programmable smart contracts with fiat liquidity pools enables automated escrow, dynamic tariff calculation, and instantaneous compliance checking at zero counterparty risk.

### Key Drivers of Modern Digital Finance:
- **Fractionalized Liquidity Pools:** Automated market makers ensure continuous depth without reliance on traditional prime brokers.
- **Sub-Cent Transaction Fees:** Layer-2 and Layer-3 rollup architectures have reduced transaction overhead to negligible fractions of a cent.
- **Algorithmic Compliance:** Built-in anti-money laundering (AML) and know-your-customer (KYC) state verifications operate directly at the protocol level.

### The Horizon for Digital Asset Commerce
As enterprise merchants integrate native multi-currency digital checkout gateways, friction in international e-commerce is rapidly diminishing. The subsequent wave of innovation will center around micro-payments for autonomous AI agent services, enabling machines to negotiate and purchase compute resources autonomously in real time.`,
      category: 'Digital Finance',
      cover_image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=1200&q=80',
      author: 'Sarah Jenkins, Financial Technology Analyst',
      reading_time: '4 min read',
      is_published: true,
      is_featured: false,
      views_count: 195
    }
  ];

  for (const art of articles) {
    await client.query(`
      INSERT INTO portal_articles (slug, title, excerpt, content, category, cover_image, author, reading_time, is_published, is_featured, views_count)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      ON CONFLICT (slug) DO UPDATE SET
        title = EXCLUDED.title,
        excerpt = EXCLUDED.excerpt,
        content = EXCLUDED.content,
        updated_at = now();
    `, [art.slug, art.title, art.excerpt, art.content, art.category, art.cover_image, art.author, art.reading_time, art.is_published, art.is_featured, art.views_count]);
  }
  console.log('Articles seeded.');

  // 2. Seed Pages
  const pages = [
    {
      slug: 'privacy',
      title: 'Privacy Policy',
      subtitle: 'Effective Date: October 24, 2026 - GDPR & CCPA Disclosures',
      content: `### 1. Information Collection and Telemetry
ApexPulse Global collects standard technical telemetry when you access our portal. This data includes your anonymized IP address, browser user-agent string, operating system characteristics, referral URLs, and interaction timestamps. We do not collect personally identifiable information unless voluntarily submitted via our contact channels.

### 2. Cookies and Third-Party Advertising Technologies
We partner with verified third-party advertising exchanges, including Monetag and affiliated programmatic networks, to serve contextual and interest-based promotions. These partners may utilize cookies, web beacons, and persistent tokens to measure ad performance, prevent bot fraud, and deliver relevant advertisements based on aggregated navigation trends.

### 3. Data Protection and User Rights
Under applicable data privacy frameworks (including GDPR, UK GDPR, and California Privacy Rights), users have the right to request access to, rectification of, or erasure of any personal logs held. To opt out of personalized programmatic ad tracking, users may adjust their browser cookie preferences or utilize standard industry opt-out portals.

### 4. External Links and Gateways
Our site features links to partner portals and resource gateways. We are not responsible for the privacy policies, data handling practices, or content of third-party domains. Users are encouraged to review the privacy notices of any external site they access.`
    },
    {
      slug: 'terms',
      title: 'Terms of Service',
      subtitle: 'Last Updated: October 24, 2026',
      content: `### 1. Acceptance of Terms
By accessing or browsing ApexPulse Global, you agree to adhere to these Terms of Service and all applicable international laws and regulations. If you do not consent to these terms, you are prohibited from using this website.

### 2. Intellectual Property Rights
All editorial articles, technical analysis papers, graphical assets, and platform design architectures published on ApexPulse Global are the proprietary intellectual property of ApexPulse Global Media Group and are protected by applicable copyright and trademark law.

### 3. Informational Disclaimer
The materials on ApexPulse Global are provided on an 'as is' basis for informational, educational, and analytical purposes only. ApexPulse Global makes no warranties, expressed or implied, regarding commercial suitability, investment advice, or technological guarantees.

### 4. Permitted and Prohibited Conduct
Users agree not to deploy malicious automated scrapers, denial-of-service payloads, or unauthorized credential bypass tools against our services. Legitimate automated web indexers adhering to our robots.txt directive are permitted.`
    },
    {
      slug: 'portfolio',
      title: 'Research Portfolio & Benchmark Sandboxes',
      subtitle: 'Technical demonstrations, autonomous testing systems, and enterprise architectures',
      content: `ApexPulse Global maintains a portfolio of high-concurrency research implementations and software testing architectures:

### 1. Multi-Profile Session Isolation Engines
Our engineering labs have produced resilient multi-tenant profile orchestration engines designed for synthetic QA localization and distributed API monitoring across 150+ international timezone coordinates.

### 2. Post-Quantum Network Validation Suites
Automated test harnesses validating cryptographic handshake speeds and packet latency under post-quantum encryption protocols across distributed edge nodes.

### 3. High-Frequency Micro-Payment Gateways
Demonstrating real-time cryptographic transaction settlement pipelines capable of processing thousands of micro-transactions per second with sub-cent overhead.`
    },
    {
      slug: 'contact',
      title: 'Contact Editorial & Syndicate Desk',
      subtitle: 'Corporate inquiries, content licensing, and programmatic partnerships',
      content: `### Editorial Inquiries
For questions regarding article citations, technical whitepapers, or correction requests:
- **Email:** editorial@apexpulse.top
- **Desk Hours:** Monday to Friday, 09:00 - 18:00 UTC

### Programmatic & Syndicate Advertising
To discuss custom ad zone integration, direct private marketplace (PMP) deals, or publisher syndicate distribution:
- **Corporate Desk:** syndicate@apexpulse.top
- **Compliance & Privacy:** privacy@apexpulse.top`
    }
  ];

  for (const p of pages) {
    await client.query(`
      INSERT INTO portal_pages (slug, title, subtitle, content, updated_at)
      VALUES ($1, $2, $3, $4, now())
      ON CONFLICT (slug) DO UPDATE SET
        title = EXCLUDED.title,
        subtitle = EXCLUDED.subtitle,
        content = EXCLUDED.content,
        updated_at = now();
    `, [p.slug, p.title, p.subtitle, p.content]);
  }
  console.log('Pages seeded.');

  await client.end();
}

seed().catch(err => {
  console.error('Seed error:', err);
  process.exit(1);
});
