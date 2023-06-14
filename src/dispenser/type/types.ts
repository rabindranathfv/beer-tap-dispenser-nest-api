import { Dispenser } from '../schema/dispenser.schema';

export type DispenserCreated = Omit<Dispenser, 'status' | 'usage'>;
