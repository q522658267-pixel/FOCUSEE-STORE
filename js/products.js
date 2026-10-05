// 产品数据 - 参考focuseetech.com
const products = [
  // 便携空调
  {
    id: 1,
    name: "PCR-RMA 便携空调",
    category: "air-conditioner",
    categoryName: "便携空调",
    model: "PCR-RMA",
    btu: "5,000 / 6,000 BTU",
    price: 299,
    originalPrice: 399,
    image: "https://images.unsplash.com/photo-1631545806609-24c3be9667a2?w=400&h=400&fit=crop",
    description: "免排热管设计，即插即用，适合卧室、办公室使用。WiFi智能控制，支持Tuya生态系统。",
    specs: {
      "制冷量": "5000/6000 BTU",
      "功率": "500W",
      "噪音": "≤52dB",
      "制冷剂": "R290",
      "尺寸": "380×350×700mm",
      "重量": "21kg",
      "认证": "CE/GS/ROHS"
    },
    features: ["免排热管", "WiFi智能控制", "24小时定时", "自蒸发系统", "万向轮移动"],
    stock: 50,
    hot: true
  },
  {
    id: 2,
    name: "PCX-12MA 便携空调",
    category: "air-conditioner",
    categoryName: "便携空调",
    model: "PCX-12MA",
    btu: "600 / 900 BTU",
    price: 199,
    originalPrice: 259,
    image: "https://images.unsplash.com/photo-1631545806609-24c3be9667a2?w=400&h=400&fit=crop",
    description: "超小型便携空调，专为帐篷、房车、户外露营设计。低功耗，可接充电宝使用。",
    specs: {
      "制冷量": "600/900 BTU",
      "功率": "200W",
      "噪音": "≤38dB",
      "制冷剂": "R290",
      "尺寸": "280×250×450mm",
      "重量": "12kg",
      "认证": "CE/ROHS"
    },
    features: ["超轻便携", "低功耗", "露营专用", "USB供电", "快速制冷"],
    stock: 100,
    hot: true
  },
  {
    id: 3,
    name: "PC-PMC 便携空调",
    category: "air-conditioner",
    categoryName: "便携空调",
    model: "PC-PMC",
    btu: "5,000-12,000 BTU",
    price: 459,
    originalPrice: 599,
    image: "https://images.unsplash.com/photo-1631545806609-24c3be9667a2?w=400&h=400&fit=crop",
    description: "大制冷量便携空调，适合客厅、大空间使用。多种BTU可选，满足不同需求。",
    specs: {
      "制冷量": "5000-12000 BTU",
      "功率": "1100W",
      "噪音": "≤56dB",
      "制冷剂": "R32",
      "尺寸": "450×400×850mm",
      "重量": "32kg",
      "认证": "CE/GS/ETL/ROHS"
    },
    features: ["大制冷量", "冷暖两用", "WiFi控制", "除湿功能", "空气净化"],
    stock: 30,
    hot: false
  },
  {
    id: 4,
    name: "PC-MMA 商用便携空调",
    category: "air-conditioner",
    categoryName: "便携空调",
    model: "PC-MMA",
    btu: "18,000-24,000 BTU",
    price: 899,
    originalPrice: 1199,
    image: "https://images.unsplash.com/photo-1631545806609-24c3be9667a2?w=400&h=400&fit=crop",
    description: "商用级大制冷量便携空调，适合机房、厂房、大型活动现场使用。",
    specs: {
      "制冷量": "18000-24000 BTU",
      "功率": "2200W",
      "噪音": "≤62dB",
      "制冷剂": "R410A",
      "尺寸": "550×500×1100mm",
      "重量": "58kg",
      "认证": "CE/GS/ETL"
    },
    features: ["商用级", "超大制冷量", "工业设计", "连续运行", "故障自诊断"],
    stock: 15,
    hot: false
  },
  // 除湿机
  {
    id: 5,
    name: "PD-12AE 除湿机",
    category: "dehumidifier",
    categoryName: "除湿机",
    model: "PD-12AE",
    btu: "30-50 L/Day",
    price: 249,
    originalPrice: 329,
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=400&fit=crop",
    description: "大容量除湿机，适合地下室、仓库、大空间使用。自动除霜，连续排水。",
    specs: {
      "日除湿量": "30/40/50L",
      "功率": "450W",
      "噪音": "≤48dB",
      "水箱容量": "6.5L",
      "尺寸": "350×300×580mm",
      "重量": "18kg",
      "认证": "CE/ROHS"
    },
    features: ["大容量", "自动除霜", "连续排水", "湿度设定", "万向轮"],
    stock: 60,
    hot: true
  },
  {
    id: 6,
    name: "PD-K 系列除湿机",
    category: "dehumidifier",
    categoryName: "除湿机",
    model: "PD-K Series",
    btu: "10-20 L/Day",
    price: 159,
    originalPrice: 199,
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=400&fit=crop",
    description: "家用小型除湿机，多种面板设计可选。适合卧室、书房、卫生间使用。",
    specs: {
      "日除湿量": "10/12/18/20L",
      "功率": "220W",
      "噪音": "≤42dB",
      "水箱容量": "2.5L",
      "尺寸": "280×250×480mm",
      "重量": "12kg",
      "认证": "CE/ROHS"
    },
    features: ["小巧静音", "多种面板", "自动除霜", "水满停机", "负离子净化"],
    stock: 80,
    hot: false
  },
  // 空气净化器
  {
    id: 7,
    name: "PPD-AAE 空气净化器",
    category: "purifier",
    categoryName: "空气净化器",
    model: "PPD-AAE",
    btu: "CADR 340 m³/h",
    price: 199,
    originalPrice: 269,
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=400&fit=crop",
    description: "HEPA滤网空气净化器，高效去除PM2.5、甲醛、异味。适合30-50㎡空间。",
    specs: {
      "CADR值": "340 m³/h",
      "功率": "45W",
      "噪音": "≤55dB",
      "滤网": "HEPA H13 + 活性炭",
      "适用面积": "30-50㎡",
      "尺寸": "320×320×650mm",
      "重量": "8.5kg",
      "认证": "CE/CARB/ROHS"
    },
    features: ["HEPA H13", "除甲醛", "智能感应", "定时功能", "滤网提醒"],
    stock: 70,
    hot: true
  },
  {
    id: 8,
    name: "PPD-EAE 模块化空气净化器",
    category: "purifier",
    categoryName: "空气净化器",
    model: "PPD-EAE",
    btu: "模块化设计",
    price: 299,
    originalPrice: 399,
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=400&fit=crop",
    description: "模块化DIY设计，一个空气模块=一个功能。可根据需求自由组合净化功能。",
    specs: {
      "CADR值": "450 m³/h",
      "功率": "60W",
      "噪音": "≤58dB",
      "滤网": "模块化可更换",
      "适用面积": "40-60㎡",
      "尺寸": "350×350×700mm",
      "重量": "11kg",
      "认证": "CE/CARB/ROHS"
    },
    features: ["模块化DIY", "功能可扩展", "大CADR值", "智能APP", "儿童锁"],
    stock: 40,
    hot: false
  }
];

// 分类数据
const categories = [
  { id: "all", name: "全部产品", icon: "🏠" },
  { id: "air-conditioner", name: "便携空调", icon: "❄️" },
  { id: "dehumidifier", name: "除湿机", icon: "💧" },
  { id: "purifier", name: "空气净化器", icon: "🌬️" }
];
