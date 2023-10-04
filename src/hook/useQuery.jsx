import { useEffect, useState } from "react";

// cách hiểu :
// const useQuery = (promise) => {
//   const [data, setData] = useState();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState();

//   const fetch = async () => {
//     setLoading(true);
//     try {
//       const res = await promise();
//       if (res?.data) {
//         // console.log("res.data", res.data);
//         setData(res.data.data);
//       }
//     } catch (error) {
//       // catch error nếu lỗi thì sẽ log ra xem lỗi gì
//       // console.log("error", error);
//       setError(error);
//     }
//   };

//   useEffect(() => {
//     fetch();
//   }, []);
//   return { data, error, loading, refect: fetch };
// };

// export default useQuery;

// Copy code :
// hooks/useQuery.js

const useQuery = (promise, dependencies = []) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    fetchData();
  }, dependencies);

  const fetchData = async (query) => {
    setLoading(true);
    try {
      const res = await promise(query);
      setData(res.data?.data || []);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
};

export default useQuery;
