import { useEffect, useState } from 'react';
import BusFounded from './BusFounded';
import './Map.css';
import axios from 'axios';

export default function Map() {
    const [mapUrl, setMapUrl] = useState('');
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [buses, setBuses] = useState([]);

    const handleSearch = (e) => {
      e.preventDefault();
    axios.post('http://localhost:8081/buses', { source, destination })
        .then(response => {
            setBuses(response.data);
        })
        .catch(error => {
            console.error('Error fetching buses:', error);
        });
    };

    useEffect(() => {
    const randomNumber = Math.random();
    setMapUrl(`https://www.openstreetmap.org/export/embed.html?bbox=73.7175%2C18.4719%2C73.9342%2C18.6039&random=${randomNumber}`);
    }, []);

    return (
        <div className='mapall'>
            <div className='searching'>
                {mapUrl && (
                    <iframe
                        title="map"
                        width="100%"
                        height="100%"
                        frameBorder={0}
                        scrolling="no"
                        marginHeight={0}
                        marginWidth={0}
                        src={mapUrl}
                    ></iframe>
                  )}

              <form onSubmit={handleSearch}>
                  <div className="inputs">
                      <input id="source" type="text" placeholder="Enter Source" value={source} onChange={e => setSource(e.target.value)}/>

                      <input id="destination" type="text" placeholder="Enter Destination" value={destination} onChange={e => setDestination(e.target.value)}/>

                      <input id="time" type="time" placeholder="Time" />
                  </div>

                  <div className="btn">
                      <button type="submit" className='submitBtn' >Search</button>
                  </div>
              </form>
            </div>

            <ul className='answers'>
                {buses.map((bus) => { 
                    const srcTime = new Date(`1970-01-01T${bus.SrcTime}`);
                    const destTime = new Date(`1970-01-01T${bus.dstTime}`);
                    const timeDifferenceMillis = destTime - srcTime;
                    const estTimeMinutes = timeDifferenceMillis / (1000 * 60);
                    return (
                        <li key={bus.BusNo}>
                            <BusFounded 
                                busNo={bus.BusNo} 
                                busName={`${bus.Source} to ${bus.Destination}`}  
                                source={source} 
                                destination={destination} 
                                sourceTime={bus.SrcTime} 
                                estTime={`${estTimeMinutes} minutes`} 
                                destTime={bus.dstTime} 
                                fare={`${bus.Fare} Rs`} 
                            />
                        </li>
                    );
                })}
            </ul>

        </div>
  );
}
