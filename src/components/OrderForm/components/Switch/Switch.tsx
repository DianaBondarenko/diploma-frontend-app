import { useState } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import styles from './Switch.module.scss';

export interface SwitchProps {
  values: { [key: string]: { label: string; icon?: any } };
  defaultValue?: string;
  onOptionClick: (value: string) => void;
}

const Switch = ({ values, defaultValue, onOptionClick }: SwitchProps) => {
  const [value, setValue] = useState<string>(
    defaultValue || Object.keys(values)[0]
  );

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string | null
  ) => {
    if (newValue) {
      setValue(newValue);
      return onOptionClick(newValue);
    }
  };

  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={handleChange}
      fullWidth
      className={styles.toggleContainer}
    >
      {Object.entries(values).map(([key, value]) => (
        <ToggleButton
          classes={{ selected: styles.toggleButtonActive }}
          key={key}
          value={key}
          className={styles.toggleButton}
        >
          {value.icon && <img src={value.icon} className={styles.icon} />}
          {value.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};
export default Switch;
