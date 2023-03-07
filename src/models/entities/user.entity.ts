import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Boards } from './boards.entity';

@Entity()
@Unique(['username'])
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    username : string;

    @Column()
    password : string;

    /** 일대다, 타입은 Boards | boards에서 user에 접근하기 위해서 boards.user | eager : true를 해서, user를 가져올 때 게시물도 같이 가져오도록.  */
    @OneToMany(type => Boards, boards => boards.user, { eager : true})
    boards: Boards[]
}