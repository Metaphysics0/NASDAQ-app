async function get_response(url) {
  console.log(url);
  const response = await fetch(url);
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message, response.text());
  }
  return await response.json();
}
