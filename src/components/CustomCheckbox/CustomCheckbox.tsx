import styles from './CustomCheckBox.module.scss';

interface CustomCheckboxProps {
  title?: string;
  onChange: (value: boolean) => void;
  id: string;
  checked: boolean;
  errorChecked?: boolean;
}

const CustomCheckbox = ({
  title,
  onChange,
  id,
  checked,
  errorChecked,
}: CustomCheckboxProps) => {
  return (
    <div
      className={`${styles.mainContainer} ${
        errorChecked && styles.errorCheckbox
      }`}
    >
      <input
        id={id}
        className="filter-checkbox"
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <label htmlFor={id} className={styles.checkboxTitle}>
        {title}
      </label>
    </div>
  );
};

CustomCheckbox.defaultProps = {
  title: '',
  errorChecked: null,
};

export default CustomCheckbox;
