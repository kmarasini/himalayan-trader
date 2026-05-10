import type { Farm } from '@/types'

export const farms: Farm[] = [
  {
    id: 'farm-001',
    slug: 'sherpa-highlands-estate',
    name: 'Sherpa Highlands Estate',
    farmerName: 'Pemba Dorje Sherpa',
    farmerTitle: 'Third-generation farmer & Q-Grader',
    farmerImage:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    region: 'Solukhumbu',
    district: 'Khumbu Pasanglhamu',
    altitude: { min: 1750, max: 2100 },
    farmSize: 4.2,
    treesCount: 8500,
    certifications: ['Organic Nepal', 'Direct Trade Verified', 'Rainforest Alliance'],
    shortBio:
      'Three generations of Sherpa farming excellence, 1,900m beneath the Everest massif.',
    story: `Pemba Dorje's grandfather planted the first coffee seedlings on these Solukhumbu terraces in 1961, an act of quiet agricultural revolution at an altitude most thought impossible for coffee. Today the estate spans 4.2 hectares of meticulously maintained terraces, each row hand-weeded, each cherry individually hand-picked at peak ripeness.

The farm sits within the buffer zone of Sagarmatha National Park, meaning chemical inputs are strictly prohibited and organic practices are not a marketing choice but a legal requirement — and a point of fierce pride for Pemba. Shade trees of alder and tree-ferns create a microclimate that slows cherry development and concentrates sugars, contributing to the lot's characteristic sweetness and floral complexity.

After harvesting, cherries travel by local porter (no roads reach this altitude) to the family's own washing station below the snowline. The fully-washed process uses cold spring water from a glacier-fed stream, producing exceptional cup clarity.`,
    images: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    ],
    coordinates: { lat: 27.7867, lng: 86.7314 },
    yearEstablished: 1961,
    familyGenerations: 3,
    lotsPerYear: 2,
  },
  {
    id: 'farm-002',
    slug: 'himalayan-heights-gulmi',
    name: 'Himalayan Heights Farm',
    farmerName: 'Bishnu Bahadur Magar',
    farmerTitle: 'Cooperative leader & agronomist',
    farmerImage:
      'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&q=80',
    region: 'Gulmi',
    district: 'Gulmi',
    altitude: { min: 1400, max: 1750 },
    farmSize: 7.8,
    treesCount: 15200,
    certifications: ['Organic Nepal', 'Fair Trade'],
    shortBio:
      'Community-centred cooperative farming in the pristine hills of Gulmi.',
    story: `Bishnu leads a twelve-family cooperative spread across the southern ridges of Gulmi district, where the subtropical climate gives way to the cooler highlands at exactly the altitude sweet-spot for Bourbon coffee. Each family manages between 0.5 and 1.2 hectares of their own plots, pooling resources for shared processing infrastructure.

The cooperative model was Bishnu's initiative, formed after he returned from agricultural training in Colombo in 2015. By sharing a central pulping station and drying infrastructure, families achieve consistency and traceability that would be impossible if processing individually. Every family's harvest is tracked by GPS and logged to a community ledger that we at HimalayanTrader can share with buyers.

The Gulmi Honey Process lots that come from this cooperative are a product of collective experimentation: three families committed a portion of their 2022 harvest to a six-week experiment with mucilage levels, culminating in the sweet, balanced profile you find in the cup today.`,
    images: [
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
      'https://images.unsplash.com/photo-1562888219-81427a9c36d3?w=800&q=80',
    ],
    coordinates: { lat: 28.0833, lng: 83.2667 },
    yearEstablished: 2008,
    familyGenerations: 2,
    lotsPerYear: 3,
  },
  {
    id: 'farm-003',
    slug: 'ancient-palpa-estate',
    name: 'Ancient Palpa Estate',
    farmerName: 'Sita Devi Thapa',
    farmerTitle: 'Owner-operator & natural processing pioneer',
    farmerImage:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80',
    region: 'Palpa',
    district: 'Palpa',
    altitude: { min: 1200, max: 1600 },
    farmSize: 5.5,
    treesCount: 11000,
    certifications: ['Organic Nepal', 'Women-Owned Certified'],
    shortBio:
      'Nepal\'s foremost natural-process specialist, run entirely by women farmers.',
    story: `Sita Devi inherited the farm from her mother in 2009 and immediately began experimenting with natural (dry) processing — a method largely unknown in Nepal at the time. The first lot was a disaster, she freely admits: over-fermented, wild, undrinkable. By year three she had cracked the code, developing a protocol suited to Palpa's lower humidity and reliable winter winds.

Today the Ancient Palpa Estate is the benchmark for Nepalese natural-process coffee. Sita employs fourteen women from surrounding villages, most of whom are smallholders who intercrop coffee with cardamom on their own land. Her processing model allows them to deliver ripe cherry and receive profit share, effectively extending the estate's reach to 20+ hectares across the district.

The estate's raised African beds — constructed from local bamboo — are Sita's obsession. She turns each lot manually every four hours during the first three days of drying to prevent uneven fermentation. The result is a remarkably clean, fruit-forward profile that surprises first-time buyers expecting wild natural character.`,
    images: [
      'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=800&q=80',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80',
    ],
    coordinates: { lat: 27.8667, lng: 83.5333 },
    yearEstablished: 1995,
    familyGenerations: 2,
    lotsPerYear: 2,
  },
  {
    id: 'farm-004',
    slug: 'ilam-sunrise-cooperative',
    name: 'Ilam Sunrise Cooperative',
    farmerName: 'Hari Prasad Rai',
    farmerTitle: 'Chairman & lead agronomist',
    farmerImage:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    region: 'Ilam',
    district: 'Ilam',
    altitude: { min: 1300, max: 1800 },
    farmSize: 22.0,
    treesCount: 38000,
    certifications: ['Organic Nepal', 'UTZ Certified', 'Direct Trade Verified'],
    shortBio:
      'Eastern Nepal\'s largest specialty cooperative, 47 farming families strong.',
    story: `Ilam district in eastern Nepal is the country's oldest coffee-growing region, with British colonial-era records mentioning coffee as far back as 1870. Hari Prasad chairs a cooperative that now unites 47 farming families across six village clusters, each contributing 0.3 to 1.5 hectares to a pooled system with centralised washing and grading infrastructure.

What makes Ilam Sunrise distinct is the elevation gradient: member farms range from 1,300m in the valley floors to 1,800m on the upper ridges, creating natural lot differentiation. Hari's system separates harvests by altitude band and processing date, allowing traceability to a specific 3-day picking window and a 150-meter elevation range. This granularity is unusual for a cooperative of this size.

Eastern Nepal's proximity to Darjeeling creates unique microclimatic conditions: monsoon rains arrive two weeks later than in western Nepal, extending the harvest season and allowing cherries to develop additional complexity. The lots from the upper farms in particular show a distinctive bergamot-like florality that experienced cuppers identify immediately.`,
    images: [
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80',
      'https://images.unsplash.com/photo-1596952954288-16862d37405b?w=800&q=80',
    ],
    coordinates: { lat: 26.9133, lng: 87.9267 },
    yearEstablished: 1987,
    familyGenerations: 3,
    lotsPerYear: 4,
  },
  {
    id: 'farm-005',
    slug: 'kaski-alpine-gardens',
    name: 'Kaski Alpine Gardens',
    farmerName: 'Dinesh Kumar Gurung',
    farmerTitle: 'Owner & exporter',
    farmerImage:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    region: 'Kaski',
    district: 'Kaski',
    altitude: { min: 1550, max: 1900 },
    farmSize: 6.1,
    treesCount: 13400,
    certifications: ['Organic Nepal', 'Direct Trade Verified'],
    shortBio:
      'Grown in the shadow of the Annapurna massif at 1,750m average altitude.',
    story: `The Annapurna Conservation Area imposes strict limits on agricultural chemicals within 5km of its boundary — and Dinesh's farm sits squarely inside that buffer. What began as a regulatory constraint became a competitive advantage. His trees grow slowly in the thin, volcanic-derived soils without the accelerating effect of synthetic fertilisers, producing smaller beans with higher density and sugar concentration.

Dinesh pioneered direct export from Nepal in 2017, bypassing the Kathmandu trading houses that had historically extracted significant margin from hillside farmers. He now exports directly to six countries, with full traceability from his farm register (paper-based, countersigned by the local ward office) through to export certificate.

The Kaski washing station is Dinesh's pride: a gravity-fed system using water from a protected spring 400 meters above the farm. The water's mineral profile — high in natural calcium, low in iron — contributes measurably to the cup's clean sweetness and contributes to the brightness that Q-graders consistently note.`,
    images: [
      'https://images.unsplash.com/photo-1466976498618-c1a89b45c697?w=800&q=80',
      'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?w=800&q=80',
    ],
    coordinates: { lat: 28.2096, lng: 83.9856 },
    yearEstablished: 2004,
    familyGenerations: 1,
    lotsPerYear: 2,
  },
]

export function getFarmBySlug(slug: string): Farm | undefined {
  return farms.find((f) => f.slug === slug)
}
