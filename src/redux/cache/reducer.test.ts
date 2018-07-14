import { Group, CacheableGroup } from './../../common/model';
import { appCacheReducer, CacheGroupAction,
  AddToCacheAction, AppCacheActionType, AppCache } from './index';

let groups: CacheableGroup[];
beforeEach(() => {
  groups = [
    {
        group: { groupID: 'craig', name: 'Group Craig', description: 'Craig codes',
          subtitle: 'worker bee', photoURL: '', totalCalls: 10, customCalls: false, subscribed: false,
        } ,
        timestamp: 1000
    },
    {
        group: { groupID: 'jeremy', name: 'Group Jeremy', description: 'Jeremy advises',
          subtitle: 'wise guy', photoURL: '', totalCalls: 100, customCalls: false, subscribed: false,
        } ,
        timestamp: 10000
    },
    {
        group: { groupID: 'nick', name: 'Group Nick', description: 'Nick rules!!!' ,
          subtitle: 'the best', photoURL: '', totalCalls: 1000, customCalls: false,
          subscribed: false,
        } ,
        timestamp: 100000
    }
  ];
});

test('appCacheReducer() processes CACHE_GROUP action correctly by modifying timestamp of an existing record', () => {
  const cgroup: CacheableGroup = { group: { groupID: 'nick', name: 'Group Nick', description: 'Nick rules!!!' ,
    subtitle: 'the best', photoURL: '', totalCalls: 1000, customCalls: false, subscribed: false, },
    timestamp: 100000 } ;
  const state: AppCache = new AppCache(groups);
  const action: CacheGroupAction = {
    type: AppCacheActionType.CACHE_GROUP,
    payload: cgroup
  };
  const newState = appCacheReducer(state, action);
  expect(newState.groups.length).toEqual(3);
  // timestamp will be changed to current time
  expect(newState.groups[2].timestamp).not.toEqual(groups[2].timestamp);
});

test('appCacheReducer() processes CACHE_GROUP action correctly by adding a new group to the cache', () => {
  const cgroup: CacheableGroup = { group: { groupID: 'rebecca', name: 'Group Rebecca',
    description: 'Rebecca runs the show' , subtitle: 'boss person', photoURL: '', totalCalls: 1000,
    customCalls: false, subscribed: false, }, timestamp: 0 } ;
  const state: AppCache = new AppCache(groups);
  const action: CacheGroupAction = {
    type: AppCacheActionType.CACHE_GROUP,
    payload: cgroup
  };
  const newState = appCacheReducer(state, action);
  // Cache should contain an additional new group
  expect(newState.groups.length).toEqual(4);
  expect(newState.groups[3].group.groupID).toEqual('rebecca');
});

test('appCacheReducer() processes ADD_GROUP_TO_CACHE action correctly', () => {
  const group: Group = { groupID: 'rebecca', name: 'Group Rebecca', description: 'Rebecca runs the show' ,
    subtitle: 'boss person', photoURL: '', totalCalls: 1000, customCalls: false, subscribed: false, } ;
  const state: AppCache = new AppCache(groups);
  const action: AddToCacheAction = {
    type: AppCacheActionType.ADD_GROUP_TO_CACHE,
    payload: group
  };
  const newState = appCacheReducer(state, action);
  // Cache should contain an additional group
  expect(newState.groups.length).toEqual(4);
  expect(newState.groups[3].group.groupID).toEqual('rebecca');
});
