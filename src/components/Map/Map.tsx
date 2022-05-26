import { memo, useCallback, useEffect, useState } from 'react';
import {
  GoogleMap,
  InfoWindow,
  MarkerF,
  useJsApiLoader,
} from '@react-google-maps/api';
import { Coordinate } from '../../global/types';
import { MappedShopData } from '../../containers/ShopsPage/types';
import styles from './Map.module.scss';
import MapPlaceMark from './MapPlacemark';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

interface MapProps {
  shopsData: MappedShopData[] | null;
  userLocation: Coordinate | null;
  activeShop: MappedShopData | null;
}

const Map = ({ shopsData, userLocation, activeShop }: MapProps) => {
  const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY as string;

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_API_KEY,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [activeMark, setActiveMark] = useState<MappedShopData | null>(null);

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback((map) => {
    setMap(null);
  }, []);

  const getLatLon = (coordinate: Coordinate) => ({
    lat: coordinate[0],
    lng: coordinate[1],
  });

  const handleSelectShop = (shopData: MappedShopData) => {
    setActiveMark(shopData);
    map?.panTo(getLatLon(shopData.coordinates));
  };

  const handleMarkerClick = (shopData: MappedShopData) => {
    console.log('click');
    handleSelectShop(shopData);
  };

  useEffect(() => {
    if (activeShop) {
      handleSelectShop(activeShop);
    }
  }, [activeShop]);

  return isLoaded ? (
    // @ts-ignore
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={
        userLocation
          ? getLatLon(userLocation)
          : shopsData
          ? {
              lat: shopsData[0]?.coordinates[0],
              lng: shopsData[0]?.coordinates[1],
            }
          : center
      }
      // center={center}
      zoom={13}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {shopsData?.map((shop) => (
        <MarkerF
          position={getLatLon(shop.coordinates)}
          // icon={<MapPlaceMark count={12} countDesired={3}/>}
          onClick={() => {
            handleMarkerClick(shop);
          }}
          key={shop.id}
        />
      ))}
      {activeMark && (
        // @ts-ignore
        <InfoWindow
          position={getLatLon(activeMark.coordinates)}
          onCloseClick={() => {
            console.log('close');
            setActiveMark(null);
          }}
        >
          <div className={styles.infoWindowContainer}>
            <div className={styles.shopName}>{activeMark.name}</div>
            <div className={styles.shopAddress}>{activeMark.address}</div>
            <div className={styles.shopSchedule}>{activeMark.schedule}</div>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default memo(Map);
