import useResource from "./useResource";

export default function useProfitsAPI() {
  const { fetchResource } = useResource({
    resource: `stores/profits/view`,
  });

  return {
    fetchProfits: fetchResource,
  };
}
