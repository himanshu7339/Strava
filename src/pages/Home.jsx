const Home = () => {
  const client_id = "119836";
  const redirect_uri = "http://localhost:5173/dashboard";

  const authorization_uri = `https://www.strava.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=activity:read_all`;

  // redirect strava login page
  const loginWithStrava = () => {
    window.location.assign(authorization_uri);
  };
  return (
    <div className="home h-[100vh]  bg-[#0F1035] flex items-center justify-center ">
      <div className="flex flex-col  justify-center items-center gap-4">
        <h1 className="text-xl text-white">Click Here And Login</h1>

        <button
          onClick={loginWithStrava}
          type="button"
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Login Now
        </button>
      </div>
    </div>
  );
};

export default Home;
