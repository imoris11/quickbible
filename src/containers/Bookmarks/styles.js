import { StyleSheet } from 'react-native';
import { Colors } from '../../Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexDirection: 'row',
  },
  image: {
    width: 150,
    height: 120,
    borderRadius: 10,
  },
  infoContainer: {
    marginLeft: 10,
    flex: 1,
  },
  position: {
    fontWeight: '600',
    fontSize: 14,
    color: Colors.greyText,
  },
  name: {
    fontSize: 23,
    fontWeight: '800',
    color: Colors.greySubText,
    marginBottom: 10,
  },
  divider: {
    height: 20,
  },
  listView: {
    marginHorizontal: 30,
  },
});

export default styles;
