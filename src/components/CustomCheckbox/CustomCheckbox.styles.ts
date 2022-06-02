import styled from 'styled-components';
import { baseTheme } from '../../global/styles/theme';

export const CustomCheckboxContainer = styled('div')`
  input[type='checkbox']:checked,
  input[type='checkbox']:not(:checked) {
    position: absolute;
    left: -9999px;
  }

  input[type='checkbox']:checked + label,
  input[type='checkbox']:not(:checked) + label {
    display: inline-block;
    position: relative;
    padding-left: 28px;
    cursor: pointer;
    white-space: nowrap;
  }

  input[type='checkbox']:checked + label:before,
  input[type='checkbox']:not(:checked) + label:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 16px;
    height: 16px;
    border: 1px solid ${baseTheme.colors.stroking};
    border-radius: 3px;
    background-color: ${baseTheme.colors.white};
  }

  input[type='checkbox']:checked + label:before {
    background-color: ${baseTheme.colors.mainLightBlue};
    border: 1px solid ${baseTheme.colors.mainLightBlue};
  }

  input[type='checkbox']:checked + label:before,
  input[type='checkbox']:not(:checked) + label:before {
    border-radius: 3px;
  }

  input[type='checkbox']:checked + label:after {
    content: '';
    position: absolute;
    -webkit-transition: all 0.2s ease;
    -moz-transition: all 0.2s ease;
    -o-transition: all 0.2s ease;
    transition: all 0.2s ease;
  }

  input[type='checkbox']:not(:checked):hover + label:after {
    content: '';
    position: absolute;
  }

  input[type='checkbox']:checked + label:after {
    left: 4px;
    top: 4px;
    width: 7px;
    height: 5px;
    border-radius: 1px;
    border-left: 3px solid ${baseTheme.colors.white};
    border-bottom: 3px solid ${baseTheme.colors.white};
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  input[type='checkbox']:not(:checked):hover + label:after {
    left: 4px;
    top: 4px;
    width: 7px;
    height: 5px;
    border-radius: 1px;
    border-left: 3px solid ${baseTheme.colors.mainLightBlue};
    border-bottom: 3px solid ${baseTheme.colors.mainLightBlue};
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  input[type='checkbox']:not(:checked) + label:after {
    opacity: 0;
  }

  input[type='checkbox']:not(:checked):hover + label:after {
    opacity: 1;
  }

  input[type='checkbox']:checked + label:after {
    opacity: 1;
  }

  &.error-checkbox {
    input[type='checkbox']:checked + label:before,
    input[type='checkbox']:not(:checked) + label:before {
      border: 1px solid ${baseTheme.colors.error};
    }

    input[type='checkbox']:checked + label:before {
      background-color: ${baseTheme.colors.mainLightBlue};
      border: 1px solid ${baseTheme.colors.mainLightBlue};
    }
  }

  .filter-title {
    font-size: 16px;
    font-weight: 400;
    color: ${baseTheme.colors.primary};
  }
`;
