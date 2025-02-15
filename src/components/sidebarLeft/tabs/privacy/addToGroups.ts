/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

import { SliderSuperTabEventable } from "../../../sliderTab";
import PrivacySection from "../../../privacySection";
import { LangPackKey } from "../../../../lib/langPack";

export default class AppPrivacyAddToGroupsTab extends SliderSuperTabEventable {
  protected init() {
    this.container.classList.add('privacy-tab', 'privacy-add-to-groups');
    this.setTitle('PrivacySettings.Groups');

    const caption: LangPackKey = 'PrivacySettingsController.GroupDescription';
    new PrivacySection({
      tab: this,
      title: 'WhoCanAddMe',
      inputKey: 'inputPrivacyKeyChatInvite',
      captions: [caption, caption, caption],
      exceptionTexts: ['PrivacySettingsController.NeverAllow', 'PrivacySettingsController.AlwaysAllow'],
      appendTo: this.scrollable
    });
  }
}
