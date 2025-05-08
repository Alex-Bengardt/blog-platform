import { Controller } from 'react-hook-form';
import { Form, Input } from 'antd';

import { IArticleFormInput } from '../../../../types/app.types';
import style from '../../UserForm/UserForm.module.scss';

const ArticleTextInput: React.FC<IArticleFormInput> = ({ control, errors, inputValue }) => {
  return (
    <Form.Item className={style['user-form__text']} label="Text">
      <Controller
        name="body"
        control={control}
        rules={{
          required: 'Body text is required.',
        }}
        defaultValue={inputValue || ''}
        render={({ field }) => (
          <Input.TextArea
            {...field}
            className={
              errors?.body
                ? `${style['user-form__errBorder']} ${style['user-form__input']}`
                : style['user-form__input']
            }
            autoSize={{ minRows: 6, maxRows: 6 }}
            placeholder="Text"
          />
        )}
      />
      {errors?.body && (
        <span className={style['user-form__error']}>{errors.body.message}</span>
      )}
    </Form.Item>
  );
};

export default ArticleTextInput;
