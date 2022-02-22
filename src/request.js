export default function Request({
  url,
  data,
  method = "GET",
  callback = () => {}
}) {
  const body = data ? JSON.stringify(data) : null;
  const xhr = new XMLHttpRequest();
  xhr.onerror = handler;
  xhr.onload = handler;
  xhr.open(method, url);
  xhr.setRequestHeader("Content-Type", "application/json");
  //xhr.setRequestHeader("Authorization", `Basic: ${getCredentials()}`);
  xhr.send(body);
  return xhr;

  function handler() {
    callback({
      err: xhr.status >= 300 ? parseError(xhr) : null,
      data: parseData(xhr),
      headers: parseHeaders(xhr)
    });
  }
}

function parseError(xhr) {
  try {
    const err = JSON.parse(xhr.responseText);
    return new Error(err.error || err.message || err.status.message);
  } catch {
    return new Error(xhr.statusText || xhr.status);
  }
}

function parseData(xhr) {
  try {
    return JSON.parse(xhr.responseText);
  } catch {
    return {};
  }
}

function parseHeaders(xhr) {
  try {
    return xhr
      .getAllResponseHeaders()
      .trim()
      .split(/[\r\n]+/)
      .reduce((prev, cur) => {
        const [key, ...values] = cur.split(": ");
        prev[key] = values.join(": ");
        return prev;
      }, {});
  } catch {
    return {};
  }
}

// function getCredentials() {
//   return btoa(`${process.env.REACT_APP_ACCOUNTID}:${process.env.REACT_APP_LICENSEKEY}`);
// }
