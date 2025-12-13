import Link from "next/link";

const BreadCrumb = ({ title, text }) => {
  return (
    <div className="rbt-breadcrumb-default ptb--20 ptb_md--20 ptb_sm--20 bg-blue">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="breadcrumb-inner text-center">
              <h2 className="title text-white">{title}</h2>
              {/* <ul className="page-list">
                <li className="rbt-breadcrumb-item text-white">
                  <Link href="/" className="text-white">Home</Link>
                </li>
                <li>
                  <div className="icon-right">
                    <i className="feather-chevron-right"></i>
                  </div>
                </li>
                <li className="rbt-breadcrumb-item active text-white">{text}</li>
              </ul> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreadCrumb;
