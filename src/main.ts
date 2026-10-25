import '@fontsource/onest/cyrillic-400.css';
import '@fontsource/onest/cyrillic-500.css';
import '@fontsource/onest/cyrillic-700.css';
import '@fontsource/onest/latin-400.css';
import '@fontsource/onest/latin-500.css';
import '@fontsource/onest/latin-700.css';
import '@fontsource/manrope/cyrillic-400.css';
import '@fontsource/manrope/cyrillic-500.css';
import '@fontsource/manrope/cyrillic-700.css';
import '@fontsource/manrope/latin-400.css';
import '@fontsource/manrope/latin-500.css';
import '@fontsource/manrope/latin-700.css';
import '@fontsource/golos-text/cyrillic-400.css';
import '@fontsource/golos-text/cyrillic-500.css';
import '@fontsource/golos-text/cyrillic-700.css';
import '@fontsource/golos-text/latin-400.css';
import '@fontsource/golos-text/latin-500.css';
import '@fontsource/golos-text/latin-700.css';
import '@fontsource/ibm-plex-sans/cyrillic-400.css';
import '@fontsource/ibm-plex-sans/cyrillic-500.css';
import '@fontsource/ibm-plex-sans/cyrillic-700.css';
import '@fontsource/ibm-plex-sans/latin-400.css';
import '@fontsource/ibm-plex-sans/latin-500.css';
import '@fontsource/ibm-plex-sans/latin-700.css';
import '@fontsource/pt-serif/cyrillic-400.css';
import '@fontsource/pt-serif/cyrillic-700.css';
import '@fontsource/pt-serif/latin-400.css';
import '@fontsource/pt-serif/latin-700.css';
import { brandLogos } from './brand-logos';
import '@fontsource/roboto/cyrillic-400.css';
import '@fontsource/roboto/cyrillic-500.css';
import '@fontsource/roboto/cyrillic-700.css';
import '@fontsource/roboto/latin-400.css';
import '@fontsource/roboto/latin-500.css';
import '@fontsource/roboto/latin-700.css';
import { createIcons, Search, ArrowRight, ArrowUpRight, Bookmark, Truck, Layers, Wrench, ChevronRight, X, Menu, SlidersHorizontal, CircleHelp, MoveUpRight, Grid2x2 } from 'lucide';
import './style.css';
import './logo-sizing.css';
const concept = Number(new URLSearchParams(location.search).get('concept')) || 1;
document.documentElement.dataset.concept=String(concept);
const conceptNames=['Фокус','Мастерская','Перспектива','Каталог','Контур'];
function conceptSwitcher(){return `<div class="concept-switcher"><a class="gallery-back" href="/">${icon('grid-2x2')} Все концепции</a><div class="concept-tabs" aria-label="Варианты дизайна">${conceptNames.map((n,i)=>`<a href="?concept=${i+1}" ${concept===i+1?'aria-current="page"':''}><span>0${i+1}</span>${n}</a>`).join('')}</div><a class="previous-link" href="?concept=original">Прежняя версия ${icon('arrow-up-right')}</a></div>`;}
const icons = {Search,ArrowRight,ArrowUpRight,Bookmark,Truck,Layers,Wrench,ChevronRight,X,Menu,SlidersHorizontal,CircleHelp,MoveUpRight,Grid2x2};
const icon=(name:string)=>`<i data-lucide="${name}" aria-hidden="true"></i>`;
const europe=['Scania','Volvo Trucks','MAN','Mercedes-Benz Trucks','DAF','Iveco','Renault Trucks'];
const asia=['Sitrak','Howo','Shacman','FAW','Dongfeng','Foton','JAC','Hongyan','Dayun','Isuzu','Hino','Mitsubishi Fuso','Hyundai'];
const brands=[...europe.map(name=>({name,region:'Европа'})),...asia.map(name=>({name,region:'Азия'}))];
let region='Все марки',filter='',query='',menu=false;
let saved:string[]=[];
try { const data=JSON.parse(localStorage.getItem('truckiq-favorites')||'[]'); if(Array.isArray(data)) saved=data.filter((n:unknown)=>typeof n==='string'&&brands.some(b=>b.name===n)); } catch { /* Storage is optional in the prototype. */ }
const app=document.querySelector<HTMLDivElement>('#app')!;
const escape=(s:string)=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
const route=()=>{try{return decodeURIComponent(location.hash.slice(1)||'home');}catch{return 'unknown';}};
const link=(to:string,text:string,cls='')=>`<a class="${cls}" href="#${encodeURIComponent(to)}">${text}</a>`;
const sectionTitle=(eyebrow:string,title:string,body:string)=>`<div class="page-heading"><span class="eyebrow">${eyebrow}</span><h1>${title}</h1><p>${body}</p></div>`;

