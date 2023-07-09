import useSWR from "swr";

const loginUser = () => {
  const { data, error, isLoading, isValidating, mutate } =
    useSWR("/api/auth/login");

  return { user: data, error, isLoading, isValidating };
};
