import Image from "next/image";
import styles from "./CBEChapters.module.scss";

const initialData = [
  {
    id: 1,
    designation: "PRESIDENT",
    name: "SANTHOSH S",
    tenure: "MECH (BATCH: 2000-2004)",
    organization: "CHAMPS INDUSTRIES",
    image: "/images/alumnimem/img-5.jpeg",
  },
  {
    id: 2,
    designation: "VICE PRESIDENT",
    name: "KARTHIKEYAN",
    tenure: "IT (2006-2010)",
    role: "SR. TEST ENGINEER",
    organization: "SIERRA DIGITAL",
    image: "/images/alumnimem/img-2.jpeg",
  },
  {
    id: 3,
    designation: "GENERAL SECRETARY",
    name: "KULANDAI VEL C",
    tenure: "MBA (2008-2010)",
    role: "Business Associate",
    organization: "IDBI Capital Markets & Securities Limited",
    image: "/images/alumnimem/img-1.jpeg",
  },
  {
    id: 4,
    designation: "JOINT SECRETARY",
    name: "B. BALA SENTHIL KUMAR",
    tenure: "CT (2007 - 2010)",
    role: "Founder and Managing Director",
    organization: "Ze Bancairo School of Banking / Ze Bancairo iStudy Hub",
    image: "/images/alumnimem/img-3.jpeg",
  },
  {
    id: 5,
    designation: "TREASURER",
    name: "HARIHARA SABAREESH S",
    tenure: "ETE (BATCH: 2012 - 2016)",
    role: "LEAD - TECHNICAL WRITING",
    organization: "EXTERRO R&D",
    image: "/images/alumnimem/img-4.jpeg",
  },
  {
    id: 6,
    designation: "JOINT TREASURER",
    name: "AKASH CHANDRASEKAR",
    tenure: "AD (2020-2024)",
    role: "ML ENGINEER",
    organization: "GOML Expertise",
    image: "/images/alumnimem/img-6.jpeg",
  },
];

const CBEChapters = () => (
  <section className={styles.section}>
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          {/* <span className={styles.eyebrow}>
            Karpagam College of Engineering
          </span> */}
          <h1 className={styles.title}>Meet the alumni serving the chapter and its community.</h1>
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
                <div className={styles.detail}>
                  <span className={styles.detailLabel}>Organization</span>
                  <span className={styles.detailValue}>
                    {member.organization}
                  </span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default CBEChapters;
