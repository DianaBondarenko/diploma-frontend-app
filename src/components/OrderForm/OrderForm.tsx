import { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { isValidPhoneNumber } from 'react-phone-number-input';
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  FormikErrors,
  FormikProps,
} from 'formik';
import styles from './OrderForm.module.scss';
import {
  DEFAULT_CITY,
  DELIVERY_TYPES,
  getAddressData,
  INITIAL_ORDER_FORM_STATE,
  PAYMENT_METHODS,
  PICK_UP_ADDRESS_STATE,
} from './constants';
import Switch from './components/Switch';
// import Summary from '@/components/OrderForm/components/SummaryBlock';
// import Confirmation from '@/components/Confirmation';
// import CodeConfirmation from '@/components/CodeConfirmation';
import { DeliveryType, PaymentMethod } from '../../global/types';
// import { ResponseStatusType } from '../../containers/OrderPage/types';
// import {
//   formatAddressInfo,
//   formatOrderInfo,
//   formatOrderInfoAnon,
//   formatPhoneNumberToBeValid,
//   sortAddressesData,
// } from '@global/helpers';
// import {
//   clearCart,
//   deleteOrderInfo,
//   getFromLocalStorage,
// } from '@global/helpers/localStorageHelper';
import CustomCheckbox from '../CustomCheckbox';
import placeMarkIcon from '../../global/media/placemark.svg';

export interface FormValues {
  phone: string;
  address: string;
  apartmentsNumber: string;
  floorNumber: string;
  enterNumber: string;
  comment: string;
  id: number | string;
  deliveryType: DeliveryType;
  paymentMethod: PaymentMethod;
  agreementAccepted: boolean;
  addressSaved: boolean;
}

interface OrderFormProps {
  productsList: any[];
  productsTotal: number;
  // deliveryCost: number;
  economySize: number;
  needsRecipe: boolean;
  shopId: string;
  handleOrderCreation: (values: FormValues) => void;
  onDeliveryTypeChange?: (deliveryType: DeliveryType) => void;
}

/**
 * General component for creating order
 */
