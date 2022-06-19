import styles from './OrderSteps.module.scss';
import { ORDER_STEPS } from './constants';
import { ReactComponent as SearchIcon } from '../../../../global/media/search_bold.svg';
import { ReactComponent as DeliveryIcon } from '../../../../global/media/delivery.svg';
import { ReactComponent as OrderIcon } from '../../../../global/media/success_order.svg';
import { ReactComponent as PaymentIcon } from '../../../../global/media/payment.svg';

const OrderSteps = () => {
  const steps = [
    {
      id: 0,
      title: 'Знайдіть потрібний вам продукт',
      img: <SearchIcon />,
    },
    {
      id: 1,
      title: 'Оберіть спосіб отримання',
      img: <DeliveryIcon />,
    },
    {
      id: 2,
      title: 'Оплатіть замовлення при отриманні в магазині',
      img: <PaymentIcon />,
    },
    {
      id: 3,
      title: 'Отримайте замовлення!',
      img: <OrderIcon />,
    },
  ];

  return (
    <div className={styles.orderStepsContainer}>
      <div className={styles.title}>{ORDER_STEPS.title}</div>
      <div className={styles.stepsContainer}>
        {steps.map((step) => (
          <div className={styles.stepContainer}>
            <div className={styles.stepImgContainer}>{step.img}</div>
            <div className={styles.stepTitle}>{step.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderSteps;
