import { createServer } from "miragejs";
import { listEmployeesData } from "../mocks/listEmployeesData";

export function makeServer() {
  createServer({
    routes() {
      this.namespace = "api";

      this.get("/employees", () => {
        return listEmployeesData;
      });
    },
  });
}
