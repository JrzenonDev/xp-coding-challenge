import { createServer } from "miragejs";
import { listEmployeesData } from "../mocks/listEmployeesData";
import { dashBoardData } from "../mocks/dashBoardData";

export function makeServer() {
  createServer({
    routes() {
      this.namespace = "api";

      this.get("/employees", () => {
        return listEmployeesData;
      });

      this.get("/dashboard", () => {
        console.log("Endpoint /dashboard chamado");
        return dashBoardData;
      });
    },
  });
}
