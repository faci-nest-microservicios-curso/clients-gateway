import { IsEnum, IsOptional } from "class-validator"
import { PaginationDto } from "../../common"
import { OrderStatus, OrderStatusList } from "../enums/order.enum"

export class OrderPaginationDto extends PaginationDto {

    @IsOptional()
    @IsEnum(OrderStatusList, {
        message: `Posibble status values are: ${OrderStatusList}`
    })
    status?: OrderStatus
}
