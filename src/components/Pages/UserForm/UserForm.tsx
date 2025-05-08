import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Card, Divider, Form, message } from 'antd';

import { IUserDataUpdate, IUserFormRequest } from '../../../types/api.types';
import { createUser, loginUser, updateUser } from '../../../services/RealWorld.api';
import { useAppDispatch, useStateSelector } from '../../../hooks';
import { togglePagination } from '../../../store/UtilitySlice';

import PasswordInput from './PasswordInput';
import UsernameInput from './UsernameInput';
import EmailInput from './EmailInput';
import ConfirmPasswordInput from './ConfirmPasswordInput';
import SubmitButton from './SubmitButton';
import FormCheckbox from './FormCheckbox/FormCheckbox';
import FormInfo from './FormInfo';
import AvatarInput from './AvatarInput';
import style from './UserForm.module.scss';

const UserForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentPage = useLocation();
  const userEmail: string = useStateSelector((state) => state.user.user.email);
  const userName: string = useStateSelector((state) => state.user.user.username);
  const userAvatar = useStateSelector((state) => state.user.user.image);
  const isArticlesList = useStateSelector((state) => state.utilities.isArticlesList);
  const [apiError, setApiError] = useState<string | null>(null); // Состояние для хранения ошибок от API

  const {
    control,
    formState: { errors },
    getValues,
    reset,
    watch,
    handleSubmit,
  } = useForm<IUserFormRequest>({ mode: 'onBlur' });

  useEffect(() => {
    if (isArticlesList) {
      dispatch(togglePagination(false));
    }
  }, [isArticlesList, dispatch]);

  const onSubmit = async (data: IUserFormRequest) => {
    setApiError(null);

    try {
      if (currentPage.pathname === '/sign-up') {
        const { email, username, password } = data;
        const resultAction = await dispatch(createUser({ email, username, password }));
        if (createUser.rejected.match(resultAction)) {
          setApiError('Ошибка при создании аккаунта. Попробуйте позже.');
        } else {
          navigate('/sign-in');
        }
      }

      if (currentPage.pathname === '/sign-in') {
        const { email, password } = data;
        const resultAction = await dispatch(loginUser({ email, password }));
        if (loginUser.rejected.match(resultAction)) {
          setApiError('Неверный логин или пароль');
        } else {
          navigate('/articles');
        }
      }

      if (currentPage.pathname === '/profile') {
        const { email, username, password, image } = data;
        const bio = '';
        const userData: IUserDataUpdate = { username, bio };

        if (email) userData.email = email;
        if (username) userData.username = username;
        if (password) userData.password = password;
        if (image) userData.image = image;

        const resultAction = await dispatch(updateUser(userData));

        if (updateUser.rejected.match(resultAction)) {
          setApiError('Ошибка при обновлении профиля');
        } else {
          navigate('/articles');
        }
      }

      reset();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      message.error('Произошла ошибка. Попробуйте снова');
    }
  };

  //Форма регистрации
  const signUpForm = (
    <>
      <h3 className={style['user-form__title']}>Create new account</h3>
      <UsernameInput control={control} errors={errors} />
      <EmailInput control={control} errors={errors} />
      <PasswordInput control={control} errors={errors} label="Password" />
      <ConfirmPasswordInput control={control} errors={errors} getValues={getValues} />
      <Divider className={style['user-form__divider']} />
      <FormCheckbox control={control} errors={errors} />
      {apiError && <div className={style.error}>{apiError}</div>} {/* Показываем ошибку */}
      <SubmitButton actionText="Create" watch={watch} />
      <FormInfo
        actionText="Sign In"
        messageText="Already have an account? "
        extendLink="/sign-in"
      />
    </>
  );

  //Форма входа на сайт
  const signInForm = (
    <>
      <h3 className={style['user-form__title']}>Sign In</h3>
      <EmailInput control={control} errors={errors} />
      <PasswordInput control={control} errors={errors} label="Password" />
      {apiError && <div className={style.error}>{apiError}</div>} {/* Показываем ошибку */}
      <SubmitButton actionText="Login" enable={true} />
      <FormInfo
        actionText="Sign Up"
        messageText="Don't have an account? "
        extendLink="/sign-up"
      />
    </>
  );

  //Форма редактирования профиля
  const editProfile = (
    <>
      <h3 className={style['user-form__title']}>Edit Profile</h3>
      <UsernameInput control={control} errors={errors} inputValue={userName} />
      <EmailInput control={control} errors={errors} inputValue={userEmail} />
      <PasswordInput control={control} errors={errors} label="New Password" />
      <AvatarInput control={control} errors={errors} inputValue={userAvatar} />
      {apiError && <div className={style.error}>{apiError}</div>} {/* Показываем ошибку */}
      <SubmitButton actionText="Save" enable={true} />
    </>
  );

  return (
    <Card className={style['user-form']} bodyStyle={{ padding: 0 }}>
      <Form layout={'vertical'} onFinish={handleSubmit(onSubmit)}>
        {currentPage.pathname === '/sign-in' && signInForm}
        {currentPage.pathname === '/sign-up' && signUpForm}
        {currentPage.pathname === '/profile' && editProfile}
      </Form>
    </Card>
  );
};

export default UserForm;
