import {
  Navigation,
  Layout,
  NavigationConstants,
  LayoutComponent,
} from 'react-native-navigation';
// import { Provider } from 'react-redux';

// import { configureStore } from '@store/storeConfig';
// import ReduxStoreService from '@services/ReduxStoreService';

import App from '../../App';
import {Dimensions} from 'react-native';
import Test from '../components/Test';

// const store = configureStore();
// ReduxStoreService.setStore(store);

export default class NavigationService {
  static readonly shared = new NavigationService();
  public constants: NavigationConstants = {
    statusBarHeight: 0,
    backButtonId: '',
    topBarHeight: 0,
    bottomTabsHeight: 0,
  };

  private componentId: string;

  constructor() {
    this.componentId = '';
    Navigation.events().registerComponentDidAppearListener(
      (data) => (this.componentId = data.componentId),
    );
  }

  push<T>(layout: Layout<T>, componentId?: string) {
    const id = componentId ? componentId : this.componentId;
    return Navigation.push(id, layout);
  }

  pop() {
    return Navigation.pop(this.componentId);
  }

  pushModal<T>(layout: Layout<T>) {
    return Navigation.showModal(layout);
  }

  popModal() {
    return Navigation.dismissModal(this.componentId);
  }

  setRoot() {
    return Navigation.setRoot({
      root: {
        stack: {
          id: 'MainStack',
          children: [
            {
              component: {
                name: 'App',
              },
            },
          ],
          options: {
            topBar: {
              visible: false,
            },
          },
        },
      },
    });
  }

  async registerNavigation() {
    Navigation.registerComponent('App', () => App);
    Navigation.registerComponent('Test', () => Test);

    Navigation.events().registerAppLaunchedListener(() => this.setRoot());
    this.constants = await Navigation.constants();
  }

  // async setMenu(tags: SkillData[]) {
  //   const size = 20;
  //   const colorHex = '#383838';

  //   const Icons = createIconSetFromIcoMoon(configJSON, 'menu-icons', 'menu-icons.ttf');
  //   const homeIcon = await Icons.getImageSource('home-icon', size, colorHex);
  //   const searchIcon = await Icons.getImageSource('search-icon', size, colorHex);
  //   const addIcon = await Icons.getImageSource('add-icon', size, colorHex);
  //   const notificationIcon = await Icons.getImageSource('notification-icon', size, colorHex);
  //   const profileIcon = await Icons.getImageSource('profile-icon', size, colorHex);

  //   return Navigation.setRoot({
  //     root: {
  //       bottomTabs: {
  //         id: 'MainTabs',
  //         options: {
  //           bottomTabs: {
  //             animate: false,
  //             titleDisplayMode: 'alwaysHide',
  //           },
  //         },
  //         children: [
  //           this.setTab('MainStack1', HomeScreen, homeIcon, '#FF3D2F', 'HomeScreenID', 'HomeScreen', { tags: tags }),
  //           this.setTab('MainStack2', SearchScreen, searchIcon, '#FF3D2F', 'SearchScreenID', 'SearchScreen'),
  //           this.setTab('MainStack3', AddPostScreen, addIcon, '#FF3D2F', 'AddPostScreenID', 'AddPostScreen'),
  //           this.setTab(
  //             'MainStack4',
  //             NotificationScreen,
  //             notificationIcon,
  //             '#FF3D2F',
  //             'NotificationScreenID',
  //             'NotificationScreen',
  //           ),
  //           this.setTab('MainStack5', ProfileScreen, profileIcon, '#FF3D2F', 'ProfileScreenID', 'ProfileScreen'),
  //         ],
  //       },
  //     },
  //   });
  // }

  // private setTab(
  //   componentId: string,
  //   component: LayoutComponent,
  //   icon: any,
  //   colorHex: string,
  //   reduxId?: string,
  //   reduxName?: string,
  //   props?: any,
  // ) {
  //   return {
  //     stack: {
  //       id: componentId,
  //       name: componentId + 'N',
  //       children: [
  //         {
  //           component: {
  //             id: reduxId ? reduxId : component.id,
  //             name: reduxName ? reduxName : component.name,
  //             passProps: props,
  //             options: {
  //               topBar: {
  //                 rightButtons: [
  //                   {
  //                     id: 'ChatBtn1',
  //                     component: { name: 'ChatBtn' },
  //                   },
  //                   {
  //                     id: 'NavLogo1',
  //                     component: {
  //                       name: 'EmptySpace',
  //                       passProps: {
  //                         width: Dimensions.get('window').width - 235, //shitty workaround
  //                       },
  //                     },
  //                   },
  //                   {
  //                     id: 'NavLogo1',
  //                     component: { name: 'NavLogo' },
  //                   },
  //                 ],
  //               },
  //             },
  //           },
  //         },
  //       ],
  //       options: {
  //         topBar: {
  //           visible:
  //             componentId === 'MainStack1' || componentId === 'MainStack5' || componentId === 'MainStack3'
  //               ? true
  //               : false,
  //           noBorder: true,
  //         },
  //         bottomTab: {
  //           icon: icon,
  //           selectedIconColor: colorHex,
  //         },
  //       },
  //     },
  //   };
  // }
}
