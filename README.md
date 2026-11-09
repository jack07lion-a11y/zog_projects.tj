# ZOG Projects — zogprojects.tj

SaaS промо видео, реклама ва мультфильм анимациялар портфолиоси. Оддий статик сайт (HTML, CSS, JS), build қадами ва сервер керак эмас.

## Сайтни қандай ўзгартириш

| Нимани ўзгартирмоқчисиз | Қаерда |
|---|---|
| WhatsApp, Instagram, Телеграм, почта, минтақа рўйхатлари | `js/content.js` > `window.SITE` |
| Ишлар (Анимация ва Промоушн саҳифаларидаги карточкалар) | `js/content.js` > `window.WORKS` |
| Ўйинлар каталоги (Dev & Game саҳифаси) | `js/content.js` > `window.GAMES` |
| Барча матн (тожикча, русча, ўзбекча, инглизча) | `js/i18n/tg.js`, `ru.js`, `uz.js`, `en.js` |
| Ранглар | `css/style.css` бошидаги `:root` |

Ҳали тўлдирилмаган жойлар `TODO` деб белгиланган. Қидириш: `TODO`.

### Янги иш ёки ўйин қўшиш
`WORKS` (ёки `GAMES`) ичидаги бирор қаторни нусхалаб, `url` (YouTube/Instagram ҳавола) ва `title`'ни ўзгартиринг.
`url` қўйилса, карточка "Кўриш" / "Ўйнаш" бўлади, бўш бўлса "Тез орада" чиқади.
`cat`: `cartoon` — Анимация саҳифасига, `saas` ёки `ad` — Промоушн саҳифасига.

### Тиллар
4 тил: тожикча (асосий), русча, ўзбекча, инглизча. Тил **минтақа (вақт зонаси) бўйича** автоматик танланади:
Тожикистон — тожикча, Ўзбекистон — ўзбекча, Россия ва МДҲ — русча, қолган давлатлар — инглизча.
Фойдаланувчи тугма билан тилни ўзгартирса, танлов эслаб қолинади.
Янги тил қўшиш: `js/i18n/en.js` ни нусхалаб янги код билан сақланг, таржима қилинг ва `js/content.js`даги `langs` рўйхатига қатор қўшинг.

### Тезлик учун тузилма
Сайт кичик файлларга бўлинган, ҳар саҳифа фақат ўзига керагини юклайди (build керак эмас):
```
index.html, animation.html, promotion.html, dev.html, courses.html, order.html, about.html
css/style.css        дизайн
js/content.js        ҳаволалар, ишлар, ўйинлар
js/core.js           умумий ядро (тил, меню, анимация)
js/pages/*.js        ҳар саҳифанинг ўз файли
js/i18n/*.js         ҳар тилнинг ўз файли (фақат танланган тил юкланади)
assets/              логотип, favicon, og.png
```

## GitHub Pages'ни ёқиш
1. Репозиторийда **Settings** > **Pages**.
2. **Source**: `Deploy from a branch`.
3. **Branch**: `main`, папка `/ (root)`, **Save**.
4. 1–2 дақиқадан кейин сайт `https://jack07lion-a11y.github.io/zog_projects.tj/` да очилади.

## Домен улаш (кейинроқ)
1. Домен сотиб олинг ва DNS'ни GitHub Pages'га йўналтиринг (Settings > Pages > Custom domain).
2. Қуйидаги жойларда эски манзил `https://jack07lion-a11y.github.io/zog_projects.tj` ни янги домен билан алмаштиринг:
   - `js/content.js` — `url`
   - барча `*.html` — `canonical`, `og:url`, `og:image`, `twitter:image`
   - `sitemap.xml` ва `robots.txt`
3. Домен уланганда `robots.txt` ва `sitemap.xml` домен илдизида бўлади, шунда Google улар билан тўлиқ ишлайди.

## Google Search Console
**URL prefix** усулида `https://jack07lion-a11y.github.io/zog_projects.tj/` ни қўшинг ва `sitemap.xml` юборинг.
Эслатма: GitHub Pages'нинг кичик манзилида (`/zog_projects.tj/`) `robots.txt`'ни Google ўқимайди, у фақат домен илдизида ишлайди. Лекин ёпиқ саҳифа йўқ, сайт барибир индексланади.
