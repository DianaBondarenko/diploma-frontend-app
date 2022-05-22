import { FC } from 'react';
import styles from './Badge.module.scss';
import { Badge } from '@mui/material';

interface BadgeProps {
  badgeContent: number | string;
  isBadgeAnimationActive?: boolean;
  isActive?: boolean;
}

/**
 * General component for display some content in a badge
 */
const BadgeComponent: FC<BadgeProps> = ({
  badgeContent,
  isActive,
  isBadgeAnimationActive,
  children,
}) => {
  return (
    <Badge
      badgeContent={badgeContent.toString()}
      className={`${styles.badge} ${isActive && styles.active} ${
        isBadgeAnimationActive && styles.bounce
      }`}
    >
      {children}
    </Badge>
  );
};

export default BadgeComponent;
