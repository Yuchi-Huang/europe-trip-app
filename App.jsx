import React, { useMemo, useState } from "react";

const flights = [
  {
    id: 1,
    route: "TPE → BCN",
    airline: "China Eastern MU5006 + MU249",
    date: "03/30 - 03/31",
    time: "18:40 → 08:05 (+1)",
    from: "Taipei (TPE)",
    to: "Barcelona (BCN)",
    baggage: "托運待確認（先以長途航班規格預留）",
    cabin: "隨身行李待確認",
    reminder: ["國際航班建議提早 3 小時到機場", "此段含上海轉機，轉機文件與登機資訊先確認"],
    type: "長途 / 轉機",
  },
  {
    id: 2,
    route: "BCN → LIS",
    airline: "Vueling VY8466",
    date: "04/04",
    time: "12:10 → 13:20",
    from: "Barcelona (BCN)",
    to: "Lisbon (LIS)",
    baggage: "托運 25 kg",
    cabin: "1 件小型手提行李，最大 40x30x20 cm",
    reminder: ["廉航建議提早 2 小時", "中午航班，上午移動時間不要排太滿"],
    type: "廉航",
  },
  {
    id: 3,
    route: "LIS → FCO",
    airline: "Ryanair FR9904",
    date: "04/07 - 04/08",
    time: "20:20 → 00:20 (+1)",
    from: "Lisbon (LIS)",
    to: "Rome Fiumicino (FCO)",
    baggage: "托運 23 kg x 2 人（依訂位畫面）",
    cabin: "小型手提行李規格請再確認",
    reminder: ["跨日航班，住宿 check-in 時間要先看", "Ryanair 行李尺寸抓得很嚴"],
    type: "廉航 / 跨日",
  },
  {
    id: 4,
    route: "FCO → BCN",
    airline: "Wizz Air W46019",
    date: "04/10",
    time: "19:10 → 21:00",
    from: "Rome Fiumicino (FCO)",
    to: "Barcelona El Prat T2 (BCN)",
    baggage: "托運 26 kg（每人）",
    cabin: "1 件小型手提行李，最大 40x30x20 cm",
    reminder: ["傍晚航班，建議下午不要排太遠景點", "Wizz 行李與櫃檯規則需再核對"],
    type: "廉航",
  },
  {
    id: 5,
    route: "BCN → TPE",
    airline: "China Eastern MU250 + MU5007",
    date: "04/11 - 04/12",
    time: "10:55 → 14:25 (+1)",
    from: "Barcelona (BCN)",
    to: "Taipei (TPE)",
    baggage: "托運待確認（長途回程）",
    cabin: "隨身行李待確認",
    reminder: ["此段含上海轉機：BCN 10:55 → PVG 05:30 (+1)；PVG 12:20 → TPE 14:25", "退稅、機場報到與轉機時間都要預留"],
    type: "長途 / 轉機",
  },
];

