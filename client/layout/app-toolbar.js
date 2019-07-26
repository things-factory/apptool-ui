import { LitElement, html, css } from 'lit-element'

import '@material/mwc-icon'

import { connect } from 'pwa-helpers/connect-mixin.js'
import { store, navigate, isMobileDevice } from '@things-factory/shell'
import { TOOL_POSITION } from '@things-factory/layout-base'

class AppToolbar extends connect(store)(LitElement) {
  static get properties() {
    return {
      _tools: Array,
      _page: String,
      _defaultPage: String
    }
  }

  static get styles() {
    return [
      css`
        :host {
          display: flex;
          justify-content: space-between;
          height: var(--header-bar-height, 45px);
          padding: 0;
          color: var(--header-bar-color);

          text-transform: capitalize;
        }

        [center] {
          flex: 1;
          flex-wrap: nowrap;

          display: flex;
          justify-content: center;
          align-items: center;
        }

        [center] > * {
          justify-content: center;
          align-items: center;
        }

        :host(*) {
          align-items: center;
          padding: 0 10px 0 10px;
        }

        :host(.vline) {
          display: block;
          flex: none;
          border-left: 1px solid rgba(255, 255, 255, 0.07);
          border-right: 1px solid rgba(0, 0, 0, 0.1);
          width: 0px;
          height: 18px;
          margin: 0 4px;
        }

        :host(label) {
          margin-right: 5px;
          color: #fff;
          font-size: 20px;
        }

        span.space {
          width: 10px;
        }
      `
    ]
  }

  render() {
    var tools = this._tools || []

    var frontEndTools = tools.filter(tool => tool.position == TOOL_POSITION.FRONT_END)
    var frontTools = tools.filter(tool => tool.position == TOOL_POSITION.FRONT)
    var centerTools = tools.filter(tool => tool.position == TOOL_POSITION.CENTER)
    var rearTools = tools.filter(tool => tool.position == TOOL_POSITION.REAR)
    var rearEndTools = tools.filter(tool => tool.position == TOOL_POSITION.REAR_END)

    return html`
      ${this._isHome()
        ? html`
            ${frontEndTools.map(
              tool =>
                html`
                  ${tool.template}
                `
            )}
          `
        : isMobileDevice()
        ? html`
            <mwc-icon @click=${e => history.back()}>arrow_back</mwc-icon>
          `
        : html`
            <mwc-icon @click=${e => navigate(this._defaultPage)}>home</mwc-icon>
          `}
      ${frontTools.map(
        tool =>
          html`
            ${tool.template}
          `
      )}

      <div center>
        ${centerTools.map(
          tool =>
            html`
              ${tool.template}
            `
        )}
      </div>

      ${rearTools.map(
        tool =>
          html`
            ${tool.template}
          `
      )}
      ${rearEndTools.map(
        tool =>
          html`
            ${tool.template}
          `
      )}
    `
  }

  stateChanged(state) {
    this._page = state.route.page
    this._defaultPage = state.route.defaultRoutePage

    this._tools = state.apptool.tools
  }

  _isHome() {
    if (this._page == this._defaultPage) {
      return true
    }

    return false
  }
}

customElements.define('app-toolbar', AppToolbar)
