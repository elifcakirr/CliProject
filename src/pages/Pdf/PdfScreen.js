
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Pdf from 'react-native-pdf';

function PdfScreen({ route }) {
    console.log(route);
    return (
        <View style={styles.pdfView}>
            <Pdf style={styles.pdf} source={{ uri: "file://" + route.params.url }} />
        </View>

    );
}

const styles = StyleSheet.create({
    pdfView: {
        flex: 1
    },
    pdf: {
        height: Dimensions.get("window").height - 20
    }

})
export default PdfScreen;