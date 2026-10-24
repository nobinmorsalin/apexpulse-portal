import { supabaseAdmin, supabasePublic } from './supabase';
import type { PortalSettings, PortalAd, PortalArticle, PortalPage } from '../types/portal';

export async function getPortalSettings(): Promise<PortalSettings> {
  const { data, error } = await supabasePublic
    .from('portal_settings')
    .select('*')
    .eq('id', 1)
    .single();

  if (error || !data) {
    return {
      id: 1,
      site_name: 'ApexPulse Global',
      site_tagline: 'Next-Gen Tech, AI Trends & Digital Intelligence',
      site_description: 'ApexPulse Global delivers real-time reporting on artificial intelligence, cybersecurity architectures, and digital finance.',
      logo_url: '',
      favicon_url: '',
      primary_color: '#6366f1',
      contact_email: 'editorial@apexpulse.top',
      monetag_verification_meta: '',
      google_verification_meta: '',
      custom_head_scripts: '',
      custom_footer_scripts: '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  }
  return data as PortalSettings;
}

export async function getPortalAds(): Promise<PortalAd[]> {
  const { data, error } = await supabasePublic
    .from('portal_ads')
    .select('*')
    .order('ad_key', { ascending: true });

  if (error || !data) return [];
  return data as PortalAd[];
}

export async function getPublishedArticles(): Promise<PortalArticle[]> {
  const { data, error } = await supabasePublic
    .from('portal_articles')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  if (error || !data) return [];
  return data as PortalArticle[];
}

export async function getArticleBySlug(slug: string): Promise<PortalArticle | null> {
  const { data, error } = await supabasePublic
    .from('portal_articles')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) return null;
  return data as PortalArticle;
}

export async function incrementArticleViews(slug: string): Promise<void> {
  try {
    await supabaseAdmin.rpc('increment_article_views', { article_slug: slug });
  } catch {
    // Silent catch if RPC is not defined
  }
}

export async function getPortalPage(slug: string): Promise<PortalPage | null> {
  const { data, error } = await supabasePublic
    .from('portal_pages')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) return null;
  return data as PortalPage;
}
