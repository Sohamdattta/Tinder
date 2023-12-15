
// import { View, Text, Image, Dimensions, Animated } from 'react-native';
// import React, { useCallback, useRef } from 'react';
// import {LinearGradient} from 'expo-linear-gradient';
// import TinderChoice from './TinderC';

// const { height, width } = Dimensions.get('window');

// const TinderCard = ({ item, isFirst, swipe,backgroundColor, ...rest }) => {
//   const rotate = swipe.x.interpolate({
//     inputRange: [-100, 0, 100],
//     outputRange: ['-8deg', '0deg', '8deg'],
//   });

//   const likeOpacity = swipe.x.interpolate({
//     inputRange: [10, 100],
//     outputRange: [0, 1],
//     extrapolate: 'clamp',
//   });

//   const nopeOpacity = swipe.x.interpolate({
//     inputRange: [-100, -10],
//     outputRange: [1, 0],
//     extrapolate: 'clamp',
//   });

//   const tinderSelection = useCallback(() => {
//     return (
//       <>
//         <Animated.View
//           style={{
//             position: 'absolute',
//             top: 20,
//             right: 20,
//             opacity: nopeOpacity,
//             transform: [{ rotate: '30deg' }],
//           }}
//         >
//           <TinderChoice type={'Nope'} backgroundColor={item.backgroundColor} />
//         </Animated.View>
//         <Animated.View
//           style={{
//             position: 'absolute',
//             top: 20,
//             left: 20,
//             opacity: likeOpacity,
//             transform: [{ rotate: '-30deg' }],
//           }}
//         >
//           <TinderChoice type={'Like'} backgroundColor={item.backgroundColor} />
//         </Animated.View>
//       </>
//     );
//   }, [item.backgroundColor, likeOpacity, nopeOpacity]);

//   return (
//     <Animated.View
//       style={[
//         {
//           width: width - 40,
//           height: height - 200,
//           alignSelf: 'center',
//           position: 'absolute',
//           top: 40,
//           borderRadius: 10,
//           backgroundColor: backgroundColor
//         },
//         isFirst && {
//           transform: [...swipe.getTranslateTransform(), { rotate: rotate }],
//         },
//       ]}
//       {...rest}
//     >
//       {/* <Image
//         source={item.image}
//         style={{ width: '100%', height: '100%', borderRadius: 10 }}
//       /> */}
//       {/* <LinearGradient
//         colors={['transparent', 'rgba(0,0,0,0.7)']}
//         style={{
//           width: '100%',
//           height: '100%',
//           borderRadius: 10,
//           position: 'absolute',
//         }}
//       >
//         <Text
//           style={{
//             position: 'absolute',
//             bottom: 20,
//             left: 20,
//             color: '#fff',
//             fontSize: 30,
//           }}
//         >
//           {item.title}
//         </Text>
//       </LinearGradient> */}
//       {isFirst && tinderSelection()}
//     </Animated.View>
//   );
// };

// export default TinderCard;
import { View, Text, Image, Dimensions, Animated } from 'react-native';
import React, { useCallback } from 'react';
import {LinearGradient} from 'expo-linear-gradient';
import TinderChoice from './TinderC';

const { height, width } = Dimensions.get('window');

const TinderCard = ({ item, isFirst, swipe, backgroundColor, ...rest }) => {
  const rotate = swipe.x.interpolate({
    inputRange: [-100, 0, 100],
    outputRange: ['-8deg', '0deg', '8deg'],
  });

  const likeOpacity = swipe.x.interpolate({
    inputRange: [10, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const nopeOpacity = swipe.x.interpolate({
    inputRange: [-100, -10],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const tinderSelection = useCallback(() => {
    return (
      <>
        <Animated.View
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            opacity: nopeOpacity,
            transform: [{ rotate: '45deg' }],
            zIndex: isFirst ? 1 : 0,
          }}
        >
          <TinderChoice type={'Nope'} backgroundColor={backgroundColor} />
        </Animated.View>
        <Animated.View
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            opacity: likeOpacity,
            transform: [{ rotate: '-45deg' }],
            zIndex: isFirst ? 1 : 0,
          }}
        >
          <TinderChoice type={'Like'} backgroundColor={backgroundColor} />
        </Animated.View>
      </>
    );
  }, [backgroundColor, likeOpacity, nopeOpacity]);

  const topCardStyle = isFirst
    ? {
        transform: [...swipe.getTranslateTransform(), { rotate: rotate },{ translateY: -width / 30 }],
        zIndex: 2,
      }
    : {};

  return (
    <Animated.View
      style={[
        {
          width: width - 40,
          height: height - 200,
          alignSelf: 'center',
          position: 'absolute',
          top: 40,
          borderRadius: 10,
          backgroundColor: backgroundColor,
          overflow: 'hidden',
        },
        topCardStyle,
      ]}
      {...rest}
    >
      <Image
        source={item.image}
        style={{ width: '100%', height: '100%', borderRadius: 10 }}
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0)']}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 10,
          position: 'absolute',
        }}
      >
        <Text
          style={{
            position: 'absolute',
            bottom: 20,
            left: 20,
            color: '#fff',
            fontSize: 30,
          }}
        >
          {item.title}
        </Text>
      </LinearGradient>
      {isFirst && tinderSelection()}
    </Animated.View>
  );
};

export default TinderCard;
