import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { formatDate } from '../../utils/date-format';
import './style.css';

import CommentForm from '../comment-form';

function CommentItem({
  comment,
  activeCommentId,
  lastChildCommentId,
  newCommentId,
  userId,
  onAnswerClick,
  onCancelClick,
  onSendComment,
  onSignIn,
  t,
}) {
  const cn = bem('CommentItem');
  const MAX_LEVEL = 6;
  const PAD_SIZE = 30;

  return (
    <li
      className={cn('', { new: newCommentId === comment._id })}
      style={{
        marginLeft: `${
          (comment.level <= MAX_LEVEL ? comment.level : MAX_LEVEL) * PAD_SIZE
        }px`,
      }}
    >
      <div className={cn('info')}>
        <span className={cn('user', { self: userId === comment.author._id })}>
          {comment.author.profile.name}
        </span>
        <span className={cn('created')}>{formatDate(comment.dateCreate)}</span>
      </div>
      <p className={cn('text')}>{comment.text}</p>
      <button
        className={cn('answer')}
        onClick={() => onAnswerClick(comment._id)}
      >
        {t('comments.answer')}
      </button>
      {lastChildCommentId === comment._id && (
        <CommentForm
          userId={userId}
          activeCommentId={activeCommentId}
          lastChildCommentId={lastChildCommentId}
          activeCommentAuthor={comment.author.profile.name}
          onCancelClick={onCancelClick}
          onSendComment={onSendComment}
          onSignIn={onSignIn}
          t={t}
        />
      )}
    </li>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.object,
  activeCommentId: PropTypes.string,
  newCommentId: PropTypes.string,
  userId: PropTypes.string,
  onHandleAnswer: PropTypes.func,
  onCancelClick: PropTypes.func,
  onSendComment: PropTypes.func,
  onSignIn: PropTypes.func,
  t: PropTypes.func,
};

CommentItem.defaultProps = {
  comment: {},
  activeCommentId: '',
  onHandleAnswer: () => {},
  onCancelClick: () => {},
  onSendComment: () => {},
  onSignIn: () => {},
  t: (text) => text,
};

export default memo(CommentItem);
