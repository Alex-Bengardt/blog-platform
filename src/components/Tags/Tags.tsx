import { FieldValues, Controller, useFieldArray } from 'react-hook-form';
import { nanoid } from 'nanoid';
import { Button, Form, Input } from 'antd';

import { concatNumericKeys } from '../../utilities';
import style from '../Pages/UserForm/UserForm.module.scss';

const Tags: React.FC<FieldValues> = ({ control }) => {
  const { fields, append, remove } = useFieldArray({
    name: 'tags',
    control,
  });

  const handleAddTag = (): void => {
    append({ name: '' });
  };

  const handleDeleteTag = (idx: number): void => {
    remove(idx);
  };

  return (
    <div className={style['tags']}>
      {fields.map((field, index) => {
        const concatedField = concatNumericKeys(field);

        return (
          <div className={style['tag']} key={nanoid()}>
            <Form.Item
              className={`${style['user-form__text']} ${style['tag__input']}`}
              label={index === 0 ? 'Tags' : null}
            >
              <Controller
                name={`tags[${index}].name`}
                control={control}
                defaultValue={concatedField}
                render={({ field }) => (
                  <Input
                    {...field}
                    className={style['user-form__input']}
                    placeholder="Tag"
                    type="text"
                  />
                )}
              />
            </Form.Item>
            {fields.length > 1 && (
              <Button
                className={`${style['user-form__button']} ${style['tagBtn']}`}
                onClick={() => handleDeleteTag(index)}
                danger
                ghost
                type="primary"
              >
                Delete
              </Button>
            )}
            {index === fields.length - 1 && (
              <Button
                className={`${style['user-form__button']} ${style['tagBtn']}`}
                onClick={handleAddTag}
                ghost
                type="primary"
              >
                Add tag
              </Button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Tags;
