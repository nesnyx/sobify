import { Merchant } from "src/modules/merchant/entities/merchant.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


export class UserRole {
    static BARISTA = "barista"
    static ADMIN = "admin"
    static CUSTOMER = "customer"
}

@Entity("users")
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column() // Jangan pernah kirim hash password ke client
    password: string;

    @Column()
    name: string;

    @Column({ default: UserRole.BARISTA})
    role: string

    // Relasi
    @ManyToOne(() => Merchant, (merchant) => merchant.users)
    merchant: Merchant;
}