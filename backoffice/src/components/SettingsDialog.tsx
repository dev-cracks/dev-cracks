import {
  Dialog,
  DialogSurface,
  DialogBody,
  makeStyles,
  tokens,
  shorthands,
  Button,
  Input,
  Text,
  Switch,
  Label,
  Select,
  Card,
  CardHeader,
} from '@fluentui/react-components';
import {
  DismissRegular,
  PersonRegular,
  SettingsRegular,
  MailRegular,
  CalendarRegular,
  PeopleRegular,
  SearchRegular,
  GlobeRegular,
  PaintBrushRegular,
  AlertRegular,
  AccessibilityRegular,
  PeopleTeamRegular,
  LockClosedRegular,
} from '@fluentui/react-icons';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import { customerService, CustomerDto } from '../services/customerService';

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Category {
  id: string;
  label: string;
  icon: React.ReactNode;
  subcategories?: Subcategory[];
}

interface Subcategory {
  id: string;
  label: string;
}

const useStyles = makeStyles({
  dialogSurface: {
    width: '90vw',
    maxWidth: '1200px',
    height: '85vh',
    maxHeight: '800px',
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.overflow('hidden'),
  },
  dialogBody: {
    display: 'flex',
    flex: 1,
    ...shorthands.overflow('hidden'),
    padding: 0,
  },
  sidebar: {
    width: '280px',
    backgroundColor: tokens.colorNeutralBackground1,
    borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.overflow('hidden'),
    flexShrink: 0,
  },
  sidebarHeader: {
    padding: tokens.spacingVerticalM,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  sidebarTitle: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: tokens.spacingVerticalM,
  },
  searchContainer: {
    position: 'relative',
  },
  searchInput: {
    width: '100%',
  },
  sidebarContent: {
    flex: 1,
    overflowY: 'auto',
    padding: tokens.spacingVerticalS,
  },
  categoryList: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalXXS),
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  categoryItem: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap(tokens.spacingHorizontalS),
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    borderRadius: tokens.borderRadiusSmall,
    cursor: 'pointer',
    color: tokens.colorNeutralForeground1,
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightRegular,
    transition: 'background-color 0.2s ease',
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground2,
    },
  },
  categoryItemActive: {
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground1,
    fontWeight: tokens.fontWeightSemibold,
  },
  subcategoryList: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalXXS),
    listStyle: 'none',
    margin: 0,
    padding: 0,
    marginTop: tokens.spacingVerticalXS,
    marginLeft: tokens.spacingHorizontalXL,
  },
  subcategoryItem: {
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalM}`,
    borderRadius: tokens.borderRadiusSmall,
    cursor: 'pointer',
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase200,
    transition: 'background-color 0.2s ease, color 0.2s ease',
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground2,
      color: tokens.colorNeutralForeground1,
    },
  },
  subcategoryItemActive: {
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground1,
    fontWeight: tokens.fontWeightSemibold,
  },
  contentArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.overflow('hidden'),
    backgroundColor: tokens.colorNeutralBackground2,
  },
  contentHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXL}`,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  contentTitle: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  closeButton: {
    minWidth: 'auto',
    color: tokens.colorNeutralForeground2,
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground3,
    },
  },
  contentBody: {
    flex: 1,
    overflowY: 'auto',
    padding: tokens.spacingVerticalXL,
  },
  section: {
    marginBottom: tokens.spacingVerticalXXL,
  },
  sectionTitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: tokens.spacingVerticalM,
  },
  sectionDescription: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    marginBottom: tokens.spacingVerticalL,
    lineHeight: tokens.lineHeightBase300,
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalM),
    marginBottom: tokens.spacingVerticalL,
  },
  formRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `${tokens.spacingVerticalM} 0`,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  formRowLast: {
    borderBottom: 'none',
  },
  formLabel: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalXXS),
    flex: 1,
  },
  formLabelText: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  formLabelDescription: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
  },
  formControl: {
    minWidth: '200px',
  },
  link: {
    color: tokens.colorBrandForeground1,
    textDecoration: 'none',
    fontSize: tokens.fontSizeBase300,
    ':hover': {
      textDecoration: 'underline',
    },
  },
  infoBanner: {
    backgroundColor: tokens.colorNeutralBackground3,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
    padding: tokens.spacingVerticalM,
    marginBottom: tokens.spacingVerticalL,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase300,
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
    marginBottom: tokens.spacingVerticalXL,
  },
  infoRow: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalXXS),
    padding: `${tokens.spacingVerticalS} 0`,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  infoRowLast: {
    borderBottom: 'none',
  },
  infoLabel: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground2,
  },
  infoValue: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
  },
});

