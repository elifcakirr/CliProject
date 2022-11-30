import { createStackNavigator } from '@react-navigation/stack';
import ImageScreen from "../pages/ImageScreen/ImageScreen"
import { NavigationContainer } from '@react-navigation/native';
import HistoryAuditScreen from '../pages/HistoryAudit/HistoryAuditScreen';
import PdfScreen from '../pages/Pdf/PdfScreen';


const Stack = createStackNavigator();

function StackNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator defaultScreenOptions={ImageScreen}>
                <Stack.Screen name="Image" component={ImageScreen} />
                <Stack.Screen name='History' component={HistoryAuditScreen} />
                <Stack.Screen name='Pdf' component={PdfScreen} />
            </Stack.Navigator>
        </NavigationContainer>

    );
}
export default StackNavigator;