import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import ReactCodeInput from 'react-verification-code-input';
import * as Styled from './CodeConfirmation.styles';
import * as actions from '../actions';
import { selectors } from '../reducer';
import Button from '../../../components/Button';

interface CodeConfirmationProps {
  phoneNumber: string;
}

const CodeConfirmation = ({ phoneNumber }: CodeConfirmationProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [value, setValue] = useState<Array<string>>([]);
  const [seconds, setSeconds] = useState<number>(59);
  const [timerActive, setTimerActive] = useState<boolean>(true);

  const error = useSelector(selectors.error);

  useEffect(() => {
    let timer: any = null;
    if (seconds > 0 && timerActive) {
      timer = setInterval(setSeconds, 1000, seconds - 1);
    }
    if (seconds === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(timer);
  }, [seconds, timerActive]);

  const handleCodeInputChange = (newValue: any) => {
    dispatch(actions.loginClearError());
    setValue(newValue);
  };

  const sendCodeOneMore = async () => {
    setTimerActive(true);
    setSeconds(59);
    // @ts-ignore
    setValue('');
    dispatch(actions.getValidationCode.request({ phone: phoneNumber }));
  };

  const handleConfirm = () => {
    dispatch(
      actions.auth.request({ phone: phoneNumber, validationCode: value })
    );
  };

  const zero = seconds < 10 ? '0' : '';
  const btn =
    seconds === 0
      ? t('CodeConfirmation.SEND_ONE_MORE_ACTIVE')
      : `${t('CodeConfirmation.SEND_ONE_MORE')}${zero}${seconds}`;

  return (
    <Styled.CodeConfirmationContainer>
      <Styled.CodeConfirmationHeader>
        <div className="title">
          {t('CodeConfirmation.CODE_CONFIRMATION_TITLE')}
        </div>
        <div className="description">
          {t('CodeConfirmation.SEND_TO_PHONE')}
          <b>{formatPhoneNumberIntl(phoneNumber)}</b>
        </div>
      </Styled.CodeConfirmationHeader>
      <Styled.CodeConfirmation>
        <div className="code-title">{t('CodeConfirmation.CODE')}</div>
        {/* @ts-ignore */}
        <ReactCodeInput
          fields={4}
          fieldWidth={40}
          fieldHeight={40}
          placeholder={[`×`, '×', '×', '×']}
          values={value}
          onChange={handleCodeInputChange}
          className={`input ${error && 'input-error'}`}
        />
      </Styled.CodeConfirmation>
      {error && (
        <Styled.CodeError>{t('CodeConfirmation.ERROR_CODE')}</Styled.CodeError>
      )}
      <div className={`send-one-more ${seconds !== 0 && 'disabled'}`}>
        <button
          type="button"
          className="content"
          onClick={sendCodeOneMore}
          disabled={seconds !== 0}
        >
          {btn}
        </button>
      </div>
      <div>
        <Button onClick={handleConfirm} text={t('CodeConfirmation.CONFIRM')} />
      </div>
    </Styled.CodeConfirmationContainer>
  );
};

export default CodeConfirmation;
