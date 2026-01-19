import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'KOPEX MIN-LIV | Rukovodstvo firme',
  description: 'Organizaciona sema rukovodstva KOPEX MIN-LIV A.D. Ni\u0161 sa funkcijama tima.'
};

const CARD_SIZES = '(max-width: 739px) 100vw, (max-width: 1200px) 50vw, 33vw';

const MANAGEMENT_TEAM = [
  {
    name: 'Generalni direktor',
    role: 'Strategija, razvoj i ukupno poslovno rukovodjenje',
    image: '/img/team/team01-thmb.jpg'
  },
  {
    name: 'Direktor proizvodnje',
    role: 'Planiranje proizvodnje, kapaciteti i optimizacija procesa',
    image: '/img/team/team02-thmb.jpg'
  },
  {
    name: 'Direktor kvaliteta',
    role: 'Laboratorijska ispitivanja, sertifikati i kontrola kvaliteta',
    image: '/img/team/team03-thmb.jpg'
  },
  {
    name: 'Direktor tehnike',
    role: 'Masinska i termicka obrada, odrzavanje i tehnoloski razvoj',
    image: '/img/team/team04-thmb.jpg'
  },
  {
    name: 'Direktor prodaje',
    role: 'Komunikacija sa kupcima, ponude i ugovaranje',
    image: '/img/team/team05-thmb.jpg'
  }
];

export default function ManagementPage() {
  return (
    <div className="stg-container">
      <section className="backlight-bottom">
        <div className="stg-row">
          <div className="stg-col-8 stg-offset-2 align-center stg-tp-col-10 stg-tp-offset-1">
            <h1 className="bringer-page-title">Rukovodstvo firme</h1>
            <p className="bringer-large-text">
              Sema menadzmenta Kopex MIN-LIV A.D. Ni&#353; sa jasnim funkcijama odgovornosti.
            </p>
          </div>
        </div>
      </section>

      <section className="divider-bottom">
        <div className="stg-row bringer-section-title">
          <div className="stg-col-8 stg-offset-2">
            <div className="align-center">
              <h2>Menadzment</h2>
              <p className="bringer-large-text">
                Klju&#269;ni ljudi koji koordinisu proizvodnju, kvalitet, tehnicki razvoj i prodaju.
              </p>
            </div>
          </div>
        </div>
        <div className="stg-row">
          {MANAGEMENT_TEAM.map((member) => (
            <div className="stg-col-4 stg-tp-col-6 stg-m-bottom-gap" key={member.name}>
              <div className="bringer-block align-center">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={720}
                  height={720}
                  sizes={CARD_SIZES}
                />
                <h5>{member.name}</h5>
                <p>{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="align-center stg-bottom-gap-l">
          <h2>Kontakt sa rukovodstvom</h2>
          <p className="bringer-large-text">
            Za poslovne upite i saradnju, nas tim je spreman da pru&#382;i sve potrebne informacije.
          </p>
        </div>
        <div className="align-center">
          <Link href="/contacts" className="bringer-button">Kontaktirajte nas</Link>
        </div>
      </section>
    </div>
  );
}
