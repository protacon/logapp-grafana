// Libraries
import React, { Component } from 'react';
import { getTitleFromNavModel } from 'app/core/selectors/navModel';

// Components
import PageHeader from '../PageHeader/PageHeader';
import PageContents from './PageContents';
import { CustomScrollbar } from '@grafana/ui';
import { NavModel } from '@grafana/data';
import { isEqual } from 'lodash';

interface Props {
  children: JSX.Element[] | JSX.Element;
  navModel: NavModel;
}

class Page extends Component<Props> {
  static Header = PageHeader;
  static Contents = PageContents;

  componentDidMount() {
    this.updateTitle();
  }

  componentDidUpdate(prevProps: Props) {
    if (!isEqual(prevProps.navModel, this.props.navModel)) {
      this.updateTitle();
    }
  }

  updateTitle = () => {
    const title = this.getPageTitle;
    document.title = title ? title : 'Protacon';
  };

  get getPageTitle() {
    const { navModel } = this.props;
    if (navModel) {
      return getTitleFromNavModel(navModel) || undefined;
    }
    return undefined;
  }

  render() {
    const { navModel } = this.props;
    return (
      <div className="page-scrollbar-wrapper">
        <CustomScrollbar autoHeightMin={'100%'} className="custom-scrollbar--page">
          <div className="page-scrollbar-content">
            <PageHeader model={navModel} />
            {this.props.children}
          </div>
        </CustomScrollbar>
      </div>
    );
  }
}

export default Page;
