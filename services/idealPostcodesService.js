import { API_URL, API_KEY } from '~/constants/locations';
import { changeSuggestionLine } from '~/helpers/locations';

async function idealPostcodesList(query) {
  if (!query) {
    return;
  }

  const params = new URLSearchParams({
    context: 'GBR',
    limit: 100,
    api_key: API_KEY,
    query
  });

  try {
    const response = await fetch(`${API_URL}?${params}`);

    if (!response.ok) {
      throw response;
    }

    const { result } = await response.json();
    const { hits } = result;

    if (!hits) {
      throw new Error('Suggestions not found');
    }

    const mappedHits = hits.map((hit) => ({
      ...hit,
      suggestion: changeSuggestionLine(hit?.suggestion)
    }));

    return mappedHits;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function idealPostcodesDetail(hitId) {
  if (!hitId) {
    return;
  }

  const params = new URLSearchParams({
    api_key: API_KEY
  });

  try {
    const response = await fetch(`${API_URL}/${hitId}/gbr?${params}`);

    if (!response.ok) {
      throw response;
    }

    const { result } = await response.json();

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { idealPostcodesList, idealPostcodesDetail };
