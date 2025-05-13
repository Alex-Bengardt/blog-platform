import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Card, Form } from 'antd';

import { useAppDispatch, useStateSelector } from '../../../hooks';
import { createArticle, updateArticle } from '../../../services/RealWorld.api';
import { ICreateArticleProps, IEditArticleProps } from '../../../types/props.types';
import { setCurrentPageNumber, toggleArticlePreview } from '../../../store/UtilitySlice';
import Tags from '../../Tags';
import SubmitButton from '../UserForm/SubmitButton';

import ArticleTitleInput from './ArticleTitleInput';
import ArticleDescInput from './ArticleDescInput';
import ArticleTextInput from './ArticleTextInput';
import style from './ArticleCreate.module.scss';

const ArticleCreate: React.FC<IEditArticleProps> = ({ editMode }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentPage = useLocation();
  const { slug } = useParams();
  const currentTitle = useStateSelector((state) => state.articles.article?.title);
  const currentDesc = useStateSelector((state) => state.articles.article?.description);
  const currentText = useStateSelector((state) => state.articles.article?.body);
  const currentTags = useStateSelector((state) => state.articles.article?.tagList);
  const hasTags = currentTags && currentTags?.length > 0;

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ICreateArticleProps>({
    defaultValues: {
      title: editMode ? currentTitle : '',
      description: editMode ? currentDesc : '',
      body: editMode ? currentText : '',
      tags: editMode && hasTags ? currentTags?.map((tag) => ({ name: tag })) : [{ name: '' }],
    },
    mode: 'onBlur',
  });

  const onSubmit = async (data: ICreateArticleProps) => {
    const { title, description, body, tags } = data;

    const tagList = tags?.reduce((acc: string[], tag) => {
      if (tag.name.trim()) {
        return [...acc, tag.name];
      }
      return acc;
    }, []);

    try {
      if (currentPage.pathname === '/new-article') {
        if (title && description && body) {
          const response = await dispatch(
            createArticle({ title, description, body, tagList })
          ).unwrap();

          const createdSlug = response.data.article.slug;

          dispatch(toggleArticlePreview(true));
          dispatch(setCurrentPageNumber(1));

          navigate(`/articles/${createdSlug}`, { replace: true });
        }
      } else {
        if (slug) {
          await dispatch(
            updateArticle({
              article: { title, description, body, tagList },
              slug,
            })
          ).unwrap();

          navigate(`/articles/${slug}`);
        }
      }
    } catch (err) {
      console.error('Ошибка при создании/редактировании статьи:', err);
    }
  };

  return (
    <Card className={style['article-form']} bodyStyle={{ padding: 0 }}>
      <Form layout={'vertical'} onFinish={handleSubmit(onSubmit)}>
        <h3 className={style['article-form__title']}>
          {currentPage.pathname === '/new-article' ? 'Create new article' : 'Edit article'}
        </h3>
        <ArticleTitleInput control={control} errors={errors} />
        <ArticleDescInput control={control} errors={errors} />
        <ArticleTextInput control={control} errors={errors} />
        <Tags control={control} />
        <SubmitButton actionText="Send" enable={true} editMode />
      </Form>
    </Card>
  );
};

export default ArticleCreate;
