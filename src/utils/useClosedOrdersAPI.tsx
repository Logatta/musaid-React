import useResource from "./useResource";

export default function useClosedOrdersAPI() {
  const { fetchResource } = useResource({
    resource: `cart/admin_archive/closed/view`,
  });

  return {
    fetchOrders: fetchResource,
  };
}
