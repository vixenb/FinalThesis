/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform
} from "react-native";
import moment from "moment";
import _ from "lodash";
import populateEvents from "./Packer";

// Styles
import { Typography, Colors, SharedStyles } from "../../../styles";
import { NoDataMessage, Pentagon } from "../../atoms";
import { StoreContext } from "../../../store/reducer";
import { localization } from "../../../localization";

const eventWidth = 240;
const space = Typography.FONT_SIZE_NORMAL;
const pointerHeight = 35;
const LEFT_MARGIN = 60;
const CALENDER_HEIGHT = 2400;
const TEXT_LINE_HEIGHT = 17;

const range = (from, to) => {
  return Array.from(Array(to), (_, i) => from + i);
};

const DayView = (props) => {
  const store = useContext(StoreContext);
  const state = store.state;

  const _scrollView = useRef();
  const redLine = useRef();
  const [redLineY, setRedLineY] = useState();
  const width = props.width - LEFT_MARGIN;
  const [propsWidth, setPropsWidth] = useState(props.width);
  const [style, setStyle] = useState(props.styles);
  const [packedEvents, setPackedEvents] = useState(populateEvents(props.events, width));
  const [initPosition, setInitPosition] = useState(_.min(_.map(packedEvents, "top")) - CALENDER_HEIGHT / 24);
  const [eventNumber, setEventNumber] = useState(state.stages.length);

  const horizontalContentWidth = props.events.length <= 1 ? Dimensions.get("window").width - 50 : eventWidth * eventNumber + space * eventNumber + space;

  useEffect(() => {
    scrollToFirst();
  });

  useEffect(() => {
    setEventNumber(getStagesWithEvents().length);
  }, []);

  const scrollToFirst = () => {
    if (redLineY && _scrollView) {
      if (initPosition > redLineY) {
        _scrollView.current.scrollTo({ x: 0, y: initPosition, animated: true });
      } else {
        _scrollView.current.scrollTo({ x: 0, y: redLineY - 200, animated: true });
      }
    }
  };

  const _renderRedLine = () => {
    const offset = CALENDER_HEIGHT / 24;
    const timeNowHour = moment().hour();
    const timeNowMin = moment().minutes();
    return (
      <View
        ref={redLine}
        onLayout={(e) => {
          setRedLineY(e.nativeEvent.layout.y);
        }}
        key={"timeNow"}
        style={[style.lineNow, { top: offset * timeNowHour + offset * timeNowMin / 60, width: horizontalContentWidth }, SharedStyles.shadow.elevation5]}
      />

    );
  };

  const _renderLines = () => {
    const offset = CALENDER_HEIGHT / 24;

    return range(0, 25).map((item, i) => {
      let timeText;
      if (i === 0) {
        timeText = "";
      } else if (i < 12) {
        timeText = i;
      } else if (i === 12) {
        timeText = i;
      } else if (i === 24) {
        timeText = 24;
      } else {
        timeText = i;
      }

      return [
        <Text
          key={`timeLabel${i}`}
          style={[style.timeLabel, { top: offset * i - 9 }]}
        >
          {`${timeText} h`}
        </Text>,
        i === 0 ? null : (
          <View
            key={`line${i}`}
            style={[style.line, { top: offset * i, width: horizontalContentWidth }]}
          />
        ),
        <View
          key={`lineHalf${i}`}
          style={[style.line, { top: offset * (i + 0.5), width: horizontalContentWidth, height: 0.5 }]}
        />
      ];
    });
  };

  const _renderTimeLabels = (props) => {
    const offset = CALENDER_HEIGHT / 24;

    return range(0, 24).map((item, i) => {
      return (
        <View key={`line${i}`} style={[style.line, { top: offset * i }]} />
      );
    });
  };

  const _onEventTapped = (event) => {
    props.eventTapped(event);
  };

  const getStagesWithEvents = () => {
    const stagesWithEvents = [];
    state.stages.map((stage, index) => {
      let helperCounter = 0;
      props.events.map((e) => {
        if (stage.name === e.stage && helperCounter === 0) {
          helperCounter++;
          stagesWithEvents.push(stage);
        }
      });
    });

    return stagesWithEvents;
  };

  const _renderEvents = () => {
    let categorySpace = 0;
    let eventsToRender = [];

    eventsToRender = getStagesWithEvents().map((stage, index) => {
      let categoryStyle = {
        left: index === 0 ? 0 : eventWidth * categorySpace + space * categorySpace
      };
      categorySpace++;

      if (packedEvents.length === 1) {
        // TODO:
        // Potrebno testirati prikaz na manjim uredajima
        categoryStyle = {
          left: 20,
          width: 300
        };
      }

      return packedEvents.map((event, i) => {
        if (event.stage.toUpperCase() === stage.name.toUpperCase()) {
          const style = {
            height: event.height,
            width: eventWidth,
            top: event.top

          };

          const numberOfLines = Math.floor(event.height / TEXT_LINE_HEIGHT);
          const formatTime = "HH:mm";

          return (
            <View
              key={i}
              style={[{
                position: "absolute",
                backgroundColor: Colors.themeColor().colors.eventBackground,
                opacity: 0.9,
                borderRadius: 2,
                minHeight: 25,
                flex: 1,
                paddingBottom: 0,
                flexDirection: "column",
                alignItems: "flex-start",
                overflow: "hidden"
              }, style, categoryStyle, SharedStyles.shadow.elevation4]}
            >
              { props.renderEvent ? props.renderEvent(event) : (
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => _onEventTapped(props.events[event.index])}
                >
                  <Text numberOfLines={1} style={style.eventTitle}>{event.title || "Event"}</Text>
                  {numberOfLines > 1 ? <Text
                    numberOfLines={numberOfLines - 1}
                    style={[style.eventSummary]}
                  >
                    {event.summary || " "}
                  </Text> : null}
                  {numberOfLines > 2 ? <Text style={style.eventTimes} numberOfLines={1}>
                    {event.start} - {event.end}
                  </Text> : null}
                </TouchableOpacity>
              )}
            </View>
          );
        }
      });
    });

    if (props.events.length === 0) {
      return (
        <View style={{ marginTop: Typography.FONT_SIZE_TITLE_MD }}>
          <NoDataMessage text={localization("noCurrentData")} />
        </View>
      );
    }
    return (
      <ScrollView horizontal={true}>
        <View style={[styles.horizontalHeader, { width: horizontalContentWidth }]}>

          {
            state.stages.map((stage, index) => {
              let helperCounter = 0;
              return props.events.map((s) => {
                if (s.stage.toUpperCase() === stage.name.toUpperCase() && helperCounter === 0) {
                  helperCounter++;
                  return (
                    <Pentagon
                      key={index}
                      borderWidth={ packedEvents.length === 1 ? 150 : 120}
                      eventWidth={ packedEvents.length === 1 ? 300 : eventWidth}
                      color={"#A47FC3"}
                      rotate={"180deg"}
                      stage={stage.name}
                      space={space}
                      textColor={Colors.themeColor().colors.primaryTextColor}
                      pointerHeight={pointerHeight}
                      style={{ left: packedEvents.length === 1 ? 20 : 0, top: Platform.OS === "ios" ? -10 : 0 }}
                    />
                  );
                }
              });
            })
          }

        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          ref={_scrollView}
          contentContainerStyle={[style.contentStyle, { width: horizontalContentWidth + 50, backgroundColor: Colors.themeColor().colors.primaryBackgroundColor }]}
        >
          {_renderLines()}

          <View style={{ position: "absolute", zIndex: 20 }}>
            {_renderRedLine()}
          </View>

          <View style={{ marginLeft: 57.5, position: "absolute", zIndex: 10 }}>
            {eventsToRender}
          </View>
        </ScrollView>
      </ScrollView>
    );
  };

  return (
    <View style={[{ width: propsWidth }]}>
      {_renderEvents()}
    </View>
  );
};

const styles = StyleSheet.create({
  horizontalHeader: {
    position: "absolute",
    height: 50,
    top: -16,
    flexDirection: "row",
    left: 50,
    zIndex: 2
  }
});

export default DayView;
