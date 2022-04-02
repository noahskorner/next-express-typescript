import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import env from '../../config/env.config';
import RequestUser from '../../utils/types/dtos/request-user';

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  try {
    const { id, email } = jwt.verify(token, env.ACCESS_TOKEN_SECRET) as {
      id?: number;
      email?: string;
    };

    if (id == null) return res.sendStatus(401);
    if (email == null) return res.sendStatus(401);

    req.user = new RequestUser({ id, email });
    next();
  } catch {
    res.sendStatus(401);
  }
};
// const authorize = (permittedRoles: Array<RoleEnum>) => {
//   console.log(permittedRoles);
//   return async (req: Request, res: Response, next: NextFunction) => {
//     next();
//     // if (!req.user) return res.sendStatus(401);
//     // const userId = req.user.id;

//     // UserRole.findAll({ where: { userId }, include: Role })
//     //   .then((data) => {
//     //     const roles = data.map((userRole) => userRole.role.name);
//     //     if (
//     //       permittedRoles.some((permittedRole) => roles.includes(permittedRole))
//     //     ) {
//     //       next();
//     //     } else {
//     //       return res.sendStatus(403);
//     //     }
//     //   })
//     //   .catch((error) => {
//     //     console.log(error);
//     //     return res.sendStatus(403);
//     //   });
//   };
// };

export default authenticate;
