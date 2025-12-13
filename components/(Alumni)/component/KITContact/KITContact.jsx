import Link from "next/link";
import ContactData from "../../../../data/pages/contact.json";
import { Mail, MapPin, Phone, PhoneCall, Printer, Smartphone } from "react-feather";

const KITContact = () => {
  return (
    <>
      <div className="row g-5">
        {ContactData &&
          ContactData.contactTwo.map((data, index) => (
            <div
              className="col-md-6 col-sm-6 col-12 sal-animate"
              data-sal="slide-up"
              data-sal-delay="150"
              data-sal-duration="800"
              key={index}
            >
              <div className="rbt-address">
                <div className="icon">
                  <i className={data.icon}></i>
                </div>
                <div className="inner">
                  <h4 className="title mb-2">{data.title}</h4>
                  <h6>{data.subTi}</h6>

                  {data.address !== "" ? (
                    <div className="mt-3 d-flex gap-3">
                      <span>
                        {" "}
                        <MapPin />{" "}
                      </span>{" "}
                      <p> {data.address}</p>
                    </div>
                  ) : (
                    ""
                  )}

                  {data.numOne ? (
                    <p className="mt-3 d-flex gap-3">
                      <Smartphone />
                      <Link href={`tel:${data.numOne}`}>{data.numOne}</Link>
                      {data.numTwo && (
                        <span>
                          , &nbsp;
                          <Link href={`tel:${data.numTwo}`}>{data.numTwo}</Link>
                        </span>
                      )}
                    </p>
                  ) : null}

                  {data.telNum ? (
                    <p className="mt-3 d-flex gap-3">
                      <PhoneCall />
                      <Link href={`tel:${data.telNum}`}>{data.telNum}</Link>
                    </p>
                  ) : null}

                  {data.mailOne ? (
                    <p className="mt-3 d-flex gap-3">
                      <Mail />
                      <Link href={`mailto:${data.mailOne}`}>
                        {data.mailOne}
                      </Link>
                    </p>
                  ) : null}

                  {data.fax ? (
                    <p className="mt-3 d-flex gap-3">
                      <Printer />
                      <Link href="#">
                        {data.fax}
                      </Link>
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default KITContact;