function header(){const r=route();return `<a href="#main" class="skip-link">К содержимому</a><header class="sidebar"><div class="header-inner"><div class="identity">${link('home','Truck<span>IQ</span>','logo')}<span class="logo-caption">Рабочее пространство механика</span></div><button class="menu-button icon-button" aria-label="Открыть меню" aria-expanded="${menu}" aria-controls="primary-navigation">${icon(menu?'x':'menu')}</button><nav id="primary-navigation" class="${menu?'open':''}" aria-label="Основная навигация"><span class="nav-label">РАБОЧЕЕ ПРОСТРАНСТВО</span>${[['home','grid-2x2','Главная'],['brands','truck','Марки'],['schemes','layers','Схемы'],['repair','wrench','Ремонт']].map(([to,i,t])=>`<a href="#${to}" class="nav-item ${r===to||(to==='brands'&&r.startsWith('brand/'))?'active':''}" ${r===to?'aria-current="page"':''}>${icon(i)}<span>${t}</span>${r===to?'<span class="nav-active-dot"></span>':''}</a>`).join('')}</nav>${link('favorites',`${icon('bookmark')}<span>Избранное</span><small>${saved.length}</small>`,`favorites-link ${r==='favorites'?'active':''}`)}<div class="sidebar-bottom"><span class="sidebar-mark">IQ</span><p>Точный ориентир.<br/><strong>Каждый рабочий день.</strong></p></div></div></header>`;}
function topbar(){const r=route();const labels:Record<string,string>={home:'Главная',brands:'Каталог марок',schemes:'Схемы и системы',repair:'Диагностика и ремонт',favorites:'Избранное',search:'Поиск'};return `<div class="workspace-bar"><div class="breadcrumb">Рабочее пространство ${icon('chevron-right')}<span>${r.startsWith('brand/')?escape(r.slice(6)):labels[r]||'Страница'}</span></div><span class="workspace-status"><span></span>Демо-версия</span></div>`;}

function searchForm(){return `<form class="search-form" id="diagnostic-search"><label class="sr-only" for="query">Код ошибки или симптом</label>${icon('search')}<input id="query" name="query" placeholder="Введите код ошибки или опишите симптом" value="${escape(query)}" autocomplete="off"/><button class="primary" type="submit">Найти ${icon('arrow-right')}</button><p id="search-error" role="alert"></p></form>`;}
function brandShowcase(){return `<section class="section brand-showcase" aria-labelledby="brand-showcase-title"><div class="section-heading"><div><h2 id="brand-showcase-title">Выберите марку</h2><p class="section-description">Быстрый переход к вашему грузовику</p></div>${link('brands','Все марки и фильтры '+icon('arrow-right'),'catalog-link')}</div>${[{title:'Европа',names:europe},{title:'Азия',names:asia}].map(group=>`<div class="logo-group"><h3>${group.title}<span>${group.names.length} марок</span></h3><div class="logo-grid">${group.names.map(name=>link('brand/'+name,`<span class="logo-image">${brandLogos[name]?`<img src="/logos/${brandLogos[name]}" alt="Логотип ${name}" width="160" height="80" loading="lazy" decoding="async"/>`:'<span class="logo-unavailable">Логотип пока недоступен</span>'}</span><span class="logo-name">${name}</span>`,'logo-card')).join('')}</div></div>`).join('')}<p class="logo-disclaimer">Товарные знаки принадлежат их владельцам. TruckIQ — независимый проект.</p></section>`;}
function heroPhoto(){return `<figure class="hero-visual photo-visual"><img class="diagnostic-photo" src="/images/truck-diagnostics.png" alt="Грузовик и диагностика: белый тягач и диагностический планшет с пустым экраном в мастерской" width="1536" height="1024" fetchpriority="high"/><figcaption><span>Грузовик и диагностика</span><span>AI-иллюстрация</span></figcaption></figure>`;}
function homeSearch(){return `<section class="search-panel" aria-label="Поиск по коду или симптому">${searchForm()}<p class="search-hint">${icon('circle-help')} Демо-поиск. Техническая база ещё не подключена.</p></section>`;}
function home(){
 const starters:Record<number,string>={
 1:`<section class="hero"><div class="hero-copy"><span class="eyebrow">ВАШЕ РАБОЧЕЕ ПРОСТРАНСТВО</span><h1>Нужный ответ.<br/><span>С правильного вопроса.</span></h1><p>Поиск по коду или симптому. Каталог по марке.<br/>Всё, с чего начинается работа с грузовиком.</p>${homeSearch()}</div></section>`,
 2:`<section class="hero"><div class="hero-copy"><span class="eyebrow">ДИАГНОСТИКА · СХЕМЫ · РЕМОНТ</span><h1>С чего начнём работу?</h1><p>Найдите информацию по коду или симптому.<br/>Или выберите марку грузовика ниже.</p>${homeSearch()}</div>${heroPhoto()}</section>`,
 3:`<section class="hero"><div class="hero-copy"><span class="eyebrow">TRUCKIQ — ЗНАНИЯ ДЛЯ ТЕХ, КТО В ДЕЛЕ</span><h1>Понимать.<br/><em>Действовать.</em></h1><p>Технический ориентир в мире грузовиков.<br/>От первого вопроса — к нужной информации.</p></div>${heroPhoto()}</section>${homeSearch()}`,
 4:`<section class="hero"><div class="hero-copy"><span class="eyebrow">КАТАЛОГ ГРУЗОВЫХ МАРОК</span><h1>Ваш грузовик.<br/>Ваша точка входа.</h1><p>Выберите марку, чтобы перейти к её материалам.</p></div><div class="catalog-search"><span class="eyebrow">УЖЕ ЗНАЕТЕ, ЧТО ИЩЕТЕ?</span>${homeSearch()}</div></section>`,
 5:`<section class="hero"><div class="hero-copy"><span class="eyebrow">TRUCKIQ / ТЕХНИЧЕСКОЕ ПРОСТРАНСТВО</span><h1>Меньше поиска.<br/><span>Больше ясности.</span></h1><p>Коды, симптомы, марки — единая точка входа<br/>в рабочую информацию.</p>${homeSearch()}</div><div class="tech-visual">${heroPhoto()}<div class="tech-caption"><span>ГРУЗОВИК + ДИАГНОСТИКА</span><span>ДЕМО / UI</span></div></div></section>`
 };
 return `${starters[concept]}${brandShowcase()}`;
}

