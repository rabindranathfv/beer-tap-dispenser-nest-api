import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsISO8601 } from 'class-validator';
import { CreateDispenserDto } from './create-dispenser.dto';
import { Status } from '../constants';

export class UpdateDispenserDto extends PartialType(CreateDispenserDto) {
  @IsEnum(Status)
  status: Status;

  @IsISO8601()
  updated_at: string;
}
