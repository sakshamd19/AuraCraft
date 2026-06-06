const products = [
  {
    id: "p1",
    name: "Aegis Cyber Visor",
    tagline: "Augmented Reality HUD & Eye Protection",
    category: "Eyewear",
    price: 19920,
    rating: 4.8,
    reviewsCount: 124,
    image: "images/visor.png",
    description: "The Aegis Cyber Visor combines style and utility. Featuring a high-definition transparent HUD, polarization, auto-dimming sensors, and integrated RGB lighting accents customizable via our mobile application. Protect your eyes while navigating the digital landscape.",
    specifications: {
      "Display": "Transparent micro-OLED 1080p HUD",
      "Lens": "Auto-tinting UV400 polarized glass",
      "Connectivity": "Bluetooth 5.2 / NFC",
      "Battery Life": "Up to 8 hours active use",
      "Weight": "65 grams"
    },
    reviews: [
      { user: "Kaelen V.", rating: 5, comment: "Looks absolutely insane! The HUD is surprisingly bright and legible." },
      { user: "Sarah T.", rating: 4, comment: "Very comfortable, but battery drains a bit faster if RGB is set to maximum brightness." }
    ],
    features: [
      "Real-time HUD notification display",
      "Auto-dimming ambient light adaptation",
      "Sleek aerospace-grade titanium frame"
    ],
    popular: true
  },
  {
    id: "p2",
    name: "Nova Modular Pack",
    tagline: "Waterproof Fidlock Tech Backpack",
    category: "Bags",
    price: 15120,
    rating: 4.9,
    reviewsCount: 86,
    image: "images/backpack.png",
    description: "Built for urban exploration and daily commutes, the Nova Modular Pack features water-impermeable Cordura nylon, German-engineered Fidlock magnetic closures, a padded 16-inch laptop pocket, and an integrated 10W solar charger to keep your devices powered.",
    specifications: {
      "Material": "1000D Cordura Nylon / TPU coating",
      "Capacity": "28 Liters (expandable to 34L)",
      "Solar Panel": "10W high-efficiency monocrystalline",
      "Fasteners": "Fidlock V-Buckle 25",
      "Weight": "1.2 kg"
    },
    reviews: [
      { user: "Leo M.", rating: 5, comment: "Fidlock buckles are super satisfying to use. Fits my MacBook Pro 16 perfectly." },
      { user: "Dana K.", rating: 5, comment: "Keeps everything dry even in torrential rain. Solar charger works great for my phone." }
    ],
    features: [
      "Expandable roll-top design with Fidlock buckles",
      "Anti-theft hidden pockets and card slots",
      "Integrated USB-C external charging port"
    ],
    popular: true
  },
  {
    id: "p3",
    name: "Helix Smart Jacket",
    tagline: "Active Thermal-Regulating Windbreaker",
    category: "Apparel",
    price: 31920,
    rating: 4.7,
    reviewsCount: 95,
    image: "images/jacket.png",
    description: "The Helix Jacket adapts to your environment. Equipped with micro-heating elements powered by a standard USB battery pack, breathable waterproof fabrics, and subtle fiber-optic light pipelines on the sleeves to keep you visible and warm.",
    specifications: {
      "Material": "3-Layer Graphene membrane",
      "Heating Elements": "Carbon nanotube heating pads",
      "Waterproofing": "20,000mm hydrostatic head",
      "Power Input": "USB-A (requires 5V/2A power bank)",
      "Lighting": "App-controlled fiber optics"
    },
    reviews: [
      { user: "Marcus D.", rating: 5, comment: "The heat distribution is excellent. Kept me warm in sub-zero weather." },
      { user: "Elena P.", rating: 4, comment: "A bit heavy with the battery, but the aesthetics and heat function make up for it." }
    ],
    features: [
      "3-zone carbon nanotube heating system",
      "Windproof, waterproof, and highly breathable",
      "Safety-enhancing customizable light pipelines"
    ],
    popular: true
  },
  {
    id: "p4",
    name: "Chronos Kinetic Band",
    tagline: "Biometric Self-Charging Wrist Wear",
    category: "Accessories",
    price: 10320,
    rating: 4.5,
    reviewsCount: 64,
    image: "images/band.png",
    description: "Ditch the charger. The Chronos Kinetic Band harvests energy from your body's motion. Packed with medical-grade heart rate, SpO2, and skin temperature sensors, it projects notifications onto your skin using a micro-laser projector.",
    specifications: {
      "Charging": "Kinetic movement generator + solar backup",
      "Sensors": "Optical HR, SpO2, galvanic skin response",
      "Display": "Class 1 Safe laser skin projector",
      "Strap": "Hypoallergenic fluoroelastomer",
      "Water Resistance": "5 ATM (50 meters)"
    },
    reviews: [
      { user: "Jaxon W.", rating: 5, comment: "The skin projector looks futuristic as hell. No issues with kinetic charging." },
      { user: "Nina L.", rating: 4, comment: "Skin projection is a bit hard to read in direct sunlight, but indoors it's gorgeous." }
    ],
    features: [
      "Continuous health and fitness tracking",
      "Zero-recharge kinetic energy harvesting",
      "Sleek laser skin projection display"
    ],
    popular: false
  },
  {
    id: "p5",
    name: "Apex Mechanical Deck",
    tagline: "CNC Hot-Swappable Jade Keyboard",
    category: "Workspace",
    price: 17520,
    rating: 4.9,
    reviewsCount: 210,
    image: "images/keyboard.png",
    description: "Engineered for pure tactile feedback. The Apex Deck features a solid anodized CNC aluminum chassis, hot-swappable Kailh Box Jade switches, PBT double-shot keycaps, and a gasket mount system that provides a deep, satisfying acoustic sound signature.",
    specifications: {
      "Layout": "75% ANSI layout (84 keys)",
      "Switches": "Kailh Box Jade clicky switches",
      "Frame": "6063 Anodized Aluminum casing",
      "Mounting": "Poron foam gasket mount",
      "Backlighting": "Per-key programmable RGB South-facing"
    },
    reviews: [
      { user: "Tyler S.", rating: 5, comment: "Absolute masterpiece. The weight and build quality feel extremely premium." },
      { user: "Alice C.", rating: 5, comment: "The Box Jade switches click beautifully and the sound profile is deep and creamy." }
    ],
    features: [
      "Solid milled aluminum structure (2.1 kg)",
      "Hot-swappable switches for easy customization",
      "Gasket mounted for premium flex and acoustics"
    ],
    popular: true
  },
  {
    id: "p6",
    name: "Vortex Carbon Wallet",
    tagline: "RFID Blocking Quick-Access Cardholder",
    category: "Accessories",
    price: 6320,
    rating: 4.6,
    reviewsCount: 342,
    image: "images/wallet.png",
    description: "Ditch the bulk. The Vortex Carbon Wallet is machined from 3K aerospace-grade carbon fiber. With a patented ejector mechanism, your cards fan out gracefully at the press of a button. Built-in RFID protection keeps your digital data secure.",
    specifications: {
      "Material": "3K Carbon Fiber & Aerospace Aluminum",
      "Card Capacity": "Up to 12 cards + cash strap",
      "RFID Protection": "13.56 MHz blocking frequency",
      "Thickness": "Just 8.5 mm",
      "Weight": "45 grams"
    },
    reviews: [
      { user: "Brian P.", rating: 5, comment: "Holds all my cards in a tiny footprint. Ejection lever works flawlessly." },
      { user: "Lisa R.", rating: 4, comment: "Cash strap could be slightly tighter, but the card mechanism is perfect." }
    ],
    features: [
      "Instant push-button card fanning",
      "Ultra-slim RFID blocking chassis",
      "High-tensile carbon cash band"
    ],
    popular: false
  },
  {
    id: "p7",
    name: "Orion Desk Mat",
    tagline: "Dual-Qi Wireless Charging RGB Pad",
    category: "Workspace",
    price: 5200,
    rating: 4.8,
    reviewsCount: 153,
    image: "images/deskmat.png",
    description: "Clutter-free productivity. The Orion Desk Mat provides a huge, water-resistant microfiber surface for your mouse and keyboard, plus dual integrated 15W Qi wireless charging coils on the left side to charge your phone and wireless earbuds simultaneously.",
    specifications: {
      "Material": "Waterproof textured micro-weave cloth",
      "Dimensions": "900mm x 400mm x 4mm",
      "Charging Coils": "Dual 15W Qi-compatible chargers",
      "RGB Zones": "2-zone stitched dynamic lighting border",
      "Input": "Dual USB-C inputs (requires QC 3.0 adapter)"
    },
    reviews: [
      { user: "Kevin L.", rating: 5, comment: "My desk looks extremely clean now. Mouse glide is very smooth and wireless chargers work great." },
      { user: "Maya F.", rating: 4, comment: "Need to make sure you use a powerful wall brick to run both wireless chargers at full speed." }
    ],
    features: [
      "Two built-in 15W Qi wireless chargers",
      "Spill-resistant microfiber tracking fabric",
      "Customizable 360° dynamic neon RGB edge"
    ],
    popular: false
  },
  {
    id: "p8",
    name: "Aero Wireless Buds",
    tagline: "Ultra-Low Latency Active Noise Cancelling",
    category: "Audio",
    price: 12720,
    rating: 4.7,
    reviewsCount: 89,
    image: "images/buds.png",
    description: "Immerse yourself. Featuring advanced hybrid Active Noise Cancellation and dynamic 11mm graphene drivers, the Aero buds deliver deep bass and crisp highs. Activating gaming mode drops audio latency to a class-leading 38ms.",
    specifications: {
      "Drivers": "11mm Dynamic Graphene diaphragms",
      "ANC": "Hybrid feedforward + feedback (up to 42dB)",
      "Latency": "38ms in Ultra-Low Latency mode",
      "Battery Life": "7 hours buds / 28 hours total case",
      "Water Resistance": "IPX5 sweat and splash rating"
    },
    reviews: [
      { user: "Jason T.", rating: 5, comment: "ANC is almost as good as my over-ear headphones. Absolutely no lag when gaming." },
      { user: "Sophia G.", rating: 4, comment: "Fits comfortably, but takes a few tries to get the perfect seal with the ear tips." }
    ],
    features: [
      "Hybrid Active Noise Cancellation up to 42dB",
      "38ms Ultra-Low Latency Game Mode",
      "Futuristic cybernetic zinc-alloy charging case"
    ],
    popular: true
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = products;
}
