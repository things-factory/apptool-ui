import { html } from 'lit-html'

import { store } from '@things-factory/shell'
import { APPEND_HEADERBAR } from '@things-factory/layout-base'

export default function bootstrap() {
  import('./layout/app-toolbar')

  store.dispatch({
    type: APPEND_HEADERBAR,
    name: 'apptoolbar',
    headerbar: {
      show: true,
      template: html`
        <app-toolbar></app-toolbar>
      `
    }
  })
}
