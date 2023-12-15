import {
    View,
    Text,
    Animated,
    PanResponder,
    TouchableOpacity,
    Image,
  } from 'react-native';
  import React, {useCallback, useEffect, useRef, useState} from 'react';
  import TinderCard from '../Components/Card';
  import { Entypo } from '@expo/vector-icons';
  import { Feather } from '@expo/vector-icons';
  const TinderSwipeDemo = () => {
    const [data, setData] = useState([
      {backgroundColor:'blue', id: 1},
      {backgroundColor:'green', id: 2},
      {backgroundColor:'yellow', id: 3},
      {backgroundColor:'orange', id: 4},
      {backgroundColor:'red', id: 5},
      
    ]);
    useEffect(() => {
      if (!data.length) {
        setData([
          {backgroundColor:'blue', id: 1},
          {backgroundColor:'green', id: 2},
          {backgroundColor:'yellow', id: 3},
          {backgroundColor:'orange', id: 4},
          {backgroundColor:'red', id: 5},
          
        ]);
      }
    }, [data]);
    const swipe = useRef(new Animated.ValueXY()).current;
    const rotate = useRef(new Animated.Value(0)).current;
  
    const panResponser = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, {dx, dy}) => {
        console.log('dx:' + dx + ' dy:' + dy);
        swipe.setValue({x: dx, y: dy});
      },
  
      onPanResponderRelease: (_, {dx, dy}) => {
        console.log('released:' + 'dx:' + dx + ' dy:' + dy);
        let direction = Math.sign(dx);
        let isActionActive = Math.abs(dx) > 200;
        if (isActionActive) {
          Animated.timing(swipe, {
            toValue: {x: 500 * dx, y: dy},
            useNativeDriver: true,
            duration: 500,
          }).start(removeCard);
        } else {
          Animated.spring(swipe, {
            toValue: {x: 0, y: 0},
            useNativeDriver: true,
            friction: 5,
          }).start();
        }
      },
    });
    const removeCard = useCallback(() => {
      setData(prepState => prepState.slice(1));
      swipe.setValue({x: 0, y: 0});
    }, [swipe]);
  
    const handelSelection = useCallback(
      direction => {
        Animated.timing(swipe, {
          toValue: {x: direction * 500, y: 0},
          useNativeDriver: true,
          duration: 500,
        }).start(removeCard);
      },
      [removeCard],
    );
    return (
      <View style={{flex: 1,justifyContent:'center'}}>
        {data
          .map((item, index) => {
            let isFirst = index === 0;
            let dragHanlders = isFirst ? panResponser.panHandlers : {};
            return (
              <TinderCard
                item={item}
                rotate={rotate}
                isFirst={isFirst}
                swipe={swipe}
                backgroundColor={item.backgroundColor}
                {...dragHanlders}
              />
            );
          })
          .reverse()}
  
        <View
          style={{
            width: '100%',
            position: 'absolute',
            height: 100,
            bottom: 0,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          {/* <TouchableOpacity
            style={{
              width: 60,
              height: 60,
              backgroundColor: '#fff',
              elevation: 5,
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              handelSelection(-1);
            }}>
           {/* <Entypo name="cross" size={24} color="black" /> */}
          {/* </TouchableOpacity>  */}
          {/* <TouchableOpacity
            style={{
              width: 60,
              height: 60,
              backgroundColor: '#fff',
              elevation: 5,
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              handelSelection(1);
            }}>
            <Feather name="check" size={24} color="black" />
          </TouchableOpacity> */}
        </View>
      </View>
    );
  };
  
  export default TinderSwipeDemo;