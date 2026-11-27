import Image from "next/image";
import styles from "./CBEChapters.module.scss";

const initialData = [
  {
    id: 1,
    designation: "PRESIDENT",
    name: "SHANTHINI RAJESH",
    tenure: "ECE (BATCH: 2000-2004)",
    role: "Operations Manager",
    organization: "Bi3 Technologies, Australia",
    image: "/images/alumnimem/asia/Shanthini-Rajesh.webp",
  },
  {
    id: 2,
    designation: "VICE PRESIDENT",
    name: "SURESHKUMAR UNNIKRISHNAN",
    tenure: "MECH (BATCH: 2000-2004)",
    role: "Application Engineer",
    organization: "Siemens-PLM, Tokyo",
    image: "/images/alumnimem/asia/Sureshkumar-Unnikrishnan.webp",
  },
  {
    id: 3,
    designation: "GENERAL SECRETARY",
    name: "AJOY JOYSINGH THANIKAL",
    tenure: "MECH (BATCH: 2002-2006)",
    role: "Technical Sales Support / Application Engineer",
    organization: "KSB Taiwan, Taiwan",
    image: "/images/alumnimem/asia/Ajoy-Joysingh-Thanikal.webp",
  },
];

const AsiaPacificChapter = () => (
  <section className={styles.section}>
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          Meet the alumni serving the Asia Pacific Chapter and its community.
        </h1>
      </header>

      <div className={styles.grid} aria-label="Asia Pacific Chapter office bearers">
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

export default AsiaPacificChapter;
