import { Customer } from "src/modules/customers/entities/customer.entity";
import { Merchant } from "src/modules/merchant/entities/merchant.entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { OrderItem } from "./order-item.entity";

export enum StatusOrder {
    PENDING = 'pending'
    , CONFIRMED = 'confirmed'
    , PREPARING = 'preparing'
    , READY = 'ready'
    , COMPLETED = 'completed'
    , CANCELLED = 'cancelled'
}

export enum OrderType {
    DINE_IN = 'dine_in',
    TAKE_AWAY = 'take_away'
}

@Entity()
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        default: StatusOrder.PENDING,
    })
    status: string; // Status pesanan
    
    @Column('decimal')
    totalAmount: number;

    @Column({ default: OrderType.DINE_IN })
    orderType: string;

    @CreateDateColumn()
    createdAt: Date;

    // Relasi
    @ManyToOne(() => Merchant, (merchant) => merchant.orders)
    merchant: Merchant;

    @ManyToOne(() => Customer, (customer) => customer.orders)
    customer: Customer;

    @OneToMany(() => OrderItem, (item) => item.order)
    items: OrderItem[];
}



