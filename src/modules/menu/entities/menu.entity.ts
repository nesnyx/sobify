import { Merchant } from "src/modules/merchant/entities/merchant.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";


@Entity("menu_item")
export class MenuItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string; // Misal: "Kopi Susu Gula Aren"

  @Column('text')
  description: string; // Deskripsi singkat untuk AI

  @Column('decimal')
  price: number;

  @Column({ default: true })
  isAvailable: boolean; // PENTING! Untuk cek stok

  @Column({ nullable: true })
  category: string; // Misal: "Coffee", "Non-Coffee", "Snack"

  // Relasi
  @ManyToOne(() => Merchant, (merchant) => merchant.menuItems)
  merchant: Merchant;
}

export class Menu {}