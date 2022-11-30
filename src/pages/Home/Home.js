import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button } from 'react-native-paper';

const navigation = useNavigation()
function Home(props) {
    console.log(props);
    return (
        <Button onPress={() => navigation.navigate("Image")}></Button>
    );
}

export default Home;