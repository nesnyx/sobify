import { MenuItem } from "src/modules/menu/entities/menu.entity";
import { Order } from "src/modules/orders/entities/order.entity";
import { User } from "src/modules/users/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity('merchants')
export class Merchant {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string; // Nama Kafe, misal: "Sobify Coffee"

    @Column()
    address: string;

    @Column({ unique: true })
    whatsappNumber: string; // Nomor WA Bisnis yang didaftarkan


    // Relasi
    @OneToMany(() => User, (user) => user.merchant)
    users: User[];

    @OneToMany(() => MenuItem, (item) => item.merchant)
    menuItems: MenuItem[];

    @OneToMany(() => Order, (order) => order.merchant)
    orders: Order[];
}