import * as React from 'react';
import * as Constants from '../../common/constants';

export interface Props {
}

export const Postcards: React.StatelessComponent<Props> = (props: Props) => (
  <section className="postcards">
    <h1 className="hypothesis__title">Send 5 Cards to Voters</h1>
    <img className="postcards__example" src="/img/postcards.png" alt="5 Calls Postcards"/>
    {/*tslint:disable-next-line:max-line-length*/}
    <p>We’re supporting the upcoming <strong>special election in Alabama</strong> with handwritten postcards to help get out the vote in this critical Senate election.</p>
    {/*tslint:disable-next-line:max-line-length*/}
    <p><strong>For $5, you'll get 5 pre-stamped, pre-addressed postcards to critical voters in Alabama</strong>. Your postcards will come to you in the mail, where you'll add your personal message and you put them right back in the mail – you don’t even need to leave your home!</p>
    <h2><a href="https://secure.actblue.com/donate/5calls-postcards">Get Your Voter Postcards Here</a></h2>
    {/*tslint:disable-next-line:max-line-length*/}
    <p>We specifically designed our postcards to help voters make a plan to vote, which research has shown to increase voter turnout. We're also bringing you these cards at nearly cost, meaning your money goes straight to printing, packaging and postage. We can do things a little cheaper in bulk, <strong>if you're a group who wants to throw a postcard party, buy the 50x pack</strong> or <a href={`mailto:${Constants.contact.email}`}>get in touch with us</a> for even more.</p>
    <h3>Important Details for the Alabama Special Election:</h3>
    <ul>
      {/*tslint:disable-next-line:max-line-length*/}
      <li>No early voting, mail-in ballots are only for special cases, therefore voting on election day is only option for most people.</li>
      <li>The special election in Alabama will be won on voter turnout, the 2 candidates running neck and neck.</li>
    </ul>
    <h3>Talking points for the back of your postcard:</h3>
    <ul>
      <li>Polls are open from 7am-7pm</li>
      <li>Polling locations are available at www.alabamavotes.gov</li>
      {/*tslint:disable-next-line:max-line-length*/}
      <li>Since 2014, voters in Alabama have been required to bring ID to the polls. They can find information on acceptable ID or how to get a free ID at www.alabamavotes.gov</li>
    </ul>
  </section>
);