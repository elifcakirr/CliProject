import React from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ImageScreen from '../pages/ImageScreen/ImageScreen';
import HistoryAuditScreen from '../pages/HistoryAudit/HistoryAuditScreen';

import PdfScreen from '../pages/Pdf/PdfScreen';

const Drawer = createDrawerNavigator();
function DrawerNavigation(props) {
    return (
        <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen name='Home' component={ImageScreen}></Drawer.Screen>
                <Drawer.Screen name="History" component={HistoryAuditScreen}></Drawer.Screen>
                <Drawer.Screen name='Pdf' component={PdfScreen}></Drawer.Screen>
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

export default DrawerNavigation;