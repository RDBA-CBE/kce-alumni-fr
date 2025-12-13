import { formattedDate } from "@/utils/commonFunction.utils";
import Image from "next/image";

const EventParticipants = ({ userData }) => {
  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className="text-start mb-4">
            <h5 className="mt-2">Event Participants</h5>
          </div>
        </div>
      </div>

      <div className="row g-3">
        {userData?.map((data, index) => (
          <div className="col-12" key={index}>
            <div className="card border-0 rbt-shadow-box p-3 rounded-4 d-flex flex-row align-items-center">
              <img
                src={
                  data?.profile_picture
                    ? data?.profile_picture
                    : "/images/dummy-profile-pic.png"
                }
                alt={data?.full_name}
                className="rounded-circle border border-2 me-3"
                style={{ width: "50px", height: "50px", objectFit: "cover" }}
              />

              <div>
                <h6 className="fw-bold mb-1">{data?.full_name}</h6>
                <small className="text-muted">registered on {formattedDate(data?.registration_date)}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default EventParticipants;
