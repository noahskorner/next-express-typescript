import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';
import ErrorInterface from '../../utils/types/interfaces/error';
import CreateUserRequest from '../../utils/types/requests/user/create-user';

const UserValidator = {
  register: ({ email, password, confirmPassword }: CreateUserRequest) => {
    let errors: ErrorInterface[] = [];

    if (!isEmail(email))
      errors.push({ field: 'email', message: 'Must provide a valid email.' });
    if (password == null)
      errors.push({ field: 'password', message: 'Must provide a password.' });
    if (!isLength(password, { min: 8 }))
      errors.push({
        field: 'password',
        message: 'Password must be at least 8 characters.',
      });
    if (password !== confirmPassword)
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