const days = [
  {
    date: "03/31",
    city: "Barcelona",
    country: "Spain",
    weather: "待接入即時天氣",
    theme: "抵達日 / 暖身散步",
    plan: {
      morning: ["抵達巴塞隆納，前往住宿放行李 / check-in", "以休息、整理狀態為主，不排硬景點"],
      afternoon: ["聖安東尼市場 Sant Antoni Market", "市場周邊散步，感受在地街區氛圍"],
      evening: ["Poble-sec / Sant Antoni 一帶輕鬆晃晃", "早點回住宿休息，調整時差"],
    },
    places: [
      { name: "聖安東尼市場", note: "第一天暖身最適合，彈性高" },
      { name: "Poble-sec", note: "比較有在地生活感的小街區" },
    ],
    food: [{ name: "自由安排", note: "第一天不建議硬排排隊名店，輕鬆吃就好" }],
    traffic: [{ name: "住宿 ↔ Sant Antoni / Poble-sec", note: "以步行或短程地鐵為主" }],
    guide: {
      story: "第一天重點不是塞景點，而是先讓身體跟旅行節奏同步。Sant Antoni 和 Poble-sec 比核心觀光區更舒服，適合剛落地時慢慢進入狀況。",
      mustEat: ["Tapas", "Churros"],
      mustOrder: ["Sangria"],
      mustBuy: ["磁鐵小物"],
      codes: [],
    },
    extras: ["若還有體力，可在 Sant Antoni 周邊找咖啡店坐一下", "不建議第一天直接衝聖家堂或奎爾公園"],
  },
  {
    date: "04/01",
    city: "Barcelona",
    country: "Spain",
    weather: "待接入即時天氣",
    theme: "高第建築主線 / 晚上固定訂位",
    plan: {
      morning: ["聖家堂（建議早場，需先線上購票）"],
      afternoon: ["米拉之家外觀", "巴特摟之家外觀", "Passeig de Gràcia 一帶散步 / 咖啡"],
      evening: ["18:00 已訂位餐廳", "晚餐後自由散步，不再硬塞海鮮餐廳"],
    },
    places: [
      { name: "聖家堂", note: "這天唯一建議正式入內的高第景點" },
      { name: "米拉之家", note: "外觀停留即可" },
      { name: "巴特摟之家", note: "外觀停留即可" },
    ],
    food: [{ name: "18:00 已訂位餐廳", note: "今日晚餐核心行程，一定排進去" }],
    traffic: [{ name: "聖家堂 → Passeig de Gràcia", note: "地鐵 + 步行最順" }],
    guide: {
      story: "這天把高第主線一次走完最有效率。因為米拉之家和巴特摟之家只看外觀，所以整體節奏會很順，晚上直接接已訂位餐廳。",
      mustEat: ["固定訂位晚餐"],
      mustOrder: ["依餐廳為主"],
      mustBuy: ["高第建築周邊選物"],
      codes: [],
    },
    extras: ["若中間有空，可在 Passeig de Gràcia 找咖啡館休息", "今天不建議再塞 Ciudad Condal 或 Can Ros"],
  },
  {
    date: "04/02",
    city: "Barcelona",
    country: "Spain",
    weather: "待接入即時天氣",
    theme: "奎爾公園 / 音樂廳區 / 晚上雙版本",
    plan: {
      morning: ["奎爾公園（建議先買票）"],
      afternoon: ["回市區午餐 / 休息", "加泰隆尼雅音樂廳", "Aggi Gelato"],
      evening: ["你：保留可去音樂會 / 歌劇的彈性", "朋友：自由活動，可逛 Born 一帶"],
    },
    places: [
      { name: "奎爾公園", note: "上午去最順，避免太晚人多" },
      { name: "加泰隆尼雅音樂廳", note: "下午接舊城區路線很合理" },
      { name: "Aggi Gelato", note: "歌劇院 / 音樂廳周邊可順路安排" },
    ],
    food: [{ name: "Aggi Gelato", note: "下午甜點休息點" }],
    traffic: [{ name: "奎爾公園 ↔ 市區 ↔ 音樂廳", note: "地鐵 + 步行" }],
    guide: {
      story: "這天最重要的是保留雙人不同步的可能性。你想看表演就去，朋友不一定要綁在一起，這樣整體自由度更高。",
      mustEat: ["Gelato"],
      mustOrder: ["依現場喜好"],
      mustBuy: ["音樂廳周邊小店選物"],
      codes: [],
    },
    extras: ["若沒看演出，晚上可改成 El Born 小街散步", "可保留一段自由時間給朋友自行安排"],
  },
  {
    date: "04/03",
    city: "Barcelona",
    country: "Spain",
    weather: "待接入即時天氣",
    theme: "在地街區 / 補漏 / 晚餐保留彈性",
    plan: {
      morning: ["Gràcia 街區散步", "感受比較 local 的 Barcelona"],
      afternoon: ["補前幾天沒逛完的點", "購物 / 咖啡 / 自由活動"],
      evening: ["晚餐先保留彈性", "你們可當天決定 Ciudad Condal 或 Can Ros"],
    },
    places: [
      { name: "Gràcia", note: "比核心景區更有生活感" },
      { name: "Passeig de Sant Joan", note: "適合散步、找咖啡店" },
    ],
    food: [{ name: "晚餐彈性決定", note: "Ciudad Condal / Can Ros 擇一即可" }],
    traffic: [{ name: "Gràcia ↔ 市區", note: "地鐵 + 步行，整天保持彈性" }],
    guide: {
      story: "這天不適合排死，最適合補漏、自由決定餐廳，也讓 Barcelona 不只是觀光點，而是真的走進生活感街區。",
      mustEat: ["海鮮餐廳二選一"],
      mustOrder: ["依現場餐廳決定"],
      mustBuy: ["在地選物 / 小眾小店"],
      codes: [],
    },
    extras: ["若想找比較不觀光的散步路線，可多留時間在 Gràcia", "今天最適合留白，不要再塞大型景點"],
  },
  {
    date: "04/04",
    city: "Lisbon",
    country: "Portugal",
    weather: "待接入即時天氣",
    theme: "移動日 / 甜點香氛輕散步",
    plan: {
      morning: ["Barcelona 退房後前往機場", "搭機前往里斯本"],
      afternoon: ["抵達里斯本，前往住宿 check-in", "Manteigaria 蛋塔", "Santini Chiado 冰淇淋"],
      evening: ["Claus Porto", "若還有體力再去 Time Out Market"],
    },
    places: [
      { name: "Chiado", note: "適合做里斯本第一晚的散步區域" },
      { name: "Time Out Market", note: "晚點再去也很適合" },
    ],
    food: [
      { name: "Manteigaria", note: "蛋塔必吃" },
      { name: "Santini Chiado", note: "冰淇淋名店" },
    ],
    traffic: [{ name: "住宿 ↔ Chiado / Baixa", note: "步行為主，必要時短程地鐵" }],
    guide: {
      story: "里斯本第一晚不需要排太滿，把蛋塔、冰淇淋、香氛和散步結合起來，會比衝景點更舒服。",
      mustEat: ["葡式蛋塔", "冰淇淋"],
      mustOrder: ["依甜點店招牌"],
      mustBuy: ["Claus Porto 護手霜 / 香氛"],
      codes: ["HMNSKRFBY4"],
    },
    extras: ["Time Out Market 可當晚去，也可留到完整日再逛", "第一晚以輕量行程為主"],
  },
  {
    date: "04/05",
    city: "Lisbon",
    country: "Portugal",
    weather: "待接入即時天氣",
    theme: "核心區 / 凱旋門 / 電車 / 河岸",
    plan: {
      morning: ["Rua Augusta 凱旋門", "Baixa / Rua Augusta 主街散步"],
      afternoon: ["葡萄牙小電車拍照", "河岸方向散步"],
      evening: ["Time Out Market"],
    },
    places: [
      { name: "Rua Augusta 凱旋門", note: "適合白天安排" },
      { name: "葡萄牙小電車", note: "拍照主題景點" },
      { name: "河岸散步", note: "讓節奏不要只剩觀光打卡" },
    ],
    food: [{ name: "Time Out Market", note: "晚上集中吃最方便" }],
    traffic: [{ name: "Baixa ↔ 電車拍照區 ↔ 河岸", note: "步行為主" }],
    guide: {
      story: "這天是里斯本最標準也最不容易失敗的一天，把核心骨架走完，再用河岸與市場收尾。",
      mustEat: ["Time Out Market 美食"],
      mustOrder: ["看現場想吃什麼再決定"],
      mustBuy: ["市中心伴手禮"],
      codes: [],
    },
    extras: ["若體力好，可再補一間咖啡館", "今天雖是核心景點日，但不要排成瘋狂打卡模式"],
  },
  {
    date: "04/06",
    city: "Lisbon",
    country: "Portugal",
    weather: "待接入即時天氣",
    theme: "local 區域 / 補買 / 慢節奏",
    plan: {
      morning: ["Campo de Ourique / Estrela 一帶散步", "找咖啡館慢慢坐"],
      afternoon: ["回市區補買 Claus Porto / 伴手禮", "想再吃一次的甜點可二訪"],
      evening: ["輕鬆吃、早點回住宿整理行李"],
    },
    places: [
      { name: "Campo de Ourique / Estrela", note: "比較在地、比較 calm 的區域" },
      { name: "Claus Porto", note: "回購 / 補買很適合排這天" },
    ],
    food: [{ name: "自由安排", note: "今天主打慢慢走，不用硬排名店" }],
    traffic: [{ name: "local 區域 ↔ 市中心", note: "可搭地鐵 / 電車，再步行" }],
    guide: {
      story: "這天是里斯本最有機會走出在地感的一天，不需要再追景點數量，把節奏放慢反而更有質感。",
      mustEat: ["想二訪的蛋塔 / 冰淇淋"],
      mustOrder: ["咖啡 + 小甜點"],
      mustBuy: ["Claus Porto", "在地伴手禮"],
      codes: [],
    },
    extras: ["如果想更市中心，也可改成 Chiado 補逛版", "這天保留高彈性是優勢"],
  },
  {
    date: "04/07",
    city: "Lisbon → Rome",
    country: "Portugal",
    weather: "待接入即時天氣",
    theme: "飛羅馬前收尾 / 跨日航班",
    plan: {
      morning: ["brunch / 咖啡", "最後補買伴手禮"],
      afternoon: ["回住宿拿行李", "提早前往機場"],
      evening: ["搭機前往羅馬", "抵達後直接前往住宿休息"],
    },
    places: [{ name: "自由安排", note: "今天不建議再排遠距離景點" }],
    food: [{ name: "自由安排", note: "以方便、輕鬆為主" }],
    traffic: [{ name: "住宿 → 機場 → 羅馬住宿", note: "今天以移動順利為最高優先" }],
    guide: {
      story: "這天是跨日移動日，最重要的是把體力留給羅馬，不適合再塞高強度景點。",
      mustEat: ["方便吃就好"],
      mustOrder: ["簡單輕食"],
      mustBuy: ["最後伴手禮補買"],
      codes: [],
    },
    extras: ["今天不要把最後半天排滿，避免晚間移動太累"],
  },
  {
    date: "04/08",
    city: "Rome",
    country: "Italy",
    weather: "待接入即時天氣",
    theme: "老城步行日 / 羅馬氣氛建立",
    plan: {
      morning: ["萬神殿", "金杯咖啡", "周邊巷弄散步"],
      afternoon: ["納沃納廣場", "Ponte Umberto I 看聖天使堡遠景", "特雷維噴泉", "西班牙廣場"],
      evening: ["冰淇淋 Old Bridge 或 Giolitti", "晚餐先保留彈性"],
    },
    places: [
      { name: "萬神殿", note: "老城區第一站很適合" },
      { name: "納沃納廣場", note: "可連著老城步行線一起走" },
      { name: "Ponte Umberto I", note: "拍聖天使堡遠景很值得留" },
      { name: "特雷維噴泉", note: "人多，但仍是經典" },
      { name: "西班牙廣場", note: "下午或傍晚接最順" },
    ],
    food: [
      { name: "金杯咖啡", note: "萬神殿附近可順路安排" },
      { name: "Old Bridge / Giolitti", note: "冰淇淋二選一" },
      { name: "晚餐彈性決定", note: "Cantina e Cucina / Vinsanto 當天決定" },
    ],
    traffic: [{ name: "老城區步行線", note: "今天大部分可用走路完成" }],
    guide: {
      story: "這天不是要衝最多景點，而是讓你真正走進羅馬的城市氛圍。老城區最適合用步行串起來。",
      mustEat: ["冰淇淋", "咖啡"],
      mustOrder: ["依晚餐餐廳現場決定"],
      mustBuy: ["文創小物 / 明信片"],
      codes: [],
    },
    extras: ["若晚餐前還有時間，可順路找 Gran Cafè Marcel 看文創小物", "Trevi 與西班牙廣場建議避開正中午"],
  },
  {
    date: "04/09",
    city: "Rome",
    country: "Italy",
    weather: "待接入即時天氣",
    theme: "梵蒂岡完整日",
    plan: {
      morning: ["超早出發，聖伯多祿大殿先排隊", "之後進梵蒂岡博物館"],
      afternoon: ["依重點路線參觀：梵蒂岡畫廊 → 埃及博物館 → 庇護-克里門提諾博物館 → 地圖廊 → 拉斐爾畫室 → 西斯汀禮拜堂"],
      evening: ["簡單吃飯，回住宿休息"],
    },
    places: [
      { name: "聖伯多祿大殿", note: "建議一早去排隊" },
      { name: "梵蒂岡博物館", note: "今天主景點，不再加其他大點" },
      { name: "西斯汀禮拜堂", note: "必看重點" },
    ],
    food: [{ name: "自由安排", note: "今天以景點為主，吃飯彈性處理" }],
    traffic: [{ name: "住宿 ↔ 梵蒂岡", note: "地鐵 + 步行" }],
    guide: {
      story: "梵蒂岡本身就足夠佔滿一整天，這天重點是品質，不是景點數量。",
      mustEat: ["方便補充體力即可"],
      mustOrder: ["簡單餐食"],
      mustBuy: ["梵蒂岡館內選物"],
      codes: [],
    },
    extras: ["今天不要再硬塞其他主景點", "若排隊時間長，要把節奏放慢"],
  },
  {
    date: "04/10",
    city: "Rome → Barcelona",
    country: "Italy",
    weather: "待接入即時天氣",
    theme: "競技場外觀 / 回巴塞隆納",
    plan: {
      morning: ["退房", "羅馬競技場外觀 + 周邊散步拍照"],
      afternoon: ["附近簡單午餐", "拿行李後前往機場"],
      evening: ["飛回巴塞隆納", "前往最後一晚住宿 B&B Hotel"],
    },
    places: [
      { name: "羅馬競技場（外觀）", note: "依你需求只看外觀與周邊" },
      { name: "古羅馬區周邊", note: "可簡單走走拍照" },
    ],
    food: [{ name: "自由安排", note: "午餐簡單吃，保留移動彈性" }],
    traffic: [{ name: "住宿 → 競技場 → 機場 → Barcelona 住宿", note: "今天以移動順利為主" }],
    guide: {
      story: "今天的正確做法不是再塞大型古蹟，而是用競技場外觀收尾，保留足夠時間去機場與轉換城市。",
      mustEat: ["簡單午餐"],
      mustOrder: ["方便快速為主"],
      mustBuy: ["若有最後想買的小物可順路看"],
      codes: [],
    },
    extras: ["若當天節奏超順，可短暫看 La Nuova Piazzetta 一帶，但不建議拉太長", "今天不要再加卡拉卡拉浴場"],
  },
];

