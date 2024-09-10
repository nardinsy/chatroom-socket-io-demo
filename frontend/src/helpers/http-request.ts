import { ENDPOINTS, getApiAddress } from "./api-url";
export interface MyRequestOptions {
  method: string;
  headers?: any;
  body?: string;
}

const sendHttpRequest = async (
  endpoint: ENDPOINTS,
  requestOptions: MyRequestOptions,
  params?: string
) => {
  const address = getApiAddress(endpoint, params);

  const response = await fetch(address, requestOptions);

  if (response.ok) {
    return await response.json();
  }

  throw new Error("Oops, something went wrong, please try again");
};

export default sendHttpRequest;
