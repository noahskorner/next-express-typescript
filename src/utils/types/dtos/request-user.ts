import User from '../../../server/db/models/user.model';

class RequestUser {
  public id: number;
  public email: string;

  constructor({ id, email }: User | { id: number; email: string }) {
    this.id = id;
    this.email = email;
  }

  public toJSON = () => {
    return {
      id: this.id,
      email: this.email,
    };
  };
}

export default RequestUser;
