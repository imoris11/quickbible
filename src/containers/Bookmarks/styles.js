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
  },
  name: {
    fontSize: 23,
    fontWeight: '800',
    marginBottom: 10,
  },
  divider: {
    height: 20,
  },
  listView: {
    marginHorizontal: 30,
  },
  icon:{
    fontSize:20, 
    marginLeft:10, 
    color: Colors.primary_blue
  },
  emptyText: {
    fontSize: 23,
    fontWeight: '800',
  },
});

export default styles;
