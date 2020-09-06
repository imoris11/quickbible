import React, { Component } from 'react';
import { Container, View, Text, Card, Icon, Header, Body } from 'native-base';
import { connect } from 'react-redux';
import { FlatList, Share } from 'react-native';
import styles from './styles';
import { ApplicationStyles, Colors } from '../../Theme';
import { removeBookmark } from '../Bible/redux/actions';

export class Bookmarks extends Component {
  _renderItem = ({ item, index }) => {
    return (
      <View
        style={styles.container}
        key={`${index}`}
      >
        <Card style={ApplicationStyles.cardNoBorder}>
          <View style={styles.content}>
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{item.book} {item.chapter + 1} vs {item.verse}</Text>
              <Text style={styles.position}>{item.text}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', marginTop:10}}>
          <Icon name="ios-share-social" onPress={()=> this._shareVerse(item)} style={{fontSize:20, marginLeft:10, color: Colors.primary_blue}} />
          <Icon name="trash-outline" onPress={()=> this._deleteItem(item.text)} style={{fontSize:20, marginLeft:10, color: Colors.primary_blue}} />
          </View>
        </Card>
      </View>
    );
  };

  _deleteItem = (text) => {
    this.props.removeBookmark(text)
  }

  _shareVerse = (item) => {
    const verseToShare = `${item.book} ${item.chapter+1} vs ${item.verse}:  ${item.text}`;
    Share.share({message: verseToShare}, {
      dialogTitle: "Share Bible Verse",
      subject: "Bible Verse To Read",
    })
  }

  _itemSeparator = () => {
    return <View style={styles.divider} />;
  };
  render() {
    return (
      <Container>
        <Header style={ApplicationStyles.card}>
          <Body>
            <Text style={{color: Colors.primary_blue, fontSize:20, fontWeight:'700'}}>Bookmarks</Text>
          </Body>
        </Header>
        <FlatList
        style={{marginTop:20}}
          contentContainerStyle={styles.listView}
          data={this.props.bookmarks}
          keyExtractor={(item) => `${item.chapter}${item.text}`}
          ItemSeparatorComponent={this._itemSeparator}
          renderItem={this._renderItem}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    bookmarks: state.bookmarks.data
  }
}

const mapDispatchToProps = {
  removeBookmark
}

export default connect(mapStateToProps, mapDispatchToProps)(Bookmarks);
