import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getTables(query) {
  await fakeNetwork(`getTables:${query}`);
  let tables = await localforage.getItem("table");
  if (!tables) tables = [];
  if (query) {
    tables = matchSorter(tables, query, { keys: ["title", "data"] });
  }
  return tables.sort(sortBy("last", "createdAt"));
}

export async function createTable() {
  await fakeNetwork();
  let id = Math.random().toString(36).substring(2, 9);
  let table = { id, createdAt: Date.now() };
  let tables = await getTables();
  tables.unshift(table);
  await set(tables);
  return table;
}

export async function getTable(id) {
  await fakeNetwork(`table:${id}`);
  let tables = await localforage.getItem("tables");
  let table = tables.find(table => table.id === id);
  return table ?? null;
}


export async function updateTable(id, updates, parsedData) {
  await fakeNetwork();
  let tables = await localforage.getItem("tables");
  let table = tables.find(table => table.id === id);
  if (!table) throw new Error("No table found for", id);
  Object.assign(table, updates, { data: parsedData });
  await set(tables);
  return table;
}

export async function destroyTable(id) {
  let tables = await localforage.getItem("tables");
  let index = tables.findIndex(table => table.id === id);
  if (index > -1) {
    tables.splice(index, 1);
    await set(tables);
    return true;
  }
  return false;
}

function set(tables) {
  return localforage.setItem("tables", tables);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

async function fakeNetwork(key) {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise(res => {
    setTimeout(res, Math.random() * 800);
  });
}
