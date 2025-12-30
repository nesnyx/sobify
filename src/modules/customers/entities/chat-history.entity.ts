import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";
import { Customer } from "./customer.entity";

export class SenderType {
    static USER = 'user';
    static AI = 'ai';
}

@Entity("chat_history")
export class ChatHistory {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    sessionId: string; // Bisa pakai whatsappNumber pelanggan

    @Column('text')
    message: string;

    @Column()
    sender: string

    @CreateDateColumn()
    timestamp: Date;

    // Relasi
    @ManyToOne(() => Customer, (customer) => customer.chatHistories)
    customer: Customer;
}