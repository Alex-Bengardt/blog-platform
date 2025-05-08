// import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from 'antd';

import { IFormButton } from '../../../../types/app.types';
import style from '../UserForm.module.scss';

const SubmitButton: React.FC<IFormButton> = ({ actionText, enable, editMode, watch }) => {
  // const navigate = useNavigate();
  // const currentPage = useLocation();

  return (
    <Button
      className={`${style['user-form__button']} ${style['submitBtn']}`}
      block={!editMode}
      type="primary"
      htmlType="submit"
      disabled={enable ? false : watch!('agreement') === false}
    >
      {actionText}
    </Button>
  );
};

export default SubmitButton;
