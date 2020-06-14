import { Navigation, Layout, NavigationConstants, LayoutComponent } from 'react-native-navigation';
import { Provider } from 'react-redux';

import { configureStore } from '../store/storeConfig';
// import ReduxStoreService from '@services/ReduxStoreService';

import App from '../../App';
import Test from '../components/Test';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ListScreen from '../components/ListScreen';
import SettingsScreen from '../components/SettingsScreen';
import AddButton from 'src/components/shared/AddButton';
import Scanner from 'src/components/ListScreen/shared/Scanner';

const store = configureStore();

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
    Navigation.events().registerComponentDidAppearListener((data) => (this.componentId = data.componentId));
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
    Navigation.registerComponent('Scanner', () => Scanner);
    Navigation.registerComponentWithRedux('ListScreen', () => ListScreen, Provider, store);
    Navigation.registerComponent('SettingsScreen', () => SettingsScreen);
    Navigation.registerComponent('AddButton', () => AddButton);

    Navigation.events().registerAppLaunchedListener(() => this.setRoot());
    this.constants = await Navigation.constants();
  }

  async setMenu() {
    const size = 35;
    const colorHex = '#383838';

    const favourite = await Icon.getImageSource('grade', size, colorHex);
    const wallet = await Icon.getImageSource('account-balance-wallet', size, colorHex);
    const settings = await Icon.getImageSource('settings', size, colorHex);

    return Navigation.setRoot({
      root: {
        bottomTabs: {
          id: 'MainTabs',
          options: {
            bottomTabs: {
              animate: false,
              titleDisplayMode: 'alwaysHide',
            },
          },
          children: [
            this.setTab(
              'FavouriteStack',
              ListScreen,
              favourite,
              '#1abc9c',
              'Favourite',
              'FavouriteScreenID',
              'ListScreen',
              { isFavourites: true },
            ),
            this.setTab('WalletStack', ListScreen, wallet, '#1abc9c', 'Cards', 'WalletScreenID', 'ListScreen', {
              isFavourites: false,
            }),
            this.setTab(
              'SettingsStack',
              SettingsScreen,
              settings,
              '#1abc9c',
              'Settings',
              'SettingsScreenID',
              'SettingsScreen',
            ),
          ],
        },
      },
    });
  }

  private add = Icon.getImageSource('add', 20, '#1abc9c');

  private setTab(
    componentId: string,
    component: LayoutComponent,
    icon: any,
    colorHex: string,
    text: string,
    reduxId?: string,
    reduxName?: string,
    props?: any,
  ) {
    return {
      stack: {
        id: componentId,
        name: componentId + 'N',
        children: [
          {
            component: {
              id: reduxId ? reduxId : component.id,
              name: reduxName ? reduxName : component.name,
              passProps: props,
              options: {
                topBar: {
                  visible: true,
                  noBorder: true,
                  title: {
                    text: text,
                  },
                },
              },
            },
          },
        ],
        options: {
          bottomTab: {
            icon: icon,
            selectedIconColor: colorHex,
            text: text,
          },
        },
      },
    };
  }
}
