const selected = new URLSearchParams(location.search).get('concept');
if (selected === 'original') import('./previous');
else if (selected && /^[1-5]$/.test(selected)) import('./main');
else import('./gallery');
