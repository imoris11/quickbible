import React, { Component } from 'react';
import {
  Text,
  Share,
  StyleSheet,
  View,
  FlatList,
  Alert,
  Modal,
  TouchableOpacity
} from 'react-native';
import { ApplicationStyles, Colors } from '../../Theme';
import { Header, Left, Icon, Container, Card } from 'native-base';
import { bible } from './data'
import { allBooks } from './books'
import { connect } from 'react-redux';
import { addBookmark } from './redux/actions';

class Bible extends Component {
  state = {
    selectedBook: 'Genesis',
    selectedChapter: 0,
    selectedVerse: -1,
    isBibleModalOpen: false,
    isChapterModalOpen: false,
    book: {},
  };

  setSelectedVerse = (index) => {
    this.setState({ selectedVerse: index})
  }

  _bookmarkVerse = (verse) => {
    const verseToBookmark = {
      ...verse,
      book: this.state.selectedBook,
      chapter: this.state.selectedChapter
    }
    this.props.addBookmark(verseToBookmark)
    this.setSelectedVerse({ selectedVerse: -1})
  }

  _shareVerse = (verse) => {
    const { selectedBook, selectedChapter } = this.state;
    const verseToShare = `${selectedBook} ${selectedChapter+1} vs ${verse.verse}:  ${verse.text}`;
    Share.share({message: verseToShare}, {
      dialogTitle: "Share Bible Verse",
      subject: "Bible Verse To Read",
    })
  }

  _renderItem = ({ item, index }) => {
    const { selectedVerse } = this.state
    return (
      selectedVerse === index ?
      <View style={{marginHorizontal:10 }}>
        <Card style={[{ paddingHorizontal:20}, selectedVerse === index ? styles.highlighted : {} ]}>
          <View style={{flexDirection: 'row'}}>
          <Text style={{ color: Colors.greySubText }}>{item.verse}</Text>
          <Text
            style={{ marginLeft: 5, fontSize: 16, color: Colors.greySubText }}
          >
            {item.text}
          </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop:10}}>
          <Icon name='ios-bookmark-outline' onPress={()=> this._bookmarkVerse(item)} style={{fontSize:26, marginLeft:10, color: Colors.primary_blue}} />
          <Icon name="ios-share-social" onPress={()=> this._shareVerse(item)} style={{fontSize:26, marginLeft:10, color: Colors.primary_blue}} />
          </View>
      </Card>
      </View>

      : 
      <TouchableOpacity style={{marginHorizontal:10}} onPress={() => this.setSelectedVerse(index)} >
        <View style={[{ flexDirection: 'row', paddingHorizontal:20 }, selectedVerse === index ? styles.highlighted : {} ]}>
          <Text style={{ color: Colors.greySubText }}>{item.verse}</Text>
          <Text
            style={{ marginLeft: 5, fontSize: 16, color: Colors.greySubText }}
          >
            {item.text}
          </Text>
        </View>
      </TouchableOpacity>
      
    );
  };

  _separator = () => {
    return <View style={{ height: 15 }} />;
  };

  _renderListBook = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          this.setState({
            selectedBook: item,
            selectedChapter: 0,
            selectedVerse:-1,
            isBibleModalOpen: false,
          })
        }
      >
        <View
          style={{
            padding: 20,
            borderBottomWidth: 0.3,
            borderColor: Colors.text_blue,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text>{item}</Text>
          {this.state.selectedBook === item && (
            <Icon
              name="checkmark"
              style={{ fontSize: 20, color: Colors.text_blue }}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  _renderChaptersList = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          this.setState({
            selectedChapter: Number(item),
            isChapterModalOpen: false,
          })
        }
      >
        <View
          style={{
            padding: 20,
            borderBottomWidth: 0.3,
            borderColor: Colors.text_blue,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text>{item + 1}</Text>
          {this.state.selectedChapter === item && (
            <Icon
              name="checkmark"
              style={{ fontSize: 20, color: Colors.text_blue }}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  booksModal = () => {
    const { isBibleModalOpen } = this.state;
    const books = allBooks.map((book) => book);
    return (
      <View style={{ flex: 1 }}>
        <Modal
          visible={isBibleModalOpen}
          animationType="slide"
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
        >
          <View style={{ flex: 1, marginTop: 80 }}>
            <Text style={{fontSize:18}} onPress={()=> this.setState({ isBibleModalOpen:false })}>Close</Text>
            <FlatList
              data={books}
              renderItem={this._renderListBook}
              keyExtractor={(item, idx) => `${idx}`}
            />
          </View>
        </Modal>
      </View>
    );
  };

  chaptersModal = () => {
    const { isChapterModalOpen, selectedBook } = this.state;
    const book = bible[selectedBook];
    const chapters = book.chapters.map((chapter, idx) => idx);

    return (
      <View style={{ flex: 1 }}>
        <Modal
          visible={isChapterModalOpen}
          animationType="slide"
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
        >
          <View style={{ flex: 1, marginTop: 80 }}>
            <Text style={{ fontSize: 24, paddingLeft: 20 }}>
              {this.state.selectedBook}
            </Text>
            <FlatList
              data={chapters}
              renderItem={this._renderChaptersList}
              keyExtractor={(item, idx) => `${idx}`}
            />
          </View>
        </Modal>
      </View>
    );
  };

  render() {
    const { selectedBook, selectedChapter } = this.state;
    const book = bible[selectedBook];
    const chapterToShow = book.chapters[selectedChapter].verses;

    return (
      <Container style={styles.scrollView}>
        <Header style={ApplicationStyles.card}>
          <Left
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 20,
            }}
          >
            <View
              style={{ flexDirection: 'row', margin: 10, alignItems: 'center' }}
            >
              <Text
                onPress={() => this.setState({ isBibleModalOpen: true })}
                style={{ fontSize: 20 }}
              >
                {selectedBook}
              </Text>
              <Icon
                onPress={() => this.setState({ isBibleModalOpen: true })}
                name="sort-down"
                type="FontAwesome"
                style={{ fontSize: 12, marginLeft: 10 }}
              />
            </View>

            <View
              style={{ flexDirection: 'row', margin: 10, alignItems: 'center' }}
            >
              <Text
                onPress={() => this.setState({ isChapterModalOpen: true })}
                style={{ fontSize: 20 }}
              >
                {selectedChapter + 1}
              </Text>
              <Icon
                onPress={() => this.setState({ isChapterModalOpen: true })}
                name="sort-down"
                type="FontAwesome"
                style={{ fontSize: 12, marginLeft: 10 }}
              />
            </View>
          </Left>
        </Header>
        <FlatList
        style={{marginTop:20}}
          data={chapterToShow}
          extraData={chapterToShow}
          renderItem={this._renderItem}
          keyExtractor={(item) => item.verse}
          ItemSeparatorComponent={this._separator}
        />
        {this.booksModal()}
        {this.chaptersModal()}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  highlighted: {
    borderWidth:1,
    borderColor: Colors.primary_blue,
    borderRadius:10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    paddingVertical:10,
  }
});

const mapDispatchToProps = {
  addBookmark
}

export default connect(null, mapDispatchToProps)(Bible);
