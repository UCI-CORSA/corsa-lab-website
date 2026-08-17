import { HeroSection } from './homepage/HeroSection'
import { NewsSection } from './homepage/NewsSection'
import { ResearchThemesSection } from './homepage/ResearchThemesSection'

export default function Page() {
  return (
    <main style={{ width: '100%', maxWidth: 'none', padding: '0px', gap: '0px', alignItems: 'center' }}>
      <HeroSection />
      <NewsSection />
      <ResearchThemesSection />
    </main>
  )
}
