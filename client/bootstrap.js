import { html } from 'lit-html'

import { appendViewpart, VIEWPART_POSITION } from '@things-factory/layout-base'

export default function bootstrap() {
  import('./layout/app-toolbar')

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
