
export enum OrderStatus {
    PENDING = 'PENDING',
    DELIVERED = 'DELIVERED',
    CANCELED = 'CANCELED',
    PAID = 'PAID',
}

export const OrderStatusList = [
    OrderStatus.PENDING,
    OrderStatus.DELIVERED,
    OrderStatus.CANCELED,
    OrderStatus.PAID,
]