/**
 * Seed file containing all 18 complete products from Pelletsdorodao.com
 * Price adjustment rule applied:
 *  - Prices > 300 € decreased by 15 €
 *  - Prices <= 300 € decreased by 10 €
 */

const products = [
  {
    "id": 1,
    "name": "Pellets Bio Energy: palé con 66 sacos de 15 kg",
    "slug": "pellets-bio-energy-pale-con-66-sacos-de-15-kg",
    "category": "PELLETS DE MADERA",
    "original_price_eur": 580.0,
    "discount_applied_eur": 15.0,
    "price_eur": 565.0,
    "packaging": "Palé con 66 sacos de 15 kg (990 kg total)",
    "composition": "100% madera de pino / coníferas natural sin aditivos",
    "certifications": "Certificación de alta calidad, DINplus / ENplus A1",
    "origin": "Portugal (aserradero ecológico)",
    "description": "Los pellets Bio Energy son una solución certificada de alta calidad para una calefacción eficiente, ecológica y económica. Esta paleta contiene 66 sacos de 15 kg, fabricados con madera de pino 100% natural sin aditivos. Fabricados en Portugal en un aserradero respetuoso con el medio ambiente, proceden de bosques gestionados de forma sostenible, lo que da como resultado un producto ecológico y de alto rendimiento. Bajo contenido de humedad y alto poder calorífico.",
    "specs": {
      "sacos_por_pale": 66,
      "peso_saco": "15 kg",
      "peso_total": "990 kg",
      "materia_prima": "100% pino",
      "humedad": "< 10%",
      "cenizas": "< 0.7%"
    }
  },
  {
    "id": 2,
    "name": "Excellent Pellets: palé con 65 sacos de 15 kg",
    "slug": "excellent-pellets-pale-con-65-sacos-de-15-kg",
    "category": "PELLETS DE MADERA",
    "original_price_eur": 679.0,
    "discount_applied_eur": 15.0,
    "price_eur": 664.0,
    "packaging": "Palé con 65 sacos de 15 kg (975 kg total)",
    "composition": "100% madera de pino natural sin aditivos",
    "certifications": "DIN Plus y EN Plus A1",
    "origin": "Portugal (producto local)",
    "description": "Pellets de madera de alta calidad, certificados DIN Plus y EN Plus A1. Fabricados en Portugal, producto local, a partir de madera de pino 100% natural, sin aditivos. Ecológico y sostenible, procedente de bosques gestionados de forma responsable. Fácil de almacenar y manipular gracias a los sacos de 15 kg. Bajas emisiones de CO2 y combustión limpia con pocos residuos.",
    "specs": {
      "sacos_por_pale": 65,
      "peso_saco": "15 kg",
      "peso_total": "975 kg",
      "materia_prima": "100% pino natural",
      "certificaciones": "DIN Plus, EN Plus A1"
    }
  },
  {
    "id": 3,
    "name": "Pellets Van Roje: palé con 65 sacos",
    "slug": "pellets-van-roje-pale-con-65-sacos",
    "category": "PELLETS DE MADERA",
    "original_price_eur": 557.0,
    "discount_applied_eur": 15.0,
    "price_eur": 542.0,
    "packaging": "Palé con 65 sacos de 15 kg (975 kg total)",
    "composition": "100% madera natural y renovable",
    "certifications": "ENplus A1, DINplus",
    "origin": "Portugal",
    "description": "Los pellets VANROJE se fabrican en un aserradero ecológico en Portugal. Nuestros pellets TOP-DE-GAMA, de muy alta calidad, se caracterizan por su alto poder calorífico y su bajo contenido en cenizas, polvo y humedad. Más de 10 años garantizando una combustión eficiente y sin residuos.",
    "specs": {
      "sacos_por_pale": 65,
      "peso_saco": "15 kg",
      "peso_total": "975 kg",
      "materia_prima": "100% madera natural"
    }
  },
  {
    "id": 4,
    "name": "Pellets NOVA LENHA: palé con 77 sacos de 15 kg cada uno",
    "slug": "pellets-nova-lenha-pale-con-77-sacos-de-15-kg-cada-uno",
    "category": "PELLETS DE MADERA",
    "original_price_eur": 648.0,
    "discount_applied_eur": 15.0,
    "price_eur": 633.0,
    "packaging": "Palé con 77 sacos de 15 kg (1155 kg total)",
    "composition": "Madera de pino 100% pura prensada sin aditivos",
    "certifications": "EN Plus A1",
    "origin": "Portugal",
    "description": "Los pellets Nova Lenha son la solución perfecta para una alternativa de calefacción eficiente, ecológica y económica. Pura madera de pino sin aditivos. Poder calorífico de 4700 kcal/kg (18 MJ/kg). Bajo contenido de humedad y cenizas para una fácil limpieza.",
    "specs": {
      "sacos_por_pale": 77,
      "peso_saco": "15 kg",
      "peso_total": "1155 kg",
      "poder_calorifico": "4700 kcal/kg (18 MJ/kg)",
      "certificacion": "ENplus A1"
    }
  },
  {
    "id": 5,
    "name": "Pellets Energia Natural: palé con 70 sacos de 15 kg",
    "slug": "pellets-energia-natural-pale-con-70-sacos-de-15-kg",
    "category": "PELLETS DE MADERA",
    "original_price_eur": 615.0,
    "discount_applied_eur": 15.0,
    "price_eur": 600.0,
    "packaging": "Palé con 70 sacos de 15 kg (1050 kg total)",
    "composition": "100% serrín de madera blanda procedente de aserraderos locales",
    "certifications": "ENplus A1 / DINplus",
    "origin": "Portugal",
    "description": "Están compuestos al 100% por serrín de madera blanda procedente de aserraderos locales, lo que garantiza un producto de alta calidad, natural y respetuoso con el medio ambiente. Ideal para estufas y calderas de pellets domésticas o industriales.",
    "specs": {
      "sacos_por_pale": 70,
      "peso_saco": "15 kg",
      "peso_total": "1050 kg",
      "materia_prima": "100% madera blanda (coníferas)"
    }
  },
  {
    "id": 6,
    "name": "Pellets Limouzi: palé con 66 sacos de 15 kg",
    "slug": "pellets-limouzi-pale-con-66-sacos-de-15-kg",
    "category": "PELLETS DE MADERA",
    "original_price_eur": 545.0,
    "discount_applied_eur": 15.0,
    "price_eur": 530.0,
    "packaging": "Palé con 66 sacos de 15 kg (990 kg total)",
    "composition": "100% madera de coníferas",
    "certifications": "DIN Plus y PEFC",
    "origin": "Francia",
    "description": "Los pellets LIMOUZI cuentan con dos certificaciones: DIN Plus y PEFC. Están compuestos por 100% madera de coníferas. Garantizan una baja humedad, combustión limpia y eficiente, alto poder calorífico y bajo contenido en cenizas para facilitar el mantenimiento.",
    "specs": {
      "sacos_por_pale": 66,
      "peso_saco": "15 kg",
      "peso_total": "990 kg",
      "certificaciones": "DIN Plus, PEFC"
    }
  },
  {
    "id": 7,
    "name": "Pellets Vimasol – Palé con 72 sacos",
    "slug": "pellets-vimasol-pale-con-72-sacos",
    "category": "PELLETS DE MADERA",
    "original_price_eur": 228.0,
    "discount_applied_eur": 10.0,
    "price_eur": 218.0,
    "packaging": "Palé con 72 sacos de 15 kg (1080 kg total)",
    "composition": "100% pino natural",
    "certifications": "ENplus A1",
    "origin": "Portugal",
    "description": "Pellets Vimasol presentados en un palé de 72 sacos. Excelente relación calidad-precio para mantener un calor uniforme y duradero durante todo el periodo invernal.",
    "specs": {
      "sacos_por_pale": 72,
      "peso_saco": "15 kg",
      "peso_total": "1080 kg"
    }
  },
  {
    "id": 8,
    "name": "Pellets Green Energy: palé con 65 sacos de 15 kg",
    "slug": "pellets-green-energy-pale-con-65-sacos-de-15-kg",
    "category": "PELLETS DE MADERA",
    "original_price_eur": 410.0,
    "discount_applied_eur": 15.0,
    "price_eur": 395.0,
    "packaging": "Palé con 65 sacos de 15 kg (975 kg total)",
    "composition": "70% madera blanda y 30% madera dura",
    "certifications": "DIN Plus y EN Plus",
    "origin": "Países Bajos / Bélgica",
    "description": "Estos pellets cumplen con las normas DIN Plus y EN Plus. Están compuestos por un 70% de madera blanda y un 30% de madera dura. Fabricados en dos plantas situadas en Países Bajos y Bélgica, son la solución ideal para presupuestos ajustados.",
    "specs": {
      "sacos_por_pale": 65,
      "peso_saco": "15 kg",
      "peso_total": "975 kg",
      "composicion": "70% blanda, 30% dura",
      "certificaciones": "DIN Plus, EN Plus"
    }
  },
  {
    "id": 9,
    "name": "Pellets DIN: palé con 65 sacos de 15 kg",
    "slug": "pellets-din-pale-con-65-sacos-de-15-kg",
    "category": "PELLETS DE MADERA",
    "original_price_eur": 668.0,
    "discount_applied_eur": 15.0,
    "price_eur": 653.0,
    "packaging": "Palé con 65 sacos de 15 kg (975 kg total)",
    "composition": "100% madera natural y renovable",
    "certifications": "DIN Plus / ENplus",
    "origin": "Europa",
    "description": "Su bajo contenido de humedad y su alto poder calorífico garantizan una combustión eficiente y limpia, perfecta para estufas, calderas y otros sistemas de biomasa. Alta eficiencia energética que reduce los gastos de calefacción.",
    "specs": {
      "sacos_por_pale": 65,
      "peso_saco": "15 kg",
      "peso_total": "975 kg",
      "materia_prima": "100% madera natural"
    }
  },
  {
    "id": 10,
    "name": "Pellets premium WOODSTOCK: palé con 78 sacos de 15 kg",
    "slug": "pellets-premium-woodstock-pale-con-78-sacos-de-15-kg",
    "category": "PELLETS DE MADERA",
    "original_price_eur": 450.0,
    "discount_applied_eur": 15.0,
    "price_eur": 435.0,
    "packaging": "Palé con 78 sacos de 15 kg (1170 kg total)",
    "composition": "100% madera virgen de coníferas",
    "certifications": "DINplus y CIFICert",
    "origin": "Francia",
    "description": "Pellets de calidad Premium de la famosa marca Woodstock. Ofrecen una densidad constante, un flujo continuo en el depósito de la estufa y una ceniza mínima. Máxima eficiencia energética con un alto rendimiento constante.",
    "specs": {
      "sacos_por_pale": 78,
      "peso_saco": "15 kg",
      "peso_total": "1170 kg",
      "certificacion": "DINplus"
    }
  },
  {
    "id": 11,
    "name": "Ardenforest – Pellets – Palé con 70 sacos de 15 kg",
    "slug": "ardenforest-pellets-pale-con-70-sacos-de-15-kg",
    "category": "PELLETS DE MADERA",
    "original_price_eur": 565.0,
    "discount_applied_eur": 15.0,
    "price_eur": 550.0,
    "packaging": "Palé con 70 sacos de 15 kg (1050 kg total)",
    "composition": "70% madera de coníferas y 30% madera dura",
    "certifications": "DIN Plus",
    "origin": "Francia (Región de Champaña-Ardenas)",
    "description": "Los pellets Ardenforest cuentan con la certificación DIN Plus y se fabrican en la región de Champaña-Ardenas. Estos pellets están compuestos por un 70% de madera de coníferas y un 30% de madera dura, lo que garantiza una emisión de calor uniforme y una combustión excelente.",
    "specs": {
      "sacos_por_pale": 70,
      "peso_saco": "15 kg",
      "peso_total": "1050 kg",
      "composicion": "70% coníferas, 30% frondosas",
      "certificacion": "DIN Plus"
    }
  },
  {
    "id": 12,
    "name": "Pellets Badger: palé con 65 sacos de 15 kg cada uno",
    "slug": "pellets-badger-pale-con-65-sacos-de-15-kg-cada-uno",
    "category": "PELLETS DE MADERA",
    "original_price_eur": 590.0,
    "discount_applied_eur": 15.0,
    "price_eur": 575.0,
    "packaging": "Palé con 65 sacos de 15 kg (975 kg total)",
    "composition": "100% madera de coníferas de alta calidad",
    "certifications": "DIN Plus y FSC / PEFC",
    "origin": "Bélgica",
    "description": "Los pellets Badger cuentan con la certificación DIN Plus y están fabricados 100% con madera de coníferas de alta calidad. Se caracterizan por una combustión limpia, alto poder calorífico y bajo contenido en cenizas. Envasados en prácticas bolsas con papel reciclado.",
    "specs": {
      "sacos_por_pale": 65,
      "peso_saco": "15 kg",
      "peso_total": "975 kg",
      "materia_prima": "100% coníferas"
    }
  },
  {
    "id": 13,
    "name": "Pellets Helios: palé con 65 sacos de 15 kg",
    "slug": "pellets-helios-pale-con-65-sacos-de-15-kg",
    "category": "PELLETS DE MADERA",
    "original_price_eur": 410.0,
    "discount_applied_eur": 15.0,
    "price_eur": 395.0,
    "packaging": "Palé con 65 sacos de 15 kg (975 kg total)",
    "composition": "100% madera natural de pino",
    "certifications": "ENplus A1",
    "origin": "Portugal",
    "description": "Respetuoso con el medio ambiente, fabricado con recursos sostenibles. Fácil de almacenar y manipular gracias a sus prácticas bolsas de 15 kg. Bajas emisiones de CO2 y combustión limpia que produce pocos residuos.",
    "specs": {
      "sacos_por_pale": 65,
      "peso_saco": "15 kg",
      "peso_total": "975 kg"
    }
  },
  {
    "id": 14,
    "name": "Pellets Valboval: palé con 65 sacos de 15 kg (975 kg)",
    "slug": "pellets-valboval-pale-con-65-sacos-de-15-kg-975-kg",
    "category": "PELLETS DE MADERA",
    "original_price_eur": 600.0,
    "discount_applied_eur": 15.0,
    "price_eur": 585.0,
    "packaging": "Palé con 65 sacos de 15 kg (975 kg total)",
    "composition": "100% madera de coníferas",
    "certifications": "DINplus",
    "origin": "Portugal",
    "description": "Los pellets VALBOVAL se fabrican en Portugal a partir de madera 100% de coníferas y cuentan con la certificación DINplus. Ofrecen un alto poder calorífico con un bajo contenido en cenizas y polvo, lo que garantiza una combustión limpia y eficiente.",
    "specs": {
      "sacos_por_pale": 65,
      "peso_saco": "15 kg",
      "peso_total": "975 kg",
      "certificacion": "DINplus"
    }
  },
  {
    "id": 15,
    "name": "Pellets Crépito® Premium",
    "slug": "pellets-crepito-premium",
    "category": "PELLETS DE MADERA",
    "original_price_eur": 640.0,
    "discount_applied_eur": 15.0,
    "price_eur": 625.0,
    "packaging": "Palé de sacos de 15 kg (aprox. 66-72 sacos)",
    "composition": "100% madera fresca natural procedente de subproductos madereros",
    "certifications": "DINplus / NF",
    "origin": "Francia",
    "description": "Los pellets Crépito® Premium están fabricados 100% con madera fresca natural, obtenida a partir de subproductos reciclados de la industria maderera. Sin aditivos ni aglutinantes, estos pellets garantizan una calidad pura y ecológica. Garantizan un rendimiento óptimo y combustión limpia.",
    "specs": {
      "peso_saco": "15 kg",
      "materia_prima": "100% madera fresca natural",
      "certificacion": "DINplus / NF"
    }
  },
  {
    "id": 16,
    "name": "Pellets MM ROYAL: palé con 78 sacos",
    "slug": "pellets-mm-royal-pale-con-78-sacos",
    "category": "PELLETS DE MADERA",
    "original_price_eur": 410.0,
    "discount_applied_eur": 15.0,
    "price_eur": 395.0,
    "packaging": "Palé con 78 sacos de 15 kg (1170 kg total)",
    "composition": "100% madera de coníferas seleccionada",
    "certifications": "ENplus A1",
    "origin": "Austria / Europa",
    "description": "Pellets MM ROYAL producidos con los más estrictos estándares de calidad. Palé de gran capacidad con 78 sacos de 15 kg. Excelente durabilidad, calor uniforme y bajísima formación de esccoria o ceniza.",
    "specs": {
      "sacos_por_pale": 78,
      "peso_saco": "15 kg",
      "peso_total": "1170 kg"
    }
  },
  {
    "id": 17,
    "name": "Pellets Proxima Star: gama completa",
    "slug": "pellets-proxima-star-gama-completa",
    "category": "PELLETS DE MADERA",
    "original_price_eur": 420.0,
    "discount_applied_eur": 15.0,
    "price_eur": 405.0,
    "packaging": "Palé con 66 sacos de 15 kg (990 kg total)",
    "composition": "100% madera de coníferas",
    "certifications": "ENplus A1 / DINplus",
    "origin": "Europa",
    "description": "Esta gama contiene 66 sacos de plástico resistentes, cada uno con 15 kg, lo que suma un total de 990 kg de pellets. Cada saco está cuidadosamente empaquetado para proteger el producto contra la humedad y facilitar su almacenamiento prolongado.",
    "specs": {
      "sacos_por_pale": 66,
      "peso_saco": "15 kg",
      "peso_total": "990 kg"
    }
  },
  {
    "id": 18,
    "name": "Pellets Starforest: palé con 70 sacos de 15 kg",
    "slug": "pellets-starforest-pale-con-70-sacos-de-15-kg",
    "category": "PELLETS DE MADERA",
    "original_price_eur": 515.0,
    "discount_applied_eur": 15.0,
    "price_eur": 500.0,
    "packaging": "Palé con 70 sacos de 15 kg (1050 kg total)",
    "composition": "100% madera de coníferas",
    "certifications": "DIN Plus / ENplus A1",
    "origin": "Francia",
    "description": "Pellets Starforest reconocidos por su gran regularidad en el tamaño de los gránulos, evitando atascos en los sinfines de alimentación. Calor intenso, encendido rápido y mínimo residuo de cenizas.",
    "specs": {
      "sacos_por_pale": 70,
      "peso_saco": "15 kg",
      "peso_total": "1050 kg"
    }
  }
];

module.exports = products;

if (require.main === module) {
  console.log(`Loaded ${products.length} products successfully into seed data.`);
}
