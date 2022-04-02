import UserService from '../services/user.service';
import catchAsync from '../middleware/catch-async';
import { Request, Response } from 'express';
import UserValidator from '../validators/user.validator';

class UserController {
  private _userService = new UserService();

  public register = catchAsync(async (req: Request, res: Response) => {
    const validationResult = UserValidator.register({ ...req.body });
    if (validationResult.length > 0) {
      return res.status(400).json(validationResult);
    }

    const { email, password } = req.body;
    const { user, errors } = await this._userService.createUser(
      email,
      password,
    );

    if (errors != null) return res.status(400).json(errors);
    if (user == null) return res.sendStatus(500);

    return res.status(201).json(user);
  });

  public verifyEmail = catchAsync(async (req: Request, res: Response) => {
    const token = req.params.token;

    const { errors } = await this._userService.verifyEmail(token);
    if (errors != null) return res.status(400).json(errors);

    return res.sendStatus(200);
  });

  public getUser = catchAsync(async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    if (userId !== req.user.id) return res.sendStatus(403);

    const user = await this._userService.findUserById(userId);
    if (user === null) return res.sendStatus(400);

    return res.status(200).json(user);
  });

  // public resetPassword = catchAsync(async (req: Request, res: Response) => {
  //   const err = validationResult(req);
  //   if (!err.isEmpty()) {
  //     return res.status(400).json(err);
  //   }

  //   const { email } = req.body;
  //   const user = await userService.findUserByEmail(email);
  //   if (!user) return res.status(200).json(resetPassword);

  //   await userService.resetPassword(user);

  //   return res.status(200).json(resetPassword);
  // });

  // public confirmResetPassword = catchAsync(
  //   async (req: Request, res: Response) => {
  //     const err = validationResult(req);
  //     if (!err.isEmpty()) {
  //       return res.status(400).json(err);
  //     }

  //     const resetPasswordToken = req.params.token;
  //     const { password1 } = req.body;

  //     jwt.verify(
  //       resetPasswordToken,
  //       env.PASSWORD_RESET_SECRET,
  //       async (err: VerifyErrors | null, decoded: unknown) => {
  //         if (err) return res.sendStatus(403);
  //         try {
  //           const { email } = decoded as { email: string };

  //           userService
  //             .findUserByPasswordResetToken(email, resetPasswordToken)
  //             .then((user) => {
  //               if (!user) {
  //                 return res.sendStatus(400);
  //               }

  //               userService
  //                 .updatePassword(user, password1)
  //                 .then(() => {
  //                   return res.sendStatus(200);
  //                 })
  //                 .catch(() => {
  //                   return res.sendStatus(500);
  //                 });
  //             })
  //             .catch(() => {
  //               return res.sendStatus(500);
  //             });
  //         } catch (error) {
  //           console.log(error);
  //           return res.sendStatus(403);
  //         }
  //       },
  //     );
  //   },
  // );
}
export default UserController;
