import {memo, useState, useCallback, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import {useDispatch, useSelector as useSelectorRedux} from 'react-redux';
import shallowequal from "shallowequal";
import commentsActions from '../../store-redux/comments/actions';
import listToTree from "../../utils/list-to-tree";
import treeToList from "../../utils/tree-to-list";

import CommentLayout from "../../components/comment-layout";
import CommentList from "../../components/comment-list";
import CommentForm from "../../components/comment-form";


function CommentsBlock() {
  const [activeCommentId, setActiveCommentId] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {t} = useTranslate();

  const selectStore = useSelector(state => ({
    userId: state.session.user._id,
  }));

  const selectRedux = useSelectorRedux(state => ({
    article: state.article.data,
    articleWaiting: state.article.waiting,
    articleId: state.article.data._id,
    comments: state.comments.comments,
    commentsCount: state.comments.count,
    commentsWaiting: state.comments.waiting,
    newCommentId: state.comments.newCommentId,
  }), shallowequal); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const callbacks = {
     // Клик по кнопке "Ответить"
    onAnswerClick: useCallback((id) => {
      setActiveCommentId(id);
    }, []),
     // Клик по кнопке "Отмена"
    onCancelClick: useCallback(() => {
      setActiveCommentId('');
    }, []),
    // Отправка комментария
    onSendComment: useCallback((message) => {
      const type = activeCommentId ? 'comment' : 'article';
      const data = {text: message, parent: {_id: activeCommentId || selectRedux.articleId, _type: type}};
      dispatch(commentsActions.send(data));
    }, [activeCommentId]),
    // Переход к авторизации
    onSignIn: useCallback(() => {
      navigate('/login', {state: {back: location.pathname}});
    }, [location.pathname]),
  }

  // Создание структуры для вложенности комментариев
  const tree = listToTree(selectRedux.comments, selectRedux.articleId);
  const newComments = treeToList(tree, (item, level) => ({...item, level}));

  // Скролл к новому комментарию
  useEffect(() => {
    const newComment = document.querySelector('.CommentItem_new');
    const offsetY = newComment?.getBoundingClientRect().y + window.scrollY;
    if (offsetY) {
      window.scrollTo({top: offsetY - window.innerHeight / 2, behavior: 'instant'});
    }
  }, []);

  // Скролл к форме добавления комментария
  useEffect(() => {
    const formElement = document.querySelector('.CommentForm_active');
    const offsetY = formElement?.getBoundingClientRect().y + window.scrollY;
    if (offsetY) {
      window.scrollTo({top: offsetY - window.innerHeight / 2, behavior: 'instant'});
    }
  }, [activeCommentId]);


  return (
    <CommentLayout count={selectRedux.commentsCount} t={t}>
      <CommentList
        comments={newComments}
        activeCommentId={activeCommentId} // комментарий, на который собираемся ответить
        newCommentId={selectRedux.newCommentId} // комментарий, который был добавлен нами, делаем скролл к нему
        userId={selectStore.userId}
        onAnswerClick={callbacks.onAnswerClick}
        onCancelClick={callbacks.onCancelClick}
        onSendComment={callbacks.onSendComment}
        onSignIn={callbacks.onSignIn}
        t={t}
      />
      {
        !activeCommentId &&
        <CommentForm
          userId={selectStore.userId}
          onSignIn={callbacks.onSignIn}
          onSendComment={callbacks.onSendComment}
          t={t}
        />
      }
    </CommentLayout>
  )
}

export default memo(CommentsBlock);
