import * as Nerv from 'nervjs'
import * as classnames from 'classnames'

interface CollapseProps {
  accordion?: boolean
  value: any[] | string | number
  simple?: boolean
  onChange?: (a) => {}
}

interface CollapseState {
  currentValue: any
}

class Collapse extends Nerv.Component<CollapseProps, CollapseState> {
  static defaultProps = {
    accordion: false,
    simple: false
  }
  constructor (...args) {
    super(...args)
    this.state = {
      currentValue: 1
    }
  }
  componentDidMount () {
    this.setActive()
  }

  setActive = () => {
    const activeKey = this.getActiveKey()
    const { accordion, children } = this.props
    return Nerv.Children.map(
      children as never,
      (child, index) => {
        const name = child.props.panelName || index.toString()
        return Nerv.cloneElement(child, {
          ...child,
          isActive: accordion
            ? activeKey[0] === name
            : (child.isActive = activeKey.indexOf(name) >= 0),
          index,
          _toggle: this.toggle
        })
      },
      this
    )
  }
  getActiveKey = () => {
    const { accordion } = this.props
    let activeKey = this.state.currentValue || []
    if (!Array.isArray(activeKey)) {
      activeKey = [activeKey]
    }
    if (accordion && activeKey.length > 1) {
      activeKey = [activeKey[0].toString()]
    } else {
      let i = activeKey.length
      while (i--) {
        activeKey[i] = activeKey[i].toString()
      }
    }
    return activeKey
  }
  toggle = (itemData) => {
    const name = itemData.name.toString()
    const { accordion, onChange } = this.props
    let newActiveKey = []
    if (accordion && !itemData.isActive) {
      newActiveKey.push(name as never)
    } else {
      const activeKey = this.getActiveKey()
      const nameIndex = activeKey.indexOf(name)
      if (itemData.isActive && nameIndex >= 0) {
        activeKey.splice(nameIndex, 1)
      } else if (nameIndex < 0) {
        activeKey.push(name)
      }
      newActiveKey = activeKey
    }
    this.setState(
      {
        currentValue: newActiveKey
      },
      () => {
        if (typeof onChange === 'function') {
          onChange(newActiveKey)
        }
      }
    )
  }
  inputValueCheck = (val) => {
    return typeof val === 'number' ? `${val}` : val
  }
  render () {
    const {simple } = this.props
    return (
      <div
        className={classnames('at-collapse', {
          'at-collapse--simple': simple
        })}
      >
        {this.setActive()}
      </div>
    )
  }
}

export default Collapse