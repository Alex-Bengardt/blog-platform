import { useEffect } from 'react';
import { Space } from 'antd';

import Article from '../Pages/Article';
import { toggleArticlePreview, togglePagination } from '../../store/UtilitySlice';
import { fetchArticles } from '../../services/RealWorld.api';
import { useAppDispatch, useStateSelector } from '../../hooks';

import { IArticle } from '../../types/app.types';
import { IArticleList } from '../../types/props.types';

import style from './ArticlesList.module.scss';

const ArticlesList: React.FC<IArticleList> = ({ preview }) => {
  const dispatch = useAppDispatch();
  const isArticlesList = useStateSelector((state) => state.utilities.isArticlesList);
  const articlesList = useStateSelector((state) => state.articles.articles);

  useEffect(() => {
    if (preview) {
      dispatch(togglePagination(true));
      dispatch(toggleArticlePreview(true));
    }
  }, [preview, isArticlesList, dispatch]);

  useEffect(() => {
    dispatch(fetchArticles({ limit: 10, offset: 0 }));
  }, [dispatch]);

  const renderArticles = articlesList?.map((article: IArticle) => {
    const slug = article.slug;
    return <Article key={slug} article={article} preview={false} />;
  });

  return (
    <Space className={style['articles-list']} direction="vertical">
      {renderArticles}
    </Space>
  );
};

export default ArticlesList;
