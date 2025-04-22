import customerRoutes from "./customerRoutes";
const routes = (app) => {
  app.use("/customer", customerRoutes);
};
export { routes };