function brandCard(name:string,reg:string){return `<article class="brand-card">${link('brand/'+name,`<span class="brand-initial">${escape(name.slice(0,2).toUpperCase())}</span><span><h3>${name}</h3><small>${reg}</small></span>${icon('chevron-right')}`)}<button class="save icon-button ${saved.includes(name)?'saved':''}" data-brand="${escape(name)}" aria-label="${saved.includes(name)?'Убрать из избранного':'В избранное'}: ${escape(name)}" aria-pressed="${saved.includes(name)}">${icon('bookmark')}</button></article>`;}
function results(){const found=brands.filter(b=>(region==='Все марки'||b.region===region)&&b.name.toLowerCase().includes(filter.toLowerCase().trim()));return `<p class="result-count" aria-live="polite">Найдено марок: ${found.length}</p><div class="brand-grid">${found.map(b=>brandCard(b.name,b.region)).join('')}</div>${found.length?'':empty('Ничего не найдено','Попробуйте другое название или сбросьте фильтры.','<button class="secondary" id="reset-filters">Сбросить фильтры</button>')}`;}
function catalog(){return `${sectionTitle('КАТАЛОГ / 20 МАРОК','Найдите свой грузовик','Выберите марку, чтобы открыть её демонстрационную карточку.')}<div class="catalog-toolbar"><div class="tabs" aria-label="Регион">${['Все марки','Европа','Азия'].map(r=>`<button data-region="${r}" aria-pressed="${region===r}" class="${region===r?'selected':''}">${r} <span>${r==='Все марки'?20:r==='Европа'?7:13}</span></button>`).join('')}</div><label class="filter-field">${icon('search')}<input id="brand-filter" placeholder="Поиск по марке" aria-label="Поиск по марке" value="${escape(filter)}"/></label></div><div id="brand-results">${results()}</div><p class="catalog-foot">${icon('grid-2x2')} Список открыт для расширения. Технические материалы будут добавляться после проверки.</p>`;}
function empty(title:string,body:string,action:string=''){return `<div class="empty-state"><span class="empty-icon">${icon('layers')}</span><h2>${title}</h2><p>${body}</p>${action}</div>`;}
function content(){const r=route();if(r==='home')return home();if(r==='brands')return catalog();if(r==='favorites')return `${sectionTitle('ВАШЕ РАБОЧЕЕ ПРОСТРАНСТВО','Избранное','Сохраняйте марки, чтобы быстро возвращаться к ним с этого устройства.')}<div class="brand-grid">${saved.map(n=>brandCard(n,brands.find(b=>b.name===n)!.region)).join('')}</div>${saved.length?'':empty('Здесь будут ваши марки','Нажмите на закладку рядом с маркой в каталоге.',link('brands','Перейти к маркам '+icon('arrow-right'),'primary'))}`;if(r.startsWith('brand/')){const b=brands.find(b=>b.name===r.slice(6));if(!b)return empty('Марка не найдена','Выберите марку из каталога.',link('brands','Открыть каталог','primary'));return `${link('brands','← Все марки','back-link')}${sectionTitle(b.region.toUpperCase()+' / КАРТОЧКА МАРКИ',b.name,'Демонстрационная карточка. Технические материалы ещё не добавлены.')}<button class="save secondary" data-brand="${b.name}" aria-pressed="${saved.includes(b.name)}">${icon('bookmark')} ${saved.includes(b.name)?'Убрать из избранного':'В избранное'}</button><div class="detail-panel"><span class="demo-badge">Демо-интерфейс</span>${empty('Материалы готовятся','Здесь появятся проверенные схемы и материалы по диагностике и ремонту. В прототипе нет технических рекомендаций.',link('schemes','Посмотреть раздел схем '+icon('arrow-right'),'secondary'))}</div>`;}if(r==='search')return `${sectionTitle('ПОИСК','Поиск по коду или симптому','Проверка сценария поиска без диагностических результатов.')}${searchForm()}${empty('Диагностическая база не подключена',query?`Запрос «${escape(query)}» принят только для демонстрации интерфейса. Расшифровок и рекомендаций пока нет.`:'Введите код или симптом в строке поиска.',link('brands','Выбрать марку','primary'))}`;if(r==='schemes'||r==='repair')return `${sectionTitle('БИБЛИОТЕКА / ДЕМО',r==='schemes'?'Схемы и системы':'Диагностика и ремонт','Будущий раздел проверенных технических материалов.')}<div class="detail-panel"><span class="demo-badge">Демонстрационный раздел</span>${empty(r==='schemes'?'Схемы ещё не добавлены':'Материалы по ремонту ещё не добавлены','Сейчас доступен только интерфейс. Вы можете выбрать марку и сохранить её в избранное.',link('brands','Перейти к каталогу '+icon('arrow-right'),'primary'))}</div>`;return empty('Страница не найдена','Вернитесь на главную, чтобы продолжить.',link('home','На главную','primary'));}
function refreshIcons(){createIcons({icons});}
function render(){app.innerHTML=`${conceptSwitcher()}${header()}<div class="workspace">${topbar()}<main id="main" tabindex="-1">${content()}</main><footer><span>© 2026 TruckIQ</span><p>Демонстрационный интерфейс · Без ремонтных инструкций</p></footer></div><div class="toast" role="status" aria-live="polite"></div>`;refreshIcons();}

