import Image from "next/image";
import styles from "./CBEChapters.module.scss";

const initialData = [
  {
    id: 1,
    designation: "PRESIDENT",
    name: "PARVEZ ZAIN",
    tenure: "MECH (BATCH: 2000-2004)",
    role: "A Global Sales Director",
    organization: "ITT Flow Technologies, Dubai ",
    image: "/images/alumnimem/gulf/gulf-1.jpeg",
  },
  {
    id: 2,
    designation: "VICE PRESIDENT",
    name: "SAKESH SASIDHARAN",
    tenure: "ECE (2000-2004)",
    role: "Sales Manager ",
    organization: "Sustainable Energy Solutions, Qatar",
    image: "/images/alumnimem/gulf/gulf-2.jpeg",
  },
  {
    id: 3,
    designation: "GENERAL SECRETARY",
    name: "NIJI GOPALAKRISHNAN",
    tenure: "IT (2003-2006)",
    role: "Business Analyst",
    organization: "Qatar Airways, Qatar",
    image: "/images/alumnimem/gulf/gulf-3.jpeg",
  },
   {
    id: 4,
    designation: "SECRETARY",
    name: "JAYANTHI VALENTINE",
    tenure: "BBM  (2001-2004)",
    role: "Business Freelancer, Dubai",
    image: "/images/alumnimem/gulf/gulf-4.jpeg",
  },
  {
    id: 5,
    designation: "TREASURER",
    name: "VIGNESH N",
    tenure: "MECH (BATCH: 2015 - 2019)",
    role: "QA/QC Engineer",
    organization: "Adyard Abudhabi LLC, Abudhabi",
    image: "/images/alumnimem/gulf/gulf-5.jpeg",
  },
  {
    id: 6,
    designation: "JOINT TREASURER",
    name: "GODWIN J",
    tenure: "CSE (2017-2021)",
    role: "Shipping - Admin & Operations Supervisor ",
    organization: "DTA Martime Service LLC, Dubai",
    image: "/images/alumnimem/gulf/gulf-6.jpeg",
  },
];

const GulfChapters = () => (
  <section className={styles.section}>
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          {/* <span className={styles.eyebrow}>
            Karpagam College of Engineering
          </span> */}
          <h1 className={styles.title}>Meet the alumni serving the Gulf chapter and its community.</h1>
          {/* <p className={styles.description}> */}
            
          {/* </p> */}
        </div>
        {/* <div className={styles.count}>
          <span className={styles.countNumber}>
            {String(initialData.length).padStart(2, "0")}
          </span>
          <span className={styles.countLabel}>Office bearers</span>
        </div> */}
      </header>

      <div className={styles.grid} aria-label="Chapter office bearers">
        {initialData.map((member) => (
          <article className={styles.card} key={member.id}>
            <div className={styles.photo}>
              <Image
                src={member.image}
                alt={`${member.name}, ${member.designation}`}
                fill
                sizes="(max-width: 700px) 100vw, (max-width: 1050px) 50vw, 33vw"
                className={styles.photoImage}
              />
              <span className={styles.position}>{member.designation}</span>
              <span className={styles.cardNumber}>
                {String(member.id).padStart(2, "0")}
              </span>
            </div>

            <div className={styles.cardContent}>
              <h2 className={styles.name}>{member.name}</h2>
              <p className={styles.batch}>{member.tenure}</p>

              <div className={styles.details}>
                {member.role && (
                  <div className={styles.detail}>
                    <span className={styles.detailLabel}>Role</span>
                    <span className={styles.detailValue}>{member.role}</span>
                  </div>
                )}
               { member.organization && <div className={styles.detail}>
                  <span className={styles.detailLabel}>Organization</span>
                  <span className={styles.detailValue}>
                    {member.organization}
                  </span>
                </div>}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default GulfChapters;
