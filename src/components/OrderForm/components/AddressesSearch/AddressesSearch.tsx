import { ClickAwayListener } from '@mui/material';
import styles from './AddressesSearch.module.scss';

interface AddressesSearchProp {
  addresses: any;
  isOpen: boolean;
  onClose: () => void;
  onClick: any;
}

const AddressesSearch = ({
  addresses,
  isOpen,
  onClick,
  onClose,
}: AddressesSearchProp) => {
  return (
    <div className={styles.addressesSearchContainer}>
      <ClickAwayListener onClickAway={onClose}>
        <div className={styles.addressesItemContainer}>
          {addresses &&
            isOpen &&
            addresses.map((item: any) => (
              <div
                className={styles.addressesItem}
                onClick={() => onClick(item)}
                key={item.id}
              >
                {item?.address}, {item?.flat}
              </div>
            ))}
        </div>
      </ClickAwayListener>
    </div>
  );
};

export default AddressesSearch;
