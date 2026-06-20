export const aiConsultants = [
  {
    id: "ai-1",
    name: "DermAI v4",
    specialty: "General Dermatology",
    precision: 99.2,
    avatar: "/avatars/ai-1.jpg",
    description: "Your first line of defense for standard skin concerns."
  },
  {
    id: "ai-2",
    name: "PsoriaGen",
    specialty: "Psoriasis Specialist",
    precision: 98.7,
    avatar: "/avatars/ai-2.jpg",
    description: "Deeply trained on chronic psoriasis and eczema management."
  },
  {
    id: "ai-3",
    name: "PediSkin AI",
    specialty: "Pediatric Derm",
    precision: 99.5,
    avatar: "/avatars/ai-3.jpg",
    description: "Specialized in sensitive pediatric skin conditions."
  }
];

export const medicines = [
  { id: "m-1", name: "HydraSoothe Cream", price: 34.99, image: "/products/med-1.jpg", type: "Topical" },
  { id: "m-2", name: "PsoriaClear Gel", price: 45.00, image: "/products/med-2.jpg", type: "Topical" },
  { id: "m-3", name: "DermaCalm Lotion", price: 28.50, image: "/products/med-3.jpg", type: "Topical" },
  { id: "m-4", name: "Eczema Relief Ointment", price: 39.99, image: "/products/med-4.jpg", type: "Topical" },
  { id: "m-5", name: "NutriSkin Supplements", price: 29.99, image: "/products/med-5.jpg", type: "Oral" },
  { id: "m-6", name: "Scalp Rescue Serum", price: 42.00, image: "/products/med-6.jpg", type: "Topical" },
];

export const garments = [
  { id: "g-1", name: "SootheWeave Long Sleeve", fabric: "Bamboo Blend", price: 65.00, image: "/products/garment-1.jpg", benefits: ["Anti-itch", "Moisture-wicking"], gender: "Men" },
  { id: "g-2", name: "DermaShield Leggings", fabric: "Silver Ion Cotton", price: 75.00, image: "/products/garment-2.jpg", benefits: ["Antibacterial", "Cooling"], gender: "Women" },
  { id: "g-3", name: "CalmWear T-Shirt", fabric: "Zinc-Infused Modal", price: 55.00, image: "/products/garment-3.jpg", benefits: ["Reduces Inflammation"], gender: "Men" },
  { id: "g-4", name: "GentleTouch Sleepwear", fabric: "Silk-Modal", price: 120.00, image: "/products/garment-4.jpg", benefits: ["Frictionless", "Temperature Control"], gender: "Women" },
  { id: "g-5", name: "PsoriaGuard Socks", fabric: "Bamboo Blend", price: 25.00, image: "/products/garment-5.jpg", benefits: ["Moisture-wicking", "Soft seams"], gender: "Unisex" },
  { id: "g-6", name: "Relief Wrap Scarf", fabric: "Zinc-Infused Modal", price: 40.00, image: "/products/garment-6.jpg", benefits: ["UV Protection", "Cooling"], gender: "Unisex" },
  { id: "g-7", name: "ActiveHeal Shorts", fabric: "Silver Ion Cotton", price: 60.00, image: "/products/garment-7.jpg", benefits: ["Antibacterial", "Breathable"], gender: "Men" },
  { id: "g-8", name: "SoftEmbrace Cardigan", fabric: "Merino Wool Blend", price: 95.00, image: "/products/garment-8.jpg", benefits: ["Thermoregulation", "Non-irritating"], gender: "Women" },
];

export const activeOrders = [
  { id: "ord-1023", productName: "PsoriaClear Gel", status: "Active", date: "2026-06-18", type: "Medicine" },
  { id: "ord-1024", productName: "SootheWeave Long Sleeve", status: "Pending", date: "2026-06-19", type: "Garment" },
];

export const dashboardStats = {
  scoreData: [
    { name: 'Mon', score: 65 },
    { name: 'Tue', score: 68 },
    { name: 'Wed', score: 70 },
    { name: 'Thu', score: 72 },
    { name: 'Fri', score: 78 },
    { name: 'Sat', score: 82 },
    { name: 'Sun', score: 85 },
  ],
  stats: [
    { label: "Skin Score", value: "85/100", trend: "+12%", iconName: "Activity", color: "text-emerald-500" },
    { label: "Active Treatment", value: "PsoriaClear Gel", trend: "Applying 2x/day", iconName: "Pill", color: "text-primary-500" },
    { label: "Next AI Checkup", value: "Tomorrow, 10 AM", trend: "DermAI v4", iconName: "Bot", color: "text-amber-500" },
    { label: "Garment Status", value: "SootheWeave", trend: "Worn 14hrs", iconName: "Shirt", color: "text-blue-500" },
  ],
  activities: [
    { title: "Garment Sync Complete", time: "2 hours ago", desc: "SootheWeave sensors detected reduced inflammation.", type: "system" },
    { title: "Medication Applied", time: "5 hours ago", desc: "PsoriaClear Gel applied to left forearm.", type: "user" },
    { title: "AI Consultant Review", time: "Yesterday", desc: "DermAI v4 updated your healing timeline.", type: "ai" },
  ]
};
