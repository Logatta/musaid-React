import useResource from "./useResource";

export default function useMainPageAPI() {
  const { fetchResource } = useResource({ resource: "stores/items" });

  return {
    fetchMainPage: fetchResource,
  };
}
