import styles from './Counter.module.scss';
import minusIcon from '../../global/media/minus-button.svg';
import plusIcon from '../../global/media/plus-button.svg';

export interface CounterProps {
  value: number;
  increaseCount: () => void;
  decreaseCount: () => void;
}

const Counter = ({ value, increaseCount, decreaseCount }: CounterProps) => {
  return (
    <div className={styles.countContainer}>
      <div className={styles.countIcon} onClick={decreaseCount}>
        <img src={minusIcon} alt="minus icon" />
      </div>
      <div className={styles.count}>{value}</div>
      <div className={styles.countIcon} onClick={increaseCount}>
        <img src={plusIcon} alt="plus icon" />
      </div>
    </div>
  );
};

export default Counter;
