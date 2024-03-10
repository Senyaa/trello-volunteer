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
  dogId: { position: "relative", width:"70px" },
  image: {
    width: "70px",
    height: "auto",
    objectFit: "cover",
  },
  name: {
    backgroundColor: "rgba(255,255,255,0.8)",
    position: "absolute",
bottom: 0,
    fontWeight: "bold",
    width: "70px",
    textAlign: "center",
  },
  food: {
    flexWrap: "wrap",
    maxWidth: "190px",
    marginLeft: "10px",
  },
  drybed: {
    width: "50px",
    textAlign: "right",
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
  },
});

const CheatsheetGrid = ({ dogs }: { dogs: Card[] }) => {
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
              <View>
                <Text break wrap style={styles.food}>
                  {getDetails(dog.desc).food.trim()}
                </Text>
                <Text style={styles.drybed}>
                  {dog.desc.toLocaleLowerCase().includes("drybed")
                    ? "drybed"
                    : ""}
                </Text>
              </View>
            </View>
          </>
        ))}
        <Text style={styles.date} fixed>
          {date}
        </Text>
      </Page>
    </Document>
  );
};

export default CheatsheetGrid;
