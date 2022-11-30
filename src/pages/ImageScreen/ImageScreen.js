
import React, { useContext, useState } from 'react';
import { View, Image, TouchableOpacity, ScrollView, Button } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import ButtonIcon from '../../components/Button/ButtonIcon';
import { IconButton } from 'react-native-paper';
import ModalImage from '../../components/Modal/ModalImage';
import { styles } from './Image.style'


function ImageScreen() {

    const [selectedUrl, setSelectedUrl] = useState(null)
    const [isVideo, setIsVideo] = useState(false)
    const [urlList, setUrlList] = useState([])
    const [isModalShow, setIsModalShow] = useState(false)
    //Galeriden fotoğraf seçimi 
    const pickPicture = async () => {
        try {
            const image = await ImagePicker.openPicker({
                mediaType: "photo",//hem video hem photo için
                cropping: false,
            })

            setUrlList((oldList => [...oldList, image.path]))
        } catch (error) {
            console.log(error)

        }
    };

    //Camera açma
    const openCamera = async () => {
        try {
            const camera = await ImagePicker.openCamera({
                mediaType: "photo",
            })
            setUrlList((oldList => [...oldList, camera.path]))
        } catch (error) {
            console.log(error);
        }
    };

    //Video açma 
    const openVideo = async () => {
        try {
            const video = await ImagePicker.openCamera({
                mediaType: "video",
                cropping: false,


            })
            setUrlList((oldList => [...oldList, video.path]))
        } catch (error) {
            console.log(error);
        }
    };

    //Fotoğraf editi
    const onEditing = async (url, index) => {
        try {
            const cropper = await ImagePicker.openCropper({
                path: url,
                width: 300,
                height: 400
            })
            //editlenen fotoğrafı eski fotoğrafa set etme
            const myArray = [...urlList]
            myArray[index] = cropper.path
            setUrlList(myArray)
        } catch (error) {
            console.log(error);
        }
    }

    // ilgili url'in mp4 mü yoksa jpg mi olduğu kontrolü
    const urlType = (url) => {
        return url.substring(url.length - 3)
    }


    //Fotoğraflara tıklama
    const onImageClick = (url) => {
        setIsModalShow(!isModalShow)
        setSelectedUrl(url)
        if (urlType(url) == "jpg") {
            setIsVideo(false)
        }
        else {
            setIsVideo(true)
        }

    }

    const onDelete = (index) => {
        const newList = urlList.filter((url, i) => i !== index)
        setUrlList(newList)
    }





    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <ButtonIcon iconName='image' text='Library' onPress={pickPicture}></ButtonIcon>
                <ButtonIcon iconName='camera' text='Camera' onPress={openCamera}></ButtonIcon>
                <ButtonIcon iconName='video' text='Video' onPress={openVideo}></ButtonIcon>
            </View>

            <ModalImage
                visible={isModalShow}
                style={styles.modalImage}
                source={{ uri: selectedUrl }}
                onClose={() => setIsModalShow(false)}
                isVideo={isVideo}
                videoStyle={styles.video}
            />

            <ScrollView horizontal={true} contentContainerStyle={styles.imageScrollView} >

                {urlList.map((item, index) =>
                    <View style={styles.imageContainer}
                        key={index}>

                        {/* Image */}
                        <TouchableOpacity onPress={() => onImageClick(item)}>
                            <Image source={{ uri: item }} style={styles.image} />
                        </TouchableOpacity>

                        {/* edit ve silme butonları */}
                        {urlType(item) == "jpg" &&
                            <IconButton
                                icon='pencil'
                                size={11}
                                style={styles.editButton}
                                onPress={() => onEditing(item, index)} />
                        }
                        <IconButton
                            icon='delete'
                            iconColor='white'
                            size={11}
                            style={styles.deleteIcon}
                            onPress={() => onDelete(index)} />
                    </View>
                )}
            </ScrollView>





        </View>
    );
};



export default ImageScreen;