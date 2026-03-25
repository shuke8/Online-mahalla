export const overviewData = {
  povertyReduction: {
    totalFamilies: 660000,
    poorFamilies: 1200000,
    servicesRendered: 220000,
    programServices: 120000,
    registryAdded: 45000,
    registryRemoved: 32000,
    plan: 660000,
    actual: 520000,
    percentage: 78.8,
    regions: [
      { id: "jizzakh", name: "Жиззах вилояти", families: 48200, services: 36500, pct: 75.7 },
      { id: "toshkent-v", name: "Тошкент вилояти", families: 62300, services: 51200, pct: 82.2 },
      { id: "samarqand", name: "Самарқанд вилояти", families: 71500, services: 58400, pct: 81.7 },
      { id: "fargona", name: "Фарғона вилояти", families: 68900, services: 54200, pct: 78.7 },
      { id: "andijon", name: "Андижон вилояти", families: 55100, services: 44800, pct: 81.3 },
    ],
  },
  microprojects: {
    plan: 4944,
    actual: 4249,
    percentage: 85.9,
    jobs: { plan: 12500, actual: 10800 },
    credits: { count: 3200, sum: 48.5 },
    regions: [
      { id: "sirdaryo", name: "Сирдарё вилояти", plan: 320, actual: 298, pct: 93.1 },
      { id: "toshkent-v", name: "Тошкент вилояти", plan: 445, actual: 389, pct: 87.4 },
      { id: "fargona", name: "Фарғона вилояти", plan: 512, actual: 421, pct: 82.2 },
      { id: "samarqand", name: "Самарқанд вилояти", plan: 480, actual: 395, pct: 82.3 },
      { id: "andijon", name: "Андижон вилояти", plan: 398, actual: 352, pct: 88.4 },
    ],
  },
  entrepreneurship: {
    planned: 1200000,
    launched: 660000,
    percentage: 55.0,
    plan: 8500,
    actual: 6200,
    pctDone: 72.9,
    regions: [
      { id: "jizzakh", name: "Жиззах вилояти", plan: 620, actual: 480, pct: 77.4 },
      { id: "toshkent-v", name: "Тошкент вилояти", plan: 780, actual: 620, pct: 79.5 },
      { id: "samarqand", name: "Самарқанд вилояти", plan: 890, actual: 650, pct: 73.0 },
      { id: "fargona", name: "Фарғона вилояти", plan: 750, actual: 560, pct: 74.7 },
    ],
  },
  householdIncome: {
    plannedFamilies: 1200000,
    creditPackages: 660000,
    percentage: 55.0,
    plan: 15000,
    actual: 11200,
    pctDone: 74.7,
    regions: [
      { id: "jizzakh", name: "Жиззах вилояти", plan: 1100, actual: 820, pct: 74.5 },
      { id: "toshkent-v", name: "Тошкент вилояти", plan: 1350, actual: 1080, pct: 80.0 },
      { id: "samarqand", name: "Самарқанд вилояти", plan: 1520, actual: 1100, pct: 72.4 },
      { id: "fargona", name: "Фарғона вилояти", plan: 1280, actual: 950, pct: 74.2 },
    ],
  },
  lastUpdated: "2026-03-22T10:35:00Z",
};

export const infrastructureData = {
  oghirMahalla: {
    title: "\"Оғир маҳалла\" инфратузилма лойиҳалари",
    totalObjects: 2450,
    builtObjects: 1890,
    percentage: 77.1,
    regions: [
      { name: "Жиззах вилояти", total: 180, built: 145, pct: 80.6 },
      { name: "Тошкент вилояти", total: 220, built: 185, pct: 84.1 },
      { name: "Самарқанд вилояти", total: 250, built: 190, pct: 76.0 },
    ],
  },
  oghirTuman: {
    title: "\"Оғир туман\" инфратузилма лойиҳалари",
    totalObjects: 1850,
    builtObjects: 1420,
    percentage: 76.8,
    regions: [
      { name: "Жиззах вилояти", total: 140, built: 110, pct: 78.6 },
      { name: "Тошкент вилояти", total: 175, built: 140, pct: 80.0 },
      { name: "Самарқанд вилояти", total: 195, built: 145, pct: 74.4 },
    ],
  },
  yangiMahalla: {
    title: "\"Янги Ўзбекистон қиёфасидаги маҳалла\" инфратузилма",
    totalObjects: 3200,
    builtObjects: 2560,
    percentage: 80.0,
    regions: [
      { name: "Жиззах вилояти", total: 240, built: 200, pct: 83.3 },
      { name: "Тошкент вилояти", total: 290, built: 245, pct: 84.5 },
      { name: "Самарқанд вилояти", total: 320, built: 250, pct: 78.1 },
    ],
  },
  yangiTuman: {
    title: "\"Янги Ўзбекистон қиёфасидаги туман\" инфратузилма",
    totalObjects: 2100,
    builtObjects: 1680,
    percentage: 80.0,
    regions: [
      { name: "Жиззах вилояти", total: 160, built: 130, pct: 81.3 },
      { name: "Тошкент вилояти", total: 200, built: 168, pct: 84.0 },
      { name: "Самарқанд вилояти", total: 210, built: 165, pct: 78.6 },
    ],
  },
};

