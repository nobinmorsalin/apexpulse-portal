const { Client } = require('C:/WorldZone/worldzone-platform/node_modules/pg');

const connectionString = 'postgresql://postgres.knuxlyewqbidnahrvhfb:JwvlW3irY3zcw9pb@aws-0-us-west-1.pooler.supabase.com:5432/postgres';

const articles = [
  {
    slug: 'autonomous-ai-agents-enterprise-orchestration',
    title: 'Autonomous AI Agents: The 2026 Enterprise Orchestration Architecture',
    excerpt: 'Examining multi-agent deterministic coordination, immutable audit trails, and synthetic task execution at scale.',
    category: 'Artificial Intelligence',
    author: 'Dr. Elena Rostova',
    reading_time: '7 min read',
    views_count: 520,
    is_featured: true,
    content: `The transformation from static prompt-driven interactions to autonomous execution graphs represents the single most impactful architectural evolution in modern enterprise computing. By 2026, leading organizations are deploying specialized agent teams capable of self-healing software development, real-time code verification, and multi-cloud infrastructure maintenance.

### Topological Separation of Subagents
Rather than relying on monolithic foundation models with sprawling context windows, cutting-edge architectures deploy tightly-scoped subagents. Each subagent operates within isolated memory boundaries, preventing context contamination and eliminating hallucination loops.

### Deterministic State Verification
To prevent runaway execution loops, production-grade agent runtimes enforce bounded iteration counters and explicit gatekeeper approvals before external tool invocations are executed. This guarantees that automated file writes, deployment triggers, and API transactions remain 100% compliant with corporate governance policies.

### Benchmark Productivity Gains
According to recent enterprise telemetry reports, multi-agent automated testing environments have reduced manual regression testing overhead by over 62%, while shortening code review and continuous deployment cycles from hours to minutes.`
  },
  {
    slug: 'quantum-cryptography-and-zero-trust-networks',
    title: 'Quantum Cryptography and Zero-Trust Networks: The Post-RSA Defense Model',
    excerpt: 'How post-quantum lattice encryption algorithms protect enterprise communication from future cryptographic sweeps.',
    category: 'Cybersecurity',
    author: 'Marcus Vance',
    reading_time: '6 min read',
    views_count: 430,
    is_featured: false,
    content: `As quantum computing systems demonstrate increasing coherence and logical qubit stability, legacy asymmetric encryption standards such as RSA-2048 and classic Diffie-Hellman exchanges face critical vulnerability windows. The global cybersecurity standard has shifted toward post-quantum cryptography (PQC) integrated with strict Zero-Trust network topologies.

### ML-KEM and Module-Lattice Signatures
The transition to Module-Lattice Key Encapsulation (ML-KEM) ensures that session handshakes occurring across public transit backbones cannot be captured and retroactively decrypted by future quantum supercomputers. Leading financial institutions and defense infrastructure nodes have already enforced mandatory PQC ciphers in production TLS 1.3 streams.

### Ephemeral Identity and Micro-Segmentation
Zero-Trust architecture dictates that no entity—whether inside or outside the organizational perimeter—is inherently trusted. Every connection undergoes continuous dynamic risk scoring, factoring in device telemetry, geographic network stability, and cryptographic hardware attestations.`
  },
  {
    slug: 'real-time-settlement-cryptographic-rails-2026',
    title: 'Real-Time Global Settlement: The Architecture of Cryptographic Remittance Rails',
    excerpt: 'Analyzing sub-second cross-border liquidity pools, algorithmic escrow, and zero-counterparty risk.',
    category: 'Digital Finance',
    author: 'Sarah Jenkins',
    reading_time: '5 min read',
    views_count: 380,
    is_featured: false,
    content: `The global correspondent banking network, long burdened by multi-day settlement delays and exorbitant intermediary fees, has been revolutionized by cryptographic settlement rails. In 2026, international commerce relies on instantaneous, peer-to-peer liquidity networks governed by verifiable smart contracts.

### Algorithmic Liquidity Provisioning
Automated market makers (AMMs) operating on high-throughput Layer-2 clearinghouses provide deep liquidity across major currency corridors without relying on centralized prime brokerage desks. This allows institutional remittances to settle in under 400 milliseconds at fractions of a cent per transaction.

### Regulatory State Verification
Modern digital payment protocols embed anti-money laundering (AML) and know-your-customer (KYC) state proofs directly into transaction metadata, allowing compliance audits to occur instantaneously without exposing customer identity vectors.`
  },
  {
    slug: 'browser-fingerprint-synthesis-and-session-isolation',
    title: 'Browser Fingerprint Synthesis: The Science of Clean Session Isolation',
    excerpt: 'How multi-profile browser engines achieve genuine behavioral parity with standard residential user agents.',
    category: 'Cybersecurity',
    author: 'Viktor Kaelen',
    reading_time: '8 min read',
    views_count: 610,
    is_featured: false,
    content: `In the realm of security research, website localization testing, and digital identity management, simplistic user-agent header manipulation is wholly inadequate. Modern fraud detection suites and web analytics engines evaluate hundreds of low-level canvas, WebGL, audio oscillator, and font rendering signatures to fingerprint client devices.

### Eliminating The Spoofing Footprint
Heuristic anti-fraud filters do not simply check whether a user-agent string matches Chrome or Firefox; they analyze whether the underlying JavaScript environment exhibits internal inconsistencies. Inconsistent WebGL vendor strings, mismatched AudioContext sample rates, or discrepancies between system timezone and proxy IP geolocation immediately trigger high-risk flags.

### Real-Time Residential Proxy Synchronization
To achieve genuine indistinguishability from organic users, isolated browser profiles must dynamically align system timezone offset, Intl.DateTimeFormat outputs, and DNS routing directly with the assigned residential proxy endpoint.`
  },
  {
    slug: 'cloud-native-microservices-edge-computing-evolution',
    title: 'Edge Computing Evolution: Deploying Autonomous Microservices at the Distributed Fringe',
    excerpt: 'Why centralized cloud datacenters are ceding latency-critical workloads to distributed edge runtimes.',
    category: 'Cloud Systems',
    author: 'Arjun Mehta',
    reading_time: '6 min read',
    views_count: 310,
    is_featured: false,
    content: `The traditional centralized cloud computing model—routing all user interactions back to monolithic regional server farms—is being replaced by edge-native microservices. By executing compute tasks on servers physically proximate to the end-user, organizations achieve sub-10ms response latencies and significantly lower transit bandwidth costs.

### WebAssembly and Isolated Workers
Modern edge platforms utilize lightweight WebAssembly (Wasm) runtimes and V8 isolate sandboxes instead of heavy Docker containers. This enables microservices to spin up in less than 5 milliseconds, consuming minimal system memory while maintaining strict memory isolation between multi-tenant workloads.

### Dynamic Edge Cache Invalidation
Combining globally distributed key-value stores with intelligent surrogate-key purging protocols allows edge networks to serve dynamically generated content with the performance characteristics of static files.`
  },
  {
    slug: 'post-quantum-dns-security-and-routing-resilience',
    title: 'DNS-over-HTTPS and Post-Quantum Routing Resilience',
    excerpt: 'Defending against DNS rebinding, spoofing attacks, and ISP-level traffic manipulation in modern web ecosystems.',
    category: 'Cybersecurity',
    author: 'Marcus Vance',
    reading_time: '5 min read',
    views_count: 275,
    is_featured: false,
    content: `Domain Name System (DNS) architecture has historically been one of the most vulnerable protocols on the internet. Unencrypted DNS queries expose user browsing patterns to ISP surveillance and enable man-in-the-middle spoofing attacks.

### Implementing Strict DoH with Encrypted Client Hello
The deployment of DNS-over-HTTPS (DoH) in conjunction with Encrypted Client Hello (ECH) eliminates plaintext domain leakage during the initial TLS handshake. ECH encrypts the Server Name Indication (SNI) extension, preventing intermediate network observers from identifying the specific destination host visited by a client profile.

### DNS Rebinding Defense for Automated Agents
Automated web crawlers, monitoring engines, and testing browsers must implement strict address-pinning policies. By resolving hostnames once and binding subsequent HTTP connections strictly to the validated IP address, systems defeat DNS rebinding attacks that attempt to pivot traffic into internal private subnets.`
  },
  {
    slug: 'high-frequency-algorithmic-trading-protocols-2026',
    title: 'High-Frequency Algorithmic Trading: Latency Optimization in Decentralized Order Books',
    excerpt: 'How sub-millisecond execution engines synchronize institutional capital across global decentralized exchanges.',
    category: 'Digital Finance',
    author: 'Sarah Jenkins',
    reading_time: '6 min read',
    views_count: 490,
    is_featured: false,
    content: `Decentralized finance (DeFi) order books have matured into institutional-grade trading venues, competing directly with traditional exchanges such as NASDAQ and CME. The introduction of zero-knowledge rollups with verifiable execution guarantees has eliminated front-running and miner-extractable value (MEV) exploits.

### Fair-Sequencing Consensus Mechanisms
Modern decentralized exchanges utilize fair-sequencing protocols where transaction order is cryptographically determined by threshold signature clusters rather than gas-price bidding. This ensures that market participants execute trades based on true chronological priority.

### Co-Location and Fiber Optic Synchronization
Institutional algorithmic trading firms deploy high-performance FPGA hardware nodes co-located near primary validator clusters, achieving microsecond-level execution certainty for cross-chain arbitrage and automated risk hedging.`
  },
  {
    slug: 'next-gen-devops-gitops-continuous-verification',
    title: 'Continuous Verification: The Next Evolution Beyond Traditional DevOps Pipelines',
    excerpt: 'Integrating automated regression sandboxes, chaos engineering, and synthetic verification into CI/CD.',
    category: 'Cloud Systems',
    author: 'Arjun Mehta',
    reading_time: '5 min read',
    views_count: 340,
    is_featured: false,
    content: `Traditional continuous integration and continuous deployment (CI/CD) pipelines have historically focused on unit testing and basic static analysis before deploying code. Continuous Verification elevates this practice by injecting automated synthetic user journeys into production canary environments before routing live traffic.

### Automated Canary Analysis
By deploying new software builds to a fractional subset of edge routing nodes and continuously monitoring real-time error rates, latency percentiles, and memory utilization, autonomous orchestration engines can instantly rollback faulty releases with zero human intervention.

### Chaos Engineering in Ephemeral Sandboxes
Automated verification frameworks simulate network latency spikes, node crashes, and database connection timeouts during deployment runs, ensuring that distributed microservices maintain complete fault tolerance.`
  },
  {
    slug: 'artificial-general-intelligence-safety-benchmarks',
    title: 'AGI Safety Benchmarks: Formal Verification and State Guardrails',
    excerpt: 'Establishing mathematical bounds, deterministic sandboxes, and behavioral guardrails for autonomous cognitive systems.',
    category: 'Artificial Intelligence',
    author: 'Dr. Elena Rostova',
    reading_time: '7 min read',
    views_count: 580,
    is_featured: false,
    content: `As foundation models achieve increasingly autonomous capabilities in multi-step reasoning, tool execution, and self-directed code modification, establishing mathematically verifiable safety constraints has become an existential engineering priority.

### Sandboxed Execution Contexts
Autonomous systems must never be granted unbounded shell access or raw internet sockets without intermediating policy proxies. Security architectures enforce strict capability-based authorization, requiring explicit cryptographic proofs for each outbound tool invocation.

### Alignment Auditing Through Synthetic Red-Teaming
Automated adversarial agent clusters continuously probe production AI systems with multi-turn prompt injection payloads, evaluating model resilience against jailbreaking, data exfiltration, and unauthorized privilege escalation.`
  },
  {
    slug: 'iot-edge-telemetry-and-zero-trust-firmware',
    title: 'Industrial IoT Telemetry: Zero-Trust Hardware Roots of Trust in 2026',
    excerpt: 'Securing smart grids, industrial automation, and connected infrastructure through cryptographic micro-controllers.',
    category: 'Cybersecurity',
    author: 'Viktor Kaelen',
    reading_time: '5 min read',
    views_count: 290,
    is_featured: false,
    content: `The proliferation of billions of connected IoT sensors across manufacturing plants, renewable energy grids, and logistics fleets presents an unprecedented attack surface. Modern industrial IoT security rejects perimeter-based security in favor of hardware-level cryptographic roots of trust.

### TPM 2.0 and Secure Boot Attestation
Every IoT device deployed in critical infrastructure incorporates a dedicated Trusted Platform Module (TPM) that validates firmware integrity during boot sequence. If firmware tampering is detected, the device enters a cryptographically isolated failsafe state and alerts central orchestration clusters.

### Mutual TLS and Ephemeral Device Tokens
Industrial edge gateways communicate strictly via mutual TLS (mTLS) with short-lived X.509 client certificates, ensuring that compromised field devices cannot impersonate legitimate command-and-control telemetry streams.`
  },
  {
    slug: 'privacy-preserving-machine-learning-federated-ai',
    title: 'Privacy-Preserving AI: Federated Learning and Differential Privacy Protocols',
    excerpt: 'Training enterprise neural networks across distributed data silos without exposing underlying personal telemetry.',
    category: 'Artificial Intelligence',
    author: 'Dr. Elena Rostova',
    reading_time: '6 min read',
    views_count: 410,
    is_featured: false,
    content: `In an era of stringent international privacy regulations such as GDPR and CCPA, centralized pooling of sensitive consumer data for machine learning model training poses severe regulatory liabilities. Federated learning resolves this dilemma by training models locally on client devices.

### Local Gradient Computation
In a federated architecture, raw data never leaves the client device. Instead, devices compute mathematical gradient updates locally and transmit only anonymized model weights back to central aggregation servers.

### Differential Privacy and Noise Injection
By injecting calibrated mathematical noise into aggregated weight updates, organizations guarantee that individual training examples cannot be reverse-engineered or reconstructed through membership inference attacks.`
  },
  {
    slug: 'multi-cloud-resilience-and-zero-lockin-architectures',
    title: 'Multi-Cloud Resilience: Designing High-Availability Workloads Without Vendor Lock-In',
    excerpt: 'Architectural strategies for deploying interoperable microservices across AWS, Google Cloud, and edge providers.',
    category: 'Cloud Systems',
    author: 'Arjun Mehta',
    reading_time: '6 min read',
    views_count: 360,
    is_featured: false,
    content: `Relying exclusively on a single hyperscaler cloud vendor exposes organizations to catastrophic outage risks and compounding pricing increases. Forward-thinking engineering organizations design workloads around open, portable abstractions that run seamlessly across any cloud environment.

### Kubernetes as the Universal Abstraction Layer
By packaging services within standard container specifications and managing deployments through open Kubernetes custom resource definitions (CRDs), workloads can be migrated between AWS, GCP, and bare-metal edge providers within minutes.

### Global Anycast Routing and Multi-Cloud Failover
Combining Anycast BGP routing with health-checked DNS endpoints allows incoming web traffic to automatically failover to secondary cloud providers if the primary hyperscaler experiences regional availability zone disruptions.`
  },
  {
    slug: 'automated-cpa-traffic-verification-and-attribution',
    title: 'Performance Marketing Attribution: The Mechanics of Modern S2S Postbacks',
    excerpt: 'How server-to-server postbacks, click ID tokens, and fraud filters validate affiliate conversions in real time.',
    category: 'Digital Finance',
    author: 'Sarah Jenkins',
    reading_time: '5 min read',
    views_count: 480,
    is_featured: false,
    content: `The affiliate marketing and performance advertising sector has migrated away from fragile third-party cookie tracking toward robust server-to-server (S2S) postback integrations. Understanding S2S tracking is critical for high-volume CPA networks and publisher monetization platforms.

### Click ID Propagation and Token Persistence
When a user clicks an offer or publisher gateway, the system generates an opaque cryptographic transaction token (Click ID). This token is passed through conversion funnels and stored in session state. Upon offer completion, the advertiser server fires an authenticated webhook back to the network platform, crediting the conversion instantaneously.

### Anti-Fraud Telemetry and Geo-IP Verification
High-tier CPA platforms deploy sophisticated fraud scoring engines that cross-reference incoming postbacks with residential IP databases, checking for proxy leakage, abnormal submission velocities, and device fingerprint consistency.`
  },
  {
    slug: 'neural-network-quantization-and-edge-inference',
    title: 'Model Quantization: Running 70B Parameter LLMs on Commodity Hardware',
    excerpt: 'Analyzing 4-bit and 2-bit quantization algorithms (AWQ, GGUF, EXL2) for low-latency local model inference.',
    category: 'Artificial Intelligence',
    author: 'Dr. Elena Rostova',
    reading_time: '7 min read',
    views_count: 530,
    is_featured: false,
    content: `Deploying frontier large language models has traditionally required multi-million dollar GPU clusters operating enterprise FP16 precision. The rapid maturation of post-training quantization techniques has completely upended this paradigm, enabling massive models to run on affordable edge workstations.

### Activation-Aware Weight Quantization (AWQ)
AWQ preserves salient model weights that contain critical reasoning capabilities while compressing peripheral matrix layers to 4-bit integers. This reduces memory footprint by over 70% with virtually imperceptible degradation in benchmark reasoning scores.

### Local-First AI Agent Workstations
By pairing quantized open-weights models with Apple Silicon Unified Memory or consumer RTX GPUs, software engineers can execute autonomous code generation and document analysis locally with zero API cost and zero data privacy leakage.`
  },
  {
    slug: 'webassembly-and-browser-based-compute-sandboxes',
    title: 'WebAssembly in 2026: The Rise of Native-Speed In-Browser Compilers and Runtimes',
    excerpt: 'How Wasm components allow full operating systems, database engines, and compilers to execute inside client browsers.',
    category: 'Cloud Systems',
    author: 'Arjun Mehta',
    reading_time: '6 min read',
    views_count: 320,
    is_featured: false,
    content: `WebAssembly (Wasm) has transformed web browsers from simple document renderers into universal virtual machine runtimes. In 2026, entire software development environments—including SQLite databases, Python runtimes, and Rust compilers—execute directly inside client-side browser tabs.

### Client-Side Database Processing with SQLite Wasm
By running embedded SQLite databases compiled to WebAssembly with Origin-Private File System (OPFS) storage backends, web applications achieve microsecond database query performance without incurring roundtrip server latency.

### Secure Sandboxed Code Execution
Wasm provides mathematical memory safety through linear memory isolation. Applications can safely execute untrusted third-party plugins and user-submitted code in browser sandboxes without risking host system compromise.`
  },
  {
    slug: 'synthetic-browser-qa-automation-testing-frameworks',
    title: 'Synthetic Browser Testing: Building Robust Automated QA Suites with Playwright',
    excerpt: 'Best practices for multi-profile browser testing, network mock interception, and cross-browser regression validation.',
    category: 'Cybersecurity',
    author: 'Viktor Kaelen',
    reading_time: '6 min read',
    views_count: 415,
    is_featured: false,
    content: `Automated browser testing is the cornerstone of modern web application reliability. Modern continuous delivery frameworks utilize Playwright and Chromium automation harnesses to validate complex single-page applications under realistic user conditions.

### Persistent Context Isolation
When testing multi-tenant web applications, test suites must maintain strict session isolation between test cases. Utilizing persistent browser contexts with dedicated profile directories prevents cookie leakage and guarantees reproducible test states.

### Network Interception and Route Mocking
High-speed automated testing environments intercept outbound network calls to mock third-party payment gateways and ad networks, ensuring that test suites run deterministically without depending on external service uptime.`
  },
  {
    slug: 'post-quantum-vpn-protocols-wireguard-evolution',
    title: 'WireGuard Post-Quantum: Securing Enterprise Tunneling Protocols Against Quantum Interception',
    excerpt: 'Integrating pre-shared post-quantum keys and Kyber algorithms into high-throughput VPN tunnels.',
    category: 'Cybersecurity',
    author: 'Marcus Vance',
    reading_time: '5 min read',
    views_count: 350,
    is_featured: false,
    content: `WireGuard has established itself as the premier high-performance VPN protocol, dramatically outpacing legacy OpenVPN and IPsec implementations in speed and security auditing simplicity. In 2026, enterprise VPN architectures have upgraded WireGuard tunnels with post-quantum cryptographic extensions.

### Hybrid Key Exchange Protocols
By combining proven Curve25519 elliptic curve key exchanges with ML-KEM post-quantum algorithms, hybrid VPN tunnels guarantee that communication remains secure even if one of the underlying cryptographic primitives is compromised.

### Kernel-Level Throughput Optimization
Operating directly within the Linux kernel network stack, modern post-quantum VPN tunnels achieve multi-gigabit throughput with negligible CPU overhead, making them ideal for high-bandwidth proxy routing and distributed enterprise backbones.`
  },
  {
    slug: 'decentralized-oracle-networks-smart-contract-automation',
    title: 'Decentralized Oracle Networks: Connecting Smart Contracts to Real-World Telemetry',
    excerpt: 'How cryptographic oracle consensus mechanisms feed off-chain market prices, weather data, and API payloads into blockchain state.',
    category: 'Digital Finance',
    author: 'Sarah Jenkins',
    reading_time: '5 min read',
    views_count: 285,
    is_featured: false,
    content: `Smart contracts are inherently deterministic and isolated from external internet data. To execute financial agreements contingent on real-world events—such as currency exchange rates, commodity prices, or flight delays—blockchains rely on decentralized oracle networks.

### Byzantine Fault Tolerant Price Feeds
Oracle clusters aggregate data from dozens of independent institutional market feeds, utilizing cryptographic consensus to eliminate outlier anomalies and defeat price manipulation attacks.

### Verifiable Randomness for Gaming and Security
Modern oracle platforms provide verifiable random functions (VRF) that generate cryptographically provable randomness on-chain, preventing miners or protocol developers from manipulating game outcomes or cryptographic lotteries.`
  },
  {
    slug: 'energy-efficient-ai-inference-green-computing',
    title: 'Green Computing in AI: Architectural Innovations for Sub-Watt Neural Inference',
    excerpt: 'How neuromorphic chips and specialized ASIC architectures are slashing energy consumption across datacenter clusters.',
    category: 'Artificial Intelligence',
    author: 'Dr. Elena Rostova',
    reading_time: '6 min read',
    views_count: 375,
    is_featured: false,
    content: `The astronomical energy consumption of AI training and inference has emerged as one of the defining infrastructure challenges of the decade. In 2026, semiconductor manufacturers and software engineers are pioneering ultra-efficient neural processing architectures designed for sustainable computing.

### Neuromorphic Spiking Neural Networks
Neuromorphic processors mimic biological brain architecture by transmitting information only when electrical voltage spikes occur, consuming up to 90% less power than continuous matrix multiplication processors.

### Dynamic Voltage and Frequency Scaling (DVFS)
Datacenter orchestration frameworks dynamically adjust GPU clock speeds and operational voltages based on real-time inference latency requirements, drastically curtailing thermal output and carbon footprint.`
  },
  {
    slug: 'zero-knowledge-rollups-and-ethereum-scaling',
    title: 'Zero-Knowledge Rollups: The Architectural Pinnacle of Blockchain Scalability',
    excerpt: 'How zk-SNARKs and STARKs compress thousands of transactions into cryptographic proofs verified in milliseconds.',
    category: 'Digital Finance',
    author: 'Sarah Jenkins',
    reading_time: '6 min read',
    views_count: 440,
    is_featured: false,
    content: `Blockchain scalability debates have reached definitive consensus in 2026: Zero-Knowledge (ZK) rollups represent the supreme architectural mechanism for scaling transaction throughput without compromising decentralized security.

### Mathematical Proof Verification
Instead of requiring every blockchain validator to re-execute every individual transaction, ZK rollups execute transactions off-chain and generate a succinct mathematical proof (zk-SNARK) verifying that all state transitions followed strict protocol rules.

### Sub-Second Finality and Account Abstraction
Modern ZK networks incorporate native account abstraction, allowing users to pay gas fees in any token, utilize biometric passkeys for transaction signing, and achieve instantaneous settlement finality.`
  }
];

