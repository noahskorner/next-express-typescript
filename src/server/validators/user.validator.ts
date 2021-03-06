import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';
import ErrorInterface from '../../utils/types/interfaces/error';
import ConfirmResetPasswordRequest from '../../utils/types/requests/user/confirm-reset-password';
import CreateUserRequest from '../../utils/types/requests/user/create-user';
import ResetPasswordRequest from '../../utils/types/requests/user/reset-password';

const ERROR_INVALID_EMAIL = {
  field: 'email',
  message: 'Must provide a valid email.',
};

const UserValidator = {
  register: ({
    email,
    password,
    confirmPassword,
  }: CreateUserRequest): ErrorInterface[] => {
    let errors: ErrorInterface[] = [];

    if (!isEmail(email)) errors.push(ERROR_INVALID_EMAIL);
    if (password == null)
      errors.push({ field: 'password', message: 'Must provide a password.' });
    if (!isLength(password, { min: 8 }))
      errors.push({
        field: 'password',
        message: 'Password must be at least 8 characters.',
      });
    if (confirmPassword == null)
      errors.push({
        field: 'confirmPassword',
        message: 'Must confirm password.',
      });
    if (password !== confirmPassword)
      errors.push({
        field: 'confirmPassword',
        message: 'Passwords do not match.',
      });

    return errors;
  },
  resetPassword: ({ email }: ResetPasswordRequest): ErrorInterface[] => {
    return isEmail(email) ? [] : [ERROR_INVALID_EMAIL];
  },
  confirmResetPassword: ({
    password,
    confirmPassword,
  }: ConfirmResetPasswordRequest): ErrorInterface[] => {
    let errors: ErrorInterface[] = [];

    if (password == null)
      errors.push({ field: 'password', message: 'Must provide a password.' });
    if (!isLength(password, { min: 8 }))
      errors.push({
        field: 'password',
        message: 'Password must be at least 8 characters.',
      });
    if (confirmPassword == null)
      errors.push({
        field: 'confirmPassword',
        message: 'Must confirm password.',
      });
    if (password !== confirmPassword)
      errors.push({
        field: 'confirmPassword',
        message: 'Passwords do not match.',
      });

    return errors;
  },
};

export default UserValidator;
