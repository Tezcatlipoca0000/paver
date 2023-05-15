import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function useUser() {
    const { data: user, mutate, error } = useSWR("/api/user")

    const loading = !user && !error

    return {
        user,
        isLoading,
        mutate
    }
}