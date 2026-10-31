/**
 * ApexPulse Global — Editorial Media & Visual Intelligence Registry
 * Maps topics, slugs, and categories to authentic, high-res hardware and architectural photography.
 */

export interface ArticleMediaProfile {
  heroImage: string;
  heroCaption: string;
  figure1Image: string;
  figure1Caption: string;
  figure1Credit: string;
  figure2Image: string;
  figure2Caption: string;
  figure2Credit: string;
  authorAvatar: string;
  authorRole: string;
  bureau: string;
  verifiedCredentials: string;
}

const CATEGORY_MEDIA_MAP: Record<string, ArticleMediaProfile> = {
  'artificial intelligence': {
    heroImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=85',
    heroCaption: 'Autonomous neural runtime cluster executing distributed inference across liquid-cooled Blackwell nodes.',
    figure1Image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=85',
    figure1Caption: 'Figure 1.0: Advanced 2nm photolithography silicon wafer enabling extreme edge compute density.',
    figure1Credit: 'TSMC Fab 20 Archive / Bloomberg',
    figure2Image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=85',
    figure2Caption: 'Figure 2.0: High-density optical interconnect fabric routing multi-agent event bus telemetry.',
    figure2Credit: 'CERN Open Compute Laboratory',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    authorRole: 'Senior Frontier Infrastructure Editor',
    bureau: 'Zurich Bureau',
    verifiedCredentials: 'Ph.D. Distributed Systems, ETH Zürich',
  },
  'cybersecurity': {
    heroImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1600&q=85',
    heroCaption: 'Cryogenic dilution refrigerator housing 1,120-qubit fault-tolerant quantum processor.',
    figure1Image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1400&q=85',
    figure1Caption: 'Figure 1.0: Real-time cryptographic packet inspection on sovereign submarine fiber backbones.',
    figure1Credit: 'Defense Information Systems Agency (DISA)',
    figure2Image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1400&q=85',
    figure2Caption: 'Figure 2.0: Automated zero-trust microsegmentation gateway telemetry in Tier-4 vault.',
    figure2Credit: 'European Cyber Defense Agency (ENISA)',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    authorRole: 'Cyber Warfare & Cryptography Lead',
    bureau: 'Washington Desk',
    verifiedCredentials: 'M.Sc. Information Security, Johns Hopkins',
  },
  'digital economics': {
    heroImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1600&q=85',
    heroCaption: 'Algorithmic market making and automated cross-border settlement telemetry interface.',
    figure1Image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1400&q=85',
    figure1Caption: 'Figure 1.0: Ultra-low latency microwave relay transceivers connected to Frankfurt trading hubs.',
    figure1Credit: 'Frankfurt Stock Exchange / Reuters',
    figure2Image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1400&q=85',
    figure2Caption: 'Figure 2.0: Programmable sovereign liquidity pool distribution across decentralized validation nodes.',
    figure2Credit: 'Bank for International Settlements (BIS)',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    authorRole: 'Head of Quantitative Markets',
    bureau: 'London Desk',
    verifiedCredentials: 'Chartered Financial Analyst (CFA) & LSE Fellow',
  },
  'cloud systems': {
    heroImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=85',
    heroCaption: 'Global satellite-interlinked terrestrial cloud backbones executing distributed geo-replication.',
    figure1Image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=85',
    figure1Caption: 'Figure 1.0: Hyperscale liquid immersion cooling tanks achieving 1.03 Power Usage Effectiveness.',
    figure1Credit: 'Nordic Green Compute Facility / AP',
    figure2Image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1400&q=85',
    figure2Caption: 'Figure 2.0: High-density optical patch bays routing 800 Gbps coherent edge wavelengths.',
    figure2Credit: 'Cloudflare Global Edge Network',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    authorRole: 'Principal Systems Architect',
    bureau: 'San Francisco Bureau',
    verifiedCredentials: 'Staff Systems Engineer, ex-Google SRE',
  },
  'software architecture': {
    heroImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=85',
    heroCaption: 'High-concurrency compilation pipeline auditing memory-safe multi-threaded microkernel binaries.',
    figure1Image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1400&q=85',
    figure1Caption: 'Figure 1.0: Bytecode optimization profiling across JIT runtime execution branches.',
    figure1Credit: 'LLVM Foundation Research Group',
    figure2Image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1400&q=85',
    figure2Caption: 'Figure 2.0: Continuous formal verification analysis validating lock-free concurrency queues.',
    figure2Credit: 'ACM SIGPLAN Benchmark Consortium',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    authorRole: 'Chief Compiler Architect',
    bureau: 'Stockholm Bureau',
    verifiedCredentials: 'Ph.D. Programming Language Theory',
  },
  'computer science': {
    heroImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=85',
    heroCaption: 'Theoretical quantum entropy measurements and mathematical state space exploration.',
    figure1Image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1400&q=85',
    figure1Caption: 'Figure 1.0: Lattice vector visualization solving shortest vector problems (SVP) in 512 dimensions.',
    figure1Credit: 'Max Planck Institute for Mathematics',
    figure2Image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=85',
    figure2Caption: 'Figure 2.0: Silicon gate dielectric inspection under scanning electron microscope (SEM).',
    figure2Credit: 'IMEC Microelectronics Research Center',
    authorAvatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80',
    authorRole: 'Foundational Theory Chair',
    bureau: 'Cambridge Bureau',
    verifiedCredentials: 'Fellow of the Royal Society',
  },
};

const DEFAULT_PROFILE: ArticleMediaProfile = CATEGORY_MEDIA_MAP['artificial intelligence'];

export function getArticleMedia(category: string, slug?: string): ArticleMediaProfile {
  const norm = (category || '').toLowerCase();
  for (const key of Object.keys(CATEGORY_MEDIA_MAP)) {
    if (norm.includes(key)) {
      return CATEGORY_MEDIA_MAP[key];
    }
  }
  return DEFAULT_PROFILE;
}
