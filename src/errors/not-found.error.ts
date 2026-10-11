export class NotFoundError extends Error {
  constructor(entityName: string, id: string) {
    super(`${entityName} ${id} not found`);

    this.name = "NotFoundError";
  }
}
