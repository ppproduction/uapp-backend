import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
class User {
  constructor(id: string, name: string, email: string,  password : string, roles: string[] = [], email_verified : boolean = false) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.email_verified = email_verified;
    this.password = password;
    this.roles = roles;
  }

  @PrimaryColumn()
  id: string;

  @Column({ unique : true})
  name: string;

  @Column()
  email: string

  @Column('text', { array: true })
  roles: string[]

  @Column({ nullable: true })
  email_verified: boolean;

  @Column()
  password: string
}

export default User;