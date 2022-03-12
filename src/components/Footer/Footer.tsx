import { useTranslation } from 'react-i18next';
import * as Styled from './Footer.styles';
import logo from '../../global/media/footer-logo.svg';
import telegramLogo from '../../global/media/footer-telegram-logo.svg';
import viberLogo from '../../global/media/footer-viber-logo.svg';
import phoneIcon from '../../global/media/footer-phone-icon.svg';

const Footer = () => {
  const { t } = useTranslation();

  const icons = [
    {
      key: 'telegram',
      icon: telegramLogo,
      route: process.env.REACT_APP_TELEGRAM_URL,
    },
    {
      key: 'viber',
      icon: viberLogo,
      route: process.env.REACT_APP_VIBER_URL,
    },
  ];

  return (
    <Styled.FooterContainer>
      <Styled.FooterContentContainer>
        <Styled.FooterContentBlock>
          <Styled.FooterLeftBlock>
            <img src={logo} alt="application logo" />
            <div className="description">{t('Footer.DESCRIPTION')}</div>
          </Styled.FooterLeftBlock>
          <Styled.FooterRightBlock>
            <Styled.FooterLinks>
              {icons.map((item) => (
                <a href={item.route} key={item.key}>
                  <img src={item.icon} alt={item.key} className="icon" />
                </a>
              ))}
            </Styled.FooterLinks>
            <Styled.FooterPhone>
              <div className="icon">
                <img src={phoneIcon} alt="phone icon" />
              </div>
              <a href={`tel: ${process.env.REACT_APP_CONTACT_NUMBER}`}>
                {process.env.REACT_APP_CONTACT_NUMBER}
              </a>
            </Styled.FooterPhone>
          </Styled.FooterRightBlock>
        </Styled.FooterContentBlock>
      </Styled.FooterContentContainer>
    </Styled.FooterContainer>
  );
};

export default Footer;
