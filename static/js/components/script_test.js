const script = require('./script');
const chai = require('chai');
const expect = chai.expect;

describe('script component', () => {
  it('should display script if current contact exists', () => {
    let cname = 'Senator Blowhart';
    let id = 1;
    let location = {params: {issueid: id}};
    let issue = {
      id: id,
      name: 'Bozo the nominee',
      reason: 'crazy',
      script: 'Please vote against nominee Bozo'
    };
    let contact = {name: cname, party: 'Dem'};
    issue.contacts = [contact];
    let issues = [issue];
    let contactIndices = {};
    contactIndices[id] = 0;
    let state = {
      issues,
      location,
      contactIndices
    };
    let result = script(state);
    let content = result.querySelector('div.call__script__body');
    expect(content.textContent).to.contain(issue.script);
  });
});