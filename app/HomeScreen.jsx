import { StyleSheet, View, SafeAreaView, Text, FlatList, ActivityIndicator, TouchableOpacity, Image } from "react-native";
import { useState, useEffect } from 'react';

export default function HomeScreen({ navigation }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                const data = await response.json();
                setProducts(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch products');
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleProductPress = (productId) => {
        navigation.navigate('DetailScreen', { id: productId });
    };

    if (loading) return (
        <View style={styles.centerContainer}>
            <ActivityIndicator size="large" />
            <Text>Loading products...</Text>
        </View>
    );
    
    if (error) return (
        <View style={styles.centerContainer}>
            <Text style={styles.errorText}>{error}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList 
                data={products}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() => handleProductPress(item.id)} style={styles.card}>
                        <Image source={{ uri: item.image }} style={styles.thumbnail} />
                        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
                        <Text style={styles.price}>ZAR{item.price}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContainer}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    listContainer: {
        padding: 10,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 15,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    thumbnail: {
        width: '100%',
        height: 150,
        marginBottom: 10,
    },
    title: {
        fontSize: 16,
        marginBottom: 5,
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'green',
    }
});