import useResource from "./useResource";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function useProductAPI(id: undefined | string = undefined) {
  const { createResource, fetchResource, deleteResource, updateResource } =
    useResource({ resource: `stores/item/` });

  return {
    createProduct: createResource,
    fetchProduct: fetchResource,
    updateProduct: updateResource,
    deleteProduct: deleteResource,
  };
}
