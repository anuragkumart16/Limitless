import { StyleSheet } from "react-native";

export const Divs = StyleSheet.create({
  OutlineDiv: {
    boxShadow: "0px 0px 1px 1px #424242",
    borderRadius: 16,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  screenView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#09090B",
  },
  screenViewUnFlexed:{
    flex:1,
    backgroundColor:"#09090B"
  }
});


export const Typos = StyleSheet.create({
  h1: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
  },
  h2: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  },
  h3: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
  body: {
    fontSize: 16,
    fontWeight: "normal",
    color: "#A1A1AA",
  },
});


export const Buttons = StyleSheet.create({
  primary: {
    color: "#09090B",
    backgroundColor: "#ffffff",
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 8,
  },
  secondary: {
    color: "#A1A1AA",
  },
})