import { useEffect, useState } from "react";
import MapChart from "../MapChart/MapChart";
import Request from "../../request/request";
import "./App.css";

const App = () => {
  const [ip, setIp] = useState("");
  const [err, setErr] = useState(null);
  const [location, setLocation] = useState(null);

  const formatLocation = data => ({
    city: data.city?.names?.en,
    postal_code: data.postal?.code,
    country: data.country?.names?.en,
    continent: data.continent?.names?.en,
    latitude: data.location?.latitude,
    longitude: data.location?.longitude
  });

  const getLocation = () => {
    setErr(null);
    setLocation(null);
    Request({
      url: `/geoip/v2.1/city/${ip}`,
      callback: ({ err, data }) =>
        err ? setErr(err.message) : setLocation(formatLocation(data))
    });
  };

  useEffect(() => {
    const browserIp = sessionStorage.getItem("ip");
    browserIp && setIp(browserIp);
  }, []);

  return (
    <main>
      <div>
        <label htmlFor="ip-address">IP Address</label>
      </div>
      <input
        value={ip}
        type="text"
        id="ip-address"
        data-testid="ip-address"
        onChange={event => setIp(event.target.value)}
      />
      <button onClick={getLocation}>Get Location</button>

      {err && <pre>{err}</pre>}

      {location && (
        <>
          <pre>{JSON.stringify(location, null, 2)}</pre>
          <MapChart
            latitude={location.latitude}
            longitude={location.longitude}
          />
        </>
      )}
    </main>
  );
};

export default App;
