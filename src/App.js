import { useEffect, useCallback, useState } from "react";
import MapChart from "./MapChart";
import Request from "./request";
import "./App.css";

const App = () => {
  const [ip, setIp] = useState("");
  const [err, setErr] = useState(null);
  const [location, setLocation] = useState(null);

  const onGetLocation = useCallback(({ err, data }) => {
    if (err) {
      setErr(err.message);
    } else {
      setLocation({
        city: data.city?.names?.en,
        postal_code: data.postal?.code,
        country: data.country?.names?.en,
        continent: data.continent?.names?.en,
        latitude: data.location?.latitude,
        longitude: data.location?.longitude
      });
    }
  }, []);

  const getLocation = () => {
    setErr(null);
    setLocation(null);
    Request({ url: `/geoip/v2.1/city/${ip}`, callback: onGetLocation });
  };

  useEffect(() => setIp(sessionStorage.getItem("ip")), []);

  return (
    <main>
      <div>
        <label htmlFor="ip-address">IP Address</label>
      </div>
      <input
        id="ip-address"
        data-testid="ip-address"
        type="text"
        value={ip || ""}
        onChange={event => setIp(event.target.value)}
      ></input>
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
