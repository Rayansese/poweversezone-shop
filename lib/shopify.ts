/**
 * Shopify Storefront API Utility
 * This file handles all data fetching from your Shopify backend.
 */

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export async function shopifyFetch({
  query,
  variables = {},
}: {
  query: string;
  variables?: any;
}) {
  const endpoint = `https://${domain}/api/2024-01/graphql.json`;

  if (!domain || !storefrontAccessToken) {
    console.warn("Shopify credentials missing. Using mock data instead.");
    return { data: null, error: "Missing Shopify credentials" };
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      body: JSON.stringify({ query, variables }),
    });

    const body = await response.json();

    if (body.errors) {
      console.error('Shopify GraphQL Errors:', body.errors);
      throw new Error(body.errors[0].message);
    }

    return { status: response.status, body };
  } catch (error) {
    console.error('Error fetching from Shopify:', error);
    throw error;
  }
}

// --- QUERIES ---

export const GET_PRODUCTS_QUERY = `
  query getProducts {
    products(first: 20) {
      edges {
        node {
          id
          title
          handle
          description
          availableForSale
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                availableForSale
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`;

// --- MUTATIONS (CART & CHECKOUT) ---

export const CREATE_CART_MUTATION = `
  mutation createCart($lineItems: [CartLineInput!]) {
    cartCreate(input: { lines: $lineItems }) {
      cart {
        id
        checkoutUrl
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 10) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  product {
                    title
                    handle
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