const stays = [
  {
    city: "Barcelona (前段)",
    name: "待補",
    address: "Carrer Creu Coberta 15, Atico Barcelona, BARCELONA, city 08014",
    checkin: "Tue, Mar 31 3:00 PM",
    checkout: "Sat, Apr 4 11:00 AM",
    code: "待補",
  },
  {
    city: "Lisbon",
    name: "待補",
    address: "Rua do Cabo 28, Lisbon, Lisbon 1250-179, Portugal",
    checkin: "Sat, Apr 4 4:00 PM",
    checkout: "Tue, Apr 7 10:00 AM",
    code: "HMNSKRFBY4",
  },
  {
    city: "Rome",
    name: "待補",
    address: "Via Graziano, 46, Rome, Lazio 00165, Italy",
    checkin: "Tue, Apr 7 3:00 PM",
    checkout: "Fri, Apr 10 11:00 AM",
    code: "待補",
  },
  {
    city: "Barcelona (最後一天)",
    name: "B&B Hotel",
    address: "Olof Palme, 24, Viladecans, 08840",
    checkin: "Fri, Apr 10 2:00 PM",
    checkout: "Sat, Apr 11 12:00 PM",
    code: "待補",
  },
];

const emergency = [
  { label: "歐盟緊急電話", value: "112" },
  { label: "西班牙緊急電話", value: "112" },
  { label: "葡萄牙緊急電話", value: "112" },
  { label: "義大利緊急電話", value: "112" },
  { label: "護照 / 信用卡遺失", value: "待補本人常用聯絡方式" },
];

