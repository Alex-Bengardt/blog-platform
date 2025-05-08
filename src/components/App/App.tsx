import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { Layout, Pagination } from 'antd';
const { Header, Footer } = Layout;

import UserPanel from '../UserPanel';
import ArticlesList from '../ArticlesList';
import UserForm from '../Pages/UserForm';
import Article from '../Pages/Article';
import ArticleCreate from '../Pages/ArticleCreate';
import NotFoundPage from '../Pages/NotFoundPage';
import {
  setCurrentPageNumber,
  toggleArticlePreview,
  togglePagination,
} from '../../store/UtilitySlice';
import { fetchArticles } from '../../services/RealWorld.api';
import { US } from '../../types/app.types';
import { useAppDispatch, useStateSelector } from '../../hooks';

import style from './App.module.scss';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const userStatus = useStateSelector((state) => state.user.userStatus);
  const articlesCount = useStateSelector((state) => state.articles.articlesCount);
  const isArticlesList = useStateSelector((state) => state.utilities.isArticlesList);
  const pageNumber = useStateSelector((state) => state.utilities.currentPage);

  const handleMainPage = () => {
    dispatch(toggleArticlePreview(true));
    dispatch(togglePagination(true));
    dispatch(setCurrentPageNumber(1));
    dispatch(fetchArticles({ limit: 5, offset: 0 }));
  };

  const handleSetPageNumber = (page: number) => {
    dispatch(setCurrentPageNumber(page));
    dispatch(fetchArticles({ limit: 5, offset: 5 * (page - 1) }));
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className={style['header']}>
        <div className={style['header__wrap']}>
          <Link to={'/articles'}>
            <h1 className={style['header__title']} onClick={handleMainPage}>
              Realworld Blog
            </h1>
          </Link>
          <UserPanel />
        </div>
      </Header>

      <Routes>
        {/**
         * Главный роутер
         * @include auth status
         * @return sign-in OR page
         */}
        <Route path="/" element={<ArticlesList preview={true} />} />
        {/**
         * Роутер страницы всех статей
         * @include auth status
         * @return sign-in OR page
         */}
        <Route path="/articles" element={<ArticlesList preview={true} />} />
        {/**
         * Роутер вложенной статьи
         * @include auth status
         * @return sign-in OR page
         */}
        <Route
          path="/articles/:slug"
          element={
            userStatus === US.UNAUTH ? <Article preview={true} /> : <Article preview={false} />
          }
        />

        {/* Вход с систему */}
        <Route
          path="/sign-in"
          element={userStatus === US.UNAUTH ? <UserForm /> : <Navigate to={'/articles'} />}
        />
        {/* Регистрация */}
        <Route
          path="/sign-up"
          element={userStatus === US.UNAUTH ? <UserForm /> : <Navigate to={'/articles'} />}
        />
        {/* Редактирование профиля */}
        <Route
          path="/profile"
          element={userStatus === US.AUTH ? <UserForm /> : <Navigate to={'/articles'} />}
        />
        {/* Создание новой статьи */}
        <Route
          path="/new-article"
          element={userStatus === US.AUTH ? <ArticleCreate /> : <Navigate to={'/sign-in'} />}
        />
        {/* Редактирование статьи */}
        <Route
          path="/articles/:slug/edit"
          element={
            userStatus === US.AUTH ? <ArticleCreate editMode /> : <Navigate to={'/sign-in'} />
          }
        />
        {/* Страница 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Footer className={style['footer']}>
        {isArticlesList && (
          <Pagination
            current={pageNumber}
            pageSize={5}
            total={articlesCount || 1}
            showSizeChanger={false}
            onChange={(page) => {
              handleSetPageNumber(page);
            }}
          />
        )}
      </Footer>
    </Layout>
  );
};

export default App;