export const republicData = {
  povertyReduction: {
    poorFamilies: { plan: 660000, actual: 520000 },
    services: { plan: 450000, actual: 380000 },
    individualPlans: { formed: 380000, approved: 340000 },
    removedFromRegistry: { families: 32000, citizens: 45000 },
  },
  microprojects: {
    count: { plan: 4944, actual: 4249 },
    jobs: { formed: 12500, launched: 10800 },
    credits: { count: 3200, sum: 48.5 },
  },
  entrepreneurship: {
    count: { plan: 8500, actual: 6200 },
    jobs: { formed: 25000, launched: 18500 },
    credits: { count: 5600, sum: 125.8 },
    subjects: { plan: 4200, actual: 3100 },
  },
  householdIncome: {
    selected: { plan: 15000, actual: 11200 },
    credits: { plan: 12000, actual: 9500 },
    creditSum: { plan: 180.0, actual: 142.5 },
    subjects: { plan: 3500, actual: 2800 },
  },
  regionMapData: [
    { id: "qoraqalpogiston", value: 72 },
    { id: "andijon", value: 85 },
    { id: "buxoro", value: 78 },
    { id: "jizzakh", value: 81 },
    { id: "qashqadaryo", value: 76 },
    { id: "navoiy", value: 83 },
    { id: "namangan", value: 80 },
    { id: "samarqand", value: 79 },
    { id: "surxondaryo", value: 74 },
    { id: "sirdaryo", value: 88 },
    { id: "toshkent-v", value: 86 },
    { id: "fargona", value: 82 },
    { id: "xorazm", value: 77 },
    { id: "toshkent-sh", value: 90 },
  ],
};

