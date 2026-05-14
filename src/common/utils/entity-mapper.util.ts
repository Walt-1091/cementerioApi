export class EntityMapper {
  static applyUpdates<T extends object, D extends Partial<T>>(
    entity: T,
    dto: D,
  ): T {
    for (const key of Object.keys(dto) as (keyof D)[]) {
      if (dto[key] !== undefined) {
        (entity as any)[key] = dto[key];
      }
    }
    return entity;
  }
}