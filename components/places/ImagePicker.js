import { useState } from "react";
import { Alert, Button, Image, View, Text, StyleSheet } from "react-native";
import {
    launchCameraAsync,
    useCameraPermissions,
    PermissionStatus,
} from "expo-image-picker";
import { Colors } from "../../constant/color";

const ImagePicker = () => {
    const [pickedImage, setPickedImage] = useState();
    const [cameraPermissionInformation, requestPermission] =
        useCameraPermissions();

    const verifyPermissions = async () => {
        if (cameraPermissionInformation === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }
        if (cameraPermissionInformation === PermissionStatus.DENIED) {
            Alert.alert(
                "Insufficient Permissions",
                "You need to grant camera Permissions to use this app"
            );
        }
        return true;
    };

    const takeImageHandler = async () => {
        const hasPermission = await verifyPermissions();

        if (!hasPermission) return;
        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,
        });
        setPickedImage(image.uri);
    };

    return (
        <View>
            <View style={styles.imagePreview}>
                {!!pickedImage ? (
                    <Image style={styles.image} source={{ uri: pickedImage }} />
                ) : (
                    <Text style={styles.text}>NO Image taken yet.</Text>
                )}
            </View>
            <Button title="Take Image" onPress={takeImageHandler} />
        </View>
    );
};

export default ImagePicker;

const styles = StyleSheet.create({
    imagePreview: {
        width: "100%",
        height: 200,
        marginVertical: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary100,
        borderRadius: 4,
    },
    image: { height: "100%", width: "100%" },
    text: { textAlign: "center", color: Colors.primary800 },
});
