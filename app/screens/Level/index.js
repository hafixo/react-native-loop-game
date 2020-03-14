import React, { useRef } from 'react';
import { View, StatusBar, Animated } from 'react-native';
import PropTypes from 'prop-types';
import { TouchNative } from 'rn-hgl';

import PageView from 'components/PageView';
import Icon from 'components/Icon';

import useEngine from 'engine';

import useToggle from './toggle.hook';
import Shapes from './Shapes';
import styles from './styles';

export default function LevelScreen({ navigation }) {
  const { params } = navigation.state;
  const forceLevel = parseInt(params.level, 10) || 1;
  const {
    level,
    size,
    grid,
    controls,
    setRotate,
    capture,
    success,
    theme,
    animateColor,
  } = useEngine(forceLevel);
  const ref = useRef();
  const { toggle, setToggle } = useToggle();

  return (
    <PageView key={level} navigation={navigation} style={styles.container}>
      <StatusBar animated barStyle={success ? 'light-content' : 'dark-content'} />
      <Animated.View
        ref={ref}
        style={[styles.gridContainer, { backgroundColor: animateColor('primary', 'primary') }]}
      >
        <Animated.Text style={[styles.currentLevel, { color: animateColor('accent', 'accent') }]}>
          #{level}
        </Animated.Text>
        {grid.map((column, y) => (
          <View key={y} style={styles.row}>
            {column.map(({ id, type, animation }, x) => (
              <Shapes
                key={id}
                size={size}
                type={type}
                success={success}
                animation={animation}
                animateColor={animateColor}
                theme={success ? theme.dark : theme.light}
                setRotate={() => {
                  if (['null'].indexOf(type) === -1 && Number.isInteger(animation._value)) {
                    setRotate(x, y);
                  }
                }}
              />
            ))}
          </View>
        ))}
      </Animated.View>
      <TouchNative
        noFeedback
        style={[styles.blockBase, success ? styles.blockVisible : {}]}
        onPress={() => {
          controls.next();
        }}
      >
        <View />
      </TouchNative>
      <View style={[styles.captureBase, { backgroundColor: theme.primary }]}>
        <TouchNative
          style={styles.capture}
          onPress={() => (success ? capture(ref) : setToggle(true))}
        >
          <Icon
            animated
            name={success ? 'camera' : 'menu'}
            style={[styles.captureIcon, { color: animateColor('accent', 'accent') }]}
          />
        </TouchNative>
      </View>
    </PageView>
  );
}

LevelScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};