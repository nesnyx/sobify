import { Order } from "src/modules/orders/entities/order.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ChatHistory } from "./chat-history.entity";


@Entity("customers")
export class Customer {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true,nullable:true })
    whatsappNumber: string; // Nomor WA pelanggan

    @Column({ nullable: true })
    name: string; // Ditanyakan oleh AI: "Boleh tahu nama Kakak?"

    @Column({ nullable: true })
    defaultAddress: string; // Jika ada layanan delivery

    // Relasi
    @OneToMany(() => Order, (order) => order.customer)
    orders: Order[];

    @OneToMany(() => ChatHistory, (history) => history.customer)
    chatHistories: ChatHistory[];
}