const t=window,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let n=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new n(s,t,i)},r=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,i))(e)})(t):t;var l;const a=window,h=a.trustedTypes,c=h?h.emptyScript:"",d=a.reactiveElementPolyfillSupport,u={toAttribute(t,e){switch(e){case Boolean:t=t?c:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},p=(t,e)=>e!==t&&(e==e||t==t),v={attribute:!0,type:String,converter:u,reflect:!1,hasChanged:p},_="finalized";let g=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,i)=>{const s=this._$Ep(i,e);void 0!==s&&(this._$Ev.set(s,i),t.push(s))}),t}static createProperty(t,e=v){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const n=this[t];this[e]=s,this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||v}static finalize(){if(this.hasOwnProperty(_))return!1;this[_]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach(t=>t(this))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var i;const s=null!==(i=this.shadowRoot)&&void 0!==i?i:this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{e?i.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):s.forEach(e=>{const s=document.createElement("style"),n=t.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=e.cssText,i.appendChild(s)})})(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)})}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=v){var s;const n=this.constructor._$Ep(t,i);if(void 0!==n&&!0===i.reflect){const o=(void 0!==(null===(s=i.converter)||void 0===s?void 0:s.toAttribute)?i.converter:u).toAttribute(e,i.type);this._$El=t,null==o?this.removeAttribute(n):this.setAttribute(n,o),this._$El=null}}_$AK(t,e){var i;const s=this.constructor,n=s._$Ev.get(t);if(void 0!==n&&this._$El!==n){const t=s.getPropertyOptions(n),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:u;this._$El=n,this[n]=o.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||p)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((t,e)=>this[e]=t),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)}),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach(t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach((t,e)=>this._$EO(e,this[e],t)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};var y;g[_]=!0,g.elementProperties=new Map,g.elementStyles=[],g.shadowRootOptions={mode:"open"},null==d||d({ReactiveElement:g}),(null!==(l=a.reactiveElementVersions)&&void 0!==l?l:a.reactiveElementVersions=[]).push("1.6.3");const m=window,f=m.trustedTypes,$=f?f.createPolicy("lit-html",{createHTML:t=>t}):void 0,b="$lit$",A=`lit$${(Math.random()+"").slice(9)}$`,w="?"+A,E=`<${w}>`,x=document,C=()=>x.createComment(""),S=t=>null===t||"object"!=typeof t&&"function"!=typeof t,P=Array.isArray,k="[ \t\n\f\r]",U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,H=/>/g,M=RegExp(`>|${k}(?:([^\\s"'>=/]+)(${k}*=${k}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),T=/'/g,N=/"/g,O=/^(?:script|style|textarea|title)$/i,z=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),V=Symbol.for("lit-noChange"),I=Symbol.for("lit-nothing"),L=new WeakMap,j=x.createTreeWalker(x,129,null,!1);function B(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==$?$.createHTML(e):e}const F=(t,e)=>{const i=t.length-1,s=[];let n,o=2===e?"<svg>":"",r=U;for(let e=0;e<i;e++){const i=t[e];let l,a,h=-1,c=0;for(;c<i.length&&(r.lastIndex=c,a=r.exec(i),null!==a);)c=r.lastIndex,r===U?"!--"===a[1]?r=R:void 0!==a[1]?r=H:void 0!==a[2]?(O.test(a[2])&&(n=RegExp("</"+a[2],"g")),r=M):void 0!==a[3]&&(r=M):r===M?">"===a[0]?(r=null!=n?n:U,h=-1):void 0===a[1]?h=-2:(h=r.lastIndex-a[2].length,l=a[1],r=void 0===a[3]?M:'"'===a[3]?N:T):r===N||r===T?r=M:r===R||r===H?r=U:(r=M,n=void 0);const d=r===M&&t[e+1].startsWith("/>")?" ":"";o+=r===U?i+E:h>=0?(s.push(l),i.slice(0,h)+b+i.slice(h)+A+d):i+A+(-2===h?(s.push(void 0),e):d)}return[B(t,o+(t[i]||"<?>")+(2===e?"</svg>":"")),s]};class D{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,o=0;const r=t.length-1,l=this.parts,[a,h]=F(t,e);if(this.el=D.createElement(a,i),j.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=j.nextNode())&&l.length<r;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith(b)||e.startsWith(A)){const i=h[o++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+b).split(A),e=/([.?@])?(.*)/.exec(i);l.push({type:1,index:n,name:e[2],strings:t,ctor:"."===e[1]?K:"?"===e[1]?Z:"@"===e[1]?G:J})}else l.push({type:6,index:n})}for(const e of t)s.removeAttribute(e)}if(O.test(s.tagName)){const t=s.textContent.split(A),e=t.length-1;if(e>0){s.textContent=f?f.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],C()),j.nextNode(),l.push({type:2,index:++n});s.append(t[e],C())}}}else if(8===s.nodeType)if(s.data===w)l.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(A,t+1));)l.push({type:7,index:n}),t+=A.length-1}n++}}static createElement(t,e){const i=x.createElement("template");return i.innerHTML=t,i}}function Y(t,e,i=t,s){var n,o,r,l;if(e===V)return e;let a=void 0!==s?null===(n=i._$Co)||void 0===n?void 0:n[s]:i._$Cl;const h=S(e)?void 0:e._$litDirective$;return(null==a?void 0:a.constructor)!==h&&(null===(o=null==a?void 0:a._$AO)||void 0===o||o.call(a,!1),void 0===h?a=void 0:(a=new h(t),a._$AT(t,i,s)),void 0!==s?(null!==(r=(l=i)._$Co)&&void 0!==r?r:l._$Co=[])[s]=a:i._$Cl=a),void 0!==a&&(e=Y(t,a._$AS(t,e.values),a,s)),e}class q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:s}=this._$AD,n=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:x).importNode(i,!0);j.currentNode=n;let o=j.nextNode(),r=0,l=0,a=s[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new W(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new X(o,this,t)),this._$AV.push(e),a=s[++l]}r!==(null==a?void 0:a.index)&&(o=j.nextNode(),r++)}return j.currentNode=x,n}v(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class W{constructor(t,e,i,s){var n;this.type=2,this._$AH=I,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cp=null===(n=null==s?void 0:s.isConnected)||void 0===n||n}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Y(this,t,e),S(t)?t===I||null==t||""===t?(this._$AH!==I&&this._$AR(),this._$AH=I):t!==this._$AH&&t!==V&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>P(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==I&&S(this._$AH)?this._$AA.nextSibling.data=t:this.$(x.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:s}=t,n="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=D.createElement(B(s.h,s.h[0]),this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===n)this._$AH.v(i);else{const t=new q(n,this),e=t.u(this.options);t.v(i),this.$(e),this._$AH=t}}_$AC(t){let e=L.get(t.strings);return void 0===e&&L.set(t.strings,e=new D(t)),e}T(t){P(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new W(this.k(C()),this.k(C()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class J{constructor(t,e,i,s,n){this.type=1,this._$AH=I,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=I}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const n=this.strings;let o=!1;if(void 0===n)t=Y(this,t,e,0),o=!S(t)||t!==this._$AH&&t!==V,o&&(this._$AH=t);else{const s=t;let r,l;for(t=n[0],r=0;r<n.length-1;r++)l=Y(this,s[i+r],e,r),l===V&&(l=this._$AH[r]),o||(o=!S(l)||l!==this._$AH[r]),l===I?t=I:t!==I&&(t+=(null!=l?l:"")+n[r+1]),this._$AH[r]=l}o&&!s&&this.j(t)}j(t){t===I?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class K extends J{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===I?void 0:t}}const Q=f?f.emptyScript:"";class Z extends J{constructor(){super(...arguments),this.type=4}j(t){t&&t!==I?this.element.setAttribute(this.name,Q):this.element.removeAttribute(this.name)}}class G extends J{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=Y(this,t,e,0))&&void 0!==i?i:I)===V)return;const s=this._$AH,n=t===I&&s!==I||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==I&&(s===I||n);n&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class X{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Y(this,t)}}const tt=m.litHtmlPolyfillSupport;null==tt||tt(D,W),(null!==(y=m.litHtmlVersions)&&void 0!==y?y:m.litHtmlVersions=[]).push("2.8.0");var et,it;class st extends g{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var s,n;const o=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let r=o._$litPart$;if(void 0===r){const t=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:null;o._$litPart$=r=new W(e.insertBefore(C(),t),t,void 0,null!=i?i:{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return V}}st.finalized=!0,st._$litElement$=!0,null===(et=globalThis.litElementHydrateSupport)||void 0===et||et.call(globalThis,{LitElement:st});const nt=globalThis.litElementPolyfillSupport;null==nt||nt({LitElement:st}),(null!==(it=globalThis.litElementVersions)&&void 0!==it?it:globalThis.litElementVersions=[]).push("3.3.3");customElements.define("ha-youtube-card-editor",class extends st{static get properties(){return{hass:{type:Object},_config:{state:!0}}}setConfig(t){this._config={...t}}_valueChanged(t){if(!this._config)return;const e=t.target,i=e.dataset.key,s=void 0!==e.checked?e.checked:e.value;this._config[i]!==s&&(this._config={...this._config,[i]:s},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0})))}render(){return this._config?z`
      <div class="card-config">

        <!-- Content ID field -->
        <ha-textfield
          label="Content ID"
          .value="${this._config.content_id||""}"
          data-key="content_id"
          @change="${this._valueChanged}"
          helper="Paste a YouTube video ID, playlist ID, or channel username"
          helper-persistent
        ></ha-textfield>

        <!-- Content type dropdown -->
        <ha-select
          label="Content type"
          .value="${this._config.content_type||"video"}"
          data-key="content_type"
          @selected="${this._valueChanged}"
          @closed="${t=>t.stopPropagation()}"
        >
          <mwc-list-item value="video">Single video</mwc-list-item>
          <mwc-list-item value="playlist">Playlist</mwc-list-item>
          <mwc-list-item value="channel">Channel uploads</mwc-list-item>
        </ha-select>

        <!-- Toggle row: Autoplay -->
        <div class="toggle-row">
          <span class="toggle-label">
            <span>Autoplay on load</span>
            <span class="toggle-hint">Note: browsers require mute for autoplay to work</span>
          </span>
          <ha-switch
            .checked="${this._config.autoplay||!1}"
            data-key="autoplay"
            @change="${this._valueChanged}"
          ></ha-switch>
        </div>

        <!-- Toggle row: Mute on start -->
        <div class="toggle-row">
          <span class="toggle-label">
            <span>Start muted</span>
            <span class="toggle-hint">Useful for background displays</span>
          </span>
          <ha-switch
            .checked="${this._config.mute_on_start||!1}"
            data-key="mute_on_start"
            @change="${this._valueChanged}"
          ></ha-switch>
        </div>

      </div>
    `:z``}static get styles(){return o`
      .card-config {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 16px 0 8px;
      }

      ha-textfield,
      ha-select {
        width: 100%;
      }

      .toggle-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 4px;
      }

      .toggle-label {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .toggle-label span:first-child {
        font-size: 14px;
        color: var(--primary-text-color);
      }

      .toggle-hint {
        font-size: 12px;
        color: var(--secondary-text-color);
      }
    `}});let ot=null;const rt=z`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`,lt=z`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`,at=z`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>`,ht=z`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>`,ct=z`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>`,dt=z`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/></svg>`;customElements.define("ha-youtube-card",class extends st{static get properties(){return{hass:{type:Object},config:{type:Object},_playerReady:{state:!0},_playing:{state:!0},_muted:{state:!0},_volume:{state:!0},_fullscreen:{state:!0}}}constructor(){super(),this._playerReady=!1,this._playing=!1,this._muted=!1,this._volume=100,this._fullscreen=!1,this._player=null,this._containerId="yt-player-"+Math.random().toString(36).slice(2,7)}setConfig(t){if(!t.content_id)throw new Error("ha-youtube-card: please set a content_id");this.config={content_type:"video",autoplay:!1,mute_on_start:!1,...t}}static getConfigElement(){return document.createElement("ha-youtube-card-editor")}static getStubConfig(){return{content_id:"dQw4w9WgXcQ",content_type:"video",autoplay:!1}}firstUpdated(){this._setupFullscreenListener(),this._initPlayer()}disconnectedCallback(){super.disconnectedCallback(),this._player&&(this._player.destroy(),this._player=null)}async _initPlayer(){await(ot||(ot=new Promise(t=>{if(window.YT&&window.YT.Player)return void t();window.onYouTubeIframeAPIReady=t;const e=document.createElement("script");e.src="https://www.youtube.com/iframe_api",document.head.appendChild(e)}),ot));const t=this.shadowRoot.getElementById(this._containerId);if(!t)return;const{content_id:e,content_type:i,autoplay:s,mute_on_start:n}=this.config,o={autoplay:s?1:0,controls:0,rel:0,modestbranding:1,playsinline:1,fs:0,mute:n?1:0};"playlist"===i&&(o.listType="playlist",o.list=e),"channel"===i&&(o.listType="user_uploads",o.list=e),this._player=new YT.Player(t,{videoId:"video"===i?e:"",playerVars:o,events:{onReady:t=>this._onPlayerReady(t),onStateChange:t=>this._onStateChange(t),onError:t=>this._onError(t)}})}_onPlayerReady(t){this._playerReady=!0,this._muted=this._player.isMuted(),this._volume=this._player.getVolume()}_onStateChange(t){this._playing=t.data===YT.PlayerState.PLAYING}_onError(t){console.warn("ha-youtube-card: YouTube player error",t.data)}_togglePlay(){this._player&&(this._playing?this._player.pauseVideo():this._player.playVideo())}_toggleMute(){this._player&&(this._muted?(this._player.unMute(),this._muted=!1):(this._player.mute(),this._muted=!0))}_onVolumeChange(t){const e=parseInt(t.target.value,10);this._volume=e,this._player&&(this._player.setVolume(e),e>0&&this._muted&&(this._player.unMute(),this._muted=!1))}_toggleFullscreen(){const t=this.shadowRoot.querySelector("ha-card");document.fullscreenElement||document.webkitFullscreenElement?document.exitFullscreen?document.exitFullscreen():document.webkitExitFullscreen&&document.webkitExitFullscreen():t.requestFullscreen?t.requestFullscreen():t.webkitRequestFullscreen&&t.webkitRequestFullscreen()}_setupFullscreenListener(){const t=()=>{this._fullscreen=!(!document.fullscreenElement&&!document.webkitFullscreenElement)};document.addEventListener("fullscreenchange",t),document.addEventListener("webkitfullscreenchange",t)}static get styles(){return o`
      :host {
        display: block;
      }

      ha-card {
        overflow: hidden;
        background: var(--card-background-color, #1c1c1c);
      }

      /* Wrapper maintains 16:9 aspect ratio at any width */
      .video-wrapper {
        position: relative;
        width: 100%;
        padding-top: 56.25%;
        background: #000;
      }

      /* The IFrame API replaces the container div with an iframe */
      .video-wrapper > div,
      .video-wrapper iframe {
        position: absolute;
        inset: 0;        /* shorthand for top/right/bottom/left: 0 */
        width: 100%;
        height: 100%;
        border: none;
      }

      /* Loading state shown before the player is ready */
      .loading {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgba(255,255,255,0.5);
        font-size: 13px;
        pointer-events: none;
      }

      /* Controls bar */
      .controls {
        display: flex;
        align-items: center;
        padding: 4px 8px;
        gap: 4px;
        background: var(--card-background-color, #1c1c1c);
        min-height: 44px;  /* 44px is the minimum comfortable touch target height */
      }

      /* Icon buttons */
      .ctrl-btn {
        background: none;
        border: none;
        cursor: pointer;
        padding: 8px;
        color: var(--primary-text-color, #fff);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 40px;   /* 40px minimum touch target width */
        min-height: 40px;
        flex-shrink: 0;
        -webkit-tap-highlight-color: transparent;
      }

      .ctrl-btn:hover {
        background: var(--secondary-background-color, rgba(255,255,255,0.1));
      }

      .ctrl-btn svg {
        width: 20px;
        height: 20px;
        pointer-events: none;
      }

      /* Volume slider — flex-grows to fill available space */
      .volume-slider {
        flex: 1;
        min-width: 40px;
        accent-color: var(--primary-color, #03a9f4);
        cursor: pointer;
      }

      /* Push fullscreen button to the right */
      .fullscreen-btn {
        margin-left: auto;
      }

      /* In fullscreen: stretch the card to fill the screen */
      :host-context(:fullscreen) ha-card,
      :host-context(:-webkit-full-screen) ha-card {
        height: 100vh;
        display: flex;
        flex-direction: column;
      }

      :host-context(:fullscreen) .video-wrapper,
      :host-context(:-webkit-full-screen) .video-wrapper {
        flex: 1;
        padding-top: 0;
      }
    `}render(){return z`
      <ha-card>
        <div class="video-wrapper">
          <div id="${this._containerId}"></div>
          ${this._playerReady?"":z`<div class="loading">Loading player…</div>`}
        </div>

        <div class="controls">

          <!-- Play / Pause -->
          <button class="ctrl-btn"
            @click="${this._togglePlay}"
            title="${this._playing?"Pause":"Play"}"
            ?disabled="${!this._playerReady}">
            ${this._playing?lt:rt}
          </button>

          <!-- Mute -->
          <button class="ctrl-btn"
            @click="${this._toggleMute}"
            title="${this._muted?"Unmute":"Mute"}"
            ?disabled="${!this._playerReady}">
            ${this._muted?ht:at}
          </button>

          <!-- Volume slider -->
          <input class="volume-slider" type="range"
            min="0" max="100"
            .value="${this._volume}"
            @input="${this._onVolumeChange}"
            title="Volume"
            ?disabled="${!this._playerReady}" />

          <!-- Fullscreen -->
          <button class="ctrl-btn fullscreen-btn"
            @click="${this._toggleFullscreen}"
            title="${this._fullscreen?"Exit fullscreen":"Fullscreen"}">
            ${this._fullscreen?dt:ct}
          </button>

        </div>
      </ha-card>
    `}}),window.customCards=window.customCards||[],window.customCards.push({type:"ha-youtube-card",name:"YouTube Player",description:"Plays YouTube videos, playlists and live streams",preview:!0,documentationURL:"https://github.com/YOUR_USERNAME/ha-youtube-card"});