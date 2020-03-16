import { StyleSheet } from 'react-native';
import { elevation } from 'rn-hgl/styles';
import { scaling } from 'rn-hgl/utils';
import { platform } from 'rn-hgl';

import { typography, colors } from 'configs';
import { getFont } from 'utils/fonts';

const styles = StyleSheet.create({
  container: {
    padding: scaling(1),
  },
  title: {
    ...getFont(700),
    marginHorizontal: scaling(2),
    fontSize: typography.heading1,
  },
  description: {
    color: colors.primary,
    fontSize: typography.label1,
    marginHorizontal: scaling(2),
  },
  buttonsHolder: {
    marginTop: scaling(2),
  },
  button: {
    borderRadius: 4,
    borderWidth: 1.5,
    marginTop: scaling(3),
    paddingVertical: scaling(2),
    marginHorizontal: scaling(2),
    backgroundColor: colors.white,
    borderColor: colors.primary.alpha(0.5),
    ...elevation(platform.isIOS ? 1.5 : 4),
  },
  buttonText: {
    ...getFont(600),
    textAlign: 'center',
    color: colors.primary,
    fontSize: typography.label1,
  },
});

export default styles;
