import AmityClient, { ConnectionStatus, ApiEndpoint,ChannelRepository,ChannelFilter } from "@amityco/js-sdk";
import { View, Button,Text } from "react-native";
let client;
function AuthProvider() {
  const apiKey = ""; // Add your api key here

  function login() {
    client = new AmityClient({
      apiKey: apiKey,
      apiEndpoint: ApiEndpoint.SG,
    }); // modify your server region here e.g ApiEndpoint.EU
    client.registerSession({
      userId: "",
      displayName: "",
    }); // Add your own userId and displayName
    client.on("connectionStatusChanged", ({ newValue }) => {
      if (newValue === ConnectionStatus.Connected) {
        console.log("connected to asc");

      } else {
        console.log(" not connected to asc");
      }
    });
    console.log("client: ", client);
  }

  function logout(){
    client.unregisterSession();
  }
  function queryChannel() {
 
    const liveCollection = ChannelRepository.queryChannels({
      filter: ChannelFilter.Member,
      sortBy:'lastActivity'
    });

    liveCollection.on("dataUpdated", (models) => {
      console.log("Channel models: ", models);
    });
  }
 
  return (
    <View>
      <Button title='login'onPress={login}/>
      <Text>Trigger login first, before calling other functions</Text>
      <Button title='logout'onPress={logout}/>
      <Button title='query channel'onPress={queryChannel}/>
    </View>
  );
}

export default AuthProvider;
