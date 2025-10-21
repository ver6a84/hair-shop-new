import { HAIR_LENGTHS,LIDER_IDS } from '../utils/constants.js'

export const baseUrl = 'https://api.perukytyt.com/v1'
export const baseUrlV2 = 'https://api.perukytyt.com/v2'
export const itemsPerPage = 10

export const getProducts = async ({
  category,
  type,
  length,
  minPrice,
  maxPrice,
  page = 1,
  sortOrder = null,
  ids = null
}) => {
  const queryParams = new URLSearchParams();
  if (category) queryParams.append('category', category);
  if (type) queryParams.append('type', type);
  if (length) queryParams.append('length', length);
  if (minPrice) queryParams.append('minPrice', minPrice);
  if (maxPrice) queryParams.append('maxPrice', maxPrice);
  if (page) queryParams.append('page', page);
  if (sortOrder) queryParams.append('sortOrder', sortOrder);
  
  const response = await fetch(`${baseUrlV2}/products?${queryParams.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const data = await response.json()
  const { products, totalPages } = data;

  return {
    items: products,
    totalPages
  }
}

export const getProduct = async (id) => {
  const response = await fetch(`${baseUrl}/products/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  return data.product;
};

export const getLiderProducts = async () => {
  const response = await fetch(`${baseUrlV2}/products?ids=${LIDER_IDS.join(',')}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  return data.products;
};
