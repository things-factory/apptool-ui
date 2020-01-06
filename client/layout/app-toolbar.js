import { LitElement, html, css } from 'lit-element'

import '@material/mwc-icon'

import { connect } from 'pwa-helpers/connect-mixin.js'
import { store, navigate } from '@things-factory/shell'
import { TOOL_POSITION } from '@things-factory/layout-base'

class AppToolbar extends connect(store)(LitElement) {
  static get properties() {
    return {
      _tools: Array,
      _route: Object
    }
  }

  static get styles() {
    return [
      css`
        :host {
          display: flex;
          height: var(--header-bar-height, 45px);
          color: var(--header-bar-color);
          justify-content: space-between;
          align-items: center;
          padding: 0 5px;

          text-transform: capitalize;
        }

        :host > * {
          padding: var(--header-bar-item-padding);
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

    /* 현재 OVERLAY가 있으면, 뒤로가기 버튼이 보이고, 아니면, HOME 버튼이 보인다. */
    var state = history.state
    var overlay = (state || {}).overlay

    return html`
      ${overlay
        ? html`
            <mwc-icon @click=${e => history.back()}>arrow_back</mwc-icon>
          `
        : frontEndTools.length == 0
        ? html`
            <mwc-icon @click=${e => this.navigateToHome()}>home</mwc-icon>
          `
        : frontEndTools.map(
            tool =>
              html`
                ${tool.template}
              `
          )}
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
    /* page의 변화를 감지하기 위해서 route의 변화를 체크한다. */
    this._route = state.route

    this._tools = state.apptool.tools
  }

  navigateToHome() {
    var base = document.querySelector('base')
    if (base) {
      navigate(base.getAttribute('href'))
    } else {
      navigate('/')
    }
  }
}

customElements.define('app-toolbar', AppToolbar)
