import { Controller } from 'react-hook-form';
import { Form, Input } from 'antd';

import { FS, IFormInput } from '../../../../types/app.types';
import { useStateSelector } from '../../../../hooks';
import style from '../UserForm.module.scss';

const EmailInput: React.FC<IFormInput> = ({ control, errors, inputValue }) => {
  const fetchStatus = useStateSelector((state) => state.user.fetchStatus);

  return (
    <Form.Item className={style['user-form__text']} label="Email address">
      <Controller
        name="email"
        control={control}
        rules={{
          required: 'Email is required.',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: 'Invalid email address.',
          },
        }}
        defaultValue={inputValue || ''}
        render={({ field }) => (
          <Input
            {...field}
            className={
              errors?.email
                ? `${style['user-form__errBorder']} ${style['user-form__input']}`
                : style['user-form__input']
            }
            placeholder="Email address"
            type="email"
          />
        )}
      />
      <div>
        {errors?.email && (
          <span className={style['user-form__error']}>{errors.email.message}</span>
        )}
        {fetchStatus === FS.REJECTED && !errors?.password && (
          <span className={style['user-form__error']}>Email or Password do not match.</span>
        )}
      </div>
    </Form.Item>
  );
};

export default EmailInput;
