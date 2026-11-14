
import Image from "next/image";
import styles from "./CBEChapters.module.scss";

const initialData = [
  {
    id: 1,
    designation: "PRESIDENT",
    name: "VETRISELVAN JAYACHANDIRAN",
    tenure: "ECE (BATCH: 2005-2009)",
    role: "Sr. Staff Engineer",
    organization: "Qualcomm",
    image: "/images/alumnimem/bangalore/Vetriselvan.webp",
  },
  {
    id: 2,
    designation: "VICE PRESIDENT",
    name: "ARUNKUMAR S",
    tenure: "ECE (BATCH: 2005-2009)",
    role: "Senior SCM Consultant",
    organization: "Oracle",
    image: "/images/alumnimem/bangalore/Arunkumar.webp",
  },
  {
    id: 3,
    designation: "GENERAL SECRETARY",
    name: "JAWAHAR GANESH S",
    tenure: "IT (BATCH: 2011-2015)",
    role: "Senior Escalation Engineer",
    organization: "Microsoft",
    image: "/images/alumnimem/bangalore/Jawahar.webp",
  },
  {
    id: 4,
    designation: "EXECUTIVE SECRETARY",
    name: "GOPI R",
    tenure: "CSE (BATCH: 2008-2012)",
    role: "Senior Customer Operations Engineer",
    organization: "Cloudera, Inc",
    image: "/images/alumnimem/bangalore/Gopi.webp",
  },
  {
    id: 5,
    designation: "TREASURER",
    name: "SIMSON M",
    tenure: "CST (BATCH: 2020-2024)",
    role: "Software Developer Engineer",
    organization: "Kapture CX, Bangalore",
    image: "/images/alumnimem/bangalore/Simson.webp",
  },
  {
    id: 6,
    designation: "JOINT TREASURER",
    name: "SHYAM RAHUL T",
    tenure: "AD (BATCH: 2020-2024)",
    role: "Senior Developer",
    organization: "Accenture",
    image: "/images/alumnimem/bangalore/Shyam.webp",
  },
];

const BangaloreChapter = () => (
  <section className={styles.section}>
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>
            Meet the alumni serving the Bangalore Chapter and its community.
          </h1>
        </div>
      </header>

      <div className={styles.grid} aria-label="Bangalore Chapter office bearers">
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
              <span className={styles.position}>
                {member.designation}
              </span>
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
                    <span className={styles.detailValue}>
                      {member.role}
                    </span>
                  </div>
                )}

                <div className={styles.detail}>
                  <span className={styles.detailLabel}>
                    Organization
                  </span>
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

export default BangaloreChapter;
