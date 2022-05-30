import { memo, useCallback, useEffect, useState } from 'react';
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from '@react-google-maps/api';
import { Coordinate } from '../../global/types';
import { MappedShopData } from '../../containers/ShopsPage/types';
import styles from './Map.module.scss';
import greenMarker from '../../global/media/placemark-green.svg';
import redMarker from '../../global/media/placemark-red.svg';

const containerStyle = {
  width: '100%',
  height: '100%',
};

export interface ShopPlaceMarkInfo extends MappedShopData {
  totalCount: number;
  totalCountDesired: number;
}

interface MapProps {
  shopsData: ShopPlaceMarkInfo[] | null;
  userLocation: Coordinate | null;
  activeShop: MappedShopData | null;
}

const Map = ({ shopsData, userLocation, activeShop }: MapProps) => {
  const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY as string;
  const defaultCenter = [0, 0] as Coordinate;

  const getLatLon = (coordinate: Coordinate) => ({
    lat: coordinate[0],
    lng: coordinate[1],
  });

  const getMapCenter = () => {
    if (userLocation) {
      return getLatLon(userLocation);
    }
    if (shopsData) {
      getLatLon(shopsData[0].coordinates);
    }
    return getLatLon(defaultCenter);
  };
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

  const handleSelectShop = (shopData: MappedShopData) => {
    setActiveMark(shopData);
    map?.panTo(getLatLon(shopData.coordinates));
  };

  const handleMarkerClick = (shopData: MappedShopData) => {
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
      center={getMapCenter()}
      zoom={13}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {shopsData?.map((shop) => {
        const isProductsLack = shop.totalCountDesired > shop.totalCount;
        return (
          // @ts-ignore
          <Marker
            position={getLatLon(shop.coordinates)}
            icon={isProductsLack ? redMarker : greenMarker}
            label={{
              text: `${shop.totalCount} з ${shop.totalCountDesired}`,
              className: `${styles.placeMark} ${
                isProductsLack && styles.placeMarkMissing
              }`,
            }}
            onClick={() => {
              handleMarkerClick(shop);
            }}
            key={shop.id}
          />
        );
      })}
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
