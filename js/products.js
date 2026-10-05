// Product data - based on focuseetech.com
const products = [
  // Portable Air Conditioners
  {
    id: 1,
    name: "PCR-RMA Portable AC",
    category: "air-conditioner",
    categoryName: "Portable Air Con.",
    model: "PCR-RMA",
    btu: "5,000 / 6,000 BTU",
    price: 299,
    originalPrice: 399,
    image: "https://p26-doubao-search-sign.byteimg.com/labis/image/8a1db72b0fe5d522adea38d2e9af623c~tplv-be4g95zd3a-896x896.jpeg?lk3s=0ed4045e&x-expires=1806740648&x-signature=PhQk8CvCr647EseF18BUzM4t8ys%3D",
    description: "R32 compact portable air conditioner. Ductless design, plug and play, ideal for bedrooms and offices. Touch pad control, 3 fan speeds, 0-24H timer.",
    specs: {
      "Cooling Capacity": "5000/6000 BTU",
      "Power": "819/922W",
      "Noise": "≤65dB",
      "Refrigerant": "R32",
      "Dimensions": "W342×D315.5×H712mm",
      "Weight": "21/22kg",
      "Certification": "CE/GS/RoHS"
    },
    features: ["Ductless Design", "Touch Pad Control", "3 Fan Speeds", "0-24H Timer", "Self-Diagnosis"],
    stock: 50,
    hot: true
  },
  {
    id: 2,
    name: "PCX-12MA Portable AC",
    category: "air-conditioner",
    categoryName: "Portable Air Con.",
    model: "PCX-12MA",
    btu: "600 / 900 BTU",
    price: 199,
    originalPrice: 259,
    image: "https://p26-doubao-search-sign.byteimg.com/isp-i18n-media/image/d71eb3a1b641345c034af931afd21201~tplv-be4g95zd3a-896x896.jpeg?lk3s=0ed4045e&x-expires=1806740648&x-signature=6x3ZOGLjulqdTnIEIWlzEnTiqYo%3D",
    description: "Ultra-compact portable air conditioner designed for tents, RVs and outdoor camping. Low power consumption, can be powered by portable power station.",
    specs: {
      "Cooling Capacity": "600/900 BTU",
      "Power": "200W",
      "Noise": "≤38dB",
      "Refrigerant": "R290",
      "Dimensions": "280×250×450mm",
      "Weight": "12kg",
      "Certification": "CE/RoHS"
    },
    features: ["Ultra-Lightweight", "Low Power", "Camping Ready", "Fast Cooling"],
    stock: 100,
    hot: true
  },
  {
    id: 3,
    name: "PC-PMC Portable AC",
    category: "air-conditioner",
    categoryName: "Portable Air Con.",
    model: "PC-PMC",
    btu: "5,000-12,000 BTU",
    price: 459,
    originalPrice: 599,
    image: "https://p26-doubao-search-sign.byteimg.com/labis/image/8a1db72b0fe5d522adea38d2e9af623c~tplv-be4g95zd3a-896x896.jpeg?lk3s=0ed4045e&x-expires=1806740648&x-signature=PhQk8CvCr647EseF18BUzM4t8ys%3D",
    description: "High capacity portable air conditioner for living rooms and large spaces. Multiple BTU options available to meet different needs. Cooling, heating, dehumidifying and purifying.",
    specs: {
      "Cooling Capacity": "5000-12000 BTU",
      "Power": "1100W",
      "Noise": "≤56dB",
      "Refrigerant": "R32",
      "Dimensions": "450×400×850mm",
      "Weight": "32kg",
      "Certification": "CE/GS/ETL/RoHS"
    },
    features: ["High Capacity", "Cool & Heat", "Dehumidifying", "Air Purifying"],
    stock: 30,
    hot: false
  },
  {
    id: 4,
    name: "PC-MMA Commercial AC",
    category: "air-conditioner",
    categoryName: "Portable Air Con.",
    model: "PC-MMA",
    btu: "18,000-24,000 BTU",
    price: 899,
    originalPrice: 1199,
    image: "https://p26-doubao-search-sign.byteimg.com/isp-i18n-media/image/d71eb3a1b641345c034af931afd21201~tplv-be4g95zd3a-896x896.jpeg?lk3s=0ed4045e&x-expires=1806740648&x-signature=6x3ZOGLjulqdTnIEIWlzEnTiqYo%3D",
    description: "Commercial grade high capacity portable air conditioner for server rooms, factories and large event venues. Continuous operation, self-diagnosis function.",
    specs: {
      "Cooling Capacity": "18000-24000 BTU",
      "Power": "2200W",
      "Noise": "≤62dB",
      "Refrigerant": "R410A",
      "Dimensions": "550×500×1100mm",
      "Weight": "58kg",
      "Certification": "CE/GS/ETL"
    },
    features: ["Commercial Grade", "Ultra High Capacity", "Industrial Design", "Continuous Operation"],
    stock: 15,
    hot: false
  },
  // Dehumidifiers
  {
    id: 5,
    name: "PD-12AE Dehumidifier",
    category: "dehumidifier",
    categoryName: "Dehumidifier",
    model: "PD-12AE",
    btu: "30-50 L/Day",
    price: 249,
    originalPrice: 329,
    image: "https://p26-doubao-search-sign.byteimg.com/labis/image/8a1db72b0fe5d522adea38d2e9af623c~tplv-be4g95zd3a-896x896.jpeg?lk3s=0ed4045e&x-expires=1806740648&x-signature=PhQk8CvCr647EseF18BUzM4t8ys%3D",
    description: "Large capacity dehumidifier for basements, warehouses and large spaces. Auto-defrost, continuous drain option. 30/40/50L per day models available.",
    specs: {
      "Dehumidification": "30/40/50L/day",
      "Power": "450W",
      "Noise": "≤48dB",
      "Tank Capacity": "6.5L",
      "Dimensions": "350×300×580mm",
      "Weight": "18kg",
      "Certification": "CE/RoHS"
    },
    features: ["Large Capacity", "Auto-Defrost", "Continuous Drain", "Humidity Setting"],
    stock: 60,
    hot: true
  },
  {
    id: 6,
    name: "PD-K Series Dehumidifier",
    category: "dehumidifier",
    categoryName: "Dehumidifier",
    model: "PD-K Series",
    btu: "10-20 L/Day",
    price: 159,
    originalPrice: 199,
    image: "https://p26-doubao-search-sign.byteimg.com/isp-i18n-media/image/d71eb3a1b641345c034af931afd21201~tplv-be4g95zd3a-896x896.jpeg?lk3s=0ed4045e&x-expires=1806740648&x-signature=6x3ZOGLjulqdTnIEIWlzEnTiqYo%3D",
    description: "Compact home dehumidifier with multiple panel design options. Ideal for bedrooms, studies and bathrooms. 10/12/18/20L per day, 2.5L water tank.",
    specs: {
      "Dehumidification": "10/12/18/20L/day",
      "Power": "220W",
      "Noise": "≤42dB",
      "Tank Capacity": "2.5L",
      "Dimensions": "280×250×480mm",
      "Weight": "12kg",
      "Certification": "CE/RoHS"
    },
    features: ["Compact & Quiet", "Multiple Panels", "Auto-Defrost", "Full Tank Shut-off"],
    stock: 80,
    hot: false
  },
  // Air Purifiers
  {
    id: 7,
    name: "PPD-AAE Air Purifier",
    category: "purifier",
    categoryName: "Air Purifier",
    model: "PPD-AAE",
    btu: "CADR 340 m³/h",
    price: 199,
    originalPrice: 269,
    image: "https://p26-doubao-search-sign.byteimg.com/labis/image/8a1db72b0fe5d522adea38d2e9af623c~tplv-be4g95zd3a-896x896.jpeg?lk3s=0ed4045e&x-expires=1806740648&x-signature=PhQk8CvCr647EseF18BUzM4t8ys%3D",
    description: "HEPA filter air purifier, efficiently removes PM2.5, formaldehyde and odors. Suitable for 30-50㎡ spaces. CADR 340 m³/h.",
    specs: {
      "CADR": "340 m³/h",
      "Power": "45W",
      "Noise": "≤55dB",
      "Filter": "HEPA H13 + Activated Carbon",
      "Coverage": "30-50㎡",
      "Dimensions": "320×320×650mm",
      "Weight": "8.5kg",
      "Certification": "CE/CARB/RoHS"
    },
    features: ["HEPA H13", "Formaldehyde Removal", "Smart Sensor", "Filter Reminder"],
    stock: 70,
    hot: true
  },
  {
    id: 8,
    name: "PPD-EAE Modular Purifier",
    category: "purifier",
    categoryName: "Air Purifier",
    model: "PPD-EAE",
    btu: "Modular Design",
    price: 299,
    originalPrice: 399,
    image: "https://p26-doubao-search-sign.byteimg.com/isp-i18n-media/image/d71eb3a1b641345c034af931afd21201~tplv-be4g95zd3a-896x896.jpeg?lk3s=0ed4045e&x-expires=1806740648&x-signature=6x3ZOGLjulqdTnIEIWlzEnTiqYo%3D",
    description: "Modular DIY design, 1 air block = 1 function. Freely combine purification functions based on your needs. CADR 450 m³/h.",
    specs: {
      "CADR": "450 m³/h",
      "Power": "60W",
      "Noise": "≤58dB",
      "Filter": "Modular Replaceable",
      "Coverage": "40-60㎡",
      "Dimensions": "350×350×700mm",
      "Weight": "11kg",
      "Certification": "CE/CARB/RoHS"
    },
    features: ["Modular DIY", "Expandable Functions", "High CADR", "Child Lock"],
    stock: 40,
    hot: false
  }
];

// Category data
const categories = [
  { id: "all", name: "All Products", icon: "🏠" },
  { id: "air-conditioner", name: "Portable Air Con.", icon: "❄️" },
  { id: "dehumidifier", name: "Dehumidifier", icon: "💧" },
  { id: "purifier", name: "Air Purifier", icon: "🌬️" }
];
