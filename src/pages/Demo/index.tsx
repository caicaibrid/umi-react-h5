import {
  FormattedMessage,
  getAllLocales,
  getLocale,
  setLocale,
  useIntl,
  useModel,
} from '@umijs/max';
import './index.less';

const HomePage: React.FC = () => {
  const { name } = useModel('global');
  const intl = useIntl();
  return (
    <div className="p-1 text-[12px]">
      <h5>{name}</h5>
      <div>
        FormattedMessage组件渲染多语言：
        <FormattedMessage id="welcome" />
      </div>
      <div>useIntl方法渲染多语言：{intl.formatMessage({ id: 'welcome' })}</div>
      {getAllLocales().map((item) => (
        <div
          key={item}
          className={`text-[blue] ${
            item === getLocale() ? ' text-green-500' : ''
          }`}
          onClick={() => {
            setLocale(item);
          }}
        >
          设置语言环境：{item}
        </div>
      ))}
    </div>
  );
};

export default HomePage;