app.addEventListener('submit',event=>{event.preventDefault();query=(document.querySelector<HTMLInputElement>('#query')?.value||'').trim();if(!query){document.querySelector('#search-error')!.textContent='Введите код или опишите симптом.';document.querySelector<HTMLInputElement>('#query')!.focus();return;}if(route()==='search')render();else location.hash='search';});
app.addEventListener('input',event=>{const input=event.target as HTMLInputElement;if(input.id==='brand-filter'){filter=input.value;document.querySelector('#brand-results')!.innerHTML=results();refreshIcons();}if(input.id==='query'){query=input.value;document.querySelector('#search-error')!.textContent='';}});
app.addEventListener('click',event=>{const target=event.target as Element;if(target.closest('.skip-link')){event.preventDefault();document.querySelector<HTMLElement>('#main')?.focus();return;}const tab=target.closest<HTMLButtonElement>('[data-region]');if(tab){region=tab.dataset.region!;render();document.querySelector<HTMLButtonElement>(`[data-region="${region}"]`)?.focus();}if(target.closest('#reset-filters')){filter='';region='Все марки';render();}const save=target.closest<HTMLButtonElement>('[data-brand]');if(save){const name=save.dataset.brand!;saved=saved.includes(name)?saved.filter(n=>n!==name):[...saved,name];let persisted=true;try{localStorage.setItem('truckiq-favorites',JSON.stringify(saved));}catch{persisted=false;}render();document.querySelector<HTMLButtonElement>(`[data-brand="${name}"]`)?.focus();document.querySelector('.toast')!.textContent=persisted?(saved.includes(name)?`${name} — в избранном`:`${name} — удалено из избранного`):'Сохранено только до закрытия страницы: хранилище недоступно.';}if(target.closest('.menu-button')){menu=!menu;render();document.querySelector<HTMLButtonElement>('.menu-button')?.focus();}});
window.addEventListener('hashchange',()=>{menu=false;render();window.scrollTo(0,0);document.querySelector('main')?.setAttribute('tabindex','-1');document.querySelector<HTMLElement>('main')?.focus({preventScroll:true});});
render();
