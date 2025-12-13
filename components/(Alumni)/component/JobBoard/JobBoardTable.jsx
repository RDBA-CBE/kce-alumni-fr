import Link from "next/link";

const JobBoardTable = () => {
  return (
    <>
      <div className="rbt-dashboard-content bg-color-white rbt-shadow-box">
        <div className="content">
          <div className="section-title">
            <h4 className="rbt-title-style-3">My Job List</h4>
          </div>

          <div className="rbt-dashboard-table table-responsive mobile-table-750">
            <table className="rbt-table table table-borderless">
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Industry</th>
                   <th>Role</th>
                    <th>N.Of Applicants</th>
                    <th>Posted Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>
                    <span className="b3">
                      <Link href="#">Speaking Korean for Beginners</Link>
                    </span>
                  </th>
                  <td>
                     <span className="b3">
                      <Link href="#">Speaking Korean for Beginners</Link>
                    </span>
                  </td>
                   <td>
                     <span className="b3">
                      <Link href="#">Speaking Korean for Beginners</Link>
                    </span>
                  </td>
                   <td>
                     <span className="b3">
                      <Link href="#">Speaking Korean for Beginners</Link>
                    </span>
                  </td>
                   <td>
                     <span className="b3">
                      <Link href="#">Speaking Korean for Beginners</Link>
                    </span>
                  </td>
                  <td>
                    <div className="rbt-button-group justify-content-end">
                      <Link
                        className="rbt-btn btn-xs bg-primary-opacity radius-round"
                        href="#"
                        title="Edit"
                      >
                        <i className="feather-edit pl--0"></i>
                      </Link>
                      <Link
                        className="rbt-btn btn-xs bg-color-danger-opacity radius-round color-danger"
                        href="#"
                        title="Delete"
                      >
                        <i className="feather-trash-2 pl--0"></i>
                      </Link>
                    </div>
                  </td>
                </tr>
                
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobBoardTable;
