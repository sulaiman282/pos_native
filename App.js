import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import NotchDetector from "./Global/notchDetector";
import {
  TextInput,
  Button,
  IconButton,
  MD3Colors,
  Appbar,
} from "react-native-paper";
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [text, setText] = useState("");
  const [totalCost, setTotalCost] = useState("");
  const [addedItem, setAddedItem] = useState([]);
  const [testItem, setTestItem] = useState([]);
  const [helperState, setHelperState] = useState([]);
  var sum = 0;

  const priceList = [
    {
      id: "8901177101014",
      name: "Moov",
      price: 350,
      img: "https://static-01.daraz.com.bd/p/8ccd6de0c42725f8d62261c3f34403be.jpg",
      count: 1,
    },
    {
      id: "123",
      name: "7up (2 litre) and this is a text message to check the length",
      price: 100,
      img: "https://www.thebasketbd.com/media/catalog/product/cache/48f48cf19b12af076f14576460489c35/8/9/8941100313466.jpg",
      count: 1,
    },
    {
      id: "124",
      name: "Pepsi 1 Litre",
      price: 60,
      img: "https://dr6svciluuqrd.cloudfront.net/products/GY06qNRoWhWP7e5jyIRonEyzeI2X42sCqmdoD7GB.png",
      count: 1,
    }, {
      id: "125",
      name: "Dark Chocolate",
      price: 150,
      img: "https://static-01.daraz.com.bd/p/229d6e878e14f4799049ab72ff258052.jpg",
      count: 1,
    },
    {
      id: "126",
      name: "Dark Chocolate",
      price: 150,
      img: "https://static-01.daraz.com.bd/p/229d6e878e14f4799049ab72ff258052.jpg",
      count: 1,
    },
    {
      id: "127",
      name: "Dark Chocolate",
      price: 150,
      img: "https://static-01.daraz.com.bd/p/229d6e878e14f4799049ab72ff258052.jpg",
      count: 1,
    },
  ];
  const testfun = async (value) => {
    // console.log(value);
    await Promise.all(
      priceList.map((element) => {
        if (element.id === value) {
          setTotalCost(parseInt(totalCost + element.price));
          // console.log(totalCost);

          const updatedData = [...addedItem, element];
          setAddedItem(updatedData);
          setTestItem(
            Object.values(
              updatedData.reduce((map, el) => {
                map[el.id]
                  ? map[el.id].count++
                  : (map[el.id] = { ...el, count: 1 });
                return map;
              }, {})
            )
          );
          setText("");
        }
      })
    );
  };

  const removeItem = (id, price, count) => {
    setTestItem((current) => current.filter((data) => data.id !== id));

    setAddedItem((current) => current.filter((data) => data.id !== id));
    setTotalCost(totalCost - price * count);
  };

  const resetAll = () => {
    setAddedItem([]);
    setTestItem([]);
    setText("");
    setTotalCost("");
  };

  return (
    <NotchDetector>
      <StatusBar translucent backgroundColor="blue" style="light" />
      <View>
          <Text
            style={{
              textAlign: "center",
              color: "blue",
              fontWeight: "bold",
              margin: 5,
            }}
          >
            Team Buyonia
          </Text>
        </View>

        <View style={{ flexDirection: "row", width: "100%" }}>
            <TextInput
              style={{ width: "100%" }}
              keyboardType="numeric"
              label="Enter BAR CODE"
              labelColor="#0320fc"
              selectionColor="#0320fc"
              underlineColor="#0320fc"
              activeOutlineColor="#0320fc"
              textColor="#0320fc"
              activeUnderlineColor="#0320fc"
              clearButtonMode="always"
              returnKeyType="done"
              autoFocus={true}
              value={text}
              blurOnSubmit={false}
              onChangeText={(value) => {
                setText(value), testfun(value);
              }}
              
            />
          </View>
      <ScrollView style={{height:"75%"}}>
     
        {testItem?.slice(0).reverse().map((item, index) => (
          <View style={styles.container} key={item.id}>
            <View >
              <Image
                source={{
                  uri: item.img,
                }}
                style={{ width: 100, height: 100 }}
                resizeMode="contain"
              />
            </View>
            <View style={ {width:"70%"}}>
              <Text style={styles.text1}>Product: {item.name}</Text>
              <Text>Price: {item.price} TK</Text>
              <Text>Quantity: {item.count}</Text>
            </View>
            <View>
              <IconButton
                style={{
                  padding: 5,
                }}
                icon="delete"
                iconColor={MD3Colors.error50}
                size={20}
                onPress={(e) => removeItem(item.id, item.price, item.count)}
              />
            </View>
          </View>
        ))}

      

        
      </ScrollView>
      <View style={styles.qrContainer}>
        
      {totalCost > 0 && (
          <View>
            <Text style={{ textAlign: "right", fontWeight: "bold", marginBottom: 10 }}>
              Total: {totalCost} tk
            </Text>
          </View>
        )}
         
        </View>
        <View style={styles.bottomView}>
            <View>

            <Button
              mode="contained"
              onPress={() => resetAll()}
              buttonColor="red"
              style={{width:150}}
            >
              Reset
            </Button>
            </View>
           <View>
           <Button
              mode="contained"
              onPress={() => console.log("Pressed")}
              buttonColor="green"
             
              style={{width:150}}
            >
              Checkout
            </Button>

           </View>
          
          </View>
    </NotchDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    border: "10px solid red",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    borderWidth: 1,
    borderColor: "#0320fc",
    borderRadius: 5,
    padding: 5,
  },
  qrContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    
  },
  width: {
    width: "48%",
  },
  text1: {
    fontWeight: "bold",
  },
  bottomView: {
    display:"flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft:'10%',
    marginRight:'10%',
  },
});
