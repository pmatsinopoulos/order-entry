import commonFetchHeaders from './commonFetchHeaders';
import {ORDERS_BACKEND_URL} from "../constants";

async function graphQLFetch({
  method = 'POST',
  query,
  variables = {},
}) {
  let result;
  try {
    let headers = {...commonFetchHeaders};

    let url = new URL(`${ORDERS_BACKEND_URL}/graphql`);

    const dataObj = {query, variables};

    if (method === 'GET') {
      url.searchParams.append('query', query);
      url.searchParams.append(
        'variables',
        JSON.stringify(variables),
      );
    }

    let fetchOptions = {method, headers};

    if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
      fetchOptions.body = JSON.stringify(dataObj);
    }

    const response = await fetch(url, fetchOptions);

    if (!response.ok && response.status >= 500) {
      const errorMessage = `[GraphQL fetch NOK response]: status: ${
        response.status
      }, ${response.statusText}`;
      throw new Error(errorMessage);
    }
    const parsedRes = await response.json();
    if (!parsedRes) {
      throw new Error('Something went wrong returning json data');
    } else {
      if (parsedRes.error) {
        const errorMessage = `[GraphQL fetch NOK response]: status: ${
          response.status
        }, ${parsedRes.error.message}`;
        throw new Error(errorMessage);
      }
      result = parsedRes;
    }
  } catch (error) {
    const errorMessage = `[GraphQL fetch threw error]: ${error}`;
    console.error(errorMessage);
    throw error;
  }
  return result;
}

export default graphQLFetch;
