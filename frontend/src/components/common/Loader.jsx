export default function Loader({ label = "Loading stories..." }) {
  return (
    <div className="loader">
      <div className="loader-orbit" />
      <p>{label}</p>
    </div>
  );
}

