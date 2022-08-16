export function get_uid() {
  const query = new URLSearchParams(location.search);
  let uid = query.get("uid");
  if (!uid) {
    uid = Math.random().toString(36).slice(2);
    update_query({ uid });
  }
  console.debug("uid =", uid);
  return uid;
}

function update_query(set: Record<string, string | undefined>) {
  const query = new URLSearchParams(location.search);
  for (const key of Object.keys(set)) {
    if (set[key] === undefined) {
      query.delete(key);
    } else {
      query.set(key, set[key]!);
    }
  }
  history.replaceState(null, "", "?" + query.toString());
}

export function search_parse() {
  let resultObj: any = {};
  let search = window.location.search;
  if (search && search.length > 1) {
    search = search.substring(1);
    let items = search.split('&');
    items.forEach(item => {
      const pair = item.split("=");
      resultObj[pair[0]] = pair[1];
    })
    }
  return resultObj;
}

type Last<T> = T extends [...any, infer Last] ? Last : never;

export function search_roomId() {
  let resultObj: any = {};
  let search = window.location.href;
  console.log(`search=${search}`);
  if (search && search.length > 1) {
    const myURL = new URL(search);
    let items = myURL.pathname.split('/');
    return items.pop();
  }
  return "";
}