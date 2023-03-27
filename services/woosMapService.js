export async function woosMapService(query, settings = {}) {
  if (!query) {
    return;
  }

  const url = 'https://api.woosmap.com/localities/autocomplete/';

  const params = new URLSearchParams({
    types: 'address',
    language: 'en',
    components: 'country:gb|country:je|country:gg|country:im',
    ...settings,
    key: process.env.woosmapPublicKey,
    input: query
  });

  try {
    const response = await fetch(`${url}?${params}`);

    if (!response.ok) {
      throw response;
    }

    const { localities } = await response.json();

    return localities;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
