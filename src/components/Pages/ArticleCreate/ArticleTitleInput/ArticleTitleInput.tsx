import { Controller } from 'react-hook-form';
import { Form, Input } from 'antd';

import { IArticleFormInput } from '../../../../types/app.types';
import style from '../../UserForm/UserForm.module.scss';

const ArticleTitleInput: React.FC<IArticleFormInput> = ({ control, errors, inputValue }) => {
  return (
    <Form.Item className={style['user-form__text']} label="Title">
      <Controller
        name="title"
        control={control}
        rules={{
          required: 'Title is required.',
        }}
        defaultValue={inputValue || ''}
        render={({ field }) => (
          <Input
            {...field}
            className={
              errors?.title
                ? `${style['user-form__errBorder']} ${style['user-form__input']}`
                : style['user-form__input']
            }
            placeholder="Title"
            type="text"
          />
        )}
      />
      {errors?.title && (
        <span className={style['user-form__error']}>{errors.title.message}</span>
      )}
    </Form.Item>
  );
};

export default ArticleTitleInput;
