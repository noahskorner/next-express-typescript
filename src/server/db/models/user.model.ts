import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import RefreshToken from './refresh-token.model';
import UserRole from './user-role.model';

@Table({ tableName: 'user', underscored: true })
class User extends Model {
  @Column(DataType.STRING)
  email!: string;

  @Column(DataType.STRING)
  password!: string;

  @Column(DataType.BOOLEAN)
  isVerified!: boolean;

  @Column(DataType.STRING)
  verificationToken!: string;

  @Column(DataType.STRING)
  passwordResetToken!: string;

  @HasMany(() => RefreshToken, {
    onDelete: 'CASCADE',
  })
  refreshTokens!: RefreshToken[];

  @HasMany(() => UserRole, {
    onDelete: 'CASCADE',
  })
  roles!: UserRole[];
}

export default User;
