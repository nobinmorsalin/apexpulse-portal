import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cryptographic Research Gateway & Session Handshake | ApexPulse Global',
  description: 'Cryptographic session handshake and laboratory verification gateway for accredited researchers.',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: 'https://apexpulse-portal.vercel.app/gateway',
  },
};

export default function GatewayLayout({ children }: { children: React.ReactNode }) {
  return children;
}
