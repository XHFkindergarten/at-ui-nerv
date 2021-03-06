import * as Nerv from 'nervjs'

interface MenuGroupProps {
  title?: string
  _onSelect?: (e: any) => void
}

class MenuGroup extends Nerv.Component<MenuGroupProps, any> {
  enhanceChildren = () => {
    const { children = [], rootElem } = this.props
    return Nerv.Children.map(
      children as never,
      (child, idx) => {
        return Nerv.cloneElement(child, {
          ...child.props,
          _onSelect: this.onSelect,
          parentElem: this,
          rootElem
        })
      },
      this
    )
  }
  onSelect = (e) => {
    const { _onSelect, name } = this.props
    _onSelect && _onSelect(name)
  }
  render () {
    const { title } = this.props

    return (
      <ul className='at-menu__item-group'>
        <li className='at-menu__item-group-title'>{title}</li>
        <ul className='at-menu__item-group-list'>{this.enhanceChildren()}</ul>
      </ul>
    )
  }
}

export default MenuGroup
