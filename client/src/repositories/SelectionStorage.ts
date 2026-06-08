export interface SelectionStorage {
  getIds(): string[] | null;
  setIds(ids: string[]): void;
}
