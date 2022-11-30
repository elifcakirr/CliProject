import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ActivityIndicator, Share, Dimensions, Alert } from 'react-native';

import axios from 'axios';
import { Card, Menu, Snackbar } from 'react-native-paper';
import RNFS from "react-native-fs"
import { useNavigation } from '@react-navigation/native';


function HistoryAuditScreen() {
    const [list, setList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isMenuShow, setIsMenuShow] = useState(false)
    const [uri, setUri] = useState(null)

    const [isDownload, setIsDownload] = useState()
    const [base64, setBase64] = useState(null)
    const navigation = useNavigation()
    const pdfButton = async () => {

        setIsLoading(true)
        //dosya indirme
        const response = await axios.get('https://test.theauditer.com/api/Audit/GetAuditPlanPdfReport?auditId=65',
            {
                'headers': {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NDBhNDZkOS00NDY1LTRlMTktYjZhNC1lOTA3NTY2MjM1MzEiLCJFbWFpbCI6ImNleWh1bi5rdWN1a2FsaUBmb3JuYXhzb2Z0d2FyZS5jb20iLCJUb2tlbiI6IjNlYjdiNTg2LWIxZjEtNDZkMi1hOWI5LWYyNmUwOTUzMGM4YyIsIlJlZnJlc2hJZCI6IjlmNGUzZGY1LTg0OTAtNGEyZi05ZDI2LTU0NzI3N2E0ZjlhZiIsImV4cCI6MTY2OTg4Mzc3NX0.EsvFVJy1iyMwUVUnW6zcxodi2ACdr-97z58whTImY-I'
                },
                responseType: 'blob',

            })
        if (!response.data) {
            Alert("Pdf yüklenmiş")
        }

        //dosya yazdırma
        const fr = new FileReader();

        fr.onload = async () => {
            const fileUri = RNFS.ExternalDirectoryPath + '/5.pdf';
            setUri(fileUri)

            await RNFS.writeFile(fileUri, fr.result.split(',')[1], "base64").finally(() => {
                setIsLoading(false)
            })
            setBase64(fr.result.split(',')[1]);
        }
        fr.readAsDataURL(response.data)
        setIsMenuShow(false)

        //Kayıtlı pdfleri
        const savedFileList = await RNFS.readDir(RNFS.ExternalDirectoryPath);
        const isSaved = savedFileList.some(file => file.path === uri)
        if (isSaved == true) {
            setIsDownload(true)
        }
        console.log(uri);
        navigation.navigate("Pdf", { url: uri })

    }


    const sharePdf = () => {
        // console.log("file://" + uri;
        if (uri) {
            Share.share({
                message: "Report",
                url: "data:application/pdf;base64," + base64,

            })

            console.log(base64);
            RNFS.unlink(uri)
        }
    }

    const clickPdf = () => {
        setIsMenuShow(true)
    }

    useEffect(() => {
        const getHistoryList = async () => {
            const list = await axios.get("http://test.theauditer.com/api/Audit/GetCompletedAudits?locationId=6",
                {
                    'headers': {
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NDBhNDZkOS00NDY1LTRlMTktYjZhNC1lOTA3NTY2MjM1MzEiLCJFbWFpbCI6ImNleWh1bi5rdWN1a2FsaUBmb3JuYXhzb2Z0d2FyZS5jb20iLCJUb2tlbiI6IjNlYjdiNTg2LWIxZjEtNDZkMi1hOWI5LWYyNmUwOTUzMGM4YyIsIlJlZnJlc2hJZCI6IjlmNGUzZGY1LTg0OTAtNGEyZi05ZDI2LTU0NzI3N2E0ZjlhZiIsImV4cCI6MTY2OTg4Mzc3NX0.EsvFVJy1iyMwUVUnW6zcxodi2ACdr-97z58whTImY-I'
                    }
                })
            setList(list.data.Data)
        }
        getHistoryList()
    }, [])


    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return <>

        <FlatList
            data={list}
            keyExtractor={(item) => item.Id}
            contentContainerStyle={list.length === 0 && styles.contentContainer}
            ListEmptyComponent={() =>
                <View style={styles.emptyListView}>
                    <Text>Geçmiş Denetim bulunmamaktadır</Text>
                </View>
            }
            renderItem={({ item }) => (

                <Card style={styles.historyAuditItem}>
                    <View style={styles.topContainer}>
                        <Text>{item.Location.CustomerName}</Text>
                        <Text>{item.AuditDate}</Text>
                    </View>

                    <View style={styles.headerContainer}>

                        <View style={styles.contentView}>
                            <Text style={styles.locationText} numberOfLines={5}>{item.Location.Code} - {item.Location.Name} </Text>
                            <View style={styles.locationAdress}>
                                {item.Location.DistrictName && <Text>{item.Location.DistrictName} - </Text>}
                                {item.Location.CityName && <Text>{item.Location.CityName} - </Text>}
                                {item.Location.CountryName && <Text>{item.Location.CountryName}</Text>}

                            </View>
                        </View>

                        <View style={{ flexDirection: "column" }}>


                            <View>
                                <Menu visible={isMenuShow}
                                    onDismiss={() => setIsMenuShow(false)}
                                    anchor={
                                        <TouchableOpacity style={styles.pdfButton} onPress={clickPdf}>
                                            <Image source={require("../../../assets/iconPdf.png")}></Image>
                                        </TouchableOpacity>}>
                                    <Menu.Item leadingIcon={'share'} title="Download/ Open" onPress={pdfButton}></Menu.Item>
                                    <Menu.Item leadingIcon={'share-variant'} title="Share" onPress={sharePdf}></Menu.Item>
                                </Menu>
                            </View>

                            {/* <TouchableOpacity style={{ backgroundColor: "#cae2ff", borderRadius: 5, padding: 5, flexDirection: "row" }}>
                                <Text >Paylaş</Text>
                                <Icon name='share'></Icon>

                            </TouchableOpacity> */}
                            {/* <Button icon='share-variant' labelStyle={{ fontSize: 20, flex: 1 }} onPress={sharePdf} buttonColor='#cae2ff'>
                                <Text style={{ fontSize: 15 }}>Paylaş</Text></Button> */}

                        </View>
                    </View>
                </Card>)
            }> </FlatList >
        {/* <Snackbar
            visible={isDownload}
            onDismiss={() => setIsDownload(false)}
            action={{
                label: 'Undo',
                onPress: () => {
                    console.log("selam");
                },
            }}>
            Hey there! I'm a Snackbar.
        </Snackbar> */}

    </>

}

const styles = StyleSheet.create({
    historyAuditItem: {
        backgroundColor: "white",
        marginTop: 10,
        marginHorizontal: 10,
        padding: 15
    },
    contentView: {
        flex: 1
    },
    contentContainer: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    topContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    locationText: {
        color: "black",
        fontWeight: '400',
        marginVertical: 10,
        fontSize: 15,
        lineHeight: 20
    },
    emptyListView: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",

    },
    locationAdress: {
        flexDirection: "row"
    }

})

export default HistoryAuditScreen;