# ZOG Projects — zogprojects.tj

SaaS промо видео, реклама ва мультфильм анимациялар портфолиоси. Оддий статик сайт (HTML, CSS, JS), build қадами ва сервер керак эмас.

## Сайтни қандай ўзгартириш

**Барча мазмун битта файлда: `js/content.js`.**

| Нимани ўзгартирмоқчисиз | Қаерда |
|---|---|
| Телеграм, почта, WhatsApp, Instagram ҳаволалар | `window.SITE` |
| Ишлар (видео карточкалар) | `window.WORKS` |
| Барча матн (ўзбекча ва русча) | `window.I18N` |

Ҳали тўлдирилмаган жойлар `TODO` деб белгиланган. Уларни топиш учун `content.js`'да `TODO` сўзини қидиринг:

- `telegram` — Телеграм username (бўш бўлса, тугма кўринмайди)
- `email` — почта (ихтиёрий)
- `WORKS` — ҳар бир ишга `url` (YouTube/Instagram ҳавола), `thumb` (расм) ва `title`
- `about.text` — "Мен ҳақимда" матни

### Янги иш қўшиш
`WORKS` ичидаги бирор қаторни нусхалаб, `url` ва `title`'ни ўзгартиринг. `url` қўйилса, карточка "Кўриш" бўлади, бўш бўлса "Тез орада" чиқади.

### Тожик тилини қўшиш
`I18N` ичида `uz` блокни нусхалаб `tg` деб номланг, `langName: "TJ"`, `htmlLang: "tg"` қилинг ва матнларни таржима қилинг. Тил тугмаси ўзи пайдо бўлади. Таржима қилинмаган калитлар ўзбекчада кўринади.

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

## Тузилма
```
index.html, works.html, services.html, courses.html, order.html, about.html
css/style.css      дизайн
js/content.js      мазмун (ўзгартирадиган файл)
js/app.js          меню, тил, саҳифаларни чизиш
assets/            favicon.svg, og.png
sitemap.xml, robots.txt
```
