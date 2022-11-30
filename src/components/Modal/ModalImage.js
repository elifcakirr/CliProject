import React from 'react';
import { Image, Modal, StyleSheet, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import Video from 'react-native-video';

function ModalImage({ visible, source, style, onClose, isVideo, videoStyle }) {
    return (
        <Modal visible={visible}>
            <View style={styles.iconView}>
                <IconButton
                    icon='close'
                    size={30}
                    onPress={onClose}
                    style={styles.iconButton}></IconButton>
            </View>


            {!isVideo && <Image source={source} style={style} />}
            {isVideo && <Video source={source} style={videoStyle} />}


        </Modal>
    );
}

const styles = StyleSheet.create({
    iconButton: {
        backgroundColor: "#efefef",
        opacity: 10,
        position: "absolute",
        zIndex: 5000
    },
    iconView: {
        flexDirection: "row",
        justifyContent: "flex-end",
    }
})
export default ModalImage;