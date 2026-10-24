export interface PortalSettings {
  id: number;
  site_name: string;
  site_tagline: string;
  site_description: string;
  logo_url: string;
  favicon_url: string;
  primary_color: string;
  contact_email: string;
  monetag_verification_meta: string;
  google_verification_meta: string;
  custom_head_scripts: string;
  custom_footer_scripts: string;
  ad_cooldown_minutes?: number;
  created_at: string;
  updated_at: string;
}

export interface PortalAd {
  id: string;
  ad_key: string;
  name: string;
  network: string;
  is_active: boolean;
  zone_id: string;
  script_url: string;
  code_snippet: string;
  smartlink_url: string;
  description: string;
  updated_at: string;
}

export interface PortalArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  cover_image: string;
  author: string;
  reading_time: string;
  is_published: boolean;
  is_featured: boolean;
  views_count: number;
  created_at: string;
  updated_at: string;
}

export interface PortalPage {
  slug: string;
  title: string;
  subtitle: string;
  content: string;
  updated_at: string;
}
