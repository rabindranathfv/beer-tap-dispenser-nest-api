import { Usage } from '../schema/usage.schema';

export class UsageWithTotalSpent extends Usage {
  total_spent: number;
}

export class SpendingDispenserDto {
  amount: number;
  usages: UsageWithTotalSpent[];
}
