import * as Nerv from 'nervjs'
import * as $ from 'webpack-zepto'
import * as sinon from 'sinon'
import Collapse from '../'
// import {VNode} from 'nerv-shared'

describe('Collapse', () => {
  let scratch
  beforeAll(() => {
    scratch = document.createElement('div')
    document
      .body
      .appendChild(scratch)
  })

  beforeEach(() => {
    scratch = document.createElement('div')
    document
      .body
      .appendChild(scratch)
  })

  afterAll(() => {
    scratch
      .parentNode
      .removeChild(scratch)
    scratch = null
  })

  it('basic render', (done) => {
    const onChange = sinon.spy()
    const collapseJSX = <Collapse onChange={onChange}>
      <Collapse.Item>
        test
      </Collapse.Item>
    </Collapse>
    const component = Nerv.render(collapseJSX, scratch)
    expect($(component.dom).find('.at-collapse')).toBeDefined()
    $(component.dom)
      .find('.at-collapse__header')
      .trigger('click')
    Nerv.nextTick(() => {
      expect(onChange.callCount).toBe(1)
      done()
    })
  })
  it('accordion state', (done) => {
    const onChange = sinon.spy()
    const accordionJSX = <Collapse accordion onChange={onChange}>
      <Collapse.Item title='title'>
        <div>test</div>
      </Collapse.Item>
      <Collapse.Item >
        <div>test</div>
      </Collapse.Item>
    </Collapse>
    const component = Nerv.render(accordionJSX, scratch)
    $(component.dom)
      .find('.at-collapse__header')
      .eq(0)
      .trigger('click')
    $(component.dom)
      .find('.at-collapse__header')
      .eq(1)
      .trigger('click')
    Nerv.nextTick(() => {
      expect($(component.dom).find('.at-collapse__item').eq(0).hasClass('at-collapse__item--active')).toBeFalsy()
      expect($(component.dom).find('.at-collapse__item').eq(1).hasClass('at-collapse__item--active')).toBeTruthy()
      done()
    })
  })
  it('nest collapse', (done) => {
    const onChange = sinon.spy()
    const nestJSX = <Collapse onChange={onChange}>
      <Collapse.Item>
        <Collapse accordion>
          <Collapse.Item title='嵌套面板'>
            <div>嵌套面板的内容</div>
          </Collapse.Item>
        </Collapse>
      </Collapse.Item>
    </Collapse>
    const component = Nerv.render(nestJSX, scratch)
    expect($(component.dom).find('.at-collapse__content').children('.at-collapse').length).toBe(1)
    done()
  })
})