export const mfyData = {
  name: "Янги ҳаёт МФЙ",
  breadcrumb: ["Республика", "Жиззах вилояти", "Жиззах шаҳри", "Янги ҳаёт МФЙ"],
  povertyReduction: {
    kpiPlan: { families: 120, services: 340, plans: 95 },
    kpiActual: { families: 98, services: 280, plans: 82 },
    table: [
      { id: 1, fio: "Каримов Бахтиёр Рустамович", indPlan: "Тасдиқланган", services: 5, executed: 4 },
      { id: 2, fio: "Ахмедова Дилбар Тўлқиновна", indPlan: "Тасдиқланган", services: 3, executed: 3 },
      { id: 3, fio: "Рахимов Шерзод Файзуллаевич", indPlan: "Кўриб чиқилмоқда", services: 4, executed: 2 },
      { id: 4, fio: "Тўраева Малика Абдуллаевна", indPlan: "Тасдиқланган", services: 6, executed: 5 },
      { id: 5, fio: "Ҳасанов Улуғбек Ботирович", indPlan: "Тасдиқланган", services: 2, executed: 2 },
      { id: 6, fio: "Назарова Гулнора Исмоиловна", indPlan: "Кўриб чиқилмоқда", services: 4, executed: 1 },
      { id: 7, fio: "Юсупов Азиз Маматқулович", indPlan: "Тасдиқланган", services: 3, executed: 3 },
      { id: 8, fio: "Мирзаева Нигора Хамидовна", indPlan: "Тасдиқланган", services: 5, executed: 4 },
    ],
  },
  microprojects: {
    kpiPlan: { count: 15, jobs: 45, credits: 8 },
    kpiActual: { count: 12, jobs: 38, credits: 6 },
    table: [
      { id: 1, fio: "Алиев Жамшид Бобурович", phone: "+998 90 123 45 67", status: "Ишга туширилган", jobs: 4 },
      { id: 2, fio: "Сулаймонова Ҳурсанд Каримовна", phone: "+998 91 234 56 78", status: "Ишга туширилган", jobs: 3 },
      { id: 3, fio: "Ботиров Нодирбек Рустамович", phone: "+998 93 345 67 89", status: "Режалаштирилган", jobs: 5 },
      { id: 4, fio: "Қодирова Мунира Тоҳировна", phone: "+998 94 456 78 90", status: "Ишга туширилган", jobs: 3 },
      { id: 5, fio: "Раҳматов Шухрат Исроилович", phone: "+998 90 567 89 01", status: "Режалаштирилган", jobs: 4 },
    ],
  },
  entrepreneurship: {
    kpiPlan: { count: 20, jobs: 60, credits: 12 },
    kpiActual: { count: 15, jobs: 48, credits: 9 },
    table: [
      { id: 1, fio: "Маматов Фарход Бекмуродович", phone: "+998 90 111 22 33", status: "Ишга туширилган", jobs: 5 },
      { id: 2, fio: "Исмоилова Зулфия Баходировна", phone: "+998 91 222 33 44", status: "Ишга туширилган", jobs: 3 },
      { id: 3, fio: "Тўрақулов Жавоҳир Аълмович", phone: "+998 93 333 44 55", status: "Режалаштирилган", jobs: 4 },
      { id: 4, fio: "Набиева Шаҳло Рустамовна", phone: "+998 94 444 55 66", status: "Ишга туширилган", jobs: 6 },
    ],
  },
  householdIncome: {
    kpiPlan: { selected: 25, credits: 18, applications: 30 },
    kpiActual: { selected: 20, credits: 14, applications: 22 },
    table: [
      { id: 1, fio: "Ҳамидов Бобур Нуриллаевич", phone: "+998 90 777 88 99", credit: "12 000 000", subsidy: "Берилган" },
      { id: 2, fio: "Саидова Дилрабо Тоҳировна", phone: "+998 91 888 99 00", credit: "8 000 000", subsidy: "Кўриб чиқилмоқда" },
      { id: 3, fio: "Эргашев Абдулла Хакимович", phone: "+998 93 999 00 11", credit: "15 000 000", subsidy: "Берилган" },
      { id: 4, fio: "Рўзиева Муаззам Акбаровна", phone: "+998 94 000 11 22", credit: "10 000 000", subsidy: "Рад этилган" },
    ],
  },
  subsidies: {
    kpiPlan: { subsidy: 10, applications: 35, received: 28 },
    kpiActual: { subsidy: 7, applications: 28, received: 22 },
    table: [
      { id: 1, fio: "Холматов Сардор Рахимович", phone: "+998 90 123 00 11", recommendation: "Тавсия этилган", certificate: "Берилган" },
      { id: 2, fio: "Қосимова Барно Шукуровна", phone: "+998 91 234 11 22", recommendation: "Тавсия этилган", certificate: "Кўриб чиқилмоқда" },
      { id: 3, fio: "Ўринбоев Лазиз Нематович", phone: "+998 93 345 22 33", recommendation: "Тавсия этилмаган", certificate: "—" },
    ],
  },
  legalization: {
    kpiPlan: { identified: 50, legalized: 35, employed: 20 },
    kpiActual: { identified: 42, legalized: 28, employed: 16 },
    table: [
      { id: 1, fio: "Мўминов Отабек Рашидович", phone: "+998 90 555 66 77", direction: "Тадбиркорлик фаолияти", status: "Расмийлаштирилган" },
      { id: 2, fio: "Жўраева Ҳилола Содиқовна", phone: "+998 91 666 77 88", direction: "Ишга жойлаштириш", status: "Расмийлаштирилган" },
      { id: 3, fio: "Турсунов Баходир Маматович", phone: "+998 93 777 88 99", direction: "Тадбиркорлик фаолияти", status: "Жараёнда" },
      { id: 4, fio: "Аҳмедова Нозима Анваровна", phone: "+998 94 888 99 00", direction: "Ишга жойлаштириш", status: "Расмийлаштирилган" },
    ],
  },
};

/* ── Mahalla Yettiligi ── */

