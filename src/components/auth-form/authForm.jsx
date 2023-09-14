import Box from '@mui/material/Box';
import { useForm } from 'react-hook-form';

import { VALIDATION } from '../../config/validation';
import { Button } from '../button';
import { Input } from '../input';
import { Title } from '../title';
import authForm from './authForm.module.scss';

export function AuthForm({ header, btnText, onSubmit, isLoading }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onBlur',
  });

  // const onSubmit = (data) => {
  //   console.log(JSON.stringify(data));
  //   reset();
  // };

  return (
    <div className={authForm.authFormCont}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        autoComplete="off"
      >
        <Title
          className={authForm.authFormTitle}
          size="h4"
          name={header}
          color="secondary"
          component="div"
        />
        <div className={authForm.authFormInputCont}>
          <Input
            required
            label="login"
            helperText={errors?.login?.message}
            {...register('login', {
              ...VALIDATION,
            })}
            sx={{
              marginTop: '20px',
            }}
          />
          <Input
            required
            label="password"
            helperText={errors?.password?.message}
            {...register('password', {
              ...VALIDATION,
              minLength: { value: 8, message: 'minimum 8 characters' },
            })}
          />
        </div>
        <Button name={btnText} type="submit" disabled={isLoading} />
      </Box>
    </div>
  );
}
