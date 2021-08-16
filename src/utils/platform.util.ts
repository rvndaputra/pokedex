import Configs from "../configs";

const isDev = Configs.NODE_ENV === "development";
const isProd = Configs.NODE_ENV === "production";
const isServer = () => typeof window === "undefined";

export { isDev, isProd, isServer };