const budget = [
  { item: "機票", amount: "待補" },
  { item: "住宿", amount: "待補" },
  { item: "交通", amount: "待補" },
  { item: "餐飲", amount: "待補" },
  { item: "購物", amount: "待補" },
  { item: "退稅 / 雜支", amount: "待補" },
];

const tabs = [
  { key: "trip", label: "行程", icon: "🗓️" },
  { key: "flights", label: "航班", icon: "✈️" },
  { key: "stay", label: "住宿", icon: "🏨" },
  { key: "tools", label: "工具", icon: "🧰" },
];

function chipClass(kind) {
  if (kind === "必吃") return "bg-orange-100 text-orange-700 border-orange-200";
  if (kind === "必點") return "bg-emerald-100 text-emerald-700 border-emerald-200";
  if (kind === "必買") return "bg-violet-100 text-violet-700 border-violet-200";
  if (kind === "代號") return "bg-rose-100 text-rose-700 border-rose-200";
  return "bg-slate-100 text-slate-700 border-slate-200";
}

function safeOpen(url) {
  if (typeof window !== "undefined") {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}

function openMapQuery(query) {
  safeOpen(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`);
}

function openDirections(from, to) {
  safeOpen(`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(from)}&destination=${encodeURIComponent(to)}&travelmode=transit`);
}

function getFlag(country) {
  if (country === "Spain") return "🇪🇸";
  if (country === "Portugal") return "🇵🇹";
  if (country === "Italy") return "🇮🇹";
  return "🌍";
}

function SectionTitle({ icon, title, sub }) {
  return (
    <div className="mb-3">
      <div className="flex items-center gap-2 text-[17px] font-semibold text-slate-900">
        <span className="text-base">{icon}</span>
        <span>{title}</span>
      </div>
      {sub ? <p className="mt-1 text-sm text-slate-500">{sub}</p> : null}
    </div>
  );
}

function MiniBadge({ children, className = "" }) {
  return <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium ${className}`}>{children}</span>;
}

