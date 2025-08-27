import { View, Text, StyleSheet, Image } from "react-native";

export default function ProductItem({ product }) {
    return (
        <View style={styles.productCard}>
            <Image 
                source={{ uri: product.image }} 
                style={styles.thumbnail} 
                resizeMode="contain"
            />
            <Text style={styles.productName} numberOfLines={2}>
                {product.title}
            </Text>
            <Text style={styles.productPrice}>ZAR{product.price}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    productCard: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    thumbnail: {
        width: '100%',
        height: 150,
        marginBottom: 10,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    productPrice: {
        fontSize: 18,
        color: '#2c5530',
        fontWeight: '600',
    }
});