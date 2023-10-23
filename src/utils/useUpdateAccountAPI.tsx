import useResource from "./useResource";

export default function useUpdateAccountAPI() {
  const { updateResourceWithoutID } = useResource({
    resource: `account/update_info/`,
  });

  return {
    updateUser: updateResourceWithoutID,
  };
}
