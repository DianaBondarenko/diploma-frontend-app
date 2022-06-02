import { useHistory } from 'react-router-dom';
import arrowIcon from '../../global/media/arrow-right.svg';
import styles from './BreadCrumbs.module.scss';

export interface BreadCrumb {
  label: string;
  route?: string | null;
}
interface BreadCrumbsProps {
  breadCrumbs: BreadCrumb[];
}

const BreadCrumbs = ({ breadCrumbs }: BreadCrumbsProps) => {
  const history = useHistory();

  const activeBreadCrumb = breadCrumbs[breadCrumbs.length - 1];

  const handleBreadCrumbClick = (breadCrumb: BreadCrumb) => {
    if (breadCrumb.route) {
      history.push(breadCrumb.route);
    }
  };

  return (
    <div className={styles.mainContainer}>
      {breadCrumbs.slice(0, -1).map((el) => (
        <div key={el.label} className={styles.elementContainer}>
          <div
            onClick={() => handleBreadCrumbClick(el)}
            className={styles.elementText}
          >
            {el.label}
          </div>
          <img src={arrowIcon} alt="arrow" className={styles.icon} />
        </div>
      ))}
      <div className={`${styles.elementText} ${styles.active}`}>
        <div onClick={() => handleBreadCrumbClick(activeBreadCrumb)}>
          {activeBreadCrumb.label}
        </div>
      </div>
    </div>
  );
};

export default BreadCrumbs;
