import useResource from "./useResource";

export default function useImageAPI(id: number) {
  const { createResource } =
    useResource({ resource: `stores/upload_image${id}` });

  return {
    createImage: createResource,
  };
}
