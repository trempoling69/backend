Plantes: {
  id: 'UUID';
  name: 'string';
  description: 'string';
  color_available: 'string';
  type_id: 'CLE ETRANGERE TYPES';
  feuillage: 'string';
  collection_id: 'CLE ETRANGERE COLLECTIONS';
  exposition: 'string';
  hauteur: 'string';
  mois_floraison: 'string';
  periode_floraison: 'string';
  besoin_eau: 'string';
  picture: 'string';
  availability: 'boolean';
  price_id: 'CLE ETRANGERE PRICES';
  emplacement: 'string';
  quantiteProd: 'int';
  catchphrase: 'string';
  pot_id: 'CLE ETRANGERE POTS';
  hashPlante: 'string';
}

Types: {
  id: 'UUID';
  name: 'string';
}

Collection: {
  id: 'UUID';
  name: 'string';
}

Pots: {
  id: 'UUID';
  size: 'int';
  color: 'string';
  brand: 'string';
}

Prices: {
  id: 'UUID';
  name: 'string';
  amount: 'int';
  usualname: 'string';
  type: 'string';
  category_id: 'CLE ETRANGERE CATEGORYPRICES';
  hashPrice: 'string';
}

CategoryPrices: {
  id: 'UUID';
  name: 'string';
}

Plantes: {
  id: 'UUID';
  name: 'string';
  description: 'string';
  color_available: 'string';
  type_id: 'CLE ETRANGERE TAGS';
  feuillage: 'CLE ETRANGERE TAGS';
  collection_id: 'CLE ETRANGERE TAGS';
  exposition: 'CLE ETRANGERE TAGS';
  hauteur: 'string';
  mois_floraison: 'string';
  periode_floraison: 'CLE ETRANGERE TAGS';
  besoin_eau: 'CLE ETRANGERE TAGS';
  picture: 'string';
  availability: 'boolean';
  price_id: 'CLE ETRANGERE PRICES';
  emplacement: 'CLE ETRANGERE TAGS';
  quantiteProd: 'int';
  catchphrase: 'string';
  pot_id: 'CLE ETRANGERE POTS';
  hashPlante: 'string';
}

tags: {
  id: 'UUID';
  name: 'string';
  type: 'string';
}
