import useResource from "./useResource";

export default function useGetAccountAPI() {
  const { fetchResource } = useResource({
    resource: `account/get_user/`,
  });

  return {
    fetchUser: fetchResource,
  };
}
