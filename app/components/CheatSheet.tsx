import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Line,
  Svg,
  Image,
} from "@react-pdf/renderer";
import getDetails from "@/app/helpers/details";
import { Card } from "../types/Card";
import { Font } from "@react-pdf/renderer";

Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
      fontWeight: "normal",
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
      fontWeight: "bold",
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 25,
    fontFamily: "Roboto",
  },
  section: {
    fontSize: "13px",
    flexDirection: "row",
    position: "relative",
  },
  dogId: { position: "relative" },
  image: {
    width: "70px",
    minHeight: "70px",
    objectFit: "cover",
  },
  name: {
    backgroundColor: "rgba(255,255,255,0.8)",
    position: "absolute",
    bottom: 0,
    fontWeight: "bold",
    width: "70px",
    textAlign: "center"
  },
  food: {
    width: "415px",
    marginLeft: "10px",
  },
  drybed: {
    width: "50px",
    textAlign: "right",
    fontWeight: "bold",
    flexGrow: 1,
  },
  date: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

const Cheatsheet = ({ dogs }: { dogs: Card[] }) => {
  const date = new Date().toISOString().split("T")[0];
  return (
    <Document language="polish" title={`psy-eko-${date}`}>
      <Page size="A4" style={styles.page}>
        {dogs.map((dog) => (
          <>
            <View style={styles.section}>
              <View style={styles.dogId}>
                <Image src={dog.cover.url} style={styles.image} />
                <Text style={styles.name}>
                  {dog.name.split(" ")[0].trim()}{" "}
                </Text>
              </View>
              <Text break wrap style={styles.food}>
                {getDetails(dog.desc).food.trim()}
              </Text>
              <Text style={styles.drybed}>
                {dog.desc.toLocaleLowerCase().includes("drybed")
                  ? "drybed"
                  : ""}
              </Text>
            </View>

            <Svg height="8" width="550">
              <Line
                x1="0"
                y1="4"
                x2="550"
                y2="4"
                strokeWidth={1}
                stroke="rgb(55,55,55)"
              />
            </Svg>
          </>
        ))}
        <Text style={styles.date} fixed>
          {date}
        </Text>
      </Page>
    </Document>
  );
};

export default Cheatsheet;
