import User from '../../../server/db/models/user.model';

class UserDTO {
  private id: number;
  private email: string;
  private updatedAt: string;
  private createdAt: string;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.updatedAt = user.updatedAt;
    this.createdAt = user.updatedAt;
  }
}

export default UserDTO;
