export const Post = async (url: string, object: object) => {
  const jwt: string = localStorage.getItem("KRIO_SYSTEM") || "";

  const headers = new Headers();
  headers.set("Content-Type", "application/json; charset=utf-8");
  headers.set("jwt", jwt);
  const body = JSON.stringify(object);

  const res = await fetch(`${url}`, {
    method: "POST",
    headers: headers,
    body: body,
  });

  const json = await res.json();

  if (res.ok) {
    return json;
  } else {
    throw new Error(json.message);
  }
};

export const Get = async (url: string) => {
  const res = await fetch(url);
  const json = await res.json();

  if (res.ok) {
    return json;
  } else {
    throw new Error(json.message);
  }
};

export const Put = async (url: string, object: object) => {
  const jwt: string = localStorage.getItem("KRIO_SYSTEM") || "";

  const headers = new Headers();

  headers.set("Content-Type", "application/json");
  headers.set("jwt", jwt);

  const body = JSON.stringify(object);
  const res = await fetch(`${url}`, {
    method: "PUT",
    headers: headers,
    body: body,
  });
  const json = await res.json();

  if (res.ok) {
    return json;
  } else {
    throw new Error(json.message);
  }
};

export const Remove = async (url: string) => {
  const jwt: string = localStorage.getItem("KRIO_SYSTEM") || "";

  const headers = new Headers();
  
  headers.set("Content-Type", "application/json");
  headers.set("jwt", jwt);

  await fetch(`${url}`, { method: "DELETE", headers: headers });
  return true;
};
