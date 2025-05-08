import { Controller } from 'react-hook-form';
import { Form, Input } from 'antd';

import { IFormInput } from '../../../../types/app.types';
import style from '../UserForm.module.scss';

const AvatarInput: React.FC<IFormInput> = ({ control, errors, inputValue }) => {
  return (
    <Form.Item className={style['user-form__text']} label="Avatar image (url)">
      <Controller
        name="image"
        control={control}
        rules={{
          pattern: {
            value: /^(ftp|http|https):\/\/[^ "]+$/i,
            message: 'Please enter a valid image URL.',
          },
        }}
        defaultValue={inputValue || ''}
        render={({ field }) => (
          <Input
            {...field}
            className={
              errors?.image
                ? `${style['user-form__errBorder']} ${style['user-form__input']}`
                : style['user-form__input']
            }
            placeholder="Avatar image"
            type="text"
          />
        )}
      />
      <div>
        {errors?.image && (
          <span className={style['user-form__error']}>{errors.image.message}</span>
        )}
      </div>
    </Form.Item>
  );
};

export default AvatarInput;