const getCategories = (t: any): Category[] => [
  {
    id: 'account',
    label: t('settingsDialog.account'),
    icon: <PersonRegular />,
  },
  {
    id: 'general',
    label: t('settingsDialog.general'),
    icon: <SettingsRegular />,
    subcategories: [
      { id: 'language-time', label: t('settingsDialog.languageAndTime') },
      { id: 'appearance', label: t('settingsDialog.appearance') },
      { id: 'notifications', label: t('settingsDialog.notifications') },
      { id: 'accessibility', label: t('settingsDialog.accessibility') },
      { id: 'distribution-groups', label: t('settingsDialog.distributionGroups') },
      { id: 'privacy-data', label: t('settingsDialog.privacyAndData') },
      { id: 'search', label: t('settingsDialog.search') },
    ],
  },
  {
    id: 'mail',
    label: t('settingsDialog.mail'),
    icon: <MailRegular />,
  },
  {
    id: 'calendar',
    label: t('settingsDialog.calendar'),
    icon: <CalendarRegular />,
  },
  {
    id: 'people',
    label: t('settingsDialog.people'),
    icon: <PeopleRegular />,
  },
];

export const SettingsDialog = ({ open, onOpenChange }: SettingsDialogProps) => {
  const styles = useStyles();
  const { t } = useTranslation('backoffice');
  const { userDetails } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [selectedSubcategory, setSelectedSubcategory] = useState('language-time');
  const [searchQuery, setSearchQuery] = useState('');
  const [customerInfo, setCustomerInfo] = useState<CustomerDto | null>(null);
  const [isLoadingCustomer, setIsLoadingCustomer] = useState(false);
  
  const categories = getCategories(t);

  const handleClose = () => {
    onOpenChange(false);
    setSearchQuery('');
  };

  // Cargar información del cliente cuando se selecciona la categoría account
  useEffect(() => {
    const loadCustomerInfo = async () => {
      if (selectedCategory === 'account' && userDetails?.customerId) {
        setIsLoadingCustomer(true);
        try {
          const customer = await customerService.getCustomerById(userDetails.customerId);
          setCustomerInfo(customer);
        } catch (error) {
          console.error('Error loading customer info:', error);
          setCustomerInfo(null);
        } finally {
          setIsLoadingCustomer(false);
        }
      } else {
        setCustomerInfo(null);
      }
    };

    loadCustomerInfo();
  }, [selectedCategory, userDetails?.customerId]);

  const currentCategory = categories.find((cat) => cat.id === selectedCategory);
  const hasSubcategories = currentCategory?.subcategories && currentCategory.subcategories.length > 0;

  const renderContent = () => {
    if (selectedCategory === 'general' && selectedSubcategory === 'language-time') {
      return (
        <>
          <div className={styles.infoBanner}>
            {t('settingsDialog.cantFindSettings')}{' '}
            <a href="#" className={styles.link} onClick={(e) => { e.preventDefault(); setSelectedCategory('account'); }}>
              {t('settingsDialog.clickHere')}
            </a>{' '}
            {t('settingsDialog.toViewAccountTab')}
          </div>

          <div className={styles.section}>
            <Text className={styles.sectionTitle}>{t('settingsDialog.syncAcrossMicrosoft365')}</Text>
            <Text className={styles.sectionDescription}>
              {t('settingsDialog.syncDescription')}
            </Text>
            <div className={styles.formGroup}>
              <div className={styles.formRow}>
                <div className={styles.formLabel}>
                  <Text className={styles.formLabelText}>{t('settingsDialog.useMicrosoft365Settings')}</Text>
                </div>
                <Switch />
              </div>
              <Text className={styles.sectionDescription}>
                <a href="#" className={styles.link}>{t('settingsDialog.viewManageMicrosoft365')}</a>
              </Text>
            </div>
          </div>

          <div className={styles.section}>
            <Text className={styles.sectionTitle}>{t('settingsDialog.outlookSettings')}</Text>
            <div className={styles.formGroup}>
              <div className={styles.formRow}>
                <div className={styles.formLabel}>
                  <Label htmlFor="language" className={styles.formLabelText}>
                    {t('settingsDialog.languageCountryRegion')}
                  </Label>
                </div>
                <Select id="language" className={styles.formControl}>
                  <option>English (United States)</option>
                  <option>Español (España)</option>
                  <option>Español (México)</option>
                </Select>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formLabel}>
                  <Label htmlFor="dateFormat" className={styles.formLabelText}>
                    {t('settingsDialog.dateFormat')}
                  </Label>
                  <Text className={styles.formLabelDescription}>
                    {t('settingsDialog.dateFormatExample')}
                  </Text>
                </div>
                <Select id="dateFormat" className={styles.formControl}>
                  <option>9/1/2026</option>
                  <option>01/09/2026</option>
                  <option>2026-09-01</option>
                </Select>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formLabel}>
                  <Label htmlFor="timeFormat" className={styles.formLabelText}>
                    {t('settingsDialog.timeFormat')}
                  </Label>
                </div>
                <Select id="timeFormat" className={styles.formControl}>
                  <option>1:01 AM - 11:59 PM</option>
                  <option>01:01 - 23:59</option>
                </Select>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formLabel}>
                  <Label className={styles.formLabelText}>
                    {t('settingsDialog.timeZone')}
                  </Label>
                  <Text className={styles.formLabelDescription}>
                    (UTC+01:00) Brussels, Copenhagen, Madrid, Paris
                  </Text>
                </div>
                <Button appearance="subtle" className={styles.formControl}>
                  {t('settingsDialog.change')}
                </Button>
              </div>
            </div>
          </div>
        </>
      );
    }

    if (selectedCategory === 'general' && selectedSubcategory === 'appearance') {
      return (
        <div className={styles.section}>
          <Text className={styles.sectionTitle}>{t('settingsDialog.appearance')}</Text>
          <div className={styles.formGroup}>
            <div className={styles.formRow}>
              <div className={styles.formLabel}>
                <Label htmlFor="theme" className={styles.formLabelText}>
                  {t('settingsDialog.theme')}
                </Label>
                <Text className={styles.formLabelDescription}>
                  {t('settingsDialog.chooseTheme')}
                </Text>
              </div>
              <Select id="theme" className={styles.formControl}>
                <option>{t('settingsDialog.light')}</option>
                <option>{t('settingsDialog.dark')}</option>
                <option>{t('settingsDialog.system')}</option>
              </Select>
            </div>
          </div>
        </div>
      );
    }

    if (selectedCategory === 'general' && selectedSubcategory === 'notifications') {
      return (
        <div className={styles.section}>
          <Text className={styles.sectionTitle}>{t('settingsDialog.notifications')}</Text>
          <div className={styles.formGroup}>
            <div className={styles.formRow}>
              <div className={styles.formLabel}>
                <Label htmlFor="emailNotifications" className={styles.formLabelText}>
                  {t('settingsDialog.emailNotifications')}
                </Label>
                <Text className={styles.formLabelDescription}>
                  {t('settingsDialog.emailNotificationsDescription')}
                </Text>
              </div>
              <Switch id="emailNotifications" defaultChecked />
            </div>
            <div className={styles.formRow}>
              <div className={styles.formLabel}>
                <Label htmlFor="browserNotifications" className={styles.formLabelText}>
                  {t('settingsDialog.browserNotifications')}
                </Label>
                <Text className={styles.formLabelDescription}>
                  {t('settingsDialog.browserNotificationsDescription')}
                </Text>
              </div>
              <Switch id="browserNotifications" defaultChecked />
            </div>
          </div>
        </div>
      );
    }

    if (selectedCategory === 'account') {
      return (
        <div className={styles.section}>
          <div className={styles.cardContainer}>
            {/* Card de información del usuario */}
            <Card>
              <CardHeader
                header={<Text weight="semibold">{t('settingsDialog.myUserInformation')}</Text>}
                description={t('settingsDialog.myUserInformationDescription')}
              />
              <div style={{ padding: '20px' }}>
                {userDetails ? (
                  <>
                    <div className={styles.infoRow}>
                      <Text className={styles.infoLabel}>{t('settingsDialog.name')}</Text>
                      <Text className={styles.infoValue}>{userDetails.name || t('settingsDialog.notSpecified')}</Text>
                    </div>
                    <div className={styles.infoRow}>
                      <Text className={styles.infoLabel}>{t('settingsDialog.email')}</Text>
                      <Text className={styles.infoValue}>{userDetails.email}</Text>
                    </div>
                    {userDetails.contactEmail && (
                      <div className={styles.infoRow}>
                        <Text className={styles.infoLabel}>{t('settingsDialog.contactEmail')}</Text>
                        <Text className={styles.infoValue}>{userDetails.contactEmail}</Text>
                      </div>
                    )}
                    {userDetails.phone && (
                      <div className={styles.infoRow}>
                        <Text className={styles.infoLabel}>{t('settingsDialog.phone')}</Text>
                        <Text className={styles.infoValue}>{userDetails.phone}</Text>
                      </div>
                    )}
                    <div className={styles.infoRow}>
                      <Text className={styles.infoLabel}>{t('settingsDialog.role')}</Text>
                      <Text className={styles.infoValue}>{userDetails.role === 'Admin' ? t('settingsDialog.administrator') : t('settingsDialog.user')}</Text>
                    </div>
                    <div className={styles.infoRow}>
                      <Text className={styles.infoLabel}>{t('settingsDialog.status')}</Text>
                      <Text className={styles.infoValue}>
                        {userDetails.isSuspended ? t('settingsDialog.suspended') : userDetails.isActive === false ? t('settingsDialog.inactive') : t('settingsDialog.active')}
                      </Text>
                    </div>
                    <div className={`${styles.infoRow} ${styles.infoRowLast}`}>
                      <Text className={styles.infoLabel}>{t('settingsDialog.userId')}</Text>
                      <Text className={styles.infoValue}>{userDetails.id}</Text>
                    </div>
                  </>
                ) : (
                  <Text>{t('settingsDialog.couldNotLoadUserInfo')}</Text>
                )}
              </div>
            </Card>

            {/* Card de información del cliente */}
            {userDetails?.customerId && (
              <Card>
                <CardHeader
                  header={<Text weight="semibold">{t('settingsDialog.myCustomerInformation')}</Text>}
                  description={t('settingsDialog.myCustomerInformationDescription')}
                />
                <div style={{ padding: '20px' }}>
                  {isLoadingCustomer ? (
                    <Text>{t('settingsDialog.loadingCustomerInfo')}</Text>
                  ) : customerInfo ? (
                    <>
                      <div className={styles.infoRow}>
                        <Text className={styles.infoLabel}>{t('settingsDialog.name')}</Text>
                        <Text className={styles.infoValue}>{customerInfo.name}</Text>
                      </div>
                      <div className={styles.infoRow}>
                        <Text className={styles.infoLabel}>{t('settingsDialog.identification')}</Text>
                        <Text className={styles.infoValue}>{customerInfo.identification}</Text>
                      </div>
                      {customerInfo.countryName && (
                        <div className={styles.infoRow}>
                          <Text className={styles.infoLabel}>{t('settingsDialog.country')}</Text>
                          <Text className={styles.infoValue}>{customerInfo.countryName}</Text>
                        </div>
                      )}
                      {customerInfo.stateProvince && (
                        <div className={styles.infoRow}>
                          <Text className={styles.infoLabel}>{t('settingsDialog.stateProvince')}</Text>
                          <Text className={styles.infoValue}>{customerInfo.stateProvince}</Text>
                        </div>
                      )}
                      {customerInfo.city && (
                        <div className={styles.infoRow}>
                          <Text className={styles.infoLabel}>{t('settingsDialog.city')}</Text>
                          <Text className={styles.infoValue}>{customerInfo.city}</Text>
                        </div>
                      )}
                      {customerInfo.phone && (
                        <div className={styles.infoRow}>
                          <Text className={styles.infoLabel}>{t('settingsDialog.phone')}</Text>
                          <Text className={styles.infoValue}>{customerInfo.phone}</Text>
                        </div>
                      )}
                      {customerInfo.email && (
                        <div className={styles.infoRow}>
                          <Text className={styles.infoLabel}>{t('settingsDialog.email')}</Text>
                          <Text className={styles.infoValue}>{customerInfo.email}</Text>
                        </div>
                      )}
                      {customerInfo.parentName && (
                        <div className={styles.infoRow}>
                          <Text className={styles.infoLabel}>{t('settingsDialog.parentCustomer')}</Text>
                          <Text className={styles.infoValue}>{customerInfo.parentName}</Text>
                        </div>
                      )}
                      <div className={styles.infoRow}>
                        <Text className={styles.infoLabel}>{t('settingsDialog.status')}</Text>
                        <Text className={styles.infoValue}>
                          {customerInfo.isSuspended ? t('settingsDialog.suspended') : customerInfo.isActive === false ? t('settingsDialog.inactive') : t('settingsDialog.active')}
                        </Text>
                      </div>
                      <div className={`${styles.infoRow} ${styles.infoRowLast}`}>
                        <Text className={styles.infoLabel}>{t('settingsDialog.customerId')}</Text>
                        <Text className={styles.infoValue}>{customerInfo.id}</Text>
                      </div>
                    </>
                  ) : (
                    <Text>{t('settingsDialog.couldNotLoadCustomerInfo')}</Text>
                  )}
                </div>
              </Card>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className={styles.section}>
        <Text className={styles.sectionTitle}>{currentCategory?.label || t('settingsDialog.title')}</Text>
        <Text className={styles.sectionDescription}>
          {t('settingsDialog.configurationFor')} {currentCategory?.label.toLowerCase() || t('settingsDialog.title').toLowerCase()} {t('settingsDialog.willBeAvailable')}
        </Text>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={(_, data) => onOpenChange(data.open)} modalType="modal">
      <DialogSurface className={styles.dialogSurface}>
        <DialogBody className={styles.dialogBody}>
          <div className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
              <Text className={styles.sidebarTitle}>{t('settingsDialog.title')}</Text>
              <div className={styles.searchContainer}>
                <Input
                  placeholder={t('settingsDialog.searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  contentBefore={<SearchRegular />}
                  className={styles.searchInput}
                />
              </div>
            </div>
            <div className={styles.sidebarContent}>
              <ul className={styles.categoryList}>
                {categories.map((category) => (
                  <li key={category.id}>
                    <div
                      className={`${styles.categoryItem} ${
                        selectedCategory === category.id ? styles.categoryItemActive : ''
                      }`}
                      onClick={() => {
                        setSelectedCategory(category.id);
                        if (category.subcategories && category.subcategories.length > 0) {
                          setSelectedSubcategory(category.subcategories[0].id);
                        }
                      }}
                    >
                      {category.icon}
                      {category.label}
                    </div>
                    {category.subcategories && selectedCategory === category.id && (
                      <ul className={styles.subcategoryList}>
                        {category.subcategories.map((subcategory) => (
                          <li
                            key={subcategory.id}
                            className={`${styles.subcategoryItem} ${
                              selectedSubcategory === subcategory.id ? styles.subcategoryItemActive : ''
                            }`}
                            onClick={() => setSelectedSubcategory(subcategory.id)}
                          >
                            {subcategory.label}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.contentArea}>
            <div className={styles.contentHeader}>
              <Text className={styles.contentTitle}>
                {hasSubcategories
                  ? currentCategory?.subcategories?.find((sub) => sub.id === selectedSubcategory)?.label ||
                    currentCategory?.label
                  : currentCategory?.label || t('settingsDialog.title')}
              </Text>
              <Button
                appearance="subtle"
                icon={<DismissRegular />}
                className={styles.closeButton}
                onClick={handleClose}
                title={t('settingsDialog.close')}
              />
            </div>
            <div className={styles.contentBody}>{renderContent()}</div>
          </div>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

