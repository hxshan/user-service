import customerRoutes from "./customerRoutes.js";
import driverRoutes from "./driverRoutes.js";
const routes = (app) => {
  app.use("/customer", customerRoutes);
  app.use("/driver", driverRoutes);
};
export { routes };
