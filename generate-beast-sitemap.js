/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const fs = require('fs');

const elementals = require('./src/assets/books/elementals.json');
const mmBeasts = require('./src/assets/books/monster-manual.json');
const monstersOfTheMultiverse = require('./src/assets/books/monsters-of-the-multiverse.json');
const voloGuideToMonsters = require('./src/assets/books/volos-guide-to-monsters.json');

function getNameLink(name) {
  return name.replaceAll(' ', '-').toLowerCase();
}

const siteUrl = 'https://druid-wild-shape.ttrpg-kit.com';

const beastPath = '/beast/';

const books = [
  ...mmBeasts,
  ...voloGuideToMonsters,
  ...monstersOfTheMultiverse,
  ...elementals,
];

const beastLinks = books.map(
  (beast) => `${siteUrl}${beastPath}${getNameLink(beast.name)}`
);

const currentDate = new Date().toISOString();

function generateXMLSection(link) {
  return `
  <url>
    <loc>${link}</loc>
    <lastmod>${currentDate}</lastmod>
  </url>`;
}

const filePath = './public/sitemap.xml';

const fileData = fs.readFileSync(filePath, 'utf-8');
const fileLines = fileData.split(/\r?\n/);
const lastLine = fileLines.splice(-1);
let newFileData = fileLines.join('\n');

beastLinks.forEach((link) => {
  const isBeastPageInSitemap = fileData.includes(link);

  if (!isBeastPageInSitemap) {
    const xmlData = generateXMLSection(link);
    newFileData += xmlData;
  }
});

newFileData += '\n';
newFileData += lastLine;

fs.writeFile(filePath, newFileData, function (err) {
  if (err) return console.log(err);
});
