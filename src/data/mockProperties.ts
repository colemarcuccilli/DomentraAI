import { Property } from '../types/property';

export const mockProperties: Property[] = [
  {
    id: 'prop-1',
    title: 'Elegant Victorian Home',
    address: {
      street: '123 Maple Street',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94110'
    },
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94110',
    price: 1250000,
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 2800,
    propertyType: 'Single Family',
    yearBuilt: 1915,
    description: 'Beautiful Victorian home with modern updates, hardwood floors, and a spacious backyard. This meticulously maintained property features original architectural details combined with thoughtful renovations. The gourmet kitchen includes stainless steel appliances, quartz countertops, and custom cabinetry. Upstairs, the primary suite offers a walk-in closet and a luxurious bathroom with a clawfoot tub. The backyard is perfect for entertaining with a deck, landscaped garden, and mature fruit trees. Located in the heart of the Mission District, this home is just steps away from popular restaurants, shops, and public transportation.',
    imageUrls: [
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1494526585095-c41746248156?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    ],
    isFeatured: true,
    roi: 12.5,
    capRate: 5.8,
    arv: 1550000,
    purchasePrice: 1250000,
    features: [
      'Modern design', 
      'Renovated kitchen', 
      'Hardwood floors', 
      'Original crown molding',
      'Bay windows',
      'Spacious backyard',
      'Garage parking',
      'Central heating'
    ],
    status: 'active',
    neighborhood: {
      name: 'Mission District',
      rating: 4.5,
      description: 'Vibrant neighborhood with excellent dining, shopping, and cultural attractions.',
      safetyRating: 4.0
    },
    schools: [
      { name: 'Mission High School', rating: 4.2, distance: 0.8 },
      { name: 'Everett Middle School', rating: 4.0, distance: 1.2 }
    ],
    nearbyAmenities: ['Dolores Park', 'Whole Foods Market', 'BART Station', 'Valencia Street Shops'],
    taxInfo: {
      annualAmount: 15000,
      year: 2023
    },
    sellerInfo: {
      name: 'John Smith',
      contact: '(415) 555-1234',
      type: 'owner'
    },
    location: {
      latitude: 37.7599,
      longitude: -122.4148
    },
    seller: {
      name: 'John Smith',
      company: 'Golden Gate Realty',
      phone: '(415) 555-1234',
      email: 'john@goldengaterealty.com',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80'
    },
    listedDate: '2023-05-15',
    lotSize: 4500
  },
  {
    id: 'prop-2',
    title: 'Modern Downtown Loft',
    address: {
      street: '456 Urban Avenue',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60611'
    },
    city: 'Chicago',
    state: 'IL',
    zipCode: '60611',
    price: 850000,
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1800,
    propertyType: 'Condo',
    yearBuilt: 2010,
    description: 'Sleek downtown loft with floor-to-ceiling windows, gourmet kitchen, and building amenities. This contemporary space features an open floor plan with polished concrete floors and exposed ductwork for an industrial chic aesthetic. The chef\'s kitchen includes high-end appliances, waterfall quartz countertops, and custom cabinetry. The primary bedroom offers a spa-like ensuite bathroom with a rainfall shower and soaking tub. Building amenities include 24-hour doorman, fitness center, rooftop deck, and resident lounge. Located in the heart of River North, this loft is surrounded by Chicago\'s best restaurants, galleries, and shopping.',
    imageUrls: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    ],
    roi: 8.2,
    capRate: 4.5,
    arv: 950000,
    purchasePrice: 850000,
    features: [
      'Floor-to-ceiling windows', 
      'Gourmet kitchen', 
      'Building amenities',
      'Concrete floors',
      'Exposed ductwork',
      'High ceilings',
      '24-hour doorman',
      'Fitness center'
    ],
    status: 'active',
    neighborhood: {
      name: 'River North',
      rating: 4.7,
      description: 'Trendy downtown neighborhood known for art galleries, restaurants, and nightlife.',
      safetyRating: 4.2
    },
    nearbyAmenities: ['Millennium Park', 'Navy Pier', 'Chicago Riverwalk', 'Magnificent Mile'],
    location: {
      latitude: 41.8936,
      longitude: -87.6337
    },
    seller: {
      name: 'Emily Johnson',
      company: 'Urban Living Real Estate',
      phone: '(312) 555-6789',
      email: 'emily@urbanlivingrealty.com',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80'
    },
    listedDate: '2023-06-22',
    lotSize: 0
  },
  {
    id: 'prop-3',
    title: 'Beachfront Luxury Villa',
    address: {
      street: '101 Ocean View',
      city: 'Miami',
      state: 'FL',
      zipCode: '33139'
    },
    city: 'Miami',
    state: 'FL',
    zipCode: '33139',
    price: 3200000,
    bedrooms: 5,
    bathrooms: 5.5,
    squareFeet: 4500,
    propertyType: 'Luxury',
    yearBuilt: 2018,
    description: 'Stunning beachfront villa with panoramic ocean views, infinity pool, and smart home features. This architectural masterpiece offers indoor-outdoor living at its finest with retractable glass walls that open to expansive terraces. The gourmet kitchen features top-of-the-line appliances, custom cabinetry, and a large center island. The primary suite includes a private balcony, walk-in closet, and a spa-like bathroom with ocean views. Additional amenities include a home theater, wine cellar, gym, and private beach access. The outdoor space features an infinity pool, summer kitchen, and multiple lounging areas, all with breathtaking views of the Atlantic Ocean.',
    imageUrls: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1494526585095-c41746248156?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    ],
    isFeatured: true,
    roi: 15.3,
    capRate: 6.1,
    arv: 3800000,
    purchasePrice: 3200000,
    features: [
      'Infinity pool', 
      'Smart home features', 
      'Ocean views',
      'Private beach access',
      'Home theater',
      'Wine cellar',
      'Gym',
      'Summer kitchen'
    ],
    status: 'active',
    neighborhood: {
      name: 'South Beach',
      rating: 4.8,
      description: 'Iconic Miami neighborhood known for beautiful beaches, art deco architecture, and vibrant nightlife.',
      safetyRating: 4.3
    },
    schools: [
      { name: 'South Beach Elementary', rating: 4.5, distance: 1.0 },
      { name: 'Miami Beach High', rating: 4.3, distance: 1.5 }
    ],
    nearbyAmenities: ['Ocean Drive', 'Lincoln Road Mall', 'South Pointe Park', 'Art Deco Historic District'],
    taxInfo: {
      annualAmount: 32000,
      year: 2023
    },
    location: {
      latitude: 25.7825,
      longitude: -80.1342
    },
    seller: {
      name: 'Michael Rodriguez',
      company: 'Luxury Miami Properties',
      phone: '(305) 555-9876',
      email: 'michael@luxurymiami.com',
      image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80'
    },
    listedDate: '2023-04-10',
    lotSize: 12000
  },
  {
    id: 'prop-4',
    title: 'Mountain Retreat Cabin',
    address: {
      street: '555 Pine Trail',
      city: 'Aspen',
      state: 'CO',
      zipCode: '81611'
    },
    city: 'Aspen',
    state: 'CO',
    zipCode: '81611',
    price: 1450000,
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 2200,
    propertyType: 'Cabin',
    yearBuilt: 2000,
    description: 'Cozy mountain cabin with stunning views, stone fireplace, and proximity to ski resorts. This rustic yet refined retreat features vaulted ceilings with exposed wooden beams and large windows that frame the spectacular mountain scenery. The great room centers around a massive stone fireplace and opens to a gourmet kitchen with high-end appliances and custom cabinetry. The primary suite offers a private deck, walk-in closet, and a spa-like bathroom with a soaking tub. Outside, the wraparound deck provides the perfect spot for outdoor dining and enjoying the alpine air. Located just minutes from world-class skiing, hiking trails, and downtown Aspen.',
    imageUrls: [
      'https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1520608760-eff2c38b06d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506974210756-8e1b8985d348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    ],
    roi: 11.8,
    capRate: 5.5,
    arv: 1650000,
    purchasePrice: 1450000,
    features: [
      'Stone fireplace', 
      'Mountain views', 
      'Ski resort access',
      'Vaulted ceilings',
      'Wraparound deck',
      'Exposed beams',
      'Heated floors',
      'Hot tub'
    ],
    status: 'active',
    neighborhood: {
      name: 'Aspen Mountain',
      rating: 4.9,
      description: 'Premier mountain location with stunning views and easy access to world-class skiing.',
      safetyRating: 4.8
    },
    nearbyAmenities: ['Aspen Mountain Ski Resort', 'Downtown Aspen', 'Hiking Trails', 'Maroon Bells'],
    location: {
      latitude: 39.1911,
      longitude: -106.8175
    },
    seller: {
      name: 'Sarah Thompson',
      company: 'Mountain Luxury Realty',
      phone: '(970) 555-4321',
      email: 'sarah@mountainluxury.com',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80'
    },
    listedDate: '2023-07-05',
    lotSize: 8500
  }
]; 