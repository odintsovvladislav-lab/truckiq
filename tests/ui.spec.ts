import { test, expect } from '@playwright/test';
const fonts=['Onest','IBM Plex Sans','Golos Text','Manrope','IBM Plex Sans'];
for(let concept=1;concept<=5;concept++){
 test(`concept ${concept}: layout, fonts, assets and complete shared flows`,async({page},info)=>{
  test.setTimeout(60000);
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
  const url=(hash='home')=>`/?concept=${concept}#${encodeURIComponent(hash)}`;
  await page.goto(url());
  await expect(page.getByRole('heading',{level:1})).toBeVisible();
  await page.evaluate(()=>document.fonts.ready);
  await expect(page.locator('html')).toHaveAttribute('data-concept',String(concept));
  await expect(page.locator('body')).toHaveCSS('font-family',new RegExp(fonts[concept-1]));
  expect(await page.evaluate(f=>Array.from(document.fonts).some(face=>face.family.replaceAll('"','')===f&&face.status==='loaded'),fonts[concept-1])).toBe(true);
  await expect(page.locator('.logo-card')).toHaveCount(20);
  await expect(page.locator('.logo-image img')).toHaveCount(16);
  await expect(page.locator('.logo-unavailable')).toHaveCount(4);
  await expect(page.locator('.brand-preview')).toHaveCount(0);
  await expect(page.locator('.concept-tabs a[aria-current="page"]')).toContainText(`0${concept}`);
  await page.locator('.logo-image img').evaluateAll(images=>Promise.all(images.map(i=>{(i as HTMLImageElement).loading='eager';return (i as HTMLImageElement).decode();})));
  expect(await page.locator('.logo-image img').evaluateAll(images=>images.every(i=>(i as HTMLImageElement).naturalWidth>0&&(i as HTMLImageElement).alt.startsWith('Логотип ')))).toBe(true);
  if([2,3,5].includes(concept)){await page.locator('.diagnostic-photo').evaluate(i=>(i as HTMLImageElement).decode());await expect(page.locator('.diagnostic-photo')).toHaveCSS('object-fit','contain');}
  await page.getByRole('button',{name:'Найти',exact:true}).click();
  await expect(page.getByRole('alert')).toHaveText('Введите код или опишите симптом.');
  await page.getByLabel('Код ошибки или симптом').fill('   ');
  await page.getByRole('button',{name:'Найти',exact:true}).click();
  await expect(page).not.toHaveURL(/#search/);
  await page.getByLabel('Код ошибки или симптом').fill('<script>тест</script>');
  await page.getByRole('button',{name:'Найти',exact:true}).click();
  await expect(page.getByRole('heading',{name:'Диагностическая база не подключена'})).toBeVisible();
  await expect(page.locator('.empty-state')).toContainText('<script>тест</script>');
  await page.getByRole('button',{name:'Найти',exact:true}).click();
  await expect(page.locator('.empty-state')).toContainText('<script>тест</script>');
  await page.getByRole('link',{name:'Выбрать марку',exact:true}).click();
  await expect(page.locator('.brand-card')).toHaveCount(20);
  await page.getByRole('button',{name:'Европа 7'}).click();
  await expect(page.locator('.brand-card')).toHaveCount(7);
  await page.getByRole('button',{name:'Азия 13'}).click();
  await page.getByRole('button',{name:'Азия 13'}).click();
  await expect(page.locator('.brand-card')).toHaveCount(13);
  await page.getByLabel('Поиск по марке').fill('sitrak');
  await expect(page.locator('.brand-card')).toHaveCount(1);
  await page.getByLabel('Поиск по марке').fill('неизвестная');
  await expect(page.getByRole('heading',{name:'Ничего не найдено'})).toBeVisible();
  await page.getByRole('button',{name:'Сбросить фильтры'}).click();
  await expect(page.locator('.brand-card')).toHaveCount(20);
  await page.getByRole('button',{name:'В избранное: Scania',exact:true}).click();
  await page.getByRole('button',{name:'Убрать из избранного: Scania',exact:true}).click();
  await page.getByRole('button',{name:'В избранное: Scania',exact:true}).click();
  await page.reload();
  await expect(page.getByRole('button',{name:'Убрать из избранного: Scania'})).toHaveAttribute('aria-pressed','true');
  await page.locator('.favorites-link').click();
  await expect(page.locator('.brand-card')).toHaveCount(1);
  await page.locator('.brand-card>a').click();
  await expect(page.getByRole('heading',{level:1,name:'Scania'})).toBeVisible();
  await page.getByRole('button',{name:'Убрать из избранного',exact:true}).click();
  await page.locator('.favorites-link').click();
  await expect(page.getByRole('heading',{name:'Здесь будут ваши марки'})).toBeVisible();
  await page.goto(url('schemes'));
  await expect(page.getByRole('heading',{name:'Схемы ещё не добавлены'})).toBeVisible();
  await page.goto(url('repair'));
  await expect(page.getByRole('heading',{name:'Материалы по ремонту ещё не добавлены'})).toBeVisible();
  if(info.project.name==='mobile'){await page.getByRole('button',{name:'Открыть меню'}).click();await page.getByRole('navigation').getByRole('link',{name:'Марки',exact:true}).click();await expect(page.getByRole('heading',{level:1})).toHaveText('Найдите свой грузовик');}
  await page.goto(url('unknown'));
  await expect(page.getByRole('heading',{name:'Страница не найдена'})).toBeVisible();
  await page.getByRole('link',{name:'На главную',exact:true}).click();
  const names=await page.locator('.logo-name').allTextContents();
  for(const name of names){await page.locator('.logo-card').filter({has:page.getByText(name,{exact:true})}).click();await expect(page.getByRole('heading',{level:1})).toHaveText(name);await page.goBack();}
  for(const width of [320,390,768,1440]){await page.setViewportSize({width,height:1000});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);}
  await page.setViewportSize(info.project.name==='mobile'?{width:390,height:844}:{width:1440,height:1000});
  await page.goto(url());
  await page.evaluate(()=>document.fonts.ready);
  await page.locator('img').evaluateAll(images=>Promise.all(images.map(i=>{(i as HTMLImageElement).loading='eager';return (i as HTMLImageElement).decode();})));
  await page.evaluate(()=>window.scrollTo(0,0));
  await page.mouse.move(0,0);
  await page.screenshot({path:`artifacts/concept-${concept}-${info.project.name}.png`,fullPage:true});
  if(info.project.name==='desktop')await page.screenshot({path:`public/previews/concept-${concept}.png`});
  expect(errors).toEqual([]);
 });
}
test('original design is preserved',async({page})=>{
 await page.goto('/?concept=original');
 await expect(page.getByRole('heading',{level:1})).toContainText('Понимать грузовик');
 await expect(page.locator('.logo-card')).toHaveCount(20);
 await expect(page.locator('.diagnostic-photo')).toBeVisible();
 await expect(page.locator('.brand-preview')).toHaveCount(0);
});
test('gallery offers five concepts without selecting a final design',async({page})=>{
 await page.goto('/');
 await expect(page.locator('.concept-card')).toHaveCount(5);
 await expect(page.locator('.selection-note')).toContainText('пока не выбраны');
 await page.locator('.concept-preview img').evaluateAll(imgs=>Promise.all(imgs.map(i=>(i as HTMLImageElement).decode())));
 for(let n=1;n<=5;n++){await page.locator(`.concept-preview[href="?concept=${n}"]`).click();await expect(page.locator('html')).toHaveAttribute('data-concept',String(n));await page.getByRole('link',{name:'Все концепции',exact:true}).click();await expect(page.locator('.concept-card')).toHaveCount(5);}
});
