import useSWR from "swr";

const useLogin = () => {
  const { data, error, isLoading, isValidating, mutate } =
    useSWR("/api/auth/login");

  return { user: data, error, isLoading, isValidating };
};
