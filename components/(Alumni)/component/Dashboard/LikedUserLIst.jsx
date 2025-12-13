import { formattedDate } from "@/utils/commonFunction.utils";
import Image from "next/image";
import { useRouter } from "next/navigation";

const LikedUserLIst = (props) => {
  const { data, isShowDate, isBtnShow, btnText, btnOnClick } = props;

  console.log("data", data);

  const router = useRouter();
  return (
    <>
      <div className="row g-3">
        <div className="col-12 p-0">
          <div className=" border-0  py-3 rounded-4 d-flex flex-row align-items-center">
            {data?.member_id ? (
              <img
                src={
                  data?.profile_photo
                    ? data?.profile_photo
                    : "/images/dummy-profile-pic.png"
                }
                onClick={() => router.push(`members/${data?.member_id}`)}
                alt={data?.posted_by}
                className="rounded-circle border border-2 me-3"
                style={{
                  width: "50px",
                  height: "50px",
                  objectFit: "cover",
                  cursor: "pointer",
                }}
              />
            ) : (
              <img
                src={
                  data?.profile_photo
                    ? data?.profile_photo
                    : "/images/dummy-profile-pic.png"
                }
                alt={data?.posted_by}
                className="rounded-circle border border-2 me-3"
                style={{ width: "50px", height: "50px", objectFit: "cover" }}
              />
            )}

            <div>
              {data?.member_id ? (
                <h6
                  className="fw-bold mb-1"
                  style={{ cursor: "pointer" }}
                  onClick={() => router.push(`members/${data?.member_id}`)}
                >
                  {data?.liked_by}
                </h6>
              ) : (
                <h6 className="fw-bold mb-1">{data?.liked_by}</h6>
              )}

              {/* <small className="text-muted">
                posted on {formattedDate(data?.posted_on)}
              </small> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LikedUserLIst;
