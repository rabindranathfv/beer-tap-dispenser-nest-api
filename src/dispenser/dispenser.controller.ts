import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { DispenserService } from './dispenser.service';
import { CreateDispenserDto } from './dto/create-dispenser.dto';
import { UpdateDispenserDto } from './dto/update-dispenser.dto';
import { Dispenser } from './schema/dispenser.schema';
import { DispenserCreated } from './type/types';

@Controller('dispenser')
export class DispenserController {
  constructor(private readonly dispenserService: DispenserService) {}

  @Post()
  async create(
    @Body() createDispenserDto: CreateDispenserDto,
  ): Promise<DispenserCreated> {
    console.log(
      '🚀 ~ file: dispenser.controller.ts:24 ~ DispenserController ~ createDispenserDto:',
      createDispenserDto,
    );
    try {
      const newDispenser = await this.dispenserService.create(
        createDispenserDto,
      );
      const mappedDispenser = {
        id: newDispenser._id,
        flow_volume: newDispenser.flow_volume,
      };

      return mappedDispenser;
    } catch (error) {
      throw new HttpException(
        'Unexpected API error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id/spending')
  async getDispenserSpending(@Param('id') id: string) {
    try {
      const dispenser = await this.dispenserService.getDispenserSpending(id);

      if (!dispenser) {
        throw new HttpException(
          'Requested dispenser does not exist',
          HttpStatus.NOT_FOUND,
        );
      }

      return dispenser;
    } catch (error) {
      console.log(
        '🚀 ~ file: dispenser.controller.ts:52 ~ DispenserController ~ getDispenserSpending ~ error:',
        error,
      );
      throw new HttpException(
        'Unexpected API error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id/status')
  async updateDispenser(
    @Param('id') id: string,
    @Body() updateDispenserDto: UpdateDispenserDto,
  ) {
    try {
      const dispenser = await this.dispenserService.updateDispenser(
        id,
        updateDispenserDto,
      );

      if (!dispenser) {
        throw new HttpException(
          'Dispenser is already opened/closed',
          HttpStatus.CONFLICT,
        );
      }

      return `Status of the tap changed correctly`;
    } catch (error) {
      throw new HttpException(
        'Unexpected API error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
