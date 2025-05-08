import { Controller } from 'react-hook-form';
import { Form, Input } from 'antd';

import { IFormInput } from '../../../../types/app.types';
import style from '../UserForm.module.scss';

const UsernameInput: React.FC<IFormInput> = ({ control, errors, inputValue }) => {
  return (
    <Form.Item className={style['user-form__text']} label="Username">
      <Controller
        name="username"
        control={control}
        rules={{
          required: 'Username is required.',
          minLength: {
            value: 3,
            message: 'Username must be at least 3 characters.',
          },
          maxLength: {
            value: 20,
            message: 'Username must be 20 characters or less.',
          },
        }}
        defaultValue={inputValue || ''}
        render={({ field }) => (
          <Input
            {...field}
            className={
              errors?.username
                ? `${style['user-form__errBorder']} ${style['user-form__input']}`
                : style['user-form__input']
            }
            placeholder="Username"
            type="text"
          />
        )}
      />
      {errors?.username && (
        <span className={style['user-form__error']}>{errors.username.message}</span>
      )}
    </Form.Item>
  );
};

export default UsernameInput;
