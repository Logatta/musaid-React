import useResource from "./useResource";

export default function useOrdersAPI() {
  const { fetchResource } = useResource({
    resource: `cart/admin_archive/ongoing/view`,
  });

  return {
    fetchOrders: fetchResource,
  };
}
