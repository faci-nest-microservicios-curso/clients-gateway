import { IsEnum } from "class-validator"
import { OrderStatus, OrderStatusList } from "../enums/order.enum"

export class ChangeOrderStatusDto {

    @IsEnum(OrderStatusList, {
        message: `Posibble status values are: ${OrderStatusList}`
    })
    status: OrderStatus
}
