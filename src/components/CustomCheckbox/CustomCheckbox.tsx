import * as Styled from './CustomCheckbox.styles';

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
    <Styled.CustomCheckboxContainer
      className={`${errorChecked && 'error-checkbox'}`}
    >
      <input
        id={id}
        className="filter-checkbox"
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <label htmlFor={id} className="filter-title">
        {title}
      </label>
    </Styled.CustomCheckboxContainer>
  );
};

CustomCheckbox.defaultProps = {
  title: '',
  errorChecked: null,
};

export default CustomCheckbox;
