import { createServer } from "miragejs";
import { listEmployeesData } from "../mocks/listEmployeesData";

export function makeServerGetEmployees() {
  createServer({
    routes() {
      this.namespace = "api";

      this.get("/employees", () => {
        return listEmployeesData;
      });
    },
  });
}
