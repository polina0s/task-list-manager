import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { useForm } from 'react-hook-form';

import { VALIDATION } from '../../config/validation';
import { Button } from '../button';
import { Input } from '../input';
import { Title } from '../title';
import authForm from './authForm.module.scss';

export function AuthForm({
  header,
  btnText,
  onSubmit,
  isLoading,
  underBthText,
  onClick,
}) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
  });

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
          variant="h5"
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
        <div className={authForm.authFormBtn}>
          <Button name={btnText} type="submit" disabled={isLoading} />
        </div>
        <div>
          <Link
            className={authForm.authFormLink}
            color="secondary"
            onClick={onClick}
            underline="hover"
            fontFamily="Roboto"
          >
            or {underBthText}
          </Link>
        </div>
      </Box>
    </div>
  );
}
