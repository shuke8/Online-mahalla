import { REGIONS } from "@/lib/constants";

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
    totalProjects: 920,
    totalObjects: 2450,
    builtObjects: 1890,
    percentage: 77.1,
    interimPct: 67.3,
    interimCount: 1650,
    finalPct: 54.2,
    finalCount: 1328,
    regions: [
      { name: "Жиззах вилояти", total: 180, built: 145, pct: 80.6, projectPct: 74.2, objectPct: 80.6 },
      { name: "Тошкент вилояти", total: 220, built: 185, pct: 84.1, projectPct: 78.6, objectPct: 84.1 },
      { name: "Самарқанд вилояти", total: 250, built: 190, pct: 76.0, projectPct: 70.4, objectPct: 76.0 },
    ],
  },
  oghirTuman: {
    title: "\"Оғир туман\" инфратузилма лойиҳалари",
    totalProjects: 690,
    totalObjects: 1850,
    builtObjects: 1420,
    percentage: 76.8,
    interimPct: 64.5,
    interimCount: 1193,
    finalPct: 51.8,
    finalCount: 958,
    regions: [
      { name: "Жиззах вилояти", total: 140, built: 110, pct: 78.6, projectPct: 72.1, objectPct: 78.6 },
      { name: "Тошкент вилояти", total: 175, built: 140, pct: 80.0, projectPct: 74.3, objectPct: 80.0 },
      { name: "Самарқанд вилояти", total: 195, built: 145, pct: 74.4, projectPct: 68.7, objectPct: 74.4 },
    ],
  },
  yangiMahalla: {
    title: "\"Янги Ўзбекистон қиёфасидаги маҳалла\" инфратузилма",
    totalProjects: 1180,
    totalObjects: 3200,
    builtObjects: 2560,
    percentage: 80.0,
    interimPct: 71.5,
    interimCount: 2288,
    finalPct: 58.4,
    finalCount: 1869,
    regions: [
      { name: "Жиззах вилояти", total: 240, built: 200, pct: 83.3, projectPct: 77.5, objectPct: 83.3 },
      { name: "Тошкент вилояти", total: 290, built: 245, pct: 84.5, projectPct: 79.2, objectPct: 84.5 },
      { name: "Самарқанд вилояти", total: 320, built: 250, pct: 78.1, projectPct: 72.4, objectPct: 78.1 },
    ],
  },
  yangiTuman: {
    title: "\"Янги Ўзбекистон қиёфасидаги туман\" инфратузилма",
    totalProjects: 780,
    totalObjects: 2100,
    builtObjects: 1680,
    percentage: 80.0,
    interimPct: 70.2,
    interimCount: 1474,
    finalPct: 56.8,
    finalCount: 1193,
    regions: [
      { name: "Жиззах вилояти", total: 160, built: 130, pct: 81.3, projectPct: 75.6, objectPct: 81.3 },
      { name: "Тошкент вилояти", total: 200, built: 168, pct: 84.0, projectPct: 78.0, objectPct: 84.0 },
      { name: "Самарқанд вилояти", total: 210, built: 165, pct: 78.6, projectPct: 72.9, objectPct: 78.6 },
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
  entrepreneurshipPrograms: {
    familyBusiness:  { count: 42000, sumBln: 980.5 },
    firstStep:       { count: 28000, sumBln: 620.4 },
    mahallaProject:  { count: 35000, sumBln: 780.2 },
    smallBusiness:   { count: 18000, sumBln: 410.8 },
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

/* Level-specific fallback data for viloyat/tuman pages */
export const viloyatEntrepreneurshipPrograms = {
  familyBusiness:  { count: 3000, sumBln: 70.0 },
  firstStep:       { count: 2000, sumBln: 44.3 },
  mahallaProject:  { count: 2500, sumBln: 55.7 },
  smallBusiness:   { count: 1285, sumBln: 29.3 },
};

export const tumanEntrepreneurshipPrograms = {
  familyBusiness:  { count: 150, sumBln: 3.5 },
  firstStep:       { count: 100, sumBln: 2.2 },
  mahallaProject:  { count: 125, sumBln: 2.8 },
  smallBusiness:   { count: 64,  sumBln: 1.5 },
};

/* Infrastructure data per MFY type — single mahalla scope (no region breakdown) */
// Repair/construction work item statuses shown in the object plan checklist.
export type InfraWorkStatus = "done" | "in_progress" | "pending";

export interface MfyInfraObject {
  id: number;
  type: "culture" | "school" | "road" | "kindergarten" | "clinic" | "park" | "sport" | "water";
  name: string;
  address: string;
  plan: { work: string; status: InfraWorkStatus }[];
}

export const mfyInfrastructure: Record<
  "ogir" | "yangi",
  {
    title: string;
    totalProjects: number;
    totalObjects: number;
    builtObjects: number;
    percentage: number;
    interimPct: number;
    interimCount: number;
    finalPct: number;
    finalCount: number;
    objects: MfyInfraObject[];
  }
> = {
  ogir: {
    title: "\"Оғир маҳалла\" инфратузилма лойиҳалари",
    totalProjects: 24,
    totalObjects: 65,
    builtObjects: 48,
    percentage: 73.8,
    interimPct: 62.5,
    interimCount: 40,
    finalPct: 50.0,
    finalCount: 32,
    objects: [
      {
        id: 1,
        type: "culture",
        name: "Маданият уйини капитал таъмирлаш",
        address: "Навоий кўчаси, 14",
        plan: [
          { work: "Газон босиш", status: "done" },
          { work: "Бино юзини сувоқ қилиш", status: "in_progress" },
          { work: "Том қопламасини алмаштириш", status: "in_progress" },
          { work: "Дераза ва эшикларни ўрнатиш", status: "pending" },
          { work: "Ички безак ва бўяш ишлари", status: "pending" },
        ],
      },
      {
        id: 2,
        type: "school",
        name: "11-сонли мактаб биносини таъмирлаш",
        address: "Амир Темур шоҳкўчаси, 3",
        plan: [
          { work: "Иситиш тизимини янгилаш", status: "done" },
          { work: "Сантехника ишларини бажариш", status: "done" },
          { work: "Электр тармоғини алмаштириш", status: "in_progress" },
          { work: "Спорт зали полини ётқизиш", status: "pending" },
        ],
      },
      {
        id: 3,
        type: "road",
        name: "Маҳалла ички йўлларини асфальтлаш",
        address: "Гулзор маҳалласи",
        plan: [
          { work: "Йўл асосини тайёрлаш", status: "done" },
          { work: "Асфальт қоплама ётқизиш ва йўл чизиқларини белгилаш, сув оқова тизимини қайта жиҳозлаш", status: "in_progress" },
          { work: "Йўл четларини ободонлаштириш, пиёдалар йўлакчаларини қайта қуриш ҳамда йўл белгиларини ўрнатиш", status: "pending" },
          { work: "Кўча ёритишни ўрнатиш", status: "pending" },
        ],
      },
      {
        // Битта ишли объект — ном ва режа бир хил (қудуқ таъмири)
        id: 4,
        type: "water",
        name: "Қудуқни таъмирлаш",
        address: "Чашма маҳалласи",
        plan: [{ work: "Қудуқни таъмирлаш", status: "in_progress" }],
      },
      {
        // Тўлиқ бажарилган объект — барча ишлар done
        id: 5,
        type: "sport",
        name: "Спорт майдончасини қуриш",
        address: "Истиқлол кўчаси, 8",
        plan: [
          { work: "Майдонни текислаш", status: "done" },
          { work: "Сунъий қоплама ётқизиш", status: "done" },
          { work: "Дарвоза ва жиҳозлар ўрнатиш", status: "done" },
          { work: "Ёритишни ўрнатиш", status: "done" },
        ],
      },
    ],
  },
  yangi: {
    title: "\"Янги Ўзбекистон қиёфасидаги маҳалла\" инфратузилма",
    totalProjects: 32,
    totalObjects: 85,
    builtObjects: 68,
    percentage: 80.0,
    interimPct: 70.6,
    interimCount: 60,
    finalPct: 58.8,
    finalCount: 50,
    objects: [
      {
        id: 1,
        type: "kindergarten",
        name: "Болалар боғчаси биносини қуриш",
        address: "Бунёдкор кўчаси, 7",
        plan: [
          { work: "Пойдевор қуйиш", status: "done" },
          { work: "Девор кўтариш", status: "done" },
          { work: "Том ёпиш", status: "in_progress" },
          { work: "Дераза ва эшик ўрнатиш", status: "pending" },
          { work: "Ҳовлини ободонлаштириш", status: "pending" },
        ],
      },
      {
        id: 2,
        type: "clinic",
        name: "Оилавий поликлиника биносини таъмирлаш",
        address: "Соғлом авлод кўчаси, 21",
        plan: [
          { work: "Фасадни сувоқ қилиш", status: "done" },
          { work: "Ички хоналарни таъмирлаш", status: "in_progress" },
          { work: "Тиббий жиҳозларни ўрнатиш", status: "pending" },
        ],
      },
      {
        id: 3,
        type: "park",
        name: "Хиёбон ва дам олиш майдонини ободонлаштириш",
        address: "Истиқлол хиёбони",
        plan: [
          { work: "Газон босиш", status: "done" },
          { work: "Дарахт ва буталар экиш", status: "in_progress" },
          { work: "Ўриндиқ ва чироқларни ўрнатиш", status: "pending" },
          { work: "Болалар майдончасини қуриш", status: "pending" },
        ],
      },
    ],
  },
};

export const mfyData = {
  name: "Янги ҳаёт МФЙ",
  breadcrumb: ["Республика", "Жиззах вилояти", "Жиззах шаҳри", "Янги ҳаёт МФЙ"],
  stats: {
    households: 1240,
    population: 4870,
    families: 1180,
  },
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
  entrepreneurshipPrograms: {
    familyBusiness:  { count: 4, sumBln: 0.12 },
    firstStep:       { count: 3, sumBln: 0.08 },
    mahallaProject:  { count: 5, sumBln: 0.17 },
    smallBusiness:   { count: 2, sumBln: 0.06 },
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
  },
  {
    id: 2,
    role: "Ҳоким ёрдамчиси",
    fio: "Тўраев Жавоҳир Аълмович",
    phone: "+998 90 200 20 02",
    avatar: "/avatars/hokim.jpg",
  },
  {
    id: 3,
    role: "Ёшлар етакчиси",
    fio: "Исмоилов Сардор Бобурович",
    phone: "+998 91 300 30 03",
    avatar: "/avatars/yoshlar.jpg",
  },
  {
    id: 4,
    role: "Хотин-қизлар фаоли",
    fio: "Раҳимова Дилноза Камоловна",
    phone: "+998 93 400 40 04",
    avatar: "/avatars/xotin-qizlar.jpg",
  },
  {
    id: 5,
    role: "Профилактика инспектори",
    fio: "Мирзаев Шерзод Рустамович",
    phone: "+998 94 500 50 05",
    avatar: "/avatars/inspektor.jpg",
  },
  {
    id: 6,
    role: "Солиқ ходими",
    fio: "",
    phone: "",
    avatar: "",
  },
  {
    id: 7,
    role: "Ижтимоий ходим",
    fio: "",
    phone: "",
    avatar: "",
  },
];

/* ── Tuman va MFY ro'yxatlari ── */

/** Туман ҳолати — оғир туман ёки Янги Ўзбекистон қиёфасидаги туман */
export type TumanStatus = "yangi" | "ogir";

export const tumanList: { id: string; name: string; families: number; pct: number; status: TumanStatus }[] = [
  { id: "jizzakh-city", name: "Жиззах шаҳри", families: 8200, pct: 79.3, status: "yangi" },
  { id: "arnasoy", name: "Арнасой тумани", families: 4100, pct: 72.1, status: "ogir" },
  { id: "bakhmal", name: "Бахмал тумани", families: 3800, pct: 68.4, status: "ogir" },
  { id: "dostlik", name: "Дўстлик тумани", families: 2900, pct: 81.5, status: "yangi" },
  { id: "forish", name: "Фориш тумани", families: 3200, pct: 65.2, status: "ogir" },
  { id: "gallaorol", name: "Ғаллаорол тумани", families: 4500, pct: 74.8, status: "yangi" },
  { id: "sharof-rashidov", name: "Шароф Рашидов тумани", families: 5100, pct: 77.6, status: "yangi" },
  { id: "mirzachul", name: "Мирзачўл тумани", families: 3600, pct: 70.3, status: "ogir" },
  { id: "pakhtakor", name: "Пахтакор тумани", families: 4800, pct: 83.1, status: "yangi" },
  { id: "yangiobod", name: "Янгиобод тумани", families: 2700, pct: 66.9, status: "ogir" },
  { id: "zafarobod", name: "Зафаробод тумани", families: 3400, pct: 71.7, status: "ogir" },
  { id: "zomin", name: "Зомин тумани", families: 3100, pct: 69.5, status: "ogir" },
];

export type MfyStatus = "yangi" | "ogir";

export const mfyList: { id: string; name: string; families: number; pct: number; status: MfyStatus }[] = [
  { id: "yangi-hayot",   name: "Янги ҳаёт МФЙ",       families: 120, pct: 81.7, status: "yangi" },
  { id: "mustaqillik",   name: "Мустақиллик МФЙ",     families: 95,  pct: 74.2, status: "ogir" },
  { id: "navbahor",      name: "Навбаҳор МФЙ",        families: 108, pct: 78.5, status: "yangi" },
  { id: "guliston",      name: "Гулистон МФЙ",        families: 87,  pct: 69.8, status: "ogir" },
  { id: "tinchlik",      name: "Тинчлик МФЙ",         families: 142, pct: 85.3, status: "yangi" },
  { id: "ozodlik",       name: "Озодлик МФЙ",         families: 76,  pct: 63.1, status: "ogir" },
  { id: "bunyodkor",     name: "Бунёдкор МФЙ",        families: 110, pct: 77.9, status: "yangi" },
  { id: "obod-mahalla",  name: "Обод маҳалла МФЙ",    families: 98,  pct: 72.4, status: "yangi" },
  { id: "yoshlik",       name: "Ёшлик МФЙ",           families: 65,  pct: 80.1, status: "yangi" },
  { id: "sahovat",       name: "Саховат МФЙ",         families: 83,  pct: 67.5, status: "ogir" },
  { id: "farovon",       name: "Фаровон МФЙ",         families: 91,  pct: 75.6, status: "yangi" },
  { id: "do-stlik-mfy",  name: "Дўстлик МФЙ",         families: 104, pct: 82.3, status: "yangi" },
];

/* ──────────────────────────────────────────────────────────────────────────
 * ONM-809 — Инфратузилма обектлари ва далолатнома формаси
 * Object records for the "оралиқ ва якуний далолатнома" list + form.
 * Барча обект битта маҳаллага (Янги ҳаёт МФЙ) тегишли — мобил илова маҳалла даражасида.
 * Биринчи обект коди Telegram референсидаги мисолга мос (2602182360619002).
 * ──────────────────────────────────────────────────────────────────────── */

/** Далолатнома ҳолати: бажарилган ёки кутилмоқда */
export type DalolatnomaStatus = "done" | "pending";

/** Ўлчов бирлиги — форма select учун */
export const INFRA_WORK_UNITS = [
  "Километр (км)",
  "Метр (м)",
  "Погон метр (пог.м)",
  "Дона",
  "Квадрат метр (м²)",
  "Куб метр (м³)",
  "Гектар (га)",
  "Комплект",
] as const;
export type InfraWorkUnit = (typeof INFRA_WORK_UNITS)[number];

export interface InfraObject {
  /** route slug, e.g. "torkul-okar-suv" */
  id: string;
  /** Қисқа сарлавҳа (card title) */
  shortName: string;
  /** Тўлиқ тавсиф (форма сарлавҳасида) */
  description: string;
  /** Обект коди — readonly */
  objectCode: string;
  /** Обект ID — readonly */
  objectId: string;
  mfyName: string;
  tumanName: string;
  viloyatName: string;
  /** Режа ID — readonly/from object */
  rejaId: number;
  /** Режа номи */
  rejaNomi: string;
  /** Қуввати */
  quvvati: number;
  /** Ўлчов бирлиги */
  olchovBirligi: InfraWorkUnit;
  /** Сарфланган маблағлар (сўм). 0 = ҳали киритилмаган */
  sarflanganMablag: number;
  /** Геопозиция */
  lat: number;
  lng: number;
  /** Оралиқ далолатнома ҳолати */
  interim: DalolatnomaStatus;
  /** Якуний далолатнома ҳолати */
  final: DalolatnomaStatus;
}

export const infraObjects: InfraObject[] = [
  {
    id: "torkul-okar-suv",
    shortName: "Оқар сув таъминоти",
    description:
      "Янги ҳаёт МФЙ да 385 та хонадонларнинг 55 гектар томорқаларини оқар сув таъминотини яхшилаш (Артезиан кудуқ қазиш, Асфальт ётқизиш, сув тармоғи тортиш, электр тармоғи тортиш)",
    objectCode: "2602182360619002",
    objectId: "126244",
    mfyName: "Янги ҳаёт МФЙ",
    tumanName: "Жиззах шаҳри",
    viloyatName: "Жиззах вилояти",
    rejaId: 25,
    rejaNomi: "Асфальтлаш",
    quvvati: 3,
    olchovBirligi: "Километр (км)",
    sarflanganMablag: 0,
    lat: 41.3275,
    lng: 69.2817,
    interim: "done",
    final: "pending",
  },
  {
    id: "guliston-suv-tармоги",
    shortName: "Сув тармоғи",
    description:
      "Янги ҳаёт МФЙ да 210 та хонадонни ичимлик суви билан таъминлаш учун сув тармоғини тортиш ва насос станцияси қуриш",
    objectCode: "2602182360619115",
    objectId: "126301",
    mfyName: "Янги ҳаёт МФЙ",
    tumanName: "Жиззах шаҳри",
    viloyatName: "Жиззах вилояти",
    rejaId: 12,
    rejaNomi: "Сув тармоғи тортиш",
    quvvati: 1.8,
    olchovBirligi: "Километр (км)",
    sarflanganMablag: 0,
    lat: 41.3211,
    lng: 69.2401,
    interim: "pending",
    final: "pending",
  },
  {
    id: "navbahor-elektr-tармоги",
    shortName: "Электр тармоғи",
    description:
      "Янги ҳаёт МФЙ да 340 та хонадонни узлуксиз электр таъминоти билан таъминлаш учун паст кучланишли электр тармоғини тортиш ва трансформатор ўрнатиш",
    objectCode: "2602182360619208",
    objectId: "126355",
    mfyName: "Янги ҳаёт МФЙ",
    tumanName: "Жиззах шаҳри",
    viloyatName: "Жиззах вилояти",
    rejaId: 31,
    rejaNomi: "Электр тармоғи тортиш",
    quvvati: 2.4,
    olchovBirligi: "Километр (км)",
    sarflanganMablag: 412_000_000,
    lat: 41.3389,
    lng: 69.2655,
    interim: "done",
    final: "done",
  },
  {
    id: "tinchlik-artezian",
    shortName: "Артезиан қудуқ",
    description:
      "Янги ҳаёт МФЙ да 410 та хонадоннинг суғориш ва ичимлик суви эҳтиёжини қондириш учун артезиан кудуқлар қазиш ва жиҳозлаш",
    objectCode: "2602182360619310",
    objectId: "126402",
    mfyName: "Янги ҳаёт МФЙ",
    tumanName: "Жиззах шаҳри",
    viloyatName: "Жиззах вилояти",
    rejaId: 7,
    rejaNomi: "Артезиан кудуқ қазиш",
    quvvati: 4,
    olchovBirligi: "Дона",
    sarflanganMablag: 0,
    lat: 41.3052,
    lng: 69.2988,
    interim: "done",
    final: "pending",
  },
  {
    id: "bunyodkor-yol-qurilishi",
    shortName: "Йўл қурилиши",
    description:
      "Янги ҳаёт МФЙ да ички йўлларни таъмирлаш ва янги йўл қуриш орқали 5.2 км масофадаги кўчаларни асфальтлаш",
    objectCode: "2602182360619422",
    objectId: "126480",
    mfyName: "Янги ҳаёт МФЙ",
    tumanName: "Жиззах шаҳри",
    viloyatName: "Жиззах вилояти",
    rejaId: 19,
    rejaNomi: "Йўл қурилиши",
    quvvati: 5.2,
    olchovBirligi: "Километр (км)",
    sarflanganMablag: 0,
    lat: 41.3148,
    lng: 69.2519,
    interim: "pending",
    final: "pending",
  },
  {
    id: "obod-mahalla-kocha-yoritish",
    shortName: "Кўча ёритиш",
    description:
      "Янги ҳаёт МФЙ да кечки вақтда хавфсизликни таъминлаш учун кўчаларга 120 та LED ёритиш чироғларини ўрнатиш",
    objectCode: "2602182360619533",
    objectId: "126540",
    mfyName: "Янги ҳаёт МФЙ",
    tumanName: "Жиззах шаҳри",
    viloyatName: "Жиззах вилояти",
    rejaId: 44,
    rejaNomi: "Кўча ёритиш тармоғи",
    quvvati: 120,
    olchovBirligi: "Дона",
    sarflanganMablag: 268_500_000,
    lat: 41.3301,
    lng: 69.2733,
    interim: "done",
    final: "done",
  },
];

export function getInfraObject(id: string): InfraObject | undefined {
  return infraObjects.find((o) => o.id === id);
}

/* ──────────────────────────────────────────────────────────────────────────
 * TASK-015 — Инфратузилма tab'li blok: daraja bo'yicha drill-down data.
 * Qiymatlar deterministik (entityId dan seed) — reload'da barqaror, har
 * viloyat/tuman o'ziga xos raqam ko'radi. /infratuzilma dagi eski
 * infrastructureData ga TEGILMAYDI.
 * ──────────────────────────────────────────────────────────────────────── */

export type InfraLevel = "republic" | "viloyat" | "tuman";
export type InfraCategoryKey = "oghirMahalla" | "yangiMahalla" | "oghirTuman" | "yangiTuman";

export interface InfraBreakdownRow {
  name: string;
  total: number;
  projectPct: number;
  objectPct: number;
}

export interface InfraLevelCategory {
  key: InfraCategoryKey;
  title: string;
  totalProjects: number;
  totalObjects: number;
  interimPct: number;
  interimCount: number;
  finalPct: number;
  finalCount: number;
  breakdown: InfraBreakdownRow[];
}

/** Deterministik pseudo-random [0..1) — string seed'dan. Math.random TAQIQ (reload barqarorligi). */
function seedUnit(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
  return (Math.abs(h) % 1000) / 1000;
}

function seedRange(seed: string, min: number, max: number): number {
  return min + seedUnit(seed) * (max - min);
}

function seedPct(seed: string, min: number, max: number): number {
  return Math.round(seedRange(seed, min, max) * 10) / 10;
}

const INFRA_CATEGORY_KEYS: InfraCategoryKey[] = [
  "oghirMahalla",
  "yangiMahalla",
  "oghirTuman",
  "yangiTuman",
];

const INFRA_TAB_TITLES: Record<InfraCategoryKey, string> = {
  oghirMahalla: "Оғир маҳалла",
  yangiMahalla: "Янги Ўзбекистон маҳалла",
  oghirTuman: "Оғир туман",
  yangiTuman: "Янги Ўзбекистон туман",
};

function buildBreakdown(
  names: string[],
  catKey: InfraCategoryKey,
  entitySeed: string,
  totalObjects: number,
): InfraBreakdownRow[] {
  const weights = names.map((n) => 0.5 + seedUnit(`${entitySeed}:${catKey}:${n}:w`));
  const weightSum = weights.reduce((s, w) => s + w, 0);
  return names.map((name, i) => ({
    name,
    total: Math.max(1, Math.round((totalObjects * weights[i]) / weightSum)),
    projectPct: seedPct(`${entitySeed}:${catKey}:${name}:p`, 58, 88),
    objectPct: seedPct(`${entitySeed}:${catKey}:${name}:o`, 62, 92),
  }));
}

/** Bitta kategoriya uchun daraja-mos KPI + breakdown quradi (deterministik). */
function buildLevelCategory(key: InfraCategoryKey, level: InfraLevel, entitySeed: string): InfraLevelCategory {
  const base = infrastructureData[key];
  // Republic: butun mamlakat raqamlari. Viloyat: ~5-12%, tuman: ~0.8-2% ulush.
  const share =
    level === "republic"
      ? 1
      : level === "viloyat"
        ? seedRange(`${entitySeed}:${key}:share`, 0.05, 0.12)
        : seedRange(`${entitySeed}:${key}:share`, 0.008, 0.02);

  const totalProjects = Math.max(3, Math.round(base.totalProjects * share));
  const totalObjects = Math.max(5, Math.round(base.totalObjects * share));
  const interimPct =
    level === "republic" ? base.interimPct : seedPct(`${entitySeed}:${key}:i`, 55, 82);
  const finalPct =
    level === "republic" ? base.finalPct : seedPct(`${entitySeed}:${key}:f`, 42, interimPct - 6);

  const names =
    level === "republic"
      ? REGIONS.map((r) => r.name)
      : level === "viloyat"
        ? tumanList.map((t) => t.name)
        : mfyList.map((m) => m.name);

  return {
    key,
    title: INFRA_TAB_TITLES[key],
    totalProjects,
    totalObjects,
    interimPct,
    interimCount: Math.round((totalObjects * interimPct) / 100),
    finalPct,
    finalCount: Math.round((totalObjects * finalPct) / 100),
    breakdown: buildBreakdown(names, key, entitySeed, totalObjects),
  };
}

/**
 * Daraja bo'yicha infratuzilma kesimi:
 *  - republic        → 14 viloyat kesimi (KPI = infrastructureData qiymatlari)
 *  - viloyat + id    → tumanlar kesimi (KPI viloyatga proporsional)
 *  - tuman + id      → maҳallalar kesimi, faqat маҳалла kategoriyalari
 */
export function getInfrastructureByLevel(
  level: InfraLevel,
  entityId?: string,
): InfraLevelCategory[] {
  const entitySeed = `${level}:${entityId ?? "all"}`;
  const keys =
    level === "tuman"
      ? (["oghirMahalla", "yangiMahalla"] as InfraCategoryKey[])
      : INFRA_CATEGORY_KEYS;

  return keys.map((key) => buildLevelCategory(key, level, entitySeed));
}

/* ──────────────────────────────────────────────────────────────────────────
 * TASK-017 — /infratuzilma explorer: tanlangan hudud darajasiga mos kartalar.
 * Qoidalar (foydalanuvchi TZ, javob B):
 *  - republic/viloyat → 4 karta (2 маҳалла + 2 туман kategoriyasi)
 *  - tuman            → 3 karta (ikkala маҳалла + tuman turiga mos 1 туман)
 *  - mfy              → 1 karta (mahalla turiga mos маҳалла kategoriyasi)
 * ──────────────────────────────────────────────────────────────────────── */

export interface InfraExplorerSelection {
  viloyatId?: string;
  tumanId?: string;
  mfyId?: string;
}

export type InfraExplorerLevel = InfraLevel | "mfy";

export interface InfraExplorerCard {
  key: InfraCategoryKey;
  kind: "oghir" | "yangi";          // CategoryAccent badge
  group: "mahalla" | "tuman";        // guruh sektsiyasi
  title: string;                     // to'liq nom («Оғир маҳалла» инфратузилма лойиҳалари)
  totalProjects: number;
  totalObjects: number;
  interimPct: number;
  interimCount: number;
  finalPct: number;
  finalCount: number;
  breakdown: InfraBreakdownRow[];    // bo'sh = chart ko'rsatilmaydi (МФЙ darajasi)
  breakdownTitle: string;
}

const EXPLORER_BREAKDOWN_TITLES: Record<InfraLevel, string> = {
  republic: "Вилоятлар бўйича таққослама",
  viloyat: "Туманлар бўйича таққослама",
  tuman: "Маҳаллалар бўйича таққослама",
};

function toExplorerCard(c: InfraLevelCategory, level: InfraLevel): InfraExplorerCard {
  return {
    key: c.key,
    kind: c.key.startsWith("oghir") ? "oghir" : "yangi",
    group: c.key.endsWith("Mahalla") ? "mahalla" : "tuman",
    title: infrastructureData[c.key].title,
    totalProjects: c.totalProjects,
    totalObjects: c.totalObjects,
    interimPct: c.interimPct,
    interimCount: c.interimCount,
    finalPct: c.finalPct,
    finalCount: c.finalCount,
    breakdown: c.breakdown,
    breakdownTitle: EXPLORER_BREAKDOWN_TITLES[level],
  };
}

export function getInfraExplorerLevel(sel: InfraExplorerSelection): InfraExplorerLevel {
  if (sel.mfyId) return "mfy";
  if (sel.tumanId) return "tuman";
  if (sel.viloyatId) return "viloyat";
  return "republic";
}

export function getInfraExplorerCards(sel: InfraExplorerSelection): InfraExplorerCard[] {
  const level = getInfraExplorerLevel(sel);

  if (level === "republic" || level === "viloyat") {
    return getInfrastructureByLevel(level, sel.viloyatId).map((c) => toExplorerCard(c, level));
  }

  if (level === "tuman") {
    const mahallaCards = getInfrastructureByLevel("tuman", sel.tumanId).map((c) =>
      toExplorerCard(c, "tuman"),
    );
    // Tuman turiga mos bitta туман-kategoriya kartasi (B varianti)
    const tumanStatus = tumanList.find((t) => t.id === sel.tumanId)?.status ?? "ogir";
    const tumanKey: InfraCategoryKey = tumanStatus === "ogir" ? "oghirTuman" : "yangiTuman";
    const tumanCard = toExplorerCard(
      buildLevelCategory(tumanKey, "tuman", `tuman:${sel.tumanId ?? "all"}`),
      "tuman",
    );
    return [...mahallaCards, tumanCard];
  }

  // МФЙ — mahalla turiga mos bitta karta; KPI lar real mahalla masshtabidagi
  // mfyInfrastructure namunasidan olinadi, chart yo'q (breakdown bo'sh).
  const mfyStatus = mfyList.find((m) => m.id === sel.mfyId)?.status ?? "yangi";
  const src = mfyInfrastructure[mfyStatus];
  const key: InfraCategoryKey = mfyStatus === "ogir" ? "oghirMahalla" : "yangiMahalla";
  return [
    {
      key,
      kind: mfyStatus === "ogir" ? "oghir" : "yangi",
      group: "mahalla",
      title: infrastructureData[key].title,
      totalProjects: src.totalProjects,
      totalObjects: src.totalObjects,
      interimPct: src.interimPct,
      interimCount: src.interimCount,
      finalPct: src.finalPct,
      finalCount: src.finalCount,
      breakdown: [],
      breakdownTitle: "",
    },
  ];
}
