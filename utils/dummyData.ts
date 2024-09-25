export const newsItems = [
  { 
    text: "Nueva política de reforestación implementada", 
    image: "/assets/img/banner-background.png" 
  },
  { 
    text: "Récord de plantaciones alcanzado este mes", 
    image: "/assets/img/banner-background.png" 
  },
  { 
    text: "Próximo evento de voluntariado: 15 de julio", 
    image: "/assets/img/banner-background.png" 
  },
  { 
    text: "Actualización del sistema programada para el próximo fin de semana", 
    image: "/assets/img/banner-background.png" 
  }
]

export const seedsData = [
  { id: 1, name: "Tomate", image: "/assets/seeds/tomato.png" },
  { id: 2, name: "Lechuga", image: "/assets/seeds/lettuce.png" },
  { id: 3, name: "Zanahoria", image: "/assets/seeds/carrot.png" },
  { id: 4, name: "Pimiento", image: "/assets/seeds/pepper.png" },
  { id: 5, name: "Calabacín", image: "/assets/seeds/zucchini.png" },
];

export const lotesData = [
  { 
    title: "Lote A1", 
    value: "50 plantas", 
    image: "/assets/img/plant.png", 
    createdAt: new Date('2023-01-15'),
    qrCode: "/assets/qrcodes/loteA1.png",
    humidity: "45%",
    temperature: "20°C",
    hydration: "60%",
    light: "70%",
    measurements: {
      temperature: 20,
      humidity: 45,
      rain: 10, // Ajusta estos valores según sea necesario
      sunlight: 70
    }
  },
  { 
    title: "Lote B2", 
    value: "50 plantas", 
    image: "/assets/img/plant.png", 
    createdAt: new Date('2023-03-22'),
    qrCode: "/assets/qrcodes/loteB2.png",
    humidity: "50%",
    temperature: "22°C",
    hydration: "65%",
    light: "75%",
    measurements: {
      temperature: 22,
      humidity: 50,
      rain: 15,
      sunlight: 75
    }
  },
  { 
    title: "Lote C3", 
    value: "50 plantas", 
    image: "/assets/img/plant.png", 
    createdAt: new Date('2023-02-08'),
    qrCode: "/assets/qrcodes/loteC3.png",
    humidity: "55%",
    temperature: "18°C",
    hydration: "70%",
    light: "80%",
    measurements: {
      temperature: 18,
      humidity: 55,
      rain: 20,
      sunlight: 80
    }
  },
  { 
    title: "Lote D4", 
    value: "50 plantas", 
    image: "/assets/img/plant.png", 
    createdAt: new Date('2023-04-30'),
    qrCode: "/assets/qrcodes/loteD4.png",
    humidity: "60%",
    temperature: "25°C",
    hydration: "75%",
    light: "85%",
    measurements: {
      temperature: 25,
      humidity: 60,
      rain: 25,
      sunlight: 85
    }
  }
];

export const plantasData = [
  { 
    title: "Pino", 
    value: "5,000 unidades", 
    image: "/assets/img/seed.png", 
    createdAt: new Date('2023-01-10'),
    qrCode: "/assets/qrcodes/pino.png",
    hydration: "70%",
    measurements: {
      hydration: 70
    }
  },
  { 
    title: "Roble", 
    value: "3,200 unidades", 
    image: "/assets/img/seed.png", 
    createdAt: new Date('2023-02-15'),
    qrCode: "/assets/qrcodes/roble.png",
    hydration: "65%",
    measurements: {
      hydration: 65
    }
  },
  { 
    title: "Eucalipto", 
    value: "4,800 unidades", 
    image: "/assets/img/seed.png", 
    createdAt: new Date('2023-03-20'),
    qrCode: "/assets/qrcodes/eucalipto.png",
    hydration: "60%",
    measurements: {
      hydration: 60
    }
  },
  { 
    title: "Cedro", 
    value: "2,600 unidades", 
    image: "/assets/img/seed.png", 
    createdAt: new Date('2023-04-25'),
    qrCode: "/assets/qrcodes/cedro.png",
    hydration: "75%",
    measurements: {
      hydration: 75
    }
  },
];
