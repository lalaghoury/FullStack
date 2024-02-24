import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import Spinner from "../components/Spinner/Spinner";

export default function PrivateRoute({ Component, ...props }) {
    const [ok, setOk] = useState(false);
    const { auth } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyToken = async () => {
            if (auth?.token) {
                setLoading(true);
                try {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${auth.token}`;
                    const response = await axios.get('http://localhost:5000/verify');
                    setOk(response.data.ok);
                    setLoading(false);
                } catch (error) {
                    console.error("Verification failed:", error);
                    setOk(false);
                    setLoading(false);
                }
            } else {
                setOk(false);
                setLoading(false);
            }
        };
        verifyToken();
    }, [auth?.token]);

    if (loading) return <h1>Loading...</h1>;

    return ok ? <Component {...props} /> : <Spinner />;
}

