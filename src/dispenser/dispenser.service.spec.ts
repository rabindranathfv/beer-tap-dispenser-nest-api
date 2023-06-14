import { Test, TestingModule } from '@nestjs/testing';
import { DispenserService } from './dispenser.service';
import { getModelToken } from '@nestjs/mongoose';
import { Dispenser } from './schema/dispenser.schema';
import { Usage } from './schema/usage.schema';
import { Model } from 'mongoose';

describe('DispenserService', () => {
  let service: DispenserService;
  let modelDispenser: Model<Dispenser>;
  let modelUsage: Model<Usage>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<DispenserService>(DispenserService);
    modelDispenser = module.get<Model<Dispenser>>(
      getModelToken(Dispenser.name),
    );
    modelUsage = module.get<Model<Usage>>(getModelToken(Usage.name));
  });

  it('should be defined', () => {
    expect(modelDispenser).toBeDefined();
    expect(modelUsage).toBeDefined();
    expect(service).toBeDefined();
  });
});
