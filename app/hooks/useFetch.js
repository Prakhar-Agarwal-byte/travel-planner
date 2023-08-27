import { useState, useEffect } from "react";
import { axiosInstance } from "../config/api";

const useFetch = (endpoint, query) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchData = async () => {
        setIsLoading(true)
        try {
            const response = await axiosInstance.get(`/${endpoint}`, {
                params: { ...query },
            })
            setData(response.data)
            setIsLoading(false)
        } catch (error) {
            setError(error)
            alert('There is an error')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const refetch = () => {
        setIsLoading(true)
        fetchData()
    }

    return { data, isLoading, error, refetch }
}

export default useFetch