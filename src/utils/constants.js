// App constants
export const APP_NAME = 'Hair Shop'
export const APP_VERSION = '1.0.0'

// API endpoints
export const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.hairshop.com' 
  : 'http://localhost:3000/api'

// Product categories
export const PRODUCT_CATEGORIES = {
  WIGS: 1,
  TAILS: 2,
  TOPPERS: 3
};
export const COLOR_CATEGORIES = {
  LIGHT: 1,
  DARK: 2
}

const HAIR_TYPES = {
  NATURAL: 1,
  SYNTHETIC: 2
};

 export const HAIR_LENGTHS = {
  SHORT: [0, 15],
  MEDIUM: [16, 30],
  LONG: [31, 100]
};

export const CATEGORIES_URLS = {
  [PRODUCT_CATEGORIES.WIGS]: 'wigs',
  [PRODUCT_CATEGORIES.TAILS]: 'tails',
  [PRODUCT_CATEGORIES.TOPPERS]: 'toppers'
};

export const CATEGORIES_TRANSLATIONS = {
  [PRODUCT_CATEGORIES.WIGS]: 'Перуки',
  [PRODUCT_CATEGORIES.TAILS]: 'Хвостики',
  [PRODUCT_CATEGORIES.TOPPERS]: 'Топери'
};

 export const COLOR_CATEGORIES_TRANSLATIONS = {
  [COLOR_CATEGORIES.LIGHT]: 'Світлий',
  [COLOR_CATEGORIES.DARK]: 'Темний'
};

export const HAIR_TYPES_TRANSLATIONS = {
  [HAIR_TYPES.NATURAL]: 'Натуральний',
  [HAIR_TYPES.SYNTHETIC]: 'Синтетичний'
};

 export const HAIR_LENGTHS_TRANSLATIONS = {
  SHORT: 'Коротка',
  MEDIUM: 'Середня',
  LONG: 'Довга'
};

// Routes
export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  CART: '/cart',
  ABOUT: '/about',
  CONTACT: '/contact',
  CONTACT_US: '/contact_us',
  DELIVERY: '/delivery',
  RETURN: '/return',
  CARE: '/care'
}

export const SERVICE_ID = process.env.NEXT_PUBLIC_SERVICE_ID
export const TEMPLATE_ID_CONTACT_US = process.env.NEXT_PUBLIC_TEMPLATE_ID_CONTACT_US
export const TEMPLATE_ID_ORDER = process.env.NEXT_PUBLIC_TEMPLATE_ID_ORDER
export const PUBLIC_KEY = process.env.NEXT_PUBLIC_PUBLIC_KEY
