import { createProdMockServer } from "vite-plugin-mock/es/createProdMockServer";
import mocks from "./index.js";

console.log(mocks);

export function setupProdMockServer() {
    createProdMockServer([...mocks]);
}