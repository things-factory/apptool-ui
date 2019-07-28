import { html } from 'lit-html'

import { appendViewpart, VIEWPART_POSITION } from '@things-factory/layout-base'
import './layout/app-toolbar'

export default function bootstrap() {
  appendViewpart({
    name: 'apptoolbar',
    viewpart: {
      show: true,
      template: html`
        <app-toolbar></app-toolbar>
      `
    },
    position: VIEWPART_POSITION.HEADERBAR
  })
}
