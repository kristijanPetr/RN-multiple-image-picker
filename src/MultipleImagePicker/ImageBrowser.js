import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import ImageTile from './ImageTile';
import * as MediaLibrary from 'expo-media-library';

const { width } = Dimensions.get('window');

type Props = {
  pickedImages?: Array,
  onRequestClose?: () => any,
  maxImages: Number,
  style: Object,
};

class ImageBrowser extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      selected: {},
      after: null,
      has_next_page: true,
    };
  }

  componentDidMount() {
    this.getPhotos();
  }

  selectImage = index => {
    let newSelected = { ...this.state.selected };
    if (newSelected[index]) {
      delete newSelected[index];
    } else {
      newSelected[index] = true;
    }
    if (Object.keys(newSelected).length > this.props.maxImages) return;
    if (!newSelected) newSelected = {};
    this.setState({ selected: newSelected });
  };

  getPhotos = () => {
    let params = {
      first: 50,
    };
    if (this.state.after) params.after = this.state.after;
    if (!this.state.has_next_page) return;
    MediaLibrary.getAssetsAsync(params).then(this.processPhotos);
  };

  processPhotos = r => {
    if (this.state.after === r.endCursor) return;
    let uris = r.assets.map(i => {
      return {
        uri: i.uri,
        type: i.mediaType,
      };
    });

    this.setState({
      photos: [...this.state.photos, ...uris],
      after: r.endCursor,
      has_next_page: r.hasNextPage,
    });
  };

  getItemLayout = (data, index) => {
    let length = width / 4;
    return { length, offset: length * index, index };
  };

  prepareCallback() {
    let { selected, photos } = this.state;
    const { pickedImages, onRequestClose } = this.props;
    let selectedPhotos = photos.filter((item, index) => {
      return selected[index];
    });
    pickedImages(selectedPhotos);
    onRequestClose();
  }

  renderHeader = () => {
    let selectedCount = Object.keys(this.state.selected).length;
    let headerText = selectedCount + ' Selected';
    if (selectedCount === this.props.maxImages)
      headerText = headerText + ' (Max)';
    return (
      <View style={styles.header}>
        <TouchableOpacity
          style={{}}
          onPress={() => this.props.onRequestClose()}
        >
          <Text style={{ fontSize: 16, color: 'blue' }}>Exit</Text>
        </TouchableOpacity>
        <Text>{headerText}</Text>
        <TouchableOpacity onPress={() => this.prepareCallback()}>
          <Text style={{ fontSize: 16, color: 'blue' }}>Choose</Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderImageTile = ({ item, index }) => {
    let selected = this.state.selected[index] ? true : false;

    return (
      <ImageTile
        item={item.uri}
        index={index}
        selected={selected}
        selectImage={this.selectImage}
      />
    );
  };

  renderEmptyComponent = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  };

  renderImages() {
    return (
      <FlatList
        style={{ flex: 1 }}
        data={this.state.photos}
        numColumns={4}
        renderItem={this.renderImageTile}
        keyExtractor={(_, index) => index}
        onEndReached={() => {
          this.getPhotos();
        }}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={this.renderEmptyComponent}
        initialNumToRender={24}
        getItemLayout={this.getItemLayout}
      />
    );
  }

  render() {
    const { style = {} } = this.props;
    return (
      <View style={[styles.container, style]}>
        {this.renderHeader()}
        {this.renderImages()}
      </View>
    );
  }
}

export default ImageBrowser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 50,
    width: width,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
  },
});
