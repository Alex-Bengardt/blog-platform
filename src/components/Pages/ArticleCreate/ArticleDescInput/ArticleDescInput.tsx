import { Controller } from 'react-hook-form';
import { Form, Input } from 'antd';

import { IArticleFormInput } from '../../../../types/app.types';
import style from '../../UserForm/UserForm.module.scss';

const ArticleDescInput: React.FC<IArticleFormInput> = ({ control, errors, inputValue }) => {
  return (
    <Form.Item className={style['user-form__text']} label="Description">
      <Controller
        name="description"
        control={control}
        rules={{
          required: 'Description is required.',
        }}
        defaultValue={inputValue || ''}
        render={({ field }) => (
          <Input
            {...field}
            className={
              errors?.description
                ? `${style['user-form__errBorder']} ${style['user-form__input']}`
                : style['user-form__input']
            }
            placeholder="Description"
            type="text"
          />
        )}
      />
      {errors?.description && (
        <span className={style['user-form__error']}>{errors.description.message}</span>
      )}
    </Form.Item>
  );
};

export default ArticleDescInput;
