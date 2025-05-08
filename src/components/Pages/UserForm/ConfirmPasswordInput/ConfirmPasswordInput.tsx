import { Form, Input } from 'antd';
import { Controller } from 'react-hook-form';

import { IFormInput } from '../../../../types/app.types';
import style from '../UserForm.module.scss';

const ConfirmPasswordInput: React.FC<IFormInput> = ({ control, errors, getValues }) => {
  return (
    <Form.Item className={style['user-form__text']} label="Repeat Password">
      <Controller
        name="confirmpass"
        control={control}
        rules={{
          required: 'Confirm Password is required.',
          validate: (value) => value === getValues!('password') || 'Passwords must match.',
        }}
        render={({ field }) => (
          <Input.Password
            {...field}
            className={
              errors?.confirmpass
                ? `${style['user-form__errBorder']} ${style['user-form__input']}`
                : style['user-form__input']
            }
            placeholder="Password"
            type="password"
          />
        )}
      />
      <div>
        {errors?.confirmpass && (
          <span className={style['user-form__error']}>{errors.confirmpass.message}</span>
        )}
      </div>
    </Form.Item>
  );
};

export default ConfirmPasswordInput;