function CardShell({ children }) {
  return <div className="rounded-[24px] border border-slate-100 bg-white p-4 shadow-sm">{children}</div>;
}

function ActionRow({ title, note, onClick, trailing = "↗" }) {
  return (
    <button onClick={onClick} className="w-full rounded-2xl bg-slate-50 p-3 text-left">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-sm font-medium">{title}</div>
          <div className="mt-1 text-xs text-slate-500">{note}</div>
        </div>
        <span className="text-sm text-slate-400">{trailing}</span>
      </div>
    </button>
  );
}

function DebugTests() {
  const tests = [
    { name: "航班資料至少 5 筆", pass: flights.length >= 5 },
    { name: "分頁數量為 4", pass: tabs.length === 4 },
    { name: "每日行程至少 10 天", pass: days.length >= 10 },
    { name: "每筆航班都有 route 與 airline", pass: flights.every((f) => Boolean(f.route) && Boolean(f.airline)) },
    { name: "住宿資料至少 4 筆", pass: stays.length >= 4 },
  ];

  return (
    <details className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-3">
      <summary className="cursor-pointer text-xs font-medium text-slate-500">開發檢查</summary>
      <div className="mt-2 space-y-1 text-xs text-slate-600">
        {tests.map((test) => (
          <div key={test.name}>{test.pass ? "✅" : "❌"} {test.name}</div>
        ))}
      </div>
    </details>
  );
}

