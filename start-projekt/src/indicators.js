import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getIndicators(query) {
  await fakeNetwork(`getIndicators:${query}`);
  let indicators = await localforage.getItem("indicators");
  if (!indicators) indicators = [];
  if (query) {
    indicators = matchSorter(indicators, query, { keys: ["title", "description", "test", "data"] });
  }
  return indicators.sort(sortBy("last", "createdAt"));
}

export async function createIndicator() {
  await fakeNetwork();
  let id = Math.random().toString(36).substring(2, 9);
  let indicator = { id, createdAt: Date.now() };
  let indicators = await getIndicators();
  indicators.unshift(indicator);
  await set(indicators);
  return indicator;
}

export async function getIndicator(id) {
  await fakeNetwork(`indicator:${id}`);
  let indicators = await localforage.getItem("indicators");
  let indicator = indicators.find(indicator => indicator.id === id);
  return indicator ?? null;
}


export async function updateIndicator(id, updates, parsedData) {
  await fakeNetwork();
  let indicators = await localforage.getItem("indicators");
  let indicator = indicators.find(indicator => indicator.id === id);
  if (!indicator) throw new Error("No indicator found for", id);
  Object.assign(indicator, updates, { data: parsedData });
  await set(indicators);
  return indicator;
}

export async function destroyIndicator(id) {
  let indicators = await localforage.getItem("indicators");
  let index = indicators.findIndex(indicator => indicator.id === id);
  if (index > -1) {
    indicators.splice(index, 1);
    await set(indicators);
    return true;
  }
  return false;
}

function set(indicators) {
  return localforage.setItem("indicators", indicators);
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
