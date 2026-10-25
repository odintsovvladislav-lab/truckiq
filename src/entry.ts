const selected = new URLSearchParams(location.search).get('concept');
if (selected === 'original') import('./previous');
else if (selected === 'gallery') import('./gallery');
else import('./main');
