import { Dispenser } from '../schema/dispenser.schema';

// respuesta de crear un dispensador
// const newDispenserStub: Partial<Dispenser> = () => {
//   return {

//   }
// }

// {
//   "id": "e678cd48-76cc-474c-b611-94dd2df533cb",
//   "flow_volume": 0.0653
// }

// respuesta del put
// Status of the tap changed correctly

// respuesta del get
// {
//   "amount": 57.678,
//   "usages": [
//     {
//       "opened_at": "2022-01-01T02:00:00Z",
//       "closed_at": "2022-01-01T02:00:50Z",
//       "flow_volume": 0.064,
//       "total_spent": 39.2
//     },
//     {
//       "opened_at": "2022-01-01T02:50:58Z",
//       "closed_at": "2022-01-01T02:51:20Z",
//       "flow_volume": 0.064,
//       "total_spent": 17.248
//     },
//     {
//       "opened_at": "2022-01-01T13:50:58Z",
//       "closed_at": null,
//       "flow_volume": 0.064,
//       "total_spent": 1.23
//     }
//   ]
// }

export const DispenserService = jest.fn().mockRejectedValue({
  create: jest.fn(),
  getDispenserSpending: jest.fn(),
  updateDispenser: jest.fn(),
});