async function seedManyArticles() {
  const client = new Client({ connectionString });
  await client.connect();
  console.log('Connected to database for mass article seeding...');

  let count = 0;
  for (const art of articles) {
    await client.query(`
      INSERT INTO portal_articles (slug, title, excerpt, content, category, author, reading_time, views_count, is_published, is_featured, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, true, $9, now() - (interval '1 hour' * $10), now())
      ON CONFLICT (slug) DO UPDATE SET
        title = EXCLUDED.title,
        excerpt = EXCLUDED.excerpt,
        content = EXCLUDED.content,
        category = EXCLUDED.category,
        author = EXCLUDED.author,
        reading_time = EXCLUDED.reading_time,
        is_published = true,
        updated_at = now();
    `, [art.slug, art.title, art.excerpt, art.content, art.category, art.author, art.reading_time, art.views_count, art.is_featured, count * 3]);
    count++;
  }

  const res = await client.query('SELECT count(*) FROM portal_articles');
  console.log('Total articles now in Supabase portal_articles:', res.rows[0].count);

  // Also update Monetag Zone ID 12114438 in portal_ads
  await client.query(`
    UPDATE portal_ads
    SET zone_id = '12114438', updated_at = now()
    WHERE ad_key IN ('in_page_push', 'popunder', 'vignette');
  `);
  console.log('Updated portal_ads with Monetag Zone ID 12114438.');

  await client.end();
}

seedManyArticles().catch(err => {
  console.error('Mass seeding failed:', err);
  process.exit(1);
});