export default function TravelPlannerApp() {
  const [tab, setTab] = useState("trip");

  const summary = useMemo(
    () => ({
      route: "TPE → BCN → LIS → FCO → BCN → TPE",
      days: "03/30 - 04/12",
      vibe: "簡約質感旅遊小工具 ✨",
    }),
    []
  );

  return (
    <div className="min-h-screen bg-[#f6f7fb] text-slate-900">
      <div className="mx-auto min-h-screen w-full max-w-md bg-gradient-to-b from-[#fffaf8] via-[#fffdf6] to-[#f7f9ff] pb-24">
        <header className="sticky top-0 z-20 border-b border-white/60 bg-white/80 px-4 pb-4 pt-5 backdrop-blur-xl">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs text-slate-500">Europe Trip Planner</p>
              <h1 className="text-[24px] font-semibold tracking-tight">歐洲旅行小工具 ✈️</h1>
              <p className="mt-1 text-sm text-slate-500">{summary.days}・{summary.vibe}</p>
            </div>
            <div className="rounded-2xl bg-slate-900 px-3 py-2 text-xs font-medium text-white shadow-sm">
              {summary.route}
            </div>
          </div>
        </header>

        <main className="space-y-4 px-4 pt-4">
          <CardShell>
            <SectionTitle icon="📍" title="本次路線" sub="手機優先整理，方便自己看也方便直接分享給朋友。" />
            <div className="rounded-2xl bg-slate-50 p-3 text-sm leading-6 text-slate-700">
              <div className="font-medium text-slate-900">{summary.route}</div>
              <div className="mt-2">巴塞隆納 🇪🇸｜里斯本 🇵🇹｜羅馬 🇮🇹</div>
              <div className="mt-2 text-slate-500">住宿已補：西班牙、葡萄牙、義大利＋最後一晚巴塞隆納</div>
              <div className="mt-2 text-slate-500">這趟節奏：長途飛行 → 歐洲廉航移動 → 城市旅行 → 回程整理</div>
            </div>
          </CardShell>

          {tab === "trip" && (
            <div className="space-y-4">
              {days.map((day) => (
                <CardShell key={`${day.date}-${day.city}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xs text-slate-500">{day.date}</div>
                      <h2 className="text-[20px] font-semibold">{day.city} {getFlag(day.country)}</h2>
                      <p className="mt-1 text-sm text-slate-500">{day.theme}</p>
                    </div>
                    <div className="flex items-center gap-1 rounded-2xl border border-sky-100 bg-sky-50 px-3 py-2 text-xs font-medium text-sky-700">
                      <span>⛅</span>
                      <span>{day.weather}</span>
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl border border-amber-100 bg-amber-50 p-3">
                    <div className="text-sm font-medium text-amber-900">💡 導遊小提醒</div>
                    <p className="mt-2 text-sm leading-6 text-amber-900/90">{day.guide.story}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {day.guide.mustEat.map((item) => (
                        <MiniBadge key={`eat-${day.date}-${item}`} className={chipClass("必吃")}>🍽 必吃：{item}</MiniBadge>
                      ))}
                      {day.guide.mustOrder.map((item) => (
                        <MiniBadge key={`order-${day.date}-${item}`} className={chipClass("必點")}>🥄 必點：{item}</MiniBadge>
                      ))}
                      {day.guide.mustBuy.map((item) => (
                        <MiniBadge key={`buy-${day.date}-${item}`} className={chipClass("必買")}>🛍 必買：{item}</MiniBadge>
                      ))}
                      {(day.guide.codes.length ? day.guide.codes : ["待補"]).map((item) => (
                        <MiniBadge key={`code-${day.date}-${item}`} className={chipClass("代號")}>🎫 預約代號：{item}</MiniBadge>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 space-y-3">
                    <div className="rounded-2xl border border-slate-100 p-3">
                      <div className="text-sm font-medium">🕘 當日安排</div>
                      <div className="mt-3 space-y-3 text-sm text-slate-700">
                        <div>
                          <div className="font-medium text-slate-900">早上</div>
                          <ul className="mt-1 space-y-1 text-slate-600">
                            {day.plan.morning.map((item, index) => (
                              <li key={`morning-${day.date}-${index}`}>• {item}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <div className="font-medium text-slate-900">下午</div>
                          <ul className="mt-1 space-y-1 text-slate-600">
                            {day.plan.afternoon.map((item, index) => (
                              <li key={`afternoon-${day.date}-${index}`}>• {item}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <div className="font-medium text-slate-900">晚上</div>
                          <ul className="mt-1 space-y-1 text-slate-600">
                            {day.plan.evening.map((item, index) => (
                              <li key={`evening-${day.date}-${index}`}>• {item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-100 p-3">
                      <div className="text-sm font-medium">📍 景點</div>
                      <div className="mt-3 space-y-2">
                        {day.places.map((item) => (
                          <ActionRow
                            key={`place-${day.date}-${item.name}`}
                            title={item.name}
                            note={item.note}
                            onClick={() => openMapQuery(`${item.name} ${day.city}`)}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-100 p-3">
                      <div className="text-sm font-medium">🍴 餐飲</div>
                      <div className="mt-3 space-y-2">
                        {day.food.map((item) => (
                          <ActionRow
                            key={`food-${day.date}-${item.name}`}
                            title={item.name}
                            note={item.note}
                            onClick={() => openMapQuery(`${item.name} ${day.city}`)}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-100 p-3">
                      <div className="text-sm font-medium">🚇 交通</div>
                      <div className="mt-3 space-y-2">
                        {day.traffic.map((item) => (
                          <ActionRow
                            key={`traffic-${day.date}-${item.name}`}
                            title={item.name}
                            note={item.note}
                            trailing="→"
                            onClick={() => openDirections(day.city, `${item.name} ${day.city}`)}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-3">
                      <div className="text-sm font-medium text-indigo-800">✨ 其他推薦（有建議，但沒有硬排進主行程）</div>
                      <ul className="mt-2 space-y-1 text-sm leading-6 text-indigo-900/90">
                        {day.extras.map((item, index) => (
                          <li key={`extra-${day.date}-${index}`}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardShell>
              ))}
            </div>
          )}

          {tab === "flights" && (
            <div className="space-y-4">
              {flights.map((flight) => (
                <CardShell key={flight.id}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xs text-slate-500">{flight.airline}</div>
                      <h2 className="mt-1 text-[18px] font-semibold">{flight.route}</h2>
                    </div>
                    <MiniBadge className="border-slate-200 bg-slate-100 text-slate-700">{flight.type}</MiniBadge>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-2xl bg-slate-50 p-3">
                      <div className="text-xs text-slate-500">日期</div>
                      <div className="mt-1 font-medium">{flight.date}</div>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-3">
                      <div className="text-xs text-slate-500">時間</div>
                      <div className="mt-1 font-medium">{flight.time}</div>
                    </div>
                  </div>

                  <div className="mt-3 rounded-2xl border border-slate-100 p-3">
                    <div className="text-sm font-medium">✈️ 航程</div>
                    <div className="mt-2 text-sm text-slate-700">{flight.from} → {flight.to}</div>
                  </div>

                  <div className="mt-3 grid gap-3">
                    <div className="rounded-2xl border border-slate-100 p-3">
                      <div className="text-sm font-medium">🧳 行李資訊</div>
                      <div className="mt-2 text-sm leading-6 text-slate-700">
                        <div><strong>托運：</strong>{flight.baggage}</div>
                        <div><strong>隨身：</strong>{flight.cabin}</div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-rose-100 bg-rose-50 p-3">
                      <div className="text-sm font-medium text-rose-700">⏰ 注意提醒</div>
                      <ul className="mt-2 space-y-1 text-sm leading-6 text-rose-800/90">
                        {flight.reminder.map((item, index) => (
                          <li key={`${flight.id}-${index}`}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardShell>
              ))}
            </div>
          )}

          {tab === "stay" && (
            <div className="space-y-4">
              <CardShell>
                <SectionTitle icon="🛏️" title="住宿資訊" sub="已整理進旅程分段，方便你們直接查。" />
                <div className="space-y-3">
                  {stays.map((stay) => (
                    <div key={stay.city} className="rounded-2xl border border-slate-100 p-3">
                      <div className="flex items-center justify-between gap-2">
                        <div className="font-medium">{stay.city}</div>
                        <button onClick={() => openMapQuery(`${stay.name} ${stay.address}`)} className="inline-flex items-center gap-1 text-xs text-slate-500">
                          地圖 <span>↗</span>
                        </button>
                      </div>
                      <div className="mt-2 text-sm leading-6 text-slate-600">
                        <div><strong>住宿：</strong>{stay.name}</div>
                        <div><strong>地址：</strong>{stay.address}</div>
                        <div><strong>Check-in：</strong>{stay.checkin}</div>
                        <div><strong>Check-out：</strong>{stay.checkout}</div>
                        <div><strong>預約代號：</strong>{stay.code}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardShell>
            </div>
          )}

          {tab === "tools" && (
            <div className="space-y-4">
              <CardShell>
                <SectionTitle icon="📞" title="緊急聯絡電話" sub="旅途中最需要快速找到的資訊。" />
                <div className="space-y-2">
                  {emergency.map((item) => (
                    <div key={item.label} className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 p-3">
                      <div>
                        <div className="text-sm font-medium">{item.label}</div>
                        <div className="mt-1 text-xs text-slate-500">{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardShell>

              <CardShell>
                <SectionTitle icon="💰" title="記帳 / 預算表" sub="目前先放骨架，之後可再改成可輸入版本。" />
                <div className="space-y-2">
                  {budget.map((item) => (
                    <div key={item.item} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 p-3">
                      <div className="text-sm font-medium">{item.item}</div>
                      <div className="text-sm text-slate-500">{item.amount}</div>
                    </div>
                  ))}
                </div>
              </CardShell>

              <CardShell>
                <SectionTitle icon="🗺️" title="旅途工具區" sub="把常用資訊集中在一起，手機上比較好找。" />
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => openMapQuery("Barcelona airport")} className="rounded-2xl bg-slate-900 p-4 text-left text-white">
                    <div className="text-sm font-medium">機場地圖</div>
                    <div className="mt-1 text-xs text-white/70">快速切換 Google Maps</div>
                  </button>
                  <button onClick={() => openMapQuery("Rome Fiumicino airport")} className="rounded-2xl border border-slate-200 bg-white p-4 text-left">
                    <div className="text-sm font-medium">羅馬機場</div>
                    <div className="mt-1 text-xs text-slate-500">查看路線與時間</div>
                  </button>
                  <button onClick={() => openMapQuery("Lisbon airport")} className="rounded-2xl border border-slate-200 bg-white p-4 text-left">
                    <div className="text-sm font-medium">里斯本機場</div>
                    <div className="mt-1 text-xs text-slate-500">查看路線與時間</div>
                  </button>
                  <button onClick={() => openMapQuery("Barcelona El Prat airport terminal 2")} className="rounded-2xl border border-slate-200 bg-white p-4 text-left">
                    <div className="text-sm font-medium">巴塞機場 T2</div>
                    <div className="mt-1 text-xs text-slate-500">Wizz 抵達航廈</div>
                  </button>
                </div>
              </CardShell>

              <CardShell>
                <SectionTitle icon="🏠" title="目前已補上的住宿重點" sub="目前四段住宿都已同步整理進工具。" />
                <div className="space-y-3 text-sm leading-6 text-slate-700">
                  {stays.map((stay) => (
                    <div key={`summary-${stay.city}`} className="rounded-2xl bg-slate-50 p-3">
                      <div className="font-medium">{stay.city}</div>
                      <div>Check-in：{stay.checkin}</div>
                      <div>Check-out：{stay.checkout}</div>
                      <div>{stay.code !== "待補" ? `Confirmation code：${stay.code}` : `地址：${stay.address}`}</div>
                      {stay.code !== "待補" ? <div>地址：{stay.address}</div> : null}
                    </div>
                  ))}
                </div>
              </CardShell>

              <DebugTests />
            </div>
          )}
        </main>

        <nav className="fixed bottom-0 left-0 right-0 z-30 mx-auto w-full max-w-md border-t border-slate-200 bg-white/95 backdrop-blur-xl">
          <div className="grid grid-cols-4 gap-1 px-2 py-2">
            {tabs.map((item) => (
              <button
                key={item.key}
                onClick={() => setTab(item.key)}
                className={`rounded-2xl px-2 py-3 text-xs font-medium transition ${tab === item.key ? "bg-slate-900 text-white shadow-sm" : "text-slate-500"}`}
              >
                <div>{item.icon}</div>
                <div className="mt-1">{item.label}</div>
              </button>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}
