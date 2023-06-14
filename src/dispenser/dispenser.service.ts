import { Injectable } from '@nestjs/common';
import { CreateDispenserDto } from './dto/create-dispenser.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Dispenser, DispenserDocument } from './schema/dispenser.schema';
import { Model } from 'mongoose';
import { BASE_SPENDING_PRICE, Status } from './constants';
import { UpdateDispenserDto } from './dto/update-dispenser.dto';
import { SpendingDispenserDto } from './dto/spending-dispenser.dto';
import { Usage, UsageDocument } from './schema/usage.schema';
import { DispenserCreated } from './type/types';

@Injectable()
export class DispenserService {
  constructor(
    @InjectModel(Dispenser.name)
    private readonly dispenserModel: Model<DispenserDocument>,
    @InjectModel(Usage.name)
    private readonly usageModel: Model<UsageDocument>,
  ) {}

  async create(
    createDispenserDto: CreateDispenserDto,
  ): Promise<DispenserCreated> {
    try {
      const dispenser = {
        flow_volume: createDispenserDto.flow_volume,
        status: Status.CLOSE,
      };
      const newDispenser = await this.dispenserModel.create(dispenser);
      return newDispenser;
    } catch (error) {
      return error;
    }
  }

  async getDispenserSpending(id: string): Promise<SpendingDispenserDto | null> {
    try {
      const dispensers: Dispenser = await this.dispenserModel
        .findById(id)
        .populate('usage')
        .exec();

      if (!dispensers) {
        return null;
      }

      const usages = dispensers.usage.map((usage: Usage) => {
        const today = new Date();
        const totalSpent = usage.closed_at
          ? ((usage.flow_volume *
              (usage.closed_at.getTime() - usage.opened_at.getTime())) /
              1000) *
            BASE_SPENDING_PRICE
          : ((usage.flow_volume *
              (today.getTime() - usage.opened_at.getTime())) /
              1000) *
            BASE_SPENDING_PRICE;

        return {
          opened_at: usage.opened_at,
          closed_at: usage.closed_at,
          flow_volume: usage.flow_volume,
          total_spent: totalSpent,
        };
      });

      const amount = usages.reduce(
        (total, usage) => total + usage.total_spent,
        0,
      );

      return {
        amount,
        usages,
      };
    } catch (error) {
      return error;
    }
  }

  async updateDispenser(
    id: string,
    updateDispenserDto: UpdateDispenserDto,
  ): Promise<any> {
    try {
      const { status } = updateDispenserDto;

      const dispenser = await this.dispenserModel
        .findById(id)
        .populate('usage')
        .exec();

      if (!dispenser) return null;

      const currentUsage: Usage = dispenser.usage.find(
        (usage) => usage.closed_at === null,
      );

      if (updateDispenserDto.status === Status.OPEN) {
        if (!currentUsage) {
          const newUsage = await new this.usageModel({
            dispenser: dispenser._id,
            opened_at: new Date(updateDispenserDto.updated_at),
            closed_at: null,
            flow_volume: dispenser.flow_volume,
          });
          dispenser.usage.push(newUsage);
          await newUsage.save();
        }
      } else {
        if (currentUsage) {
          const newClosed = new Date(updateDispenserDto.updated_at);
          await this.usageModel.updateOne(
            {
              _id: currentUsage._id,
            },
            { closed_at: newClosed },
          );
        }
      }

      dispenser.status = status;

      await dispenser.save();

      return this.dispenserModel.findById(id).populate('usage').exec();
    } catch (error) {
      return error;
    }
  }
}
