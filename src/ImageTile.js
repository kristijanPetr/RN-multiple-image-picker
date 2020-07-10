import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableHighlight,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
const { width } = Dimensions.get('window');

type Props = {
  item?: Object,
  index?: () => any,
  selected: Object,
  selectImage: () => any,
};

class ImageTile extends React.PureComponent<Props> {
  render() {
    let { item, index, selected, selectImage } = this.props;
    if (!item) return null;
    return (
      <TouchableHighlight
        style={{ opacity: selected ? 0.7 : 1 }}
        underlayColor="transparent"
        onPress={() => selectImage(index)}
      >
        <View>
          <Image
            style={{ width: width / 4 - 6, height: width / 4, margin: 3 }}
            source={{ uri: item }}
          />

          {selected ? (
            <View
              style={{
                position: 'absolute',
                bottom: 3,
                right: 7,
              }}
            >
              <Ionicons name="md-checkmark-circle" size={25} color="blue" />
            </View>
          ) : null}
        </View>
      </TouchableHighlight>
    );
  }
}
export default ImageTile;
