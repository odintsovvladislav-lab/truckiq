import '@fontsource/golos-text/cyrillic-400.css';
import '@fontsource/golos-text/cyrillic-500.css';
import '@fontsource/golos-text/cyrillic-700.css';
import '@fontsource/golos-text/latin-400.css';
import '@fontsource/golos-text/latin-500.css';
import '@fontsource/golos-text/latin-700.css';
import './gallery.css';
const concepts=[
 {name:'Фокус',tag:'ПОИСК ПРЕЖДЕ ВСЕГО',body:'Минималистичный интерфейс с центральным поиском. Спокойный ритм, минимум отвлекающих деталей.',font:'Onest',layout:'Центрированный поиск'},
 {name:'Мастерская',tag:'РАБОЧАЯ ПАНЕЛЬ',body:'Постоянная боковая навигация и компактная рабочая область. Для регулярной работы с каталогом.',font:'IBM Plex Sans',layout:'Боковое меню'},
 {name:'Перспектива',tag:'EDITORIAL',body:'Выразительная типографика, крупный визуал и самостоятельная строка поиска. Более характерный образ бренда.',font:'PT Serif + Golos Text',layout:'Редакционная композиция'},
 {name:'Каталог',tag:'МАРКИ В ЦЕНТРЕ',body:'Крупные карточки грузовых марок, разделённые на регионы. Поиск помогает, а каталог ведёт сценарий.',font:'Manrope',layout:'Визуальный каталог'},
 {name:'Контур',tag:'ТЕХНИЧЕСКАЯ СРЕДА',body:'Тёмно-синий фон, контрастный поиск и светлые карточки марок. Сдержанный технологичный характер.',font:'IBM Plex Sans',layout:'Контрастный интерфейс'},
];
document.title='TruckIQ — 5 концепций дизайна';
document.querySelector('#app')!.innerHTML=`<header class="gallery-header"><a class="gallery-logo" href="/">Truck<span>IQ</span></a><span>Дизайн-направления / 2026</span><a href="?concept=original">Прежняя версия ↗</a></header><main class="gallery-main"><div class="gallery-intro"><span class="overline">ВЫБОР ВИЗУАЛЬНОГО НАПРАВЛЕНИЯ</span><h1>Один продукт.<br/>Пять разных подходов.</h1><p>Сравните композицию, характер и типографику.<br/>В каждом варианте — настоящие логотипы марок и работающий UI-прототип.</p><span class="selection-note">Финальный вариант и корпоративный шрифт пока не выбраны.</span></div><div class="concept-grid">${concepts.map((c,i)=>`<article class="concept-card"><a class="concept-preview" href="?concept=${i+1}" aria-label="Открыть концепцию ${i+1}: ${c.name}"><img src="/previews/concept-${i+1}.png" width="1440" height="1000" alt="Главный экран варианта ${i+1}: ${c.name}"/><span class="preview-open">Открыть прототип ↗</span></a><div class="concept-info"><div class="concept-meta"><span>0${i+1} / ${c.tag}</span><span>${c.layout}</span></div><h2>${c.name}</h2><p>${c.body}</p><div class="concept-bottom"><span>${c.font}</span><a href="?concept=${i+1}">Смотреть вариант →</a></div></div></article>`).join('')}</div><aside class="gallery-note">Сохранены все 20 марок: 16 изображений и 4 честные текстовые карточки. Диагностическая база не подключена. Прототипы ничего не публикуют и не содержат инструкций по ремонту.</aside></main><footer>TruckIQ · Локальная галерея концепций</footer>`;
