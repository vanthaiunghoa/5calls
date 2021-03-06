import * as React from 'react';
import { TranslationFunction } from 'i18next';
import { translate } from 'react-i18next';
import * as ReactMarkdown from 'react-markdown';

import { Issue } from '../../common/model';

interface Props {
  readonly invalidAddress: boolean;
  readonly currentIssue: Issue;
  readonly t: TranslationFunction;
}

export const CallHeader: React.StatelessComponent<Props> = ({ invalidAddress, currentIssue, t }: Props) => {
  if (currentIssue) {
    return (
      <header className="call__header">
        <h1 className="call__title">{currentIssue.name}</h1>
        <div className="call__reason">
          <ReactMarkdown source={currentIssue.reason}/>
        </div>
      </header>
    );
  } else {
    return (
      <header className="call__header">
        {invalidAddress ?
          <span>
            <h1 className="call__title">Invalid Address or Zip</h1>
            {/* tslint:disable-next-line:max-line-length */}
            <p>Looks like we couldn't find your reps based on the address or zip code you entered. Use the left sidebar to enter a more specific address or just click the <strong>"Go"</strong> button to find it automatically.</p>
          </span>
        :
          <span>
            <h1 className="call__title">{t('noCalls.title')}</h1>
            <p>{t('noCalls.reason')}</p>
            <p>{t('noCalls.nextStep')}</p>
          </span>
        }
      </header>
    );
  }
};

export default translate()(CallHeader);

export const CallHeaderTranslatable = translate()(CallHeader);
