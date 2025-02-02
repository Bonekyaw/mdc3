import React, { useMemo, useCallback, useRef, useState } from "react";
import { useFocusEffect } from "expo-router";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Animated,
  Dimensions,
} from "react-native";
import PagerView, {
  PagerViewOnPageScrollEventData,
} from "react-native-pager-view";
import { Image } from "expo-image";

import { sample } from "@/data";

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

const { width, height } = Dimensions.get("window");

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function PagerViewScreen() {
  console.log("View pager rendered");

  const ref = React.useRef<PagerView>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const scrollOffsetAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const positionAnimatedValue = React.useRef(new Animated.Value(0)).current;

  const onPageScroll = useMemo(
    () =>
      Animated.event<PagerViewOnPageScrollEventData>(
        [
          {
            nativeEvent: {
              offset: scrollOffsetAnimatedValue,
              position: positionAnimatedValue,
            },
          },
        ],
        {
          useNativeDriver: true,
        },
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useFocusEffect(
    useCallback(() => {
      const intervalId = setInterval(() => {
        setCurrentPage((prev) => {
          const nextPage = (prev + 1) % sample.length;
          ref.current?.setPage(nextPage);
          return nextPage;
        });
        return () => clearInterval(intervalId);
      }, 2000);
    }, []),
  );

  return (
    <View testID="safe-area-view" style={styles.container}>
      <AnimatedPagerView
        testID="pager-view"
        initialPage={0}
        ref={ref}
        style={styles.PagerView}
        onPageScroll={onPageScroll}
      >
        {sample.map((item) => (
          <View
            testID={`pager-view-data-${item.key}`}
            key={item.key}
            style={styles.imageView}
          >
            <Image
              style={styles.image}
              source={item.image}
              placeholder={{ blurhash }}
              contentFit="cover"
              transition={1000}
            />
          </View>
        ))}
      </AnimatedPagerView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height / 4,
  },
  PagerView: {
    height: height / 4,
  },
  imageView: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    aspectRatio: 16 / 9,
  },
});
