import { compare, genSalt, hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../db/models/user.model';
import ErrorInterface from '../../utils/types/interfaces/error';
import MailService from './mail.service';
import env from '../../config/env.config';
import UserDTO from '../../utils/types/dtos/user';
import RequestUser from '../../utils/types/dtos/request-user';
import RefreshToken from '../db/models/refresh-token.model';

const ERROR_USER_ALREADY_EXISTS: ErrorInterface = {
  field: 'email',
  message: 'A user with this email already exists.',
};
const ERROR_USER_NOT_FOUND: ErrorInterface = {
  field: 'password',
  message: 'User with this email/password combination does not exist.',
};
const ERROR_EMAIL_NOT_VERIFIED: ErrorInterface = {
  field: 'email',
  message: 'Please verify your email before logging in.',
};
const ERROR_INVALID_TOKEN: ErrorInterface = {
  field: 'token',
  message: 'The provided token was invalid.',
};
const ERROR_USER_ALREADY_VERIFIED: ErrorInterface = {
  message: 'This email is already verified.',
};

class UserService {
  private _mailService = new MailService();

  public findUserById = async (id: number): Promise<UserDTO | null> => {
    const user = await User.findByPk(id);

    if (user == null) return null;

    return new UserDTO(user);
  };

  // public findUserByPasswordResetToken = async (
  //   email: string,
  //   passwordResetToken: string,
  // ): Promise<User | null> => {
  //   const user = await User.findOne({
  //     where: {
  //       email,
  //       passwordResetToken,
  //     },
  //   });

  //   return user;
  // };

  public createUser = async (
    email: string,
    password: string,
  ): Promise<{ errors?: ErrorInterface[]; user?: UserDTO }> => {
    const userExists = await this.findUserByEmail(email);

    if (userExists != null) {
      return { errors: [ERROR_USER_ALREADY_EXISTS] };
    }

    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);
    const verificationToken = jwt.sign({ email }, env.VERIFY_EMAIL_SECRET);
    const user = await User.create({
      email: email,
      password: hashedPassword,
      verificationToken: verificationToken,
    });
    await this.sendVerificationEmail(user);

    return { user: new UserDTO(user) };
  };

  public loginUser = async (
    email: string,
    password: string,
  ): Promise<{
    errors?: ErrorInterface[];
    accessToken?: string;
    refreshToken?: string;
  }> => {
    const user = await this.findUserByEmail(email);
    if (user == null) return { errors: [ERROR_USER_NOT_FOUND] };

    const passwordIsValid = await compare(password, user.password);
    if (!passwordIsValid) return { errors: [ERROR_USER_NOT_FOUND] };
    if (!user.isVerified) return { errors: [ERROR_EMAIL_NOT_VERIFIED] };

    const tokens = await this.generateTokens(user);
    return tokens;
  };

  public verifyEmail = async (
    token: string,
  ): Promise<{ errors?: ErrorInterface[] }> => {
    const user = await this.findUserByVerificationToken(token);

    if (user == null) return { errors: [ERROR_INVALID_TOKEN] };
    if (user.isVerified) return { errors: [ERROR_USER_ALREADY_VERIFIED] };

    try {
      jwt.verify(token, env.VERIFY_EMAIL_SECRET);

      user.isVerified = true;
      await user.save();

      return {};
    } catch {
      return { errors: [ERROR_INVALID_TOKEN] };
    }
  };

  public refreshToken = async (
    token: string,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
  } | null> => {
    const isTokenActive = await this.isTokenActive(token);
    if (!isTokenActive) return null;

    try {
      const { id: userId } = jwt.verify(token, env.REFRESH_TOKEN_SECRET) as {
        id: number;
      };
      if (userId == null) return null;

      const user = await User.findByPk(userId);
      if (user == null) return null;

      const tokens = await this.generateTokens(user);
      return tokens;
    } catch {
      return null;
    }
  };

  private isTokenActive = async (token: string): Promise<boolean> => {
    const refreshToken = await RefreshToken.findOne({
      where: { token },
    });

    return refreshToken != null;
  };

  private findUserByEmail = async (email: string): Promise<User | null> => {
    const user = await User.findOne({ where: { email } });

    return user;
  };

  private findUserByVerificationToken = async (
    token: string,
  ): Promise<User | null> => {
    const user = await User.findOne({ where: { verificationToken: token } });

    return user;
  };

  private generateTokens = async (
    user: User,
  ): Promise<{ accessToken: string; refreshToken: string }> => {
    const requestUser = new RequestUser(user).toJSON();

    const accessToken = jwt.sign(requestUser, env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
    });
    const refreshToken = jwt.sign(requestUser, env.REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
    });

    // this means only one device can be active at a time
    await RefreshToken.destroy({
      where: { userId: requestUser.id },
    });
    await RefreshToken.create({ token: refreshToken, userId: requestUser.id });

    return { accessToken, refreshToken };
  };

  public logoutUser = async (token: string) => {
    await RefreshToken.destroy({
      where: {
        token,
      },
    });
  };

  // public resetPassword = async (user: User) => {
  //   const passwordResetToken = jwt.sign(
  //     { id: user.id, email: user.email },
  //     process.env.PASSWORD_RESET_SECRET,
  //     {
  //       expiresIn: process.env.PASSWORD_RESET_EXPIRATION,
  //     },
  //   );

  //   await user.update({
  //     passwordResetToken,
  //   });

  //   await this.sendPasswordResetEmail(user);
  // };

  // public updatePassword = async (user: User, password: string) => {
  //   const salt = await genSalt();
  //   const hashedPassword = await hash(password, salt);
  //   await user.update({
  //     password: hashedPassword,
  //   });
  // };

  // public updateIsVerified = async (user: User, isVerified: boolean) => {
  //   await user.update({
  //     isVerified,
  //   });
  // };

  // private sendPasswordResetEmail = async (user: User) => {
  //   const mail = {
  //     from: 'noahskorner@gmail.com',
  //     to: user.email,
  //     subject: 'Reset your password!',
  //     text: `${process.env.HOST}/user/password/${user.passwordResetToken}`,
  //   };

  //   await mailService.sendMail(mail);
  // };

  private sendVerificationEmail = async (user: User) => {
    const mail = {
      from: 'noahskorner@gmail.com',
      to: user.email,
      subject: `Welcome to ${env.APP_NAME}!`,
      text: `${env.HOST}/user/verify-email/${user.verificationToken}`,
    };

    await this._mailService.sendMail(mail);
  };

  // private getRequestUser = (user: User | RequestUser): RequestUser => {
  //   if (user instanceof User) {
  //     const roles = user.userRoles.map((userRole) => userRole.role.name);
  //     return {
  //       id: user.id,
  //       email: user.email,
  //       roles: roles,
  //     } as RequestUser;
  //   } else return user;
  // };
}
export default UserService;
