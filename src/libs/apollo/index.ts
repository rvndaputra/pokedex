import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import Configs from "../../configs";

const httpLink = new HttpLink({
  uri: Configs.SCHEMA_PATH,
  credentials: "include",
  fetch: (uri, options) => {
    if (typeof options?.body === "string") {
      try {
        const { operationName } = JSON.parse(options.body);

        return fetch(`${uri}?=${operationName}`, options);
      } catch {
        return fetch(uri, options);
      }
    }

    return fetch(uri, options);
  },
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([httpLink]),
});

export default client;
