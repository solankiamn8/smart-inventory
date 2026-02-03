import "./Spinner.css";

const FullPageLoader = () => {
  return (
    <div className="full-page-loader">
      <div className="spinner-large"> </div>
      <p>Loading your dashboard...</p>
    </div>
  );
};

export default FullPageLoader;
