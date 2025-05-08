import { Link } from 'react-router-dom';

import { IFormInfo } from '../../../../types/app.types';
import style from '../UserForm.module.scss';

const FormInfo: React.FC<IFormInfo> = ({ actionText, messageText, extendLink }) => {
  return (
    <p className={style['user-form__info']}>
      {messageText}
      <Link to={extendLink} className={style['user-form__signin']}>
        {actionText}
      </Link>
      .
    </p>
  );
};

export default FormInfo;
