import cn from 'classnames';
import { TabType } from '../../const';

type TabDescriptionProps = {
  description: string;
  tabType: TabType;
}

function TabDescription ({description, tabType}: TabDescriptionProps): JSX.Element {
  const className = cn('tabs__element', {
    'is-active': tabType === TabType.Description
  });

  return (
    <div className={className}>
      <div className="product__tabs-text">
        <p>{description}</p>
      </div>
    </div>
  );
}

export default TabDescription;
