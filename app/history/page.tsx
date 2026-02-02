import type { Metadata } from 'next';
import Image from 'next/image';
import path from 'path';
import { readdir } from 'fs/promises';
import { cookies } from 'next/headers';
import { LANGUAGE_COOKIE, resolveLanguage, type Language } from '@/lib/language';
import { buildMetadata } from '@/lib/seo';

const HISTORY_META: Record<Language, { title: string; description: string; keywords: string[] }> = {
  sr: {
    title: 'KOPEX MIN-LIV | Istorija',
    description: 'Istorijat livnice KOPEX MIN-LIV A.D. Niš i razvoj proizvodnih kapaciteta.',
    keywords: ['istorija', 'livnica', 'KOPEX MIN-LIV', 'Niš']
  },
  en: {
    title: 'KOPEX MIN-LIV | History',
    description: 'History of KOPEX MIN-LIV A.D. and development of production capacities.',
    keywords: ['history', 'foundry', 'KOPEX MIN-LIV', 'Nis']
  },
  de: {
    title: 'KOPEX MIN-LIV | Geschichte',
    description: 'Geschichte von KOPEX MIN-LIV A.D. und Entwicklung der Produktionskapazitäten.',
    keywords: ['geschichte', 'gießerei', 'KOPEX MIN-LIV', 'Nis']
  }
};

export async function generateMetadata({
  searchParams
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
  const cookieStore = await cookies();
  const resolvedSearchParams = await searchParams;
  const language = resolveLanguage(resolvedSearchParams?.lang, cookieStore.get(LANGUAGE_COOKIE)?.value);
  const meta = HISTORY_META[language];
  return buildMetadata({
    language,
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    path: `/history?lang=${language}`
  });
}

export const dynamic = 'force-dynamic';

type HistoryCopy = {
  title: string;
  lead: string;
  paragraphs: string[];
  activityTitle: string;
  activityItems: string[];
};

const HISTORY_COPY_SR: HistoryCopy = {
  title: 'Istorija',
  lead: 'Više od jednog veka razvoja industrijske livnice u Nišu.',
  paragraphs: [
    'Livnica "KOPEX MIN-LIV A.D." nalazi se u Nišu, Bulevar 12. februar broj 82. Prvobitna Livnica osnovana je 1884 godine u sastavu radionica za popravku železničkih vozila, izradu mostova i skretnica, da bi proizvodnja odlivaka u Livnici, ondašnje železničke radionice, počela 1885 godine.',
    'U predratnom periodu livački kapaciteti su bili mali ali dovoljni da se proizvodni asortiman proširi, tako da se formiraju dve radionice, stolarska i mašinska sa livenjem radi izrade delova za mlinsku i ciglarsku industriju, delova za rudnička postrojenja, i izrade rudarskih pumpi, izrada delova za građevinske mašine za izradu puteva.',
    'U procesu nacionalizacije, Livnica je prešla iz privatne u državnu svojinu, kao "Livnica i fabrika mašina Jastrebac". Godine 1949. Livnica Fabrike pumpi DP "Jastrebac" preseljena je na sadašnju lokaciju AD "SIVI LIV" i tom prilikom izgrađene dve hale, jedna za livenje, a druga za mašinsku radionicu. U novim programima osnovna delatnost je bila izrada pumpi, vodnih turbina, mašina i uređaja za vinogradarstvo, kao i delovi za flotaciju rudnika.',
    'U cilju usaglašenog i bržeg razvoja mašinogradnje Niša, a posebno livačkih proizvodnih kapaciteta, za potrebe mašinogradnje 1979 god. RO "Jastrebac" ulazi u sastav Mašinske industrije Niš, a u cilju izgradnje Livnice "Sivi liv".',
    'Godine 1991 DP "Jastrebac" se izdvaja iz sastava SOUR MIN Niš, dok Livnica razvija svoje kapacitete za proizvodnju visokolegiranih čelika i odlivaka od nerđajućeg čelika, čime upotpunjuje svoj osnovni proizvodni program. Te iste godine dolazi do transformacije DP "Livnice", odnosno podele iste na četiri društva i to: DD "Sivi liv", DD "Modelara", DD "Livmin" i DD "Obojeni metali".',
    'Usklađivanjem sa Zakonom o preduzećima i Zakonom o klasifikaciji delatnosti 29.06.2000 god. preduzeće se transformiše u akcionarsko društvo.',
    'U skladu sa odredbama Zakona o privatizaciji, livnica i KOPEX SA Grabowa 1, Katowice, Poljska, zaključili su 04.12.2007.god. Ugovor o prodaji kapitala metodom javne aukcije, i tada nastaje AKCIONARSKO DRUŠTVO KOPEX MIN-LIV.'
  ],
  activityTitle: 'Delatnosti društva',
  activityItems: [
    'Livenje gvožđa',
    'Livenje čelika',
    'Livenje lakih metala',
    'Livenje ostalih obojenih metala',
    'Proizvodnja alata',
    'Proizvodnja ostalih standardnih metalnih proizvoda'
  ]
};

const HISTORY_COPY: Record<Language, HistoryCopy> = {
  sr: HISTORY_COPY_SR,
  en: HISTORY_COPY_SR,
  de: HISTORY_COPY_SR
};

const HISTORY_SIZES = '(max-width: 739px) 100vw, (max-width: 1200px) 50vw, 33vw';

const getHistoryImages = async (): Promise<string[]> => {
  try {
    const historyDir = path.join(process.cwd(), 'public', 'istorija');
    const files = await readdir(historyDir);
    return files
      .filter((file) => /\.(jpe?g|png|webp|gif|bmp|svg)$/i.test(file))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
      .map((file) => `/istorija/${file}`);
  } catch (error) {
    console.error('History images error:', error);
    return [];
  }
};

export default async function HistoryPage({
  searchParams
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const cookieStore = await cookies();
  const resolvedSearchParams = await searchParams;
  const language = resolveLanguage(resolvedSearchParams?.lang, cookieStore.get(LANGUAGE_COOKIE)?.value);
  const copy = HISTORY_COPY[language];
  const historyImages = await getHistoryImages();

  return (
    <div className="stg-container">
      <section className="backlight-bottom">
        <div className="stg-row">
          <div className="stg-col-8 stg-offset-2 align-center stg-tp-col-10 stg-tp-offset-1">
            <h1 className="bringer-page-title">{copy.title}</h1>
            <p className="bringer-large-text">{copy.lead}</p>
          </div>
        </div>
      </section>

      <section className="divider-bottom">
        {copy.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <h3>{copy.activityTitle}</h3>
        <ul className="kopex-quality-list">
          {copy.activityItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="divider-top">
        <div className="kopex-media-grid">
          {historyImages.map((src, index) => (
            <div className={index % 3 === 0 ? 'kopex-media-grid__item kopex-media-grid__item--wide' : 'kopex-media-grid__item'} key={src}>
              <Image src={src} alt={`Istorija ${index + 1}`} width={960} height={720} sizes={HISTORY_SIZES} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
