import useResource from "./useResource";

export default function useCategoryAPI() {
  const { fetchResource } = useResource({ resource: "stores/initialize" });

  return {
    fetchCategory: fetchResource,
  };
}
