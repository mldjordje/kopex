import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { LANGUAGE_COOKIE, resolveLanguage, type Language } from '@/lib/language';
import { buildMetadata } from '@/lib/seo';

const PROCESS_META: Record<Language, { title: string; description: string; keywords: string[] }> = {
  sr: {
    title: 'KOPEX MIN-LIV | Tehnološki proces rada',
    description: 'Detaljan prikaz tehnološkog procesa livenja, pripreme i obrade odlivaka.',
    keywords: ['tehnološki proces', 'livenje', 'priprema peska', 'KOPEX MIN-LIV']
  },
  en: {
    title: 'KOPEX MIN-LIV | Technological process',
    description: 'Detailed overview of the technological casting process, preparation and finishing.',
    keywords: ['technological process', 'casting', 'sand preparation', 'KOPEX MIN-LIV']
  },
  de: {
    title: 'KOPEX MIN-LIV | Technologischer Prozess',
    description: 'Detaillierte Übersicht über den technologischen Gießprozess, Vorbereitung und Nachbearbeitung.',
    keywords: ['technologischer prozess', 'gießen', 'sandaufbereitung', 'KOPEX MIN-LIV']
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
  const meta = PROCESS_META[language];
  return buildMetadata({
    language,
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    path: `/services/tehnoloski-proces-rada?lang=${language}`
  });
}

type ProcessCopy = {
  title: string;
  lead: string;
  introParagraphs: string[];
  flowTitle: string;
  flowSteps: string[];
  flowParagraphs: string[];
  section41Title: string;
  section41Paragraphs: string[];
  section42Title: string;
  section42Paragraphs: string[];
  section42ListTitle: string;
  section42ListItems: string[];
  section42MixListTitle: string;
  section42MixItems: string[];
  section43Title: string;
  section43Paragraphs: string[];
  section44Title: string;
  section44Paragraphs: string[];
  section45Title: string;
  section45Paragraphs: string[];
  section45Steps: string[];
  section46Title: string;
  section46Paragraphs: string[];
  section46ListTitle: string;
  section46ListItems: string[];
  section47Title: string;
  section47Paragraphs: string[];
  section47Treatments: string[];
  section48Title: string;
  section48Paragraphs: string[];
  ctaTitle: string;
  ctaLead: string;
  ctaButton: string;
};

const PROCESS_COPY_SR: ProcessCopy = {
  title: 'Tehnološki proces rada',
  lead: 'Detaljan prikaz postupaka livenja, obrade i kontrole odlivaka.',
  introParagraphs: [
    'Livenje je postupak pri kome se istopljeni metal lije u kalupe, u čijim šupljinama se hladi, a odlivak dobija oblik. Livenje pruža najbrži i najjeftiniji put od sirovog do gotovog, odlikovanog proizvoda-odlivka, kome je potrebna samo neznatna naknadna obrada.',
    'Kod livenog sirovog gvožđa, livenje predstavlja jedini mogući postupak oblikovanja bez mehaničke obrade-struganja.',
    'Tehnološki proces proizvodnje odlivaka od čelika i sivog liva obuhvata postupke i procese razvrstane u odeljenju livnice, međusobno povezane i uslovljene.'
  ],
  flowTitle: 'Osnovne faze procesa',
  flowSteps: [
    'Priprema šarže',
    'Topionica',
    'Priprema, regeneracija i transport peska',
    'Kaluparnica',
    'Jezgarnica',
    'Čistionica',
    'Termička obrada'
  ],
  flowParagraphs: [
    'Osnovne i pomoćne sirovine dopremaju se i lageruju u skladištu sirovina. Za topionicu se obezbeđuje jednodnevno skladište za pojedine komponente šarže. Šarža se odmerava na vagi i šaržnim uređajem ubacuje u agregat za topljenje. Kalupi se izrađuju u kaluparnici. Da bi se obezbedila izrada potrebno je pored kalupnika – šasije pripremiti kaluparsku mešavinu peska.',
    'Novi pesak se lageruje u skladištu sirovina, a transportuje se do mesta pripreme odgovarajućim transportnim sredstvom. Isto tako se transportuju i pomoćne sirovine. U pripremi peska istrešen pesak (već upotrebljavan) regeneriše se i tako pripremljen ponovo se koristi za izradu kalupa. Jezgra koja se koriste za izradu odlivaka izrađuju se od peska. Urađeni polukalupi posle stavljanja jezgra (ukoliko su ista potrebna) se sklapaju.',
    'Sledeća operacija tehnološkog procesa je livenje (zalivanje) kalupa, koje se obavlja livačkim loncima. Posle livenja odlivak se mora ohladiti i tek nakon hlađenja istresaju se iz kalupa. Kalupnici se transportuju ponovo na kalupovanje, a pesak na regeneraciju. Upotrebljeni pesak ponovo se koristi, otpadni pesak od jezgara se odbacuje. Ohlađen odlivak se kontroliše na "crno". Operacija čišćenja odlivaka od zaostalog peska, skidanje šasova i površinsko čišćenje obavlja se u odeljenju čistionice.',
    'Ulivni sistemi, škart posle kontrole na "crno" i završne kontrole u čistionici vraćaju se na ponovno pretapanje u topionicu. Operacije termičke obrade i bojenje odlivaka nisu obavezne operacije u tehnološkom procesu livnice sivog liva. Očišćeni odlivci se transportuju odgovarajućim transportnim uređajem u magacin gotove robe. Šljaka, otpadni pesak posle čišćenja odlivaka i polomljena jezgra se izbacuju na skladište otpadaka.'
  ],
  section41Title: '4.1. Priprema metalne šarže i šaržiranje peći',
  section41Paragraphs: [
    'Priprema metalne šarže obuhvata usitnjavanje velikih komada (lomača), odstranjivanje nečistoće i neželjenih predmeta kao što su drvo, plastika, eksplozivni predmeti itd, zatim čišćenje metalnih predmeta od nečistoće (maziva, ulja) i utovar metalne šarže u korpe.',
    'Za usitnjavanje većih komada koriste se uređaji za gasno–plameno rezanje.'
  ],
  section42Title: '4.2. Priprema peska',
  section42Paragraphs: [
    'Postrojenje za pripremu peska poseduje dve mešalice kapaciteta 600 kg. U njih se putem trakastih transportera uvodi novi kvarcni pesak, povratni pesak (već upotrebljavan), betonit, ugljeni prah i destrim.',
    'Pesak je glavni (najjeftiniji) materijal za izradu kalupa i jezgara, s tim što se veliki procenat oko 95 % javlja kao otpadni pesak.',
    'Pitanje otpadnog peska rešava se regeneracijom koja može biti:'
  ],
  section42ListTitle: 'Vrste regeneracije',
  section42ListItems: [
    'Vlažna regeneracija peska zahteva sistem drobljenja i hidroklasere za ispiranje i sortiranje opranog peska i sušenje.',
    'Suva regeneracija se sastoji od istresanja kalupa, odvajanja gvozdenih primesa pomoću magnetnog sita, drobljenja, hlađenja, stokiranja, pneumatskog transporta kroz filter, ponovnog hlađenja i transporta do silosa iznad kontinualnog mešača.',
    'Topla regeneracija peska se obavlja u protočnoj peći kada se veziva odvajaju od peska.'
  ],
  section42MixListTitle: 'Kalupske mešavine',
  section42MixItems: [
    'Modelna mešavina – veći udeo novog i sitnijeg peska.',
    'Mešavina za ispunu – krupnija, sastavljena uglavnom od povratnog, već upotrebljenog peska.'
  ],
  section43Title: '4.3. Izrada modela',
  section43Paragraphs: [
    'Modeli se izrađuju u, za to namenjenim prostorijama. Oni mogu biti od drveta, metala, raznih smola, plastike i dr.',
    'Za izradu modela od drveta koriste se stolarske mašine različite namene, i to: kružne i trakaste testere, glodalice, ravnalice, rendisaljke, stabilne i ručne bušilice za drvo i dr.',
    'Izrada modela od metala obavlja se na bravarskim mašinama (univerzalni strug, glodalice, testere, stabilne i prenosne bušilice i dr).',
    'Izrada kalupa se vr?i ru?nim i ma?inskim putem od pripremljenog kvarcnog peska i samovezuju?ih kalupskih me?avina na bazi alphacet smola.'
  ],
  section44Title: '4.4. Topljenje metala',
  section44Paragraphs: [
    'Topljenje predstavlja jednu od osnovnih operacija u tehnološkom procesu prerade odlivaka. Pri pripremi metalne šarže određuje se količina, sastav i granulacija materijala za proizvodnju sivog liva i čelika.',
    'Za topljenje se koristi materijal: čelični otpad, povratni (otpadni materijal), dodaci (ferolegure), topitelj (pečeni kreč), sredstva za redukciju (aluminijum) i drugi dodaci prema vrsti i kvalitetu.',
    'Odmerene količine metalne šarže na skladištu se ručno ili mehanizovano pune u korpe ili vagonete i ručno ili mehanički transportuju do peći u topionici.',
    'Elektroindukcione peći služe za topljenje legiranih čelika. Doprema korpi sa šaržom do platforme peći obavlja se mehanizovano, mosnom dizalicom, dok se punjenje peći metalnom šaržom, dodacima i topljenjem obavlja ručno.',
    'Po završenom topljenju rastopljeni metal se hidrauličnim pogonom, naginjanjem peći izliva u prethodno zagrejani kazan na čep, odakle se dizalicom prenosi do mesta za livenje – pripremljene kalupe.'
  ],
  section45Title: '4.5. Livenje u kalupe',
  section45Paragraphs: [
    'Tehnološki proces livenja se vrši livenjem tečnog metala u livačke kalupe. Tehnološki proces proizvodnje odlivaka u kalupima od livačkog peska obuhvata sledeće faze:'
  ],
  section45Steps: [
    'Pripremu sintetičkog peska',
    'Izradu kalupa i jezgara',
    'Sastavljanje livačkog kalupa',
    'Ulivanje rastopljenog materijala u kalupe',
    'Vađenje i čišćenje odlivaka'
  ],
  section46Title: '4.6. Čišćenje odlivaka',
  section46Paragraphs: [
    'U čistionici livnice odlivci se čiste i odstranjuju se ostaci ulivaka, hranitelja i šavova. Odlivak se oslobađa zapeklog peska, izbije se jezgro, odvaja se škart i popravljaju greške nastale livenjem. Čišćenje odlivaka vrši se brušenjem, odsecanjem, sačmarenjem i td.',
    'Izbijanje jezgra se može izvršiti ručno kod odlivka malih serija, kod ostalih postoje veće mogućnosti za upotrebu:'
  ],
  section46ListTitle: 'Mogućnosti za čišćenje',
  section46ListItems: [
    'Hidrauličnih postrojenja',
    'Uređaja za sačmarenje sa mogućnošću izbijanja jezgra i regeneracije peska',
    'Specijalnih uređaja namenjenih čišćenju odlivaka postolja za strugove i druge alatne mašine'
  ],
  section47Title: '4.7. Termička obrada i kalionica',
  section47Paragraphs: [
    'Termička obrada odlivaka od sivog liva i čelika primenjuje se radi uklanjanja unutrašnjeg napona, poboljšanja mikrostrukture i mehaničkih osobina, smanjenja tvrdoće radi lakše obrade, povećanja površinske tvrdoće i otpornosti na habanje.',
    'U primeni su tri termičke obrade:'
  ],
  section47Treatments: [
    'Žarenje radi uklanjanja unutrašnjeg napona',
    'Meko žarenje radi smanjenja tvrdoće',
    'Žarenje radi poboljšanja mehaničkih osobina'
  ],
  section48Title: '4.8. Dorada, kontrola i zaštita odlivaka',
  section48Paragraphs: [
    'Poslednja operacija u procesu čišćenja odlivaka je popravka odlivaka čije se greške otkrivaju na konačnoj kontroli. Popravka zavarivanjem se vrši još u fazi pripreme odlivaka za termičku obradu – normalizaciju ili gašenje. Međutim, na poslednjoj operaciji se otklanjaju greške otkrivene u toku čišćenja.',
    'Kontrola odlivaka se obavlja u posebnim prostorijama, na horizontalnim pločama i radnim stolovima za vizuelnu kontrolu površina i dimenzija odlivaka. Kontrola odlivaka od austenitnog čelika namenjenih za visoke pritiske i specijalnu upotrebu obavlja se u defektoskopskoj laboratoriji.',
    'Jedan deo odlivaka se grundira (premazuje) zaštitnom bojom, potapanjem u kade sa bojom ili kod većih odlivaka prskanjem (špricanjem) pištoljem u kabinama.'
  ],
  ctaTitle: 'Imate dodatna pitanja?',
  ctaLead: 'Kontaktirajte nas za tehničke detalje i podršku pri realizaciji.',
  ctaButton: 'Kontaktirajte nas'
};

const PROCESS_COPY: Record<Language, ProcessCopy> = {
  sr: PROCESS_COPY_SR,
  en: PROCESS_COPY_SR,
  de: PROCESS_COPY_SR
};

const PROCESS_IMAGE_SIZES = '(max-width: 739px) 100vw, (max-width: 1200px) 80vw, 520px';

export default async function TechnologicalProcessPage({
  searchParams
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const cookieStore = await cookies();
  const resolvedSearchParams = await searchParams;
  const language = resolveLanguage(resolvedSearchParams?.lang, cookieStore.get(LANGUAGE_COOKIE)?.value);
  const copy = PROCESS_COPY[language];

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
        {copy.introParagraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <h2>{copy.flowTitle}</h2>
        <ul className="kopex-quality-list">
          {copy.flowSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
        {copy.flowParagraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section className="divider-top">
        <h2>{copy.section41Title}</h2>
        {copy.section41Paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <div className="bringer-parallax-media stg-bottom-gap-l">
          <Image
            src="/procesrada/1.bmp"
            alt="Priprema metalne šarže"
            width={120}
            height={160}
            sizes={PROCESS_IMAGE_SIZES}
            unoptimized
          />
        </div>
      </section>

      <section className="divider-top">
        <h2>{copy.section42Title}</h2>
        {copy.section42Paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <h4>{copy.section42ListTitle}</h4>
        <ul className="kopex-quality-list">
          {copy.section42ListItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p>Kod kalupovanja se koristi do 80 % regenerisanog peska i najmanje 20 % novog peska – takozvana kalupska mešavina.</p>
        <p>U livnicama se često radi sa dve kalupske mešavine i to:</p>
        <h4>{copy.section42MixListTitle}</h4>
        <ul className="kopex-quality-list">
          {copy.section42MixItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="bringer-parallax-media stg-bottom-gap-l">
          <Image
            src="/procesrada/2.bmp"
            alt="Priprema peska"
            width={160}
            height={120}
            sizes={PROCESS_IMAGE_SIZES}
            unoptimized
          />
        </div>
      </section>

      <section className="divider-top">
        <h2>{copy.section43Title}</h2>
        {copy.section43Paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
<div className="bringer-parallax-media stg-bottom-gap-l">
          <Image
            src="/procesrada/3.bmp"
            alt="Izrada modela i kalupa"
            width={120}
            height={160}
            sizes={PROCESS_IMAGE_SIZES}
            unoptimized
          />
        </div>
      </section>

      <section className="divider-top">
        <h2>{copy.section44Title}</h2>
        {copy.section44Paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section className="divider-top">
        <h2>{copy.section45Title}</h2>
        {copy.section45Paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <ul className="kopex-quality-list">
          {copy.section45Steps.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p>Priprema sintetičkog peska se vrši na mešalici u koju se dozira određeni težinski odnos kvarcnog peska, bentonita, ugljene prašine i vode. Procenat ugljene prašine po jednoj pripremljenoj smeši kreće se oko 4 %.</p>
        <p>Ulivanje rastopljenog metala u kalupe vrši se mosnom dizalicom iz livačkih kazana za krupne odlivke, a ručno loncima do 50 kg.</p>
      </section>

      <section className="divider-top">
        <h2>{copy.section46Title}</h2>
        {copy.section46Paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <h4>{copy.section46ListTitle}</h4>
        <ul className="kopex-quality-list">
          {copy.section46ListItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p>Površinsko čišćenje odlivaka od peska, ostataka jezgra, oksidne kore i delimično ispravljanje grešaka pri livenju obavlja se u bubnjevima, komorama sa okretnim stolom, komorama sa kontinualnim radom, sa komorama diskontinualnog tipa sa okretnom kukom, komorama diskontinualnog tipa sa sačmom u struji vazduha pod pritiskom.</p>
        <p>Za velike serije sitnih odlivaka upotrebljavaju se bubnjevi za čišćenje sa centrifugalnom turbinom gde se odlivci veoma efikasno čiste međusobnim sudaranjem i delovanjem sačme.</p>
        <p>Komore sa kontinualnim radom monorejskog tipa se upotrebljavaju u livnicama motornih odlivaka i livnicama velikih serija. Komore diskontinualnog tipa sa okretnom kukom upotrebljavaju se u livnicama malih serija i livnicama čeličnog liva. Komore za čišćenje sačmom u struji vazduha pod pritiskom upotrebljavaju se za odlivke teže od 500 kg i u livnicama pojedinačne i maloserijske proizvodnje. Proces sačmarenja može se regulisati prema potrebi.</p>
        <p>Brušenje odlivaka je tehnološka operacija pri kojoj se vrši skidanje šavova, uklanjanje otpadaka ulivnog sistema i ravnjanje površina za dalju mehaničku obradu.</p>
        <p>U livnicama se upotrebljavaju stabilne brusilice za obradu sitnijih odlivaka, viseće brusilice za brušenje srednjih i većih odlivaka i ručne brusilice za sve vrste odlivaka koje se ne mogu brusiti na stabilnim i visećim brusilicama. Za odlivke većih serija se koriste specijalne brusilice. Posebnu obradu brušenja predstavlja obrada električnim lukom pomoću grafitnih elektroda (Arker aparata) koje se obavlja u posebnim kabinama i obično kod manjih odlivaka.</p>
        <p>Mehanička obrada, za brusilice nepristupačnih mesta na odlivku, obavlja se odsecanjem pomoću ručnih i pneumatskih čekića, tj. sekača.</p>
      </section>

      <section className="divider-top">
        <h2>{copy.section47Title}</h2>
        {copy.section47Paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <ul className="kopex-quality-list">
          {copy.section47Treatments.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p>Za odlivke od nelegiranog čeličnog liva termička obrada se sastoji od normalizacije i hlađenja na vazduhu, homogenizacije (meko žarenje) i sporog hlađenja u peći i opuštanja posle varenja i hlađenja na vazduhu.</p>
        <p>Termička obrada odlivaka odvija se u elektrootpornim (žarnim) pećima sa pokretnom platformom.</p>
        <p>Odlivci od niskolegiranog čeličnog liva i nerđajućeg čelika (austenitnog čelika hrom-nikl) podvrgavaju se složenoj termičkoj obradi koja osim zagrevanja primenjuje i kaljenje u peći postepeno, na vazduhu pod pritiskom ili naglo hlađenje u rezervoaru sa vodom. Obzirom na veliku temperaturu užarenih odlivaka od čeličnog liva, potrebno je da količina vode, po završenom kaljenju odnosno hlađenju, ne bude veće temperature od 60 °C.</p>
      </section>

      <section className="divider-top">
        <h2>{copy.section48Title}</h2>
        {copy.section48Paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section>
        <div className="align-center stg-bottom-gap-l">
          <h2>{copy.ctaTitle}</h2>
          <p className="bringer-large-text">{copy.ctaLead}</p>
        </div>
        <div className="align-center">
          <Link href="/contacts" className="bringer-button">{copy.ctaButton}</Link>
        </div>
      </section>
    </div>
  );
}
