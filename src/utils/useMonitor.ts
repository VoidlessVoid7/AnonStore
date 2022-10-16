import { useEffect } from "react"

export const useMonitor = (key: string, state: any) => {
    useEffect(() => {
        console.log(key, state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state])
}