export function checkResponse(res: any) {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Error ${res.status}`)
};