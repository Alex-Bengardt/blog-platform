import { useEffect } from 'react';
import { Result, Button } from 'antd';

import { togglePagination } from '../../../store/UtilitySlice';
import { useAppDispatch, useStateSelector } from '../../../hooks';
import { FS } from '../../../types/app.types';

const NotFoundPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const listStatus: FS = useStateSelector((state) => state.articles.status);

  useEffect(() => {
    if (listStatus) {
      dispatch(togglePagination(false));
    }
  }, [listStatus, dispatch]);

  return (
    <Result
      status="404"
      title="404"
      subTitle="Извините, страница не найдена."
      extra={
        <Button type="primary" href="/articles">
          Вернуться на главную
        </Button>
      }
    />
  );
};

export default NotFoundPage;
