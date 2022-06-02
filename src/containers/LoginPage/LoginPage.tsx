import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {isValidPhoneNumber} from 'react-phone-number-input';
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  FormikErrors,
  FormikProps,
} from 'formik';
import * as Styled from './LoginPage.styles';
import * as actions from './actions';
import { selectors } from './reducer';
import CustomCheckbox from '../../components/CustomCheckbox';
import CodeConfirmation from './CodeConfirmation';
import { INITIAL_AUTHORIZATION_MODAL_FORM_STATE } from './constants';
import Loader from '../../components/Loader';

interface FormValues {
  phone: string;
  agreementAccepted: boolean;
}

const LoginPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const loading = useSelector(selectors.loading);

  const [isConfirmationCodeSent, setIsConfirmationCodeSent] =
    useState<boolean>(false);
  // eslint-disable-next-line
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const handlePhoneChange = (
    props: FormikProps<any>,
    event: ChangeEvent<HTMLInputElement>,
    inputName: string
  ) => {
    // @ts-ignore
    const phoneInputValue = event.target.value.replaceAll(/[\s-()]/g, '');
    if (!phoneInputValue.match(/^\+380\d{0,9}$/)) {
      return;
    }
    props.setErrors({
      ...props.errors,
      [inputName]: '',
    });
    props.setFieldValue(inputName, phoneInputValue);
    setPhoneNumber(phoneInputValue);
  };

  const handleAgreementCheckboxChange = (
    props: FormikProps<any>,
    isChecked: boolean
  ) => {
    props.setFieldValue('agreementAccepted', isChecked);
    props.setErrors({
      ...props.errors,
      agreementAccepted: '',
    });
  };

  const validateForm = (values: {
    phone: string;
    agreementAccepted: boolean;
  }) => {
    const { phone } = values;
    const errors: FormikErrors<FormValues> = {};

    if (!phone) {
      errors.phone = t('LoginPage.PHONE_EMPTY_ERROR');
    }
    if (!isValidPhoneNumber(values.phone)) {
      errors.phone = t('LoginPage.PHONE_INVALID_ERROR');
    }
    if (!values.agreementAccepted) {
      errors.agreementAccepted = t('LoginPage.ERROR_CHECKBOX');
    }
    return errors;
  };

  const handleSubmitPhoneForm = async (values: {
    phone: string;
    agreementAccepted: boolean;
  }) => {
    setPhoneNumber(values.phone);
    dispatch(actions.getValidationCode.request({ phone: values.phone }));
    setIsConfirmationCodeSent(true);
  };

  const pageContent = !isConfirmationCodeSent ? (
    <Styled.LoginPagePhoneConfirmation>
      <div className="title">{t('LoginPage.TITLE')}</div>
      <Formik
        initialValues={INITIAL_AUTHORIZATION_MODAL_FORM_STATE}
        onSubmit={handleSubmitPhoneForm}
        validate={validateForm}
      >
        {(props: FormikProps<any>) => (
          <Form className="form-container">
            <div className="form-block">
              <label className="form-label" htmlFor="phone">
                {t('LoginPage.PHONE_LABEL')}
              </label>
              <Field
                id="phone"
                name="phone"
                type="phone"
                className={`input ${props.errors.phone && 'input-error'}`}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handlePhoneChange(props, e, 'phone')
                }
              />
              {/* @ts-ignore */}
              <ErrorMessage
                name="phone"
                render={(msg: string) => (
                  <div className="error-message-label">{msg}</div>
                )}
              />
            </div>

            <Styled.LoginAgreementContainer>
              <div className="checkbox-container">
                <div className="checkbox">
                  <CustomCheckbox
                    id="agreement"
                    onChange={(e) => handleAgreementCheckboxChange(props, e)}
                    checked={props.values.agreementAccepted}
                    errorChecked={Boolean(props.errors.agreementAccepted)}
                  />
                </div>
                <span className="accept">
                  {t('LoginPage.ACCEPT')}
                  <a
                    href="/user-agreement.html"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>{t('LoginPage.USER_AGREEMENT')}</span>
                  </a>
                </span>
              </div>
              {Boolean(props.errors.agreementAccepted) && (
                <div className="checkbox-error-message">
                  {t('LoginPage.ERROR_CHECKBOX')}
                </div>
              )}
            </Styled.LoginAgreementContainer>
            <Styled.FormSubmitButton type="submit">
              {t('LoginPage.SUBMIT_BUTTON_TEXT')}
            </Styled.FormSubmitButton>
          </Form>
        )}
      </Formik>
    </Styled.LoginPagePhoneConfirmation>
  ) : (
    <CodeConfirmation phoneNumber={phoneNumber} />
  );

  return (
    <>
      <Styled.LoginPageContainer>
        <Styled.LoginPageContent>{pageContent}</Styled.LoginPageContent>
      </Styled.LoginPageContainer>
      {loading && <Loader />}
    </>
  );
};

export default LoginPage;
