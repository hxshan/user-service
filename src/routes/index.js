import customerRoutes from "./customerRoutes.js";
const routes = (app) => {
  app.use("/customer", customerRoutes);
};
export { routes };
