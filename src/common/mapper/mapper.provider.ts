import { mapper } from "./mapper";


export const MapperProvider = {
  provide: 'MAPPER',
  useValue: mapper,
};