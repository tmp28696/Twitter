import Enzyme,{ shallow } from 'enzyme'
import React from 'react';
import Follower from '../components/userFeed/followers'

import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

it('checks nav bar', () => {
  const wrap = shallow(
    <Follower />
  )

  expect(wrap.text()).toEqual('HomeExploreMessagesBookmarksListsProfileAnalyticsSettingsTweetUser NameUserNameFollowersFollowing')
})