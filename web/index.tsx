import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { IUser } from 'publicapi'
import { Qwe } from 'common'

let user: IUser = {
  value: 123
}

ReactDOM.render(
  <div>
    <div>This is app</div>
    <Qwe/>
    <div>{JSON.stringify(user)}</div>
  </div>,
  document.getElementById('root')
)