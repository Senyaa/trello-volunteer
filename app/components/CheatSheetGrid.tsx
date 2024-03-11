import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
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
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 25,
    fontFamily: "Roboto",
  },
  section: {
    fontSize: "13px",
    flexDirection: "row",
    position: "relative",
    width: "50%",
    border: "1px solid #909090",
  },
  image: {
    width: "80px",
    height: "80px",
    objectFit: "cover",
  },
  details: {
    marginLeft: "5px",
  },
  name: {
    fontWeight: "bold",
  },
  food: {
    flexWrap: "wrap",
    maxWidth: "185px",
  },
  drybed: {
    fontWeight: "bold",
  },
  date: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
    marginTop: "10px",
  },
});

const CheatsheetGrid = ({ dogs }: { dogs: Card[] }) => {
  const date = new Date().toISOString().split("T")[0];

  return (
    <Document language="polish" title={`psy-eko-${date}`}>
      <Page size="A4" style={styles.page}>
        {dogs.map((dog) => {
          const dogName = dog.name.split(" ")[0].trim();

          // if (dogName !== "Hachi" && dogName !== "Rico")
          return (
            <View
              style={styles.section}
              wrap={false}
              key={dogName}
              break={dogName === "Karolcia"}
            >
              <Image src={dog.cover.url} style={styles.image} />
              <View style={styles.details}>
                <Text style={styles.name}>{dogName}</Text>
                <Text style={styles.food}>
                  {getDetails(dog.desc).food.trim()}
                </Text>
                <Text style={styles.drybed}>
                  {dog.desc.toLocaleLowerCase().includes("drybed")
                    ? "drybed"
                    : ""}
                </Text>
              </View>
            </View>
          );
        })}
        <View style={styles.date} fixed>
          <Text>{date}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default CheatsheetGrid;
