import { Test, TestingModule } from '@nestjs/testing';
import { DispenserController } from './dispenser.controller';
import { DispenserService } from './dispenser.service';
import { getModelToken } from '@nestjs/mongoose';
import { Dispenser } from './schema/dispenser.schema';
import { Usage } from './schema/usage.schema';

describe('DispenserController', () => {
  let controller: DispenserController;
  let service: DispenserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DispenserController],
      providers: [
        DispenserService,
        {
          provide: getModelToken(Dispenser.name),
          useClass: Dispenser,
        },
        {
          provide: getModelToken(Usage.name),
          useClass: Usage,
        },
      ],
    }).compile();

    controller = module.get<DispenserController>(DispenserController);
    service = module.get<DispenserService>(DispenserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
