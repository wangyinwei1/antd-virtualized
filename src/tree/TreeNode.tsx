import React from 'react';
import classnames from 'classnames';
import { Icon } from 'antd';

export interface IProps extends NodeData {
  onSelect: (e: any, node: NodeData) => any;
  [customProp: string]: any;
}
export interface NodeData {
  _level: number;
  _id: string;
  _pid: string;
  isLeaf?: boolean;
  visible?: boolean;
  /** 父节点有效，节点展开状态 */
  expanded?: boolean;
}
const ICON_OPEN = 'open';
const ICON_CLOSE = 'close';

class TreeNode extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);

    this.state = {};
  }

  // Isomorphic needn't load data in server side
  componentDidMount() {}

  componentDidUpdate() {}

  componentWillUnmount() {}

  onSelectorClick = () => {};

  onSelectorDoubleClick = () => {};

  handleSelect = (e: any) => {
    const { onSelect, option } = this.props;
    if (onSelect) {
      onSelect(e, option);
    }
  };

  onCheck = () => {};

  onMouseEnter = () => {};

  onMouseLeave = () => {};

  // Disabled item still can be switch
  onExpand = () => {
    const { onNodeExpand } = this.props;
    onNodeExpand(this);
  };

  isDisabled = () => {};

  isCheckable = () => {};

  renderSwitcherIcon = () => {
    const { prefixCls, isLeaf } = this.props;
    if (isLeaf) {
      return null;
    }
    return <Icon type="caret-down" className={`${prefixCls}-switcher-icon`} />;
  };

  // Switcher
  renderSwitcher = () => {
    const { expanded, prefixCls, isLeaf } = this.props;

    if (isLeaf) {
      return (
        <span className={classnames(`${prefixCls}-switcher`, `${prefixCls}-switcher-noop`)}>
          {this.renderSwitcherIcon()}
        </span>
      );
    }

    const switcherCls = classnames(
      `${prefixCls}-switcher`,
      `${prefixCls}-switcher_${expanded ? ICON_OPEN : ICON_CLOSE}`,
    );
    return (
      <span onClick={this.onExpand} className={switcherCls}>
        {this.renderSwitcherIcon()}
      </span>
    );
  };

  render() {
    const {
      value,
      style: mstyle,
      disabled,
      prefixCls,
      _level,
      expanded,
      isLeaf,
      selected,
      visible,
    } = this.props;
    const className = classnames(`${prefixCls}-node-content-wrapper`, {
      [`${prefixCls}-node-disabled`]: disabled,
      [`${prefixCls}-node-switcher-${expanded ? 'open' : 'close'}`]: !isLeaf,
      [`${prefixCls}-node-selected`]: selected,
    });
    const paddingLeft = _level > 0 ? 24 * (_level - 1) + 18 : 0;
    const style = {
      ...mstyle,
      padding: `0 0 0 ${paddingLeft}px`,
    };
    const events = disabled
      ? {}
      : {
          onClick: this.handleSelect,
        };
    const nodeClassname = classnames(`${prefixCls}-node`, {
      [`${prefixCls}-node-open`]: visible,
    });
    return (
      <div style={style} className={nodeClassname}>
        {this.renderSwitcher()}
        <span {...events} className={className}>
          {value}
        </span>
      </div>
    );
  }
}

export default TreeNode;
