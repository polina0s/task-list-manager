import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Button } from '../button';
import { Input } from '../input';
import { Title } from '../title';
import authForm from './authForm.module.scss';

const schema = yup.object().shape({
  login: yup.string().required('this field is required').trim(),
  password: yup
    .string()
    .required('this field is required')
    .trim()
    .min(8, 'minimum 8 characters'),
});

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
    resolver: yupResolver(schema),
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
          variant="h4"
          name={header}
          color="secondary"
          component="div"
        />
        <div className={authForm.authFormInputCont}>
          <Input
            required
            label="login"
            helperText={errors?.login?.message}
            {...register('login')}
          />
          <Input
            required
            label="password"
            helperText={errors?.password?.message}
            {...register('password')}
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
