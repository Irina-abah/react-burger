export function checkResponse(res: Response) {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Error ${res.status}`)
};