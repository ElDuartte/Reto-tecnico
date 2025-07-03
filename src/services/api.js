// Add create a .env file and add the two variables
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

// GET all the phones
export async function getProducts(
  path,
  { params = {}, headers = {}, ...fetchOptions } = {}
) {
  // Build full URL with query params
  const url = new URL(`${BASE_URL}${path}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value != null && value !== '') {
      url.searchParams.append(key, String(value));
    }
  });

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        ...headers,
      },
      ...fetchOptions,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const message =
        errorData.message || `HTTP error! status: ${response.status}`;
      throw new Error(message);
    }

    return await response.json();
  } catch (error) {
    console.error('API GET Error:', error);
    throw error;
  }
}

export async function getProductById(id, options = {}) {
  if (!id) throw new Error('Product ID is required');
  return getProducts(`/products/${id}`, options);
}
