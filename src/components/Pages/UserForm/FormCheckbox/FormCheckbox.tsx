import { Controller } from 'react-hook-form';
import { Form, Checkbox } from 'antd';

import { IFormInput } from '../../../../types/app.types';
// import style from '../UserForm.module.scss';

const FormCheckbox: React.FC<IFormInput> = ({ control }) => {
  return (
    <Form.Item>
      <Controller
        name="agreement"
        control={control}
        rules={{ required: 'This field is required' }}
        defaultValue={false}
        render={({ field }) => (
          <Checkbox
            {...field}
            checked={field.value}
            onChange={(e) => field.onChange(e.target.checked)}
          >
            I agree to the processing of my personal information
          </Checkbox>
        )}
      />
    </Form.Item>
  );
};

export default FormCheckbox;