export const mahallaYettiligi = [
  {
    id: 1,
    role: "Маҳалла раиси",
    fio: "Ҳакимов Бахтиёр Тоҳирович",
    phone: "+998 90 100 10 01",
    avatar: "/avatars/rais.jpg",
    description: "Эҳтиёжманд оилаларга уй-жойини яхшилашга кўмаклашиш",
  },
  {
    id: 2,
    role: "Ҳоким ёрдамчиси",
    fio: "Тўраев Жавоҳир Аълмович",
    phone: "+998 90 200 20 02",
    avatar: "/avatars/hokim.jpg",
    description: "Ишсизларга иш топишга кўмаклашиш",
  },
  {
    id: 3,
    role: "Ёшлар етакчиси",
    fio: "Исмоилов Сардор Бобурович",
    phone: "+998 91 300 30 03",
    avatar: "/avatars/yoshlar.jpg",
    description: "Ёшларни спорт, мусиқа ва тўгаракларга жалб этиш",
  },
  {
    id: 4,
    role: "Хотин-қизлар фаоли",
    fio: "Раҳимова Дилноза Камоловна",
    phone: "+998 93 400 40 04",
    avatar: "/avatars/xotin-qizlar.jpg",
    description: "Аёлларни тадбиркорлик, касаначилик, ҳунармандчиликка жалб қилиш",
  },
  {
    id: 5,
    role: "Профилактика инспектори",
    fio: "Мирзаев Шерзод Рустамович",
    phone: "+998 94 500 50 05",
    avatar: "/avatars/inspektor.jpg",
    description: "Маҳаллада ҳуқуқбузарликларнинг олдини олиш, жамоат тартибини сақлаш ва хавфсиз муҳитни таъминлаш",
  },
  {
    id: 6,
    role: "Солиқ ходими",
    fio: "Абдуллаев Нодирбек Файзуллаевич",
    phone: "+998 90 600 60 06",
    avatar: "/avatars/soliq.jpg",
    description: "Маҳалладаги имкониятларни ишга солиб, солиқ базасини кенгайтириш, тадбиркорлик фаолиятини қонунийлаштириш",
  },
  {
    id: 7,
    role: "Ижтимоий ходим",
    fio: "Каримова Гулнора Бахтиёровна",
    phone: "+998 91 700 70 07",
    avatar: "/avatars/ijtimoiy.jpg",
    description: "Ёлғиз кекса, ногирон ва бошқа муҳтожларга ижтимоий хизмат кўрсатиш",
  },
];

/* ── Tuman va MFY ro'yxatlari ── */

export const tumanList: { id: string; name: string; families: number; pct: number }[] = [
  { id: "jizzakh-city", name: "Жиззах шаҳри", families: 8200, pct: 79.3 },
  { id: "arnasoy", name: "Арнасой тумани", families: 4100, pct: 72.1 },
  { id: "bakhmal", name: "Бахмал тумани", families: 3800, pct: 68.4 },
  { id: "dostlik", name: "Дўстлик тумани", families: 2900, pct: 81.5 },
  { id: "forish", name: "Фориш тумани", families: 3200, pct: 65.2 },
  { id: "gallaorol", name: "Ғаллаорол тумани", families: 4500, pct: 74.8 },
  { id: "sharof-rashidov", name: "Шароф Рашидов тумани", families: 5100, pct: 77.6 },
  { id: "mirzachul", name: "Мирзачўл тумани", families: 3600, pct: 70.3 },
  { id: "pakhtakor", name: "Пахтакор тумани", families: 4800, pct: 83.1 },
  { id: "yangiobod", name: "Янгиобод тумани", families: 2700, pct: 66.9 },
  { id: "zafarobod", name: "Зафаробод тумани", families: 3400, pct: 71.7 },
  { id: "zomin", name: "Зомин тумани", families: 3100, pct: 69.5 },
];

export const mfyList: { id: string; name: string; families: number; pct: number }[] = [
  { id: "yangi-hayot", name: "Янги ҳаёт МФЙ", families: 120, pct: 81.7 },
  { id: "mustaqillik", name: "Мустақиллик МФЙ", families: 95, pct: 74.2 },
  { id: "navbahor", name: "Навбаҳор МФЙ", families: 108, pct: 78.5 },
  { id: "guliston", name: "Гулистон МФЙ", families: 87, pct: 69.8 },
  { id: "tinchlik", name: "Тинчлик МФЙ", families: 142, pct: 85.3 },
  { id: "ozodlik", name: "Озодлик МФЙ", families: 76, pct: 63.1 },
  { id: "bunyodkor", name: "Бунёдкор МФЙ", families: 110, pct: 77.9 },
  { id: "obod-mahalla", name: "Обод маҳалла МФЙ", families: 98, pct: 72.4 },
  { id: "yoshlik", name: "Ёшлик МФЙ", families: 65, pct: 80.1 },
  { id: "sahovat", name: "Саховат МФЙ", families: 83, pct: 67.5 },
  { id: "farovon", name: "Фаровон МФЙ", families: 91, pct: 75.6 },
  { id: "do-stlik-mfy", name: "Дўстлик МФЙ", families: 104, pct: 82.3 },
];
