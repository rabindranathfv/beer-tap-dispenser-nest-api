import { IsNumber, Min } from 'class-validator';

export class CreateDispenserDto {
  @IsNumber()
  @Min(0)
  flow_volume: number;
}
