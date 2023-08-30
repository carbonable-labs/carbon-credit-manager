import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'nestjs-prisma';
import { Order } from './entities/order.entity';
import { IOrderService } from './order.interface';

@Injectable()
export class OrderService implements IOrderService {
  constructor(private prisma: PrismaService) {}
  create(userId: string, createOrderDto: CreateOrderDto): Promise<Order> {
    return this.prisma.order.create({
      data: {
        ...createOrderDto,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  findAll(): Promise<Order[]> {
    return this.prisma.order.findMany();
  }

  findOne(id: string): Promise<Order> {
    return this.prisma.order.findUniqueOrThrow({ where: { id } });
  }

  update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    return this.prisma.order.update({ where: { id }, data: updateOrderDto });
  }
}
