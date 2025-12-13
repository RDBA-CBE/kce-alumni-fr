import React from "react";
import Link from "next/link";
import FormField from "@/commonComponents/FormFields";
import { formattedDateTime, useSetState } from "@/utils/commonFunction.utils";


const CommentBox = (props) => {
  const {
    data,
    cancelOnClick,
    deleteComment,
    handleReplayComment,
    AdminLogin,
    AlumniManagerLogin,
  } = props;

  const [state, setState] = useSetState({
    comment: "",
  });

  const profileImage =
    data?.profile_photo || "/images/dummy-member.jpg";

  const newComment = () => {
    if (state.comment.trim() === "") return;
    handleReplayComment(state.comment);
    setState({ comment: "" });
  };

  return (
    <div className="collapse mt-3" id="kitMemoComments">
      {/* Comment Input */}
      <div className="d-flex align-items-start kit-memo-comment-box mb-3">
        <img
          src={profileImage}
          alt="User"
          className="rounded-circle kit-memo-avatar me-2"
        />
        <div className="flex-grow-1">
          <FormField
            type="textarea"
            placeholder="Write a comment..."
            value={state.comment}
            onChange={(e) => setState({ comment: e.target.value })}
            className="form-control kit-memo-input mb-2"
            rows={2}
          />
          <div className="d-flex gap-2">
            <button
              className="rbt-btn btn-gradient btn-sm kit-memo-submit comment-submit-button"
              onClick={newComment}
            >
              Submit
            </button>
            <button
              className="rbt-btn btn-border-gradient btn-sm kit-memo-cancel comment-submit-button"
              data-bs-toggle="collapse"
              data-bs-target="#kitMemoComments"
              onClick={cancelOnClick}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* Comment List */}
      {data?.post_comments?.length > 0 && (
        <ul className="list-unstyled kit-memo-comment-list">
          {data?.post_comments?.map((comment, index) => {
            
            return (
              <li
                key={index}
                className="d-flex align-items-start mb-3 position-relative"
              >
                <img
                  src={ profileImage}
                  alt="User"
                  className="rounded-circle kit-memo-avatar me-2"
                />
                <div className="kit-memo-comment bg-light p-2 rounded w-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      {comment?.member_id ? (
                        <Link
                          href={`/members/${comment?.member_id}`}
                          target="_blank"
                          className="fw-bold text-dark"
                        >
                          {comment?.comment_by}
                        </Link>
                      ) : (
                        <span className="fw-bold text-dark">
                          {comment?.comment_by}
                        </span>
                      )}
                      <span className="d-block text-muted small">
                        {formattedDateTime(comment?.comment_on)}
                      </span>
                    </div>
                    {(comment?.is_comment === true ||
                      AdminLogin === "true" ||
                      AlumniManagerLogin === "true") && (
                      <button
                        className="btn btn-sm btn-link text-danger kit-memo-delete"
                        onClick={() => deleteComment(comment?.id)}
                      >
                        <i className="feather-trash-2"></i>
                      </button>
                    )}
                  </div>
                  <p className="mb-0 small pt-2">{comment?.comment}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default CommentBox;