const OrderForm = ({
  productsList,
  productsTotal,
  economySize,
  needsRecipe,
  shopId,
  onDeliveryTypeChange,
  handleOrderCreation,
}: OrderFormProps) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [orderStatus, setOrderStatus] = useState<any | null>(null);
  // const [orderStatus, setOrderStatus] = useState<ResponseStatusType | null>(null);
  const [orderNumber, setOrderNumber] = useState<number | null | string>(null);
  const [isAddAddressShowed, setIsAddAddressShowed] = useState<boolean>(false);
  const [isAddressSaved, setIsAddressSaved] = useState<boolean>(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [buttonVisible, setButtonVisible] = useState<boolean>(true);
  // const [showCodeConfirmationModal, setShowCodeConfirmationModal] = useState(false);
  const [FORM_STATE, SET_FORM_STATE] = useState<FormValues>(
    INITIAL_ORDER_FORM_STATE
  );

  const handleAddAddress = () => {
    setIsAddAddressShowed(true);
  };

  const closeBanner = () => {
    setShowConfirmationModal(false);
    // deleteOrderInfo();
  };

  const handleDeliveryChange = (
    props: FormikProps<any>,
    deliveryType: DeliveryType
  ) => {
    props.setFieldValue('deliveryType', deliveryType);
    if (deliveryType === DeliveryType.PICK_UP) {
      props.setErrors({ ...props.errors, address: '', apartmentsNumber: '' });
      setIsAddAddressShowed(true);
    }
    if (onDeliveryTypeChange) {
      onDeliveryTypeChange(deliveryType);
    }
  };

  const validateForm = (values: FormValues) => {
    const { phone, address, apartmentsNumber } = values;
    const errors: FormikErrors<FormValues> = {};

    if (!phone) {
      errors.phone = t('OrderForm.PHONE_EMPTY_ERROR');
    }
    if (!isValidPhoneNumber(values.phone)) {
      errors.phone = t('OrderForm.PHONE_INVALID_ERROR');
    }
    if (values.deliveryType === DeliveryType.DELIVERY && !address) {
      errors.address = t('OrderForm.ADDRESS_ERROR');
    }
    if (values.deliveryType === DeliveryType.DELIVERY && !apartmentsNumber) {
      errors.apartmentsNumber = t('OrderForm.APARTMENTS_NUMBER_ERROR');
    }

    if (!values.agreementAccepted) {
      errors.agreementAccepted = t('OrderForm.ERROR_CHECKBOX');
    }

    return errors;
  };

  const handleSaveAddressClick = async (props: FormikProps<FormValues>) => {
    const { address, apartmentsNumber, floorNumber, enterNumber } =
      props.values;
    const errors: FormikErrors<FormValues> = {};

    if (isAddAddressShowed && !address) {
      errors.address = t('OrderForm.ADDRESS_ERROR');
    }
    if (isAddAddressShowed && !apartmentsNumber) {
      errors.apartmentsNumber = t('OrderForm.APARTMENTS_NUMBER_ERROR');
    }
    if (Object.values(errors).length > 0) {
      props.setErrors(errors);
      return;
    }
  };

  const handleInputChange = (
    props: FormikProps<any>,
    event: ChangeEvent<HTMLInputElement>,
    inputName: string
  ) => {
    props.setErrors({
      ...props.errors,
      [inputName]: '',
    });
    props.setFieldValue(inputName, event.target.value);
  };

  const handlePhoneChange = (
    props: FormikProps<any>,
    event: ChangeEvent<HTMLInputElement>,
    inputName: string
  ) => {
    const phoneInputValue = event.target.value.replace(/[\s-()]/g, '');
    if (!phoneInputValue.match(/^\+380\d{0,9}$/)) {
      return;
    }
    props.setErrors({
      ...props.errors,
      [inputName]: '',
    });
    props.setFieldValue(inputName, phoneInputValue);
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

  const handleOrderSubmit = (
    orderStatus: any,
    // orderStatus: ResponseStatusType,
    orderNumber: number | null | string
  ) => {
    setOrderNumber(orderNumber);
    setOrderStatus(orderStatus);
    // if (orderStatus === ResponseStatusType.SUCCESS) {
    //   clearCart();
    //   dispatch({ type: 'clearCart' });
    // }
    // setShowCodeConfirmationModal(false);
    setShowConfirmationModal(true);
  };

  const handleSubmitForm = async (values: FormValues) => {
    console.log(values);
    try {
      handleOrderCreation(values);
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleAddressChange = () => {
    setButtonVisible(false);
    setIsAddressSaved(false);
    setIsAddAddressShowed(true);
  };

  return (
    <Formik
      initialValues={FORM_STATE}
      enableReinitialize
      validate={validateForm}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={handleSubmitForm}
    >
      {(props: FormikProps<any>) => (
        <Form className={styles.formContainer}>
          <div className={`${styles.formBlock} ${styles.formInput}`}>
            <label htmlFor="phone" className={styles.label}>
              {t('OrderForm.PHONE_LABEL')}
            </label>
            <Field
              id="phone"
              name="phone"
              type="phone"
              className={`${styles.input} ${
                props.errors.phone && styles.error
              }`}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handlePhoneChange(props, e, 'phone')
              }
            />
            {/*@ts-ignore*/}
            <ErrorMessage
              name="phone"
              render={(msg: string) => (
                <div className={`${styles.label} ${styles.error}`}>{msg}</div>
              )}
            />
          </div>
          <div className={`${styles.formBlock} ${styles.delivery}`}>
            <label
              htmlFor="deliveryType"
              className={`${styles.label} ${styles.delivery}`}
            >
              {t('OrderForm.DELIVERY_LABEL')}
            </label>
            <Switch
              values={DELIVERY_TYPES}
              onOptionClick={(value: string) =>
                handleDeliveryChange(props, value as DeliveryType)
              }
            />
            {props.values.deliveryType === DeliveryType.DELIVERY && (
              <div className={styles.deliveryText}>
                {t('OrderForm.DELIVERY_TEXT')}
              </div>
            )}
          </div>
          {props.values.deliveryType === DeliveryType.DELIVERY &&
            !isAddAddressShowed &&
            !isAddressSaved && (
              <div className={styles.formBlock}>
                <label
                  htmlFor="address"
                  className={`${styles.label} ${styles.delivery}`}
                >
                  {t('OrderForm.ADDRESS_LABEL')}
                </label>
                <div
                  className={styles.addressButton}
                  onClick={handleAddAddress}
                >
                  <img src={placeMarkIcon} className={styles.addressIcon} />
                  <div>{t('OrderForm.CHOOSE_ADDRESS')}</div>
                </div>
                {(props.errors.address || props.errors.apartmentsNumber) && (
                  <div className={`${styles.label} ${styles.error}`}>
                    {t('OrderForm.CHOOSE_ADDRESS_ERROR')}
                  </div>
                )}
              </div>
            )}
          {props.values.deliveryType === DeliveryType.DELIVERY &&
            isAddAddressShowed &&
            !isAddressSaved && (
              <div className={styles.deliveryBlock}>
                <h3 className={styles.deliveryBlockTitle}>
                  {t('OrderForm.DELIVERY_TITLE')}
                </h3>
                <label htmlFor="address" className={styles.label}>
                  {t('OrderForm.ADDRESS_INPUT_LABEL')}
                </label>
                <div className={styles.addressInput}>
                  <Field
                    id="address"
                    name="address"
                    type="text"
                    autoComplete="off"
                    placeholder={t('OrderForm.ADDRESS_PLACEHOLDER')}
                    className={`${styles.input} ${
                      props.errors.address && styles.error
                    } ${styles.w100}`}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      handleInputChange(props, e, 'address');
                      setButtonVisible(true);
                      setIsAddressSaved(false);
                    }}
                  />
                </div>
                {props.errors.address && (
                  <div className={`${styles.label} ${styles.error}`}>
                    {props.errors.address}
                  </div>
                )}
                <label htmlFor="apartmentsNumber" className={styles.label}>
                  {t('OrderForm.APARTMENTS_INPUT_LABEL')}
                </label>
                <Field
                  id="apartmentsNumber"
                  name="apartmentsNumber"
                  type="text"
                  placeholder={t('OrderForm.APARTMENTS_PLACEHOLDER')}
                  className={`${styles.input} ${
                    props.errors.apartmentsNumber && styles.error
                  } ${styles.w100}`}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    handleInputChange(props, e, 'apartmentsNumber');
                    setButtonVisible(true);
                  }}
                />
                {props.errors.apartmentsNumber && (
                  <div className={`${styles.label} ${styles.error}`}>
                    {props.errors.apartmentsNumber}
                  </div>
                )}
                <div className={styles.lineWrapper}>
                  <div className={styles.w50}>
                    <label htmlFor="enterNumber" className={styles.label}>
                      {t('OrderForm.ENTER_NUMBER_INPUT_LABEL')}
                    </label>
                    <Field
                      id="enterNumber"
                      name="enterNumber"
                      type="text"
                      placeholder={t('OrderForm.ENTER_NUMBER_PLACEHOLDER')}
                      className={`${styles.input} ${
                        props.errors.enterNumber && styles.error
                      } ${styles.w100}`}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        handleInputChange(props, e, 'enterNumber');
                        setButtonVisible(true);
                      }}
                    />
                  </div>
                  <div className={styles.w50}>
                    <label htmlFor="floorNumber" className={styles.label}>
                      {t('OrderForm.FLOR_INPUT_LABEL')}
                    </label>
                    <Field
                      id="floorNumber"
                      name="floorNumber"
                      type="text"
                      placeholder={t('OrderForm.FLOR_PLACEHOLDER')}
                      className={`${styles.input} ${
                        props.errors.floorNumber && styles.error
                      } ${styles.w100}`}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        handleInputChange(props, e, 'floorNumber');
                        setButtonVisible(true);
                      }}
                    />
                  </div>
                </div>
                <label htmlFor="comment" className={styles.label}>
                  {t('OrderForm.COMMENT_INPUT_LABEL')}
                </label>
                <Field
                  id="comment"
                  name="comment"
                  type="text"
                  placeholder={t('OrderForm.COMMENT_PLACEHOLDER')}
                  className={`${styles.input} ${
                    props.errors.comment && styles.error
                  } ${styles.w100}`}
                />
              </div>
            )}
          {isAddressSaved &&
            props.values.deliveryType === DeliveryType.DELIVERY && (
              <div className={styles.savedAddressBlock}>
                <label className={styles.label}>
                  {t('OrderForm.ADD_ADDRESS_LABEL')}
                </label>
                <div className={styles.addressInfo}>
                  {props.values.address}
                  {props.values.apartmentsNumber
                    ? `, кв ${props.values.apartmentsNumber}`
                    : null}
                  {props.values.enterNumber
                    ? `, ${props.values.enterNumber} п-зд`
                    : null}
                  {props.values.floorNumber
                    ? `, ${props.values.floorNumber} этаж.`
                    : null}
                </div>
                {props.values.comment?.length ? (
                  <div className={styles.commentInfo}>
                    <span>{t('OrderForm.ADD_ADDRESS_LABEL')}: </span>
                    {props.values.comment}
                  </div>
                ) : null}
                <button
                  type="button"
                  className={styles.editAddressBtn}
                  onClick={() => {
                    SET_FORM_STATE({
                      ...FORM_STATE,
                      address: props.values?.address,
                      apartmentsNumber: props.values?.apartmentsNumber,
                      enterNumber: props.values?.enterNumber,
                      floorNumber: props.values?.floorNumber,
                      comment: props.values?.comment,
                    });
                    handleAddressChange();
                  }}
                >
                  {t('OrderForm.EDIT_BTN_TEXT')}
                </button>
              </div>
            )}
          <div className={`${styles.formBlock} ${styles.payment}`}>
            <label
              htmlFor="paymentMethod"
              className={`${styles.label} ${styles.payment}`}
            >
              {t('OrderForm.PAYMENT_LABEL')}
            </label>
            {/*{props.values.deliveryType === DeliveryType.DELIVERY ? (*/}
            {/*  <div className={styles.paymentBlock}>*/}
            {/*    <img*/}
            {/*      src={PAYMENT_METHODS[PaymentMethod.KASPI_PAY].icon}*/}
            {/*      className={styles.paymentIcon}*/}
            {/*    />*/}
            {/*    <div>{PAYMENT_METHODS[PaymentMethod.KASPI_PAY].label}</div>*/}
            {/*  </div>*/}
            {/*) : (*/}
            <div className={styles.paymentBlock}>
              <div>{PAYMENT_METHODS[PaymentMethod.ON_DELIVERY].label}</div>
            </div>
            {/*  <Switch*/}
            {/*    values={PAYMENT_METHODS}*/}
            {/*    onOptionClick={(value: string) => props.setFieldValue('paymentMethod', value)}*/}
            {/*  />*/}
            {/*)}*/}
          </div>
          <div className={styles.agreementContainer}>
            <div className={styles.checkboxContainer}>
              <div className={styles.checkbox}>
                <CustomCheckbox
                  id={shopId}
                  onChange={(e) => handleAgreementCheckboxChange(props, e)}
                  checked={props.values.agreementAccepted}
                  errorChecked={Boolean(props.errors.agreementAccepted)}
                />
              </div>
              <div className={styles.accept}>
                {t('OrderForm.ACCEPT')}
                <a href="/user-agreement.html" target="_blank">
                  <div>{t('OrderForm.USER_AGREEMENT')}</div>
                </a>
              </div>
            </div>
            {Boolean(props.errors.agreementAccepted) && (
              <div className={styles.errorCheckbox}>
                {t('OrderForm.ERROR_CHECKBOX')}
              </div>
            )}
          </div>
          <div className={styles.bottomBlock}>
            <button type="submit" className={styles.submitButton}>
              {t('OrderForm.SUBMIT_BUTTON_TEXT')}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default OrderForm;
