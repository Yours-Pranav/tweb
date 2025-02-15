/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

import { cancelEvent } from "../helpers/dom/cancelEvent";
import { AttachClickOptions, attachClickEvent, CLICK_EVENT_NAME } from "../helpers/dom/clickEvent";
import ListenerSetter from "../helpers/listenerSetter";
import { i18n, LangPackKey } from "../lib/langPack";
import CheckboxField from "./checkboxField";
import { closeBtnMenu } from "./misc";
import { ripple } from "./ripple";

export type ButtonMenuItemOptions = {
  icon: string, 
  text: LangPackKey, 
  onClick: (e: MouseEvent | TouchEvent) => void, 
  element?: HTMLElement,
  options?: AttachClickOptions,
  checkboxField?: CheckboxField,
  /* , cancelEvent?: true */
};

const ButtonMenuItem = (options: ButtonMenuItemOptions) => {
  if(options.element) return options.element;

  const {icon, text, onClick} = options;
  const el = document.createElement('div');
  el.className = 'btn-menu-item tgico-' + icon;
  ripple(el);
  const t = i18n(text);
  t.classList.add('btn-menu-item-text');
  el.append(t);

  if(options.checkboxField) {
    el.append(options.checkboxField.label);
    attachClickEvent(el, () => {
      options.checkboxField.checked = !options.checkboxField.checked;
    }, options.options);
  }

  // * cancel keyboard close
  attachClickEvent(el, CLICK_EVENT_NAME !== 'click' ? (e) => {
    cancelEvent(e);
    onClick(e);
    closeBtnMenu();
  } : onClick, options.options);

  return options.element = el;
};

const ButtonMenu = (buttons: ButtonMenuItemOptions[], listenerSetter?: ListenerSetter) => {
  const el = document.createElement('div');
  el.classList.add('btn-menu');

  if(listenerSetter) {
    buttons.forEach(b => {
      if(b.options) {
        b.options.listenerSetter = listenerSetter;
      } else {
        b.options = {listenerSetter};
      }
    });
  }

  const items = buttons.map(ButtonMenuItem);

  el.append(...items);

  return el;
};

export default ButtonMenu;
