import Image from "next/image";
import styles from "./CBEChapters.module.scss";

const initialData = [
  {
    id: 1,
    designation: "PRESIDENT",
    name: "KARTHICK KUMAR B",
    tenure: "MECH (BATCH: 2000-2004)",
    role: "Assistant General Manager",
    organization: "Nordex India Pvt Ltd",
    image: "/images/alumnimem/chennai/Karthick-kumar.webp",
  },
  {
    id: 2,
    designation: "VICE PRESIDENT",
    name: "CLINTON MOSES M",
    tenure: "IT (BATCH: 2010-2014)",
    role: "Lead Software Engineer",
    organization: "Deloitte",
    image: "/images/alumnimem/chennai/Clinton.webp",
  },
  {
    id: 3,
    designation: "GENERAL SECRETARY",
    name: "AYYANAR NACHIMUTHU",
    tenure: "CSE (BATCH: 2010-2014)",
    role: "Associate Manager",
    organization: "Ernst & Young",
    image: "/images/alumnimem/chennai/Ayyanar.webp",
  },
  {
    id: 4,
    designation: "JOINT SECRETARY",
    name: "KARTHIKEYAN R",
    tenure: "ETE (BATCH: 2014-2018)",
    role: "Support Engineer III",
    organization: "Amazon",
    image: "/images/alumnimem/chennai/Karthikeyan.webp",
  },
  {
    id: 5,
    designation: "TREASURER",
    name: "AAJAY G V",
    tenure: "CSE (BATCH: 2020-2024)",
    role: "Manual Testing",
    organization: "Stackly",
    image: "/images/alumnimem/chennai/Aajay.webp",
  },
  {
    id: 6,
    designation: "JOINT TREASURER",
    name: "AKHILESH R",
    tenure: "MBA (BATCH: 2014-2018)",
    role: "Manager",
    organization: "Merino Industries Pvt Ltd",
    image: "/images/alumnimem/chennai/Akhilesh.webp",
  },
];

const ChennaiChapter = () => (
  <section className={styles.section}>
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>
            Meet the alumni serving the Chennai Chapter and its community.
          </h1>
        </div>
      </header>

      <div className={styles.grid} aria-label="Chennai Chapter office bearers">
        {initialData.map((member) => (
          <article className={styles.card} key={member.id}>
            <div className={styles.photo}>
              {member.image && (
                <Image
                  src={member.image}
                  alt={`${member.name}, ${member.designation}`}
                  fill
                  sizes="(max-width: 700px) 100vw, (max-width: 1050px) 50vw, 33vw"
                  className={styles.photoImage}
                />
              )}
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

export default ChennaiChapter;
