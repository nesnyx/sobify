import { Runtime, tool } from "langchain"
import { CreateOrderDto } from "src/modules/orders/dto/create-order.dto";
import { OrdersService } from "src/modules/orders/orders.service";

import * as z from "zod";


export const baseTools = async (ordersService: OrdersService) => {
    const saveOrder = tool(
        // ================== PERUBAHAN DI SINI ==================
        // 1. Destructure SEMUA parameter dari Zod schema
        async ({
            customer_name,
            product_name,
            quantity,

        }: {
            customer_name: string;
            product_name: string;
            quantity: number;

        }) => {
            try {
                // 2. Buat DTO yang benar, petakan snake_case ke camelCase
                const orderDto: CreateOrderDto = {
                    customerName: customer_name,
                    productName: product_name,
                    quantity: quantity,

                    // menuItemId tidak ada di schema, jadi akan undefined
                    // Pastikan @IsOptional() di DTO Anda sudah benar
                };

                // 3. Panggil service dengan DTO yang valid
                const order = await ordersService.createAgent(orderDto);

                // 4. Gunakan data yang dikembalikan oleh service
                const statusEmoji = order.status === 'ON-PROCESS' ? '🔄' : '✅';

                // Format respons yang jelas untuk AI
                return `
                ✅ Pesanan berhasil disimpan!
                📦 Nomor Pesanan: ${order.id}
                👤 Nama: ${customer_name}
                ---
                Pesanan:
                - Produk: ${product_name}
               
                ---
                ${statusEmoji} Status: ${order.status}
                📅 Waktu Pesanan: ${new Date(order.createdAt).toLocaleString()} 
                `;

            } catch (err) {
                // Sangat penting untuk log error di konsol NestJS Anda!
                console.error("Kesalahan di dalam tool save_order:", err);

                // Beri tahu AI apa yang salah
                return `Terjadi kesalahan saat menyimpan pesanan: ${err.message}. 
                Beri tahu pelanggan bahwa terjadi kesalahan.`;
            }
        },
        // ================== AKHIR PERUBAHAN ==================
        {
            name: 'save_order',
            description: 'Simpan detail pesanan pelanggan ke dalam database. Ini WAJIB dipanggil untuk setiap pesanan baru.',

            // 2. Perbarui Schema agar sesuai dengan CreateOrderDto
            schema: z.object({
                customer_name: z.string().describe('Nama lengkap pelanggan'),
                product_name: z.string().describe('Nama produk yang dipesan, contoh: "Kopi Susu", "Americano"'),
                quantity: z.number().describe('Jumlah produk yang dipesan'),

            }),
        },
    );

    const checkOrderStatus = tool(
        async({
            order_id
        } : {
            order_id: string;
        }) => {
            try {
                const existingOrder = await ordersService.findOne(order_id);
                if (!existingOrder) {
                    return `⚠️ Pesanan dengan ID ${order_id} tidak ditemukan. Mohon periksa kembali ID pesanan.`;
                }
                return `
                📦 Nomor Pesanan: ${existingOrder.id}
                👤 Nama: ${existingOrder.customer.name}
                    Status Pesanan: ${existingOrder.status}
                `

            } catch (err) {
                // Sangat penting untuk log error di konsol NestJS Anda!
                console.error("Kesalahan di dalam tool check_order_status:", err);

                // Beri tahu AI apa yang salah
                return `Terjadi kesalahan saat melakukan pengecekan pesanan: ${err.message}. 
                Beri tahu pelanggan bahwa terjadi kesalahan.`;
            }
        },
        {
            name: 'check_order_status',
            description: 'Periksa status pesanan berdasarkan ORDER ID pesanan yang diberikan.',
            schema: z.object({
                order_id: z.string().describe('ID unik dari pesanan yang ingin diperiksa statusnya'),
            }),
        }
    )

    return [saveOrder,checkOrderStatus];
}