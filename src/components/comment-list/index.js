import { React, memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

import CommentItem from "../comment-item";

function CommentList({
  comments,
  activeCommentId,
  newCommentId,
  userId,
  onAnswerClick,
  onCancelClick,
  onSendComment,
  onSignIn,
  t,
}) {
  const cn = bem("CommentList");
  const lastChildCommentIndex = comments.findLastIndex(
    (comment) => comment.parent._id === activeCommentId
  );
  const lastChildCommentId =
    lastChildCommentIndex === -1
      ? activeCommentId
      : comments[lastChildCommentIndex]?._id;

  return (
    <ul className={cn()}>
      {comments.map((item) => {
        return (
          <CommentItem
            comment={item}
            activeCommentId={activeCommentId}
            lastChildCommentId={lastChildCommentId}
            newCommentId={newCommentId}
            key={item._id}
            userId={userId}
            onAnswerClick={onAnswerClick}
            onCancelClick={onCancelClick}
            onSendComment={onSendComment}
            onSignIn={onSignIn}
            t={t}
          />
        );
      })}
    </ul>
  );
}

CommentList.propTypes = {
  comments: PropTypes.array,
  activeCommentId: PropTypes.string,
  newCommentId: PropTypes.string,
  userId: PropTypes.string,
  onHandleAnswer: PropTypes.func,
  onCancelClick: PropTypes.func,
  onSendComment: PropTypes.func,
  onSignIn: PropTypes.func,
  t: PropTypes.func,
};

CommentList.defaultProps = {
  comments: [],
  activeCommentId: "",
  onHandleAnswer: () => {},
  onCancelClick: () => {},
  onSendComment: () => {},
  onSignIn: () => {},
  t: (text) => text,
};

export default memo(CommentList);
