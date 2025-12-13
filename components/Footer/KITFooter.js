import Image from "next/image";
import Link from "next/link";

import logo from "../../public/images/logo/footer-logo.png";
import logoLight from "../../public/images/dark/logo/logo-light.png";

import SingleFooter from "./FooterProps/SingleFooter";
import CopyRight from "./CopyRight";
import { useAppContext } from "@/context/Context";

const 
KITFooter = () => {
  const { isLightTheme } = useAppContext();

  const footer = {
    quicklinks: [
      { label: "About Us", href: "/about" },
      { label: "Newsroom", href: "/newsroom" },
      { label: "Members", href: "/members" },
      { label: "Events", href: "/events" },
      { label: "Gallery", href: "/gallery" },
    ],
    quicklinks2: [
      { label: "Disclaimer", href: "/#" },
      { label: "Terms of Use", href: "/#" },
      { label: "Privacy Policy", href: "/#" },
      { label: "Alumni Directory", href: "/#" },
    ],
    description:
      "To impart quality technical education emphasizing innovations and research with social and ethical values.",
    phone: "0422 3502440",
    mail: "info@karpagamtech.ac.in",
    address:
      "S.F.No.247,248, L&T Bypass Road, Seerapalayam Village, Coimbatore – 641 105",
  };

  return (
    <>
      <footer className="rbt-footer footer-style-1" style={{backgroundColor:'#f4f7f7'}}>
        <div className="footer-top">
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-11 col-lg-10 con-wid">
                <div className="container-fluid">
                  <div className="row row--15 mt_dec--30">
                    <div className="col-lg-4 col-md-6 col-sm-6 col-12 mt--30">
                      <div className="footer-widget">
                        <div className="logo">
                          <Link href="/">
                            {isLightTheme ? (
                              <Image
                                src={logo}
                                width={152}
                                height={50}
                                priority={true}
                                alt="Education Logo"
                              />
                            ) : (
                              <Image
                                src={logoLight}
                                width={152}
                                height={50}
                                priority={true}
                                alt="Education Logo"
                              />
                            )}
                          </Link>
                        </div>

                        <p className="description mt--20" style={{color:"#6b7385"}}>
                          {footer.description}
                        </p>

                        <div className="contact-btn mt--30">
                          <Link
                            className="rbt-btn btn-gradient hover-icon-reverse radius-round d-flex align-items-center"
                            href="/contact"
                          >
                            <div className="icon-reverse-wrapper">
                              <span className="btn-text">Contact With Us</span>
                              <span className="btn-icon">
                                <i className="feather-arrow-right"></i>
                              </span>
                              <span className="btn-icon">
                                <i className="feather-arrow-right"></i>
                              </span>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>

                    <SingleFooter
                      classOne="offset-lg-1 col-lg-2 col-md-6 col-sm-6 col-12 mt--30"
                      title="Useful Links"
                      footerType={footer.quicklinks}
                    />

                    <SingleFooter
                      classOne="col-lg-2 col-md-6 col-sm-6 col-12 mt--50"
                      // title=""
                      footerType={footer.quicklinks2}
                    />

                    <div className="col-lg-3 col-md-6 col-sm-6 col-12 mt--30">
                      <div className="footer-widget">
                        <h5 className="ft-title">Get Contact</h5>
                        <ul className="ft-link">
                          <li>
                            <span className="text-black">Phone: </span>
                            {footer.phone ? (
                              <Link href={`tel:${footer.phone}`}>
                                {footer.phone}
                              </Link>
                            ) : null}
                          </li>
                          <li>
                            <span className="text-black">E-mail: </span>
                            {footer.mail ? (
                              <Link href={`mailto:${footer.mail}`}>
                                {footer.mail}
                              </Link>
                            ) : null}
                          </li>
                          <li>
                            <span className="text-black">Location:</span><br />
                            {footer.address}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <CopyRight />
    </>
  );
};

export default KITFooter;
