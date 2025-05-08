import { Controller } from 'react-hook-form';
import { Form, Input } from 'antd';

import { FS, IFormInput } from '../../../../types/app.types';
import { useStateSelector } from '../../../../hooks';
import style from '../UserForm.module.scss';

const PasswordInput: React.FC<IFormInput> = ({ control, errors, label }) => {
  const fetchStatus = useStateSelector((state) => state.user.fetchStatus);

  return (
    <Form.Item className={style['user-form__text']} label={label}>
      <Controller
        name="password"
        control={control}
        rules={{
          required: 'Password is required.',
          minLength: {
            value: 6,
            message: 'Your password must be at least 6 characters.',
          },
          maxLength: {
            value: 40,
            message: 'Your password must be 40 characters or less.',
          },
        }}
        render={({ field }) => (
          <Input.Password
            {...field}
            className={
              errors?.password
                ? `${style['user-form__errBorder']} ${style['user-form__input']}`
                : style['user-form__input']
            }
            placeholder="Password"
            type="password"
          />
        )}
      />
      <div>
        {errors?.password && (
          <span className={style['user-form__error']}>{errors.password.message}</span>
        )}
        {fetchStatus === FS.REJECTED && !errors?.password && (
          <span className={style['user-form__error']}>Email or Password do not match.</span>
        )}
      </div>
    </Form.Item>
  );
};

export default PasswordInput;
