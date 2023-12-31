import { FlatList, StyleSheet, View, Text } from "react-native";
import PlaceItem from "./PlaceItem";
import { Colors } from "../../constant/color";

const PlacesList = ({ places }) => {
    if (!places || places.length === 0)
        return (
            <View style={styles.fallbackContainer}>
                <Text style={styles.fallbackText}>
                    No places added yet - start adding some
                </Text>
            </View>
        );

    return (
        <FlatList
            data={places}
            renderItem={({ item }) => <PlaceItem place={item} />}
            keyExtractor={(item) => item.id}
        />
    );
};

const styles = StyleSheet.create({
    fallbackContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50,
    },
    fallbackText: {
        fontSize: 16,
        color: Colors.primary700,
    },
});

export default PlacesList;
