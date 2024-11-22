export function isValidJSON(json: string): boolean {
  try {
    JSON.parse(json);
    return true;
  } catch (_) {
    return false;
  }
}

