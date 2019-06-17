import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity()
export default class User {
  constructor() {
    this.id = 0;
    this.name = '';
    this.surname = '';
    this.password = '';
  }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    password: string;
}
