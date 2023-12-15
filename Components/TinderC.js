// import {View, Text} from 'react-native';
// import React from 'react';

// const TinderChoice = ({type}) => {
//   return (
//     <View>
//       <Text
//         style={{
//           color: type == 'Like' ? '#01FF84' : '#F6006B',
//           fontSize: 40,
//           borderWidth: 4,
//           borderColor: type == 'Like' ? '#01FF84' : '#F6006B',
//           paddingLeft: 10,
//           paddingRight: 10,
//         }}>
//         {type}
//       </Text>
//     </View>
//   );
// };

// export default TinderChoice;
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome icons
import { Feather } from '@expo/vector-icons'; // Import Feather icons

const TinderChoice = ({ type, backgroundColor }) => {
  const iconColor = type === 'Like' ? '#01FF84' : '#F6006B';

  return (
    <View style={{ flexDirection: 'row',justifyContent: 'space-between' }}>
      <TouchableOpacity
        style={{
          backgroundColor: backgroundColor,
          padding: 10,
          // borderRadius: 15,
          // marginRight: 5,
        }}
        activeOpacity={0.8}
        onPress={() => {
          // Handle the press event if needed
        }}
      >
        {type === 'Like' ? (
          <FontAwesome name="check" size={30} color='white' />
        ) : (
          <Feather name="x" size={30} color='white' />
        )}
      </TouchableOpacity>
      {/* <Text
        style={{
          color: iconColor,
          fontSize: 20,
        }}
      >
        {type}
      </Text> */}
    </View>
  );
};

export default TinderChoice;
