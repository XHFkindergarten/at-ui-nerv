import * as Nerv from 'nervjs'
import FormDoc from '@md/form.md'
import './style.scss'

class Form extends Nerv.Component {
  render () {
    return (
      <div className='form-example'>
        <FormDoc />
      </div>
    )
  }
}

export default Form
