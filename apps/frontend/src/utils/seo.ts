type SeoProps = {
  title?: string
  description?: string
  keywords?: string
  ogImage?: string
  ogUrl?: string
  ogType?: string
}

const defaultSeo = {
  title: 'Off-Grid Living - Sustainable Living Resources and Tools',
  description: 'Resources, calculators, and guides for sustainable off-grid living. Learn about solar power, energy efficiency, and self-sufficiency.',
  keywords: 'off-grid, sustainable living, solar power, energy efficiency, renewable energy, self-sufficiency',
  ogImage: '/images/off-grid-living-social.jpg',
  ogUrl: 'https://offgridliving.example.com',
  ogType: 'website',
}

export const seo = {
  defaults: defaultSeo,
  
  generate: ({
    title = defaultSeo.title,
    description = defaultSeo.description,
    keywords = defaultSeo.keywords,
    ogImage = defaultSeo.ogImage,
    ogUrl = defaultSeo.ogUrl,
    ogType = defaultSeo.ogType,
  }: SeoProps = {}) => {
    
    // If title doesn't already contain the site name, append it
    const fullTitle = title.includes('Off-Grid Living') 
      ? title 
      : `${title} | Off-Grid Living`
    
    return {
      title: fullTitle,
      meta: [
        { name: 'description', content: description },
        { name: 'keywords', content: keywords },
        
        // Open Graph
        { property: 'og:title', content: fullTitle },
        { property: 'og:description', content: description },
        { property: 'og:image', content: ogImage },
        { property: 'og:url', content: ogUrl },
        { property: 'og:type', content: ogType },
        
        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: fullTitle },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: ogImage },
      ],
    }
  },
}
