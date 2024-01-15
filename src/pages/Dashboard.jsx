import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
const Dashboard = () => {
  // Get search params
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  console.log(code);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const client_id = "119836";
  const client_secret = "f2e604d3dde0d5c33333bf2d7cc167bb41047325";
  const code_No = code;
  const grant_type = "authorization_code";
  // get access token

  const getAccessToken = async () => {
    try {
      const response = await fetch(
        `https://www.strava.com/oauth/token?client_id=${client_id}&client_secret=${client_secret}&code=${code_No}&grant_type=${grant_type}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      const data = await response.json();

      return data;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      // get access token
      const {access_token} = await getAccessToken();
      console.log(access_token);
      try {
        const response = await fetch(
          `https://www.strava.com/api/v3/athlete/activities?access_token=${access_token}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        toast.success("Logged in Successfully");
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [code]);

  console.log(data);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-white">Error: {error.message}</p>;
  }
  return (
    <div className="relative overflow-x-auto p-4">
      <table className="w-full text-sm text-left rtl:text-right  text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              activity Name
            </th>
            <th scope="col" className="px-6 py-3">
              elapsed time
            </th>
            <th scope="col" className="px-6 py-3">
              distance
            </th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((activity) => (
              <tr className="bg-white dark:bg-gray-800" key={activity.id}>
                <td className="px-6 py-4 whitespace-nowrap">{activity.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{activity.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {activity.elapsed_time}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {activity.distance}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
