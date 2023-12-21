import { useState, memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function CommentForm({
  activeCommentId,
  lastChildCommentId,
  userId,
  onCancelClick,
  onSendComment,
  onSignIn,
  t,
}) {
  const cn = bem("CommentForm");
  const [message, setMessage] = useState("");

  if (!userId) {
    const actionText = Boolean(activeCommentId)
      ? `${t("comments.toComment")}.`
      : `${t("comments.toAnswer")}.`;

    return (
      <div
        className={cn("", {
          shifted: activeCommentId === lastChildCommentId,
          active: Boolean(activeCommentId),
        })}
      >
        <a className={cn("login")} onClick={onSignIn}>
          {t("comments.login")}
        </a>{" "}
        {actionText}
        {activeCommentId && (
          <button
            className={cn("cancelLink")}
            type="button"
            onClick={onCancelClick}
          >
            {t("comments.cancel")}
          </button>
        )}
      </div>
    );
  }

  const titleText = activeCommentId
    ? `${t("comments.newAnswer")}`
    : `${t("comments.newComment")}`;

  return (
    <form
      className={cn("", {
        shifted: activeCommentId === lastChildCommentId,
        active: Boolean(activeCommentId),
      })}
      onSubmit={(evt) => {
        evt.preventDefault();
        setMessage("");
        onSendComment(message);
      }}
    >
      <fieldset className={cn("fieldset")}>
        <legend className={cn("legend")}>{titleText}</legend>
        <textarea
          className={cn("textarea")}
          rows="5"
          value={message}
          onChange={(evt) => setMessage(evt.target.value)}
        ></textarea>
        <div className={cn("buttons")}>
          <button
            className={cn("submit")}
            type="submit"
            disabled={!message?.trim()}
          >
            {t("comments.send")}
          </button>
          {activeCommentId && (
            <button
              className={cn("cancelButton")}
              type="button"
              onClick={onCancelClick}
            >
              {t("comments.cancel")}
            </button>
          )}
        </div>
      </fieldset>
    </form>
  );
}

CommentForm.propTypes = {
  userId: PropTypes.string,
  message: PropTypes.string,
  activeCommentId: PropTypes.string,
  lastChildCommentId: PropTypes.string,
  onCancelClick: PropTypes.func,
  onMessageChange: PropTypes.func,
  onSendComment: PropTypes.func,
  onSignIn: PropTypes.func,
  t: PropTypes.func,
};

CommentForm.defaultProps = {
  activeCommentId: "",
  activeCommentAuthor: "",
  onCancelClick: () => {},
  onMessageChange: () => {},
  onSendComment: () => {},
  onSignIn: () => {},
  t: (text) => text,
};

export default memo(CommentForm);
