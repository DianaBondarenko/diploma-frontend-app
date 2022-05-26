interface MapPlaceMarkProps {
  count: number;
  countDesired: number;
}

/**
 * General component for display pharmacy data
 */
const MapPlaceMark = ({ count, countDesired }: MapPlaceMarkProps) => {
  return (
    <div className={''}>
      {count} з {countDesired}
    </div>
  );
};

export default MapPlaceMark;
