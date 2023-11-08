import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

interface Table {
  id: string;
  title?: string;
  data?: any;
  last: number;
  createdAt: number;
}

export async function getTables(query: string): Promise<Table[]> {
  let tables: Table[] = await localforage.getItem("tables") || [];
  if (query) {
    tables = matchSorter(tables, query, { keys: ["title"] });
  }
  return tables.sort(sortBy("last", "createdAt"));
}

export async function createTable(): Promise<Table> {
  let id: string = Math.random().toString(36).substring(2, 9);
  let table: Table = { id, createdAt: Date.now(), last: Date.now() };
  let tables: Table[] = await getTables("");
  tables.unshift(table);
  await set(tables);
  return table;
}

export async function getTable(id: string): Promise<Table | null> {
  let tables: Table[] = await localforage.getItem("tables") || [];
  let table: Table | undefined = tables.find(table => table.id === id);
  return table || null;
}

export async function updateTable(id: string, title: any, parsedData: any): Promise<Table> {
  let tables: Table[] = await localforage.getItem("tables") || [];
  let table: Table | undefined = tables.find(table => table.id === id);
  if (!table) {
    throw new Error(`No table found for ${id}`);
  }
  table.data = parsedData;
  table.last = Date.now();
  table.title = title;
  await set(tables);
  return table;
}

export async function destroyTable(id: string): Promise<boolean> {
  let tables: Table[] = await localforage.getItem("tables") || [];
  let index: number = tables.findIndex(table => table.id === id);
  if (index > -1) {
    tables.splice(index, 1);
    await set(tables);
    return true;
  }
  return false;
}

async function set(tables: Table[]): Promise<void> {
  await localforage.setItem("tables", tables);
}