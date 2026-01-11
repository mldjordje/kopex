import Link from 'next/link';

export default function Footer() {
  return (
    <footer id="bringer-footer" data-appear="fade-up" data-unload="fade-down">
      <div className="bringer-footer-widgets">
        <div className="stg-container">
          <div className="stg-row" data-stagger-appear="fade-left" data-stagger-delay="100">
            <div className="stg-col-5 stg-tp-col-12 stg-tp-bottom-gap-l">
              <div className="bringer-info-widget">
                <Link href="/" className="bringer-logo footer-logo">
                  <img src="/img/logo.png" alt="KOPEX MIN-LIV" width={160} height={40} />
                </Link>
                <div className="bringer-info-description">KOPEX MIN-LIV A.D. Ni&#353; je industrijska livnica Srbije sa tradicijom od 1884. godine, specijalizovana za metalne odlivke od sivog, nodularnog i &#269;eli&#269;nog liva.</div>
                <span className="bringer-label">Pratite nas:</span>
                <ul className="bringer-socials-list" data-stagger-appear="fade-up" data-stagger-delay="75">
                  <li>
                    <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" className="bringer-socials-facebook">
                      <i></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="bringer-socials-instagram">
                      <i></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="stg-col-3 stg-tp-col-6 stg-m-col-6">
              <div className="bringer-widget">
                <h6>Kontakt</h6>
                <div className="bringer-menu-widget">
                  <ul>
                    <li>Bulevar 12. februara 82, Ni&#353;</li>
                    <li>Telefon: +381 18 245 678</li>
                    <li>Email: info@kopexmin.rs</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="stg-col-3 stg-tp-col-6 stg-m-col-6">
              <div className="bringer-widget">
                <h6>Brzi linkovi</h6>
                <div className="bringer-menu-widget">
                  <ul>
                    <li><Link href="/about-us">O nama</Link></li>
                    <li><Link href="/services">Opremljenost</Link></li>
                    <li><Link href="/products">Proizvodi</Link></li>
                    <li><Link href="/news">Vesti</Link></li>
                    <li><Link href="/#kupci">Kupci</Link></li>
                    <li><Link href="/contacts">Kontakt</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bringer-footer-line stg-container">
        <div className="align-center">
          &copy; 2025 KOPEX MIN-LIV A.D. Ni&#353;. Sva prava zadr&#382;ana.
        </div>
      </div>
    </footer>
  );
}
