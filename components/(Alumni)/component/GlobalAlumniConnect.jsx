import Image from "next/image";
import styles from "./CBEChapters.module.scss";

const initialData = [
  {
    id: 1,
    name: "Lakshmanan T",
    tenure: "MECH 2001-2005",
    role: "Senior Cost Engineer",
    organization: "Harley-Davidson Motor Company",
    location: "USA",
    image: "/images/alumnimem/global/Lakshmanan-T.webp",
  },
  {
    id: 2,
    name: "Dr Vijaisri Nagarajan",
    tenure: "MECH 2001-2005",
    role: "Industry Process Expert Specialist",
    organization: "Dassault Systemes",
    location: "USA",
    image: "/images/alumnimem/global/Dr-Vijaisri-Nagarajan.webp",
  },
  {
    id: 3,
    name: "Selva Kumar Raju",
    tenure: "MECH 2004-2008",
    role: "Operational Excellence Leader",
    organization: "Sanofi",
    location: "USA",
    image: "/images/alumnimem/global/Selva-Kumar-Raju.webp",
  },
  {
    id: 4,
    name: "Vigneesh Baskaran",
    tenure: "MECH 2009-2013",
    role: "Process Engineer",
    organization: "Ply Gem",
    location: "Canada",
    image: "/images/alumnimem/global/Vigneesh-Baskaran.webp",
  },
  {
    id: 5,
    name: "Naresh Kuppuswamy",
    tenure: "MECH 2009-2013",
    role: "Strategic Growth Advisor",
    organization: "NextWealth",
    location: "USA",
    image: "/images/alumnimem/global/Naresh-Kuppuswamy.webp",
  },
  {
    id: 6,
    name: "Prem Siddharth",
    tenure: "MECH 2012-2016",
    role: "Manager",
    organization: "Deloitte",
    location: "USA",
    image: "/images/alumnimem/global/Prem-Siddharth.webp",
  },
  {
    id: 7,
    name: "Venugopal Kalyanasundaram",
    tenure: "ETE 2012-2016",
    role: "Senior Backend Developer",
    organization: "Deriv",
    location: "UAE",
    image: "/images/alumnimem/global/Venugopal-Kalyanasundaram.webp",
  },
  {
    id: 8,
    name: "Deepak Rajan Kannapan",
    tenure: "CS (Cyber Security) 2020-2024",
    role: "SOC Analyst",
    organization: "MBC Technology",
    location: "USA",
    image: "/images/alumnimem/global/Deepak-Rajan-Kannapan.webp",
  },
];

const GlobalAlumniConnect = () => (
  <section className={styles.section}>
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>
            Meet our alumni making an impact across the world.
          </h1>
        </div>
      </header>

      <div className={styles.grid} aria-label="Global Alumni Connect">
        {initialData.map((member) => (
          <article className={styles.card} key={member.id}>
            <div className={styles.photo}>
              <Image
                src={member.image}
                alt={`${member.name}, ${member.role}`}
                fill
                sizes="(max-width: 700px) 100vw, (max-width: 1050px) 50vw, 33vw"
                className={styles.photoImage}
              />
              <span className={styles.position}>
                {member.location}
              </span>
              <span className={styles.cardNumber}>
                {String(member.id).padStart(2, "0")}
              </span>
            </div>

            <div className={styles.cardContent}>
              <h2 className={styles.name}>{member.name}</h2>
              <p className={styles.batch}>{member.tenure}</p>

              <div className={styles.details}>
                <div className={styles.detail}>
                  <span className={styles.detailLabel}>Role</span>
                  <span className={styles.detailValue}>{member.role}</span>
                </div>
                <div className={styles.detail}>
                  <span className={styles.detailLabel}>Organization</span>
                  <span className={styles.detailValue}>
                    {member.organization} - {member.location}
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

export default GlobalAlumniConnect;
