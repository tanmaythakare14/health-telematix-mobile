import React, { useEffect } from 'react';
import { FlatList, Image, ListRenderItem, StatusBar, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Header, Text } from 'components';
import useTypedSelector from 'hooks/useTypedSelector';
import { AUTH_STACK_NAVIGATOR } from 'navigators/routes';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { MovieDetails } from 'types/types';
import Sentry, { trackEvent } from 'utils/SentryUtil';
import useViewModel from './Home.viewmodel';
import { AppDispatch } from '../../redux/app/store';
import { getMoviesData } from '../../redux/reducer/DashboardSlice';
import { getTypographyStyle, TypographyStyleEnum } from '../../utils/Typography';
type AuthStackParamList = {
  HOME: undefined;
  HOME_DETAILS: { data: object }; // Expecting data to be an object
};

const Home = () => {
  const { styles, t } = useViewModel();
  const { movieData } = useTypedSelector((state) => state.dashboard);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  Sentry.useProfiler('Home Component');

  useEffect(() => {
    dispatch(getMoviesData());
    trackEvent('Home Screen Viewed');
    // Measure component mount time
    Sentry.startSpan(
      {
        name: 'Home Screen Load',
        op: 'ui.load',
      },
      async (span) => {
        // Simulate some async operation
        await new Promise((resolve) => setTimeout(resolve, 500));
        span?.setStatus({
          code: 1,
        });
      },
    );
  }, []);

  const onPressItem = (item: object) => {
    trackEvent('Movie Clicked', {
      data: item,
      timestamp: new Date().toISOString(),
    });
    navigation.navigate(AUTH_STACK_NAVIGATOR.HOME_DETAILS, { data: item });
  };

  const renderItem: ListRenderItem<MovieDetails> = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.listView}
        onPress={() => onPressItem(item)}
      >
        <Image
          source={{ uri: item?.imageurl }}
          style={styles.image}
          resizeMode="cover"
        />
        <View>
          <Text style={{ ...styles.subText, ...getTypographyStyle(TypographyStyleEnum.TITLE) }}>{item.name}</Text>
          <Text style={{ ...styles.subText, ...getTypographyStyle(TypographyStyleEnum.SUBTITLE) }}>
            {item.publisher}
          </Text>
          <Text style={{ ...styles.subText, ...getTypographyStyle(TypographyStyleEnum.BODY) }}>
            {item.firstappearance}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const flatListItemSeparator = () => {
    return <View style={styles.dashboardFlatListSeparator} />;
  };

  const RenderRightComp = () => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate(AUTH_STACK_NAVIGATOR.ACCOUNT)}>
        <Text style={{ ...getTypographyStyle(TypographyStyleEnum.OVERLINE) }}>{t('home.lable.settings')}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeView}>
        <Header
          title={t('dashboard.list.title')}
          rightComponent={<RenderRightComp />}
        />
        <StatusBar />
        <FlatList
          data={movieData ?? []}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={flatListItemSeparator}
          style={styles.listMain}
        />
      </SafeAreaView>
    </View>
  );
};

export default Home;
